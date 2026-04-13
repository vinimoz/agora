/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { showError, showSuccess, showInfo } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'

export interface ImportOptions {
  sourceType: 'file'
  file?: File
  options?: {
    convertToMarkdown?: boolean
    detectChapters?: boolean
  }
}

export interface AnalyzedSection {
  title: string
  level: number
  type: string
}

export interface ImportResult {
  success: boolean
  content: string
  title?: string
  metadata?: {
    wordCount?: number
    chapterCount?: number
    sections?: AnalyzedSection[]
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
  
  async importDocument(options: ImportOptions): Promise<ImportResult> {
    try {
      if (options.sourceType === 'file' && options.file) {
        return await this.importFromFile(options.file)
      }
      throw new Error('Invalid source type or no file provided')
    } catch (error) {
      console.error('Import error:', error)
      return {
        success: false,
        content: '',
        error: error instanceof Error ? error.message : 'Unknown import error'
      }
    }
  }

  private async importFromFile(file: File): Promise<ImportResult> {
    // Validate file size
    if (file.size > this.maxFileSize) {
      throw new Error(`File size exceeds ${this.maxFileSize / 1024 / 1024}MB limit`)
    }

    showInfo(t('agora', 'Processing file: {filename} …', {
      filename: file.name
    }))

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/apps/agora/import', {
        method: 'POST',
        headers: {
          'requesttoken': (window as unknown).OC?.requestToken || ''
        },
        body: formData
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `HTTP ${response.status}`)
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error)
      }

      showSuccess(t('agora', 'File imported successfully: {filename}', {
        filename: file.name
      }))

      return {
        success: true,
        content: result.content,
        title: result.title,
        metadata: result.metadata
      }
    } catch (error) {
      showError(t('agora', 'Failed to import file: {error}', {
        error: error instanceof Error ? error.message : 'Unknown error'
      }))
      throw error
    }
  }
}
