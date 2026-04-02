/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { showError, showSuccess, showInfo } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import mammoth from 'mammoth'
import * as pdfjsLib from 'pdfjs-dist'
import { marked } from 'marked'
import domPurify from 'dompurify'

// Set up PDF.js worker
if (typeof window !== 'undefined') {
  // @ts-ignore - pdfjs worker configuration
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
}

export interface ImportOptions {
  sourceType: 'url' | 'file'
  url?: string
  file?: File
  format?: 'auto' | 'doc' | 'odt' | 'pdf' | 'html' | 'markdown'
  options?: {
    preserveFormatting?: boolean
    extractStructure?: boolean
    detectChapters?: boolean
    convertToMarkdown?: boolean
    maxSize?: number
  }
}

export interface DocumentSection {
  title: string
  level: number
  content?: string
  type?: 'introduction' | 'chapter' | 'article' | 'section' | 'conclusion'
  startLine?: number
  endLine?: number
}

export interface ImportResult {
  success: boolean
  content: string
  title?: string
  metadata?: {
    author?: string
    created?: Date
    modified?: Date
    pageCount?: number
    wordCount?: number
    chapterCount?: number
    sections?: DocumentSection[]
    detectedStructure?: {
      hasIntroduction: boolean
      hasChapters: boolean
      hasArticles: boolean
      hasConclusion: boolean
    }
  }
  error?: string
}

export class ImportService {
  private maxFileSize = 10 * 1024 * 1024 // 10MB default
  
  // Allowed document MIME types (exclude images)
  private allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.text',
    'text/html',
    'text/plain',
    'text/markdown',
    'text/x-markdown'
  ]

  async importDocument(options: ImportOptions): Promise<ImportResult> {
    try {
      if (options.sourceType === 'url') {
        return await this.importFromUrl(options)
      } if (options.sourceType === 'file') {
        return await this.importFromFile(options)
      }
      throw new Error('Invalid source type')
    } catch (error) {
      console.error('Import error:', error)
      return {
        success: false,
        content: '',
        error: error instanceof Error ? error.message : 'Unknown import error'
      }
    }
  }

  private async importFromUrl(options: ImportOptions): Promise<ImportResult> {
    if (!options.url) {
      throw new Error('URL is required')
    }

    showInfo(t('agora', 'Fetching document from URL...'))

    try {
      const response = await fetch(options.url, {
        headers: {
          'Accept': 'text/html,text/plain,text/markdown'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const contentType = response.headers.get('content-type') || ''
      let content = await response.text()

      // Detect format and convert
      if (contentType.includes('text/html')) {
        content = this.convertHtmlToMarkdown(content)
      } else if (contentType.includes('text/plain')) {
        if (this.isMarkdown(content)) {
          content = this.processMarkdown(content)
        }
      }

      const title = this.extractTitleFromUrl(options.url, content)
      const metadata = await this.analyzeDocumentStructure(content, options)

      showSuccess(t('agora', 'Document imported successfully from URL'))

      return {
        success: true,
        content,
        title,
        metadata
      }
    } catch (error) {
      showError(t('agora', 'Failed to import from URL: {error}', {
        error: error instanceof Error ? error.message : 'Unknown error'
      }))
      throw error
    }
  }

  private async importFromFile(options: ImportOptions): Promise<ImportResult> {
    if (!options.file) {
      throw new Error('File is required')
    }

    // Validate file type - accept documents, reject images
    const fileType = options.file.type.toLowerCase()
    const isImage = fileType.startsWith('image/')
    const isDocument = this.allowedFileTypes.includes(fileType) || 
                       /\.(doc|docx|odt|pdf|html|htm|md|txt)$/i.test(options.file.name)
    
    if (isImage) {
      throw new Error('Image files are not supported. Please upload document files (PDF, DOC, DOCX, ODT, HTML, TXT, MD)')
    }
    
    if (!isDocument) {
      throw new Error(`File type "${fileType || 'unknown'}" is not supported. Please upload document files (PDF, DOC, DOCX, ODT, HTML, TXT, MD)`)
    }

    // Check file size
    if (options.file.size > this.maxFileSize) {
      throw new Error(`File size exceeds ${this.maxFileSize / 1024 / 1024}MB limit`)
    }

    showInfo(t('agora', 'Processing file: {filename}...', {
      filename: options.file.name
    }))

    try {
      const fileExtension = options.file.name.split('.').pop()?.toLowerCase()
      let content = ''
      let metadata: ImportResult['metadata'] = {}

      switch (fileExtension) {
        case 'doc':
        case 'docx':
          content = await this.convertDocToMarkdown(options.file)
          metadata = await this.extractDocMetadata(options.file)
          break

        case 'odt':
          content = await this.convertOdtToMarkdown(options.file)
          metadata = await this.extractOdtMetadata(options.file)
          break

        case 'pdf':
          content = await this.convertPdfToText(options.file)
          metadata = await this.extractPdfMetadata(options.file)
          if (options.options?.convertToMarkdown) {
            content = this.textToMarkdown(content)
          }
          break

        case 'html':
        case 'htm':
          content = await this.readFileAsText(options.file)
          content = this.convertHtmlToMarkdown(content)
          metadata = await this.extractHtmlMetadata(content)
          break

        case 'md':
        case 'markdown':
          content = await this.readFileAsText(options.file)
          content = this.processMarkdown(content)
          metadata = await this.analyzeDocumentStructure(content, options)
          break

        case 'txt':
          content = await this.readFileAsText(options.file)
          if (options.options?.convertToMarkdown) {
            content = this.textToMarkdown(content)
          }
          break

        default:
          throw new Error(`Unsupported file format: ${fileExtension}`)
      }

      const title = this.extractTitleFromFilename(options.file.name, content)

      if (options.options?.detectChapters) {
        const structure = await this.analyzeDocumentStructure(content, options)
        metadata = { ...metadata, ...structure }
      }

      showSuccess(t('agora', 'File imported successfully: {filename}', {
        filename: options.file.name
      }))

      return {
        success: true,
        content,
        title,
        metadata
      }
    } catch (error) {
      showError(t('agora', 'Failed to import file: {error}', {
        error: error instanceof Error ? error.message : 'Unknown error'
      }))
      throw error
    }
  }

  private async convertDocToMarkdown(file: File): Promise<string> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.convertToHtml({ arrayBuffer })
      return this.convertHtmlToMarkdown(result.value)
    } catch (error) {
      console.error('DOC conversion error:', error)
      throw new Error('Failed to convert DOC/DOCX file')
    }
  }

  private async convertOdtToMarkdown(file: File): Promise<string> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.convertToHtml({ arrayBuffer })
      return this.convertHtmlToMarkdown(result.value)
    } catch (error) {
      console.error('ODT conversion error:', error)
      throw new Error('Failed to convert ODT file')
    }
  }

  private async convertPdfToText(file: File): Promise<string> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      
      // Create a loading task
      const loadingTask = pdfjsLib.getDocument({ 
        data: arrayBuffer,
        useSystemFonts: true,
        standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/standard_fonts/'
      })
      
      const pdf = await loadingTask.promise
      let fullText = ''

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map((item: { str: string }) => item.str).join(' ')
        fullText += `${pageText}\n\n`
      }

      return fullText.trim()
    } catch (error) {
      console.error('PDF conversion error:', error)
      throw new Error(`Failed to convert PDF file: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private convertHtmlToMarkdown(html: string): string {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    
    return this.htmlNodeToMarkdown(tempDiv)
  }

  private htmlNodeToMarkdown(node: Node, listLevel: number = 0): string {
    let result = ''
    
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent || ''
      text = text.replace(/\s+/g, ' ')
      return text
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      const tagName = element.tagName.toLowerCase()
      const isBlockElement = ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'pre'].includes(tagName)
      
      switch (tagName) {
        case 'h1':
          result = `\n# ${this.htmlNodeToMarkdown(element, listLevel).trim()}\n\n`
          break
        case 'h2':
          result = `\n## ${this.htmlNodeToMarkdown(element, listLevel).trim()}\n\n`
          break
        case 'h3':
          result = `\n### ${this.htmlNodeToMarkdown(element, listLevel).trim()}\n\n`
          break
        case 'h4':
          result = `\n#### ${this.htmlNodeToMarkdown(element, listLevel).trim()}\n\n`
          break
        case 'h5':
          result = `\n##### ${this.htmlNodeToMarkdown(element, listLevel).trim()}\n\n`
          break
        case 'h6':
          result = `\n###### ${this.htmlNodeToMarkdown(element, listLevel).trim()}\n\n`
          break
        case 'p':
          result = `\n${this.htmlNodeToMarkdown(element, listLevel).trim()}\n\n`
          break
        case 'strong':
        case 'b':
          result = `**${this.htmlNodeToMarkdown(element, listLevel)}**`
          break
        case 'em':
        case 'i':
          result = `*${this.htmlNodeToMarkdown(element, listLevel)}*`
          break
        case 'ul':
          result = this.processListItems(element, '-', listLevel)
          break
        case 'ol':
          result = this.processListItems(element, '1.', listLevel)
          break
        case 'li': {
          const indent = '  '.repeat(listLevel)
          const prefix = listLevel === 0 ? '- ' : '  - '
          result = `\n${indent}${prefix}${this.htmlNodeToMarkdown(element, listLevel + 1).trim()}`
          break
        }
        case 'a': {
          const href = element.getAttribute('href')
          const text = this.htmlNodeToMarkdown(element, listLevel)
          if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
            result = `[${text}](${href})`
          } else {
            result = text
          }
          break
        }
        case 'img':
          const src = element.getAttribute('src')
          const alt = element.getAttribute('alt') || ''
          result = src && !src.startsWith('data:') ? `![${alt}](${src})` : ''
          break
        case 'pre':
        case 'code':
          const codeContent = this.htmlNodeToMarkdown(element, listLevel)
          result = `\n\`\`\`\n${codeContent.trim()}\n\`\`\`\n\n`
          break
        case 'blockquote':
          const quoteContent = this.htmlNodeToMarkdown(element, listLevel)
          const quotedLines = quoteContent.split('\n').map(line => `> ${line}`).join('\n')
          result = `\n${quotedLines}\n\n`
          break
        case 'br':
          result = '\n'
          break
        case 'hr':
          result = '\n---\n\n'
          break
        default:
          for (const child of Array.from(element.childNodes)) {
            result += this.htmlNodeToMarkdown(child, listLevel)
          }
          if (isBlockElement && result.trim()) {
            result = `${result.replace(/\n+$/, '')  }\n\n`
          }
      }
    }
    
    return result
  }

  private processListItems(element: Element, prefix: string, level: number): string {
    let result = ''
    const items = Array.from(element.children)
    let counter = 1
    const indent = '  '.repeat(level)
    
    items.forEach(item => {
      if (item.tagName.toLowerCase() === 'li') {
        const prefixText = prefix === '1.' ? `${counter}.` : prefix
        const itemContent = this.htmlNodeToMarkdown(item, level + 1).trim()
        result += `\n${indent}${prefixText} ${itemContent}`
        if (prefix === '1.') counter++
      }
    })
    
    return `${result  }\n\n`
  }

  private textToMarkdown(text: string): string {
    const lines = text.split('\n')
    const processed: string[] = []
    let inParagraph = false
    
    for (const line of lines) {
      const trimmed = line.trim()
      
      if (trimmed.length < 100 && trimmed.toUpperCase() === trimmed && trimmed.length > 0 && !trimmed.match(/^[0-9]/)) {
        if (inParagraph) {
          processed.push('')
          inParagraph = false
        }
        processed.push(`## ${trimmed}`)
        processed.push('')
      } else if (trimmed.length > 0) {
        processed.push(line)
        inParagraph = true
      } else {
        if (inParagraph) {
          processed.push('')
          inParagraph = false
        }
        processed.push('')
      }
    }
    
    return processed.join('\n')
  }

  private processMarkdown(markdown: string): string {
    const html = marked.parse(markdown)
    return domPurify.sanitize(html.toString())
  }

  private isMarkdown(text: string): boolean {
    return /^#{1,6}\s|[*_]{1,2}|`{1,3}|\[.+\]\(.+\)/m.test(text)
  }

  private async analyzeDocumentStructure(content: string, options: ImportOptions): Promise<ImportResult['metadata']> {
    const lines = content.split('\n')
    const sections: DocumentSection[] = []
    let chapterCount = 0
    let hasIntroduction = false
    let hasConclusion = false
    let hasArticles = false

    for (let index = 0; index < lines.length; index++) {
      const line = lines[index]
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
      if (headingMatch) {
        const level = headingMatch[1].length
        const title = headingMatch[2].trim()
        const titleLower = title.toLowerCase()
        
        let sectionType: DocumentSection['type'] = 'section'
        if (titleLower.includes('introduction') || titleLower.includes('intro')) {
          sectionType = 'introduction'
          hasIntroduction = true
        } else if (titleLower.includes('chapter') || titleLower.includes('part')) {
          sectionType = 'chapter'
          chapterCount++
        } else if (titleLower.includes('article')) {
          sectionType = 'article'
          hasArticles = true
        } else if (titleLower.includes('conclusion') || titleLower.includes('summary')) {
          sectionType = 'conclusion'
          hasConclusion = true
        } else if (level === 1 || level === 2) {
          sectionType = 'chapter'
          chapterCount++
        }
        
        sections.push({ 
          title, 
          level, 
          type: sectionType,
          startLine: index
        })
      }
    }

    const articlePattern = /\b(article|art\.)\s+\d+\b/gi
    const articleMatches = content.match(articlePattern)
    if (articleMatches) {
      hasArticles = true
      chapterCount = Math.max(chapterCount, articleMatches.length)
    }

    if (sections.length === 0) {
      const htmlHeadingMatches = content.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi)
      if (htmlHeadingMatches) {
        for (const match of htmlHeadingMatches) {
          const levelMatch = match.match(/<h([1-6])/i)
          const titleMatch = match.replace(/<[^>]*>/g, '').trim()
          if (levelMatch && titleMatch) {
            const level = parseInt(levelMatch[1])
            sections.push({ title: titleMatch, level, type: 'section' })
            if (level <= 2) chapterCount++
          }
        }
      }
    }

    return {
      wordCount: content.split(/\s+/).length,
      chapterCount,
      sections: sections.slice(0, 20),
      detectedStructure: {
        hasIntroduction,
        hasChapters: chapterCount > 0,
        hasArticles,
        hasConclusion
      }
    }
  }

  private extractTitleFromUrl(url: string, content: string): string {
    const urlParts = url.split('/')
    let title = urlParts[urlParts.length - 1] || 'Imported Document'
    title = title.replace(/\.[^/.]+$/, '')
    title = decodeURIComponent(title)
    title = title.replace(/%20/g, ' ').replace(/%2F/g, '/')

    const titleMatch = content.match(/<title>(.*?)<\/title>/) ||
                      content.match(/^#\s+(.+)$/m) ||
                      content.match(/<h1[^>]*>(.*?)<\/h1>/i)

    if (titleMatch) {
      title = titleMatch[1].trim().replace(/<[^>]*>/g, '')
    }

    return title
  }

  private extractTitleFromFilename(filename: string, content: string): string {
    let title = filename.replace(/\.[^/.]+$/, '')
    const titleMatch = content.match(/^#\s+(.+)$/m) ||
                      content.match(/<h1[^>]*>(.*?)<\/h1>/i)
    if (titleMatch) {
      title = titleMatch[1].trim().replace(/<[^>]*>/g, '')
    }
    return title
  }

  private async readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsText(file, 'UTF-8')
    })
  }

  private async extractDocMetadata(file: File): Promise<ImportResult['metadata']> {
    return {
      author: 'Unknown',
      created: new Date(file.lastModified)
    }
  }

  private async extractOdtMetadata(file: File): Promise<ImportResult['metadata']> {
    return {
      author: 'Unknown',
      created: new Date(file.lastModified)
    }
  }

  private async extractPdfMetadata(file: File): Promise<ImportResult['metadata']> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const metadata = await pdf.getMetadata()
      
      return {
        author: metadata.info?.Author,
        created: metadata.info?.CreationDate ? new Date(metadata.info.CreationDate) : new Date(file.lastModified),
        pageCount: pdf.numPages
      }
    } catch (error) {
      console.error('PDF metadata extraction error:', error)
      return {
        pageCount: 0
      }
    }
  }

  private async extractHtmlMetadata(content: string): Promise<ImportResult['metadata']> {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    
    const authorMeta = tempDiv.querySelector('meta[name="author"]')?.getAttribute('content')
    const authorMeta2 = tempDiv.querySelector('meta[property="author"]')?.getAttribute('content')
    
    return {
      author: authorMeta || authorMeta2
    }
  }
}
