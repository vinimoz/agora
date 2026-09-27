/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { Logger } from '../helpers/modules/logger'
import { AiAPI } from '../Api/index.ts'
import type { AxiosError } from '@nextcloud/axios'

interface AiState {
  isLoading: boolean
  // General AI
  enhancedContent: Record<number, string>
  // Option generation from discussion
  generatedOptions: Record<number, string[]>
  // Document-based options
  documentOptions: Record<number, any[]>
  // Debate/analysis
  summaries: Record<number, string>
  sentiments: Record<number, any>
  topics: Record<number, string>
  // Translation
  translations: Record<number, Record<string, string>>
}

export const useAiStore = defineStore('ai', {
  state: (): AiState => ({
    isLoading: false,
    enhancedContent: {},
    generatedOptions: {},
    documentOptions: {},
    summaries: {},
    sentiments: {},
    topics: {},
    translations: {},
  }),

  getters: {
    getEnhancedContent: (state) => (inquiryId: number): string | null => 
      state.enhancedContent[inquiryId] || null,
    
    getGeneratedOptions: (state) => (inquiryId: number): string[] => 
      state.generatedOptions[inquiryId] || [],
    
    getDocumentOptions: (state) => (inquiryId: number): any[] => 
      state.documentOptions[inquiryId] || [],
    
    getSummary: (state) => (inquiryId: number): string | null => 
      state.summaries[inquiryId] || null,
  },

  actions: {
    // ============ GENERAL AI ============
    
    /**
     * Enhance or generate content using AI
     * Used by InquiryEditor for general AI assistance
     */
    async enhanceContent(inquiryId: number, prompt: string): Promise<string> {
      this.isLoading = true
      try {
        // Use the inquiry store's AI service or direct API
        const response = await AiAPI.enhanceContent(inquiryId, prompt)
        this.enhancedContent[inquiryId] = response.data.enhanced
        return response.data.enhanced
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return ''
        }
        Logger.error('Error enhancing content', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // ============ OPTION GENERATION ============
    
    /**
     * Generate options from inquiry title and description
     * This is the primary method for creating options from discussion content
     */
async generateOptionsFromInquiry(inquiryId: number, count: number = 4): Promise<string[]> {
  this.isLoading = true
  try {
    const response = await AiAPI.generateOptionsFromInquiry(inquiryId, count)
    // Make sure we handle the response properly
    if (response.data && response.data.options) {
      const options = response.data.options
      this.generatedOptions[inquiryId] = options
      return options
    } else {
      throw new Error('Invalid response from AI service')
    }
  } catch (error) {
    if ((error as AxiosError)?.code === 'ERR_CANCELED') {
      return []
    }
    Logger.error('Error generating options from inquiry', { error, inquiryId })
    throw error // Re-throw to be caught by the component
  } finally {
    this.isLoading = false
  }
},

    /**
     * Generate options from uploaded document
     * For future use with document import
     */
    async generateOptionsFromDocument(
      inquiryId: number,
      documentPath: string,
      optionType: 'chapter' | 'section' | 'subsection' | 'paragraph' | 'custom' = 'section',
      options: Record<string, any> = {}
    ): Promise<any[]> {
      this.isLoading = true
      try {
        const response = await AiAPI.generateDocumentOptions(inquiryId, documentPath, optionType, options)
        this.documentOptions[inquiryId] = response.data.options
        return response.data.options
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return []
        }
        Logger.error('Error generating document options', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Generate decision options with pros/cons
     */
    async generateDecisionOptions(
      inquiryId: number, 
      constraints: Record<string, any> = {}
    ): Promise<any[]> {
      this.isLoading = true
      try {
        const response = await AiAPI.generateDecisionOptions(inquiryId, constraints)
        return response.data.options
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return []
        }
        Logger.error('Error generating decision options', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Generate creative ideas
     */
    async generateCreativeIdeas(inquiryId: number, count: number = 5): Promise<string[]> {
      this.isLoading = true
      try {
        const response = await AiAPI.generateCreativeIdeas(inquiryId, count)
        return response.data.ideas
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return []
        }
        Logger.error('Error generating creative ideas', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // ============ SUMMARIZATION ============
    
    /**
     * Summarize discussion
     */
    async summarizeInquiry(inquiryId: number, format: 'concise' | 'detailed' | 'bullet_points' = 'concise'): Promise<string> {
      this.isLoading = true
      try {
        const response = await AiAPI.summarizeInquiry(inquiryId, format)
        this.summaries[inquiryId] = response.data.summary
        return response.data.summary
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return ''
        }
        Logger.error('Error summarizing inquiry', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // ============ SENTIMENT ANALYSIS ============
    
    /**
     * Analyze sentiment of discussion
     */
    async analyzeSentiment(inquiryId: number): Promise<any> {
      this.isLoading = true
      try {
        const response = await AiAPI.analyzeSentiment(inquiryId)
        this.sentiments[inquiryId] = response.data.sentiment
        return response.data.sentiment
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return null
        }
        Logger.error('Error analyzing sentiment', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Clear AI data for inquiry
     */
    clearAiData(inquiryId: number): void {
      delete this.enhancedContent[inquiryId]
      delete this.generatedOptions[inquiryId]
      delete this.documentOptions[inquiryId]
      delete this.summaries[inquiryId]
      delete this.sentiments[inquiryId]
      delete this.topics[inquiryId]
      delete this.translations[inquiryId]
    },

    /**
     * Reset all AI data
     */
    reset(): void {
      this.isLoading = false
      this.enhancedContent = {}
      this.generatedOptions = {}
      this.documentOptions = {}
      this.summaries = {}
      this.sentiments = {}
      this.topics = {}
      this.translations = {}
    }
  }
})
