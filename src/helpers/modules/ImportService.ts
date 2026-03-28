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
    sections?: Array<{ title: string, level: number, content?: string }>
  }
  error?: string
}

export class ImportService {
  private maxFileSize = 10 * 1024 * 1024 // 10MB default

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
        // Keep as is, but maybe detect markdown
        if (this.isMarkdown(content)) {
          content = this.processMarkdown(content)
        }
      }

      // Extract title from URL or content
      const title = this.extractTitleFromUrl(options.url, content)

      // Detect document structure
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
          // Optionally convert to markdown
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

      // Extract title from filename if not found
      const title = this.extractTitleFromFilename(options.file.name, content)

      // Analyze document structure if requested
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
      // For ODT files, we can use the same mammoth approach or other libraries
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
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let fullText = ''

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map((item: any) => item.str).join(' ')
        fullText += `${pageText  }\n\n`
      }

      return fullText.trim()
    } catch (error) {
      console.error('PDF conversion error:', error)
      throw new Error('Failed to convert PDF file')
    }
  }

  private convertHtmlToMarkdown(html: string): string {
    // Use turndown or similar library, or implement basic conversion
    // For now, let's use a simple approach
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html

    // Extract headings and basic structure
    const markdown = this.htmlNodeToMarkdown(tempDiv)
    return markdown
  }

  private htmlNodeToMarkdown(node: Node): string {
    // Recursive HTML to Markdown conversion
    let result = ''

    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || ''
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      const tagName = element.tagName.toLowerCase()

      switch (tagName) {
        case 'h1':
          result = `# ${this.htmlNodeToMarkdown(element)}\n\n`
          break
        case 'h2':
          result = `## ${this.htmlNodeToMarkdown(element)}\n\n`
          break
        case 'h3':
          result = `### ${this.htmlNodeToMarkdown(element)}\n\n`
          break
        case 'h4':
          result = `#### ${this.htmlNodeToMarkdown(element)}\n\n`
          break
        case 'p':
          result = `${this.htmlNodeToMarkdown(element)}\n\n`
          break
        case 'strong':
        case 'b':
          result = `**${this.htmlNodeToMarkdown(element)}**`
          break
        case 'em':
        case 'i':
          result = `*${this.htmlNodeToMarkdown(element)}*`
          break
        case 'ul':
          result = this.processListItems(element, '-')
          break
        case 'ol':
          result = this.processListItems(element, '1.')
          break
        case 'li':
          result = `- ${this.htmlNodeToMarkdown(element)}\n`
          break
        case 'a':
          const href = element.getAttribute('href')
          const text = this.htmlNodeToMarkdown(element)
          result = href ? `[${text}](${href})` : text
          break
        case 'img':
          const src = element.getAttribute('src')
          const alt = element.getAttribute('alt') || ''
          result = src ? `![${alt}](${src})` : ''
          break
        case 'pre':
        case 'code':
          result = `\`\`\`\n${this.htmlNodeToMarkdown(element)}\n\`\`\`\n\n`
          break
        case 'blockquote':
          result = `> ${this.htmlNodeToMarkdown(element)}\n\n`
          break
        default:
          for (const child of Array.from(element.childNodes)) {
            result += this.htmlNodeToMarkdown(child)
          }
      }
    }

    return result
  }

  private processListItems(element: Element, prefix: string): string {
    let result = ''
    const items = Array.from(element.children)
    let counter = 1

    items.forEach(item => {
      if (item.tagName.toLowerCase() === 'li') {
        const prefixText = prefix === '1.' ? `${counter}.` : prefix
        result += `${prefixText} ${this.htmlNodeToMarkdown(item)}\n`
        counter++
      }
    })

    return `${result  }\n`
  }

  private textToMarkdown(text: string): string {
    // Convert plain text to basic markdown by detecting headings
    const lines = text.split('\n')
    const processed = lines.map(line => {
      // Detect potential headings (all caps, short, etc)
      if (line.length < 100 && line.toUpperCase() === line && line.trim().length > 0) {
        return `## ${line}`
      }
      return line
    })
    return processed.join('\n')
  }

  private processMarkdown(markdown: string): string {
    // Sanitize and process markdown
    const html = marked.parse(markdown)
    return domPurify.sanitize(html.toString())
  }

  private isMarkdown(text: string): boolean {
    // Simple detection for markdown features
    return /^#{1,6}\s|[*_]{1,2}|`{1,3}|\[.+\]\(.+\)/m.test(text)
  }

  private async analyzeDocumentStructure(content: string, options: ImportOptions): Promise<ImportResult['metadata']> {
    const lines = content.split('\n')
    const sections: Array<{ title: string, level: number, content?: string }> = []
    let chapterCount = 0

    // Detect markdown headings
    lines.forEach((line, index) => {
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
      if (headingMatch) {
        const level = headingMatch[1].length
        const title = headingMatch[2].trim()
        sections.push({ title, level })
        if (level === 1 || level === 2) {
          chapterCount++
        }
      }
    })

    return {
      wordCount: content.split(/\s+/).length,
      chapterCount,
      sections: sections.slice(0, 10) // Limit to first 10 sections
    }
  }

  private extractTitleFromUrl(url: string, content: string): string {
    // Try to extract from URL
    const urlParts = url.split('/')
    let title = urlParts[urlParts.length - 1] || 'Imported Document'

    // Remove extension
    title = title.replace(/\.[^/.]+$/, '')

    // Decode URL encoding
    title = decodeURIComponent(title)

    // Try to find title in content
    const titleMatch = content.match(/<title>(.*?)<\/title>/) ||
                      content.match(/^#\s+(.+)$/m)

    if (titleMatch) {
      title = titleMatch[1].trim()
    }

    return title
  }

  private extractTitleFromFilename(filename: string, content: string): string {
    let title = filename.replace(/\.[^/.]+$/, '')
    // Try to find title in content
    const titleMatch = content.match(/^#\s+(.+)$/m)
    if (titleMatch) {
      title = titleMatch[1].trim()
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
    // Extract metadata from DOC files using a library or basic info
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
      return {
        pageCount: 0
      }
    }
  }

  private async extractHtmlMetadata(content: string): Promise<ImportResult['metadata']> {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    
    const title = tempDiv.querySelector('title')?.textContent
    const authorMeta = tempDiv.querySelector('meta[name="author"]')?.getAttribute('content')
    
    return {
      author: authorMeta
    }
  }
}
