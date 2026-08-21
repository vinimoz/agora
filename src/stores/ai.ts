/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import AiAPI from '../Api/ai'
import { Logger } from '../helpers/modules/logger'
import { useCommentsStore } from './comments'
import { useOptionStore } from './option'

import type { AxiosError } from '@nextcloud/axios'

interface AiState {
  isLoading: boolean
  summaries: Record<number, string>
  keyPoints: Record<number, string[]>
  tldrs: Record<number, string>
  sentiments: Record<number, any>
  topics: Record<number, string>
  urgencies: Record<number, string>
  actions: Record<number, string[]>
  pollOptions: Record<number, string[]>
  decisionOptions: Record<number, any[]>
  creativeIdeas: Record<number, string[]>
  documentOptions: Record<number, any[]>
  arguments: Record<number, any[]>
  counterArguments: Record<number, any[]>
  debateAnalysis: Record<number, any>
  debateSummaries: Record<number, string>
  compromises: Record<number, any>
  rebuttals: Record<number, string>
  translations: Record<number, Record<string, string>>
}

export const useAiStore = defineStore('ai', {
  state: (): AiState => ({
    isLoading: false,
    summaries: {},
    keyPoints: {},
    tldrs: {},
    sentiments: {},
    topics: {},
    urgencies: {},
    actions: {},
    pollOptions: {},
    decisionOptions: {},
    creativeIdeas: {},
    documentOptions: {},
    arguments: {},
    counterArguments: {},
    debateAnalysis: {},
    debateSummaries: {},
    compromises: {},
    rebuttals: {},
    translations: {},
  }),

  getters: {
    /**
     * Get summary for inquiry
     * @param state
     */
    getSummary: (state) => (inquiryId: number): string | null => state.summaries[inquiryId] || null,

    /**
     * Get key points for inquiry
     * @param state
     */
    getKeyPoints: (state) => (inquiryId: number): string[] => state.keyPoints[inquiryId] || [],

    /**
     * Get TL;DR for inquiry
     * @param state
     */
    getTldr: (state) => (inquiryId: number): string | null => state.tldrs[inquiryId] || null,

    /**
     * Get sentiment analysis for inquiry
     * @param state
     */
    getSentiment: (state) => (inquiryId: number): any | null => state.sentiments[inquiryId] || null,

    /**
     * Get poll options for inquiry
     * @param state
     */
    getPollOptions: (state) => (inquiryId: number): string[] => state.pollOptions[inquiryId] || [],
  },

  actions: {
    // ============ SUMMARIZER ============

    /**
     * Summarize inquiry
     * @param inquiryId
     * @param format
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

    /**
     * Get key points
     * @param inquiryId
     */
    async getKeyPoints(inquiryId: number): Promise<string[]> {
      this.isLoading = true
      try {
        const response = await AiAPI.getKeyPoints(inquiryId)
        this.keyPoints[inquiryId] = response.data.key_points
        return response.data.key_points
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return []
        }
        Logger.error('Error getting key points', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Get TL;DR
     * @param inquiryId
     * @param maxLength
     */
    async getTldr(inquiryId: number, maxLength: number = 100): Promise<string> {
      this.isLoading = true
      try {
        const response = await AiAPI.getTldr(inquiryId, maxLength)
        this.tldrs[inquiryId] = response.data.tldr
        return response.data.tldr
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return ''
        }
        Logger.error('Error getting TL;DR', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // ============ CLASSIFIER ============

    /**
     * Analyze sentiment
     * @param inquiryId
     * @param commentId
     */
    async analyzeSentiment(inquiryId: number, commentId?: number): Promise<any> {
      this.isLoading = true
      try {
        const response = await AiAPI.analyzeSentiment(inquiryId, commentId)
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
     * Classify topic
     * @param inquiryId
     * @param categories
     */
    async classifyTopic(inquiryId: number, categories: string[] = []): Promise<string> {
      this.isLoading = true
      try {
        const response = await AiAPI.classifyTopic(inquiryId, categories)
        this.topics[inquiryId] = response.data.topic
        return response.data.topic
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return ''
        }
        Logger.error('Error classifying topic', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Detect urgency
     * @param inquiryId
     */
    async detectUrgency(inquiryId: number): Promise<string> {
      this.isLoading = true
      try {
        const response = await AiAPI.detectUrgency(inquiryId)
        this.urgencies[inquiryId] = response.data.urgency
        return response.data.urgency
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return ''
        }
        Logger.error('Error detecting urgency', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Extract actions
     * @param inquiryId
     */
    async extractActions(inquiryId: number): Promise<string[]> {
      this.isLoading = true
      try {
        const response = await AiAPI.extractActions(inquiryId)
        this.actions[inquiryId] = response.data.actions
        return response.data.actions
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return []
        }
        Logger.error('Error extracting actions', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // ============ OPTION GENERATOR ============

    /**
     * Generate poll options
     * @param inquiryId
     * @param count
     * @param optionId
     */
    async generatePollOptions(inquiryId: number, count: number = 4, optionId?: number): Promise<string[]> {
      this.isLoading = true
      try {
        const response = await AiAPI.generatePollOptions(inquiryId, count, optionId)
        this.pollOptions[inquiryId] = response.data.options
        return response.data.options
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return []
        }
        Logger.error('Error generating poll options', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Generate decision options
     * @param inquiryId
     * @param constraints
     */
    async generateDecisionOptions(inquiryId: number, constraints: Record<string, any> = {}): Promise<any[]> {
      this.isLoading = true
      try {
        const response = await AiAPI.generateDecisionOptions(inquiryId, constraints)
        this.decisionOptions[inquiryId] = response.data.options
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
     * @param inquiryId
     * @param count
     */
    async generateCreativeIdeas(inquiryId: number, count: number = 5): Promise<string[]> {
      this.isLoading = true
      try {
        const response = await AiAPI.generateCreativeIdeas(inquiryId, count)
        this.creativeIdeas[inquiryId] = response.data.ideas
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

    /**
     * Generate options from document
     * @param inquiryId
     * @param documentPath
     * @param optionType
     * @param options
     */
    async generateDocumentOptions(
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

    // ============ DEBATE ASSISTANT ============

    /**
     * Generate arguments
     * @param inquiryId
     * @param position
     * @param count
     */
    async generateArguments(inquiryId: number, position: string, count: number = 3): Promise<any[]> {
      this.isLoading = true
      try {
        const response = await AiAPI.generateArguments(inquiryId, position, count)
        this.arguments[inquiryId] = response.data.arguments
        return response.data.arguments
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return []
        }
        Logger.error('Error generating arguments', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Generate counter-arguments
     * @param inquiryId
     * @param argumentsList
     */
    async generateCounterArguments(inquiryId: number, argumentsList: any[]): Promise<any[]> {
      this.isLoading = true
      try {
        const response = await AiAPI.generateCounterArguments(inquiryId, argumentsList)
        this.counterArguments[inquiryId] = response.data.counter_arguments
        return response.data.counter_arguments
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return []
        }
        Logger.error('Error generating counter-arguments', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Analyze debate
     * @param inquiryId
     */
    async analyzeDebate(inquiryId: number): Promise<any> {
      this.isLoading = true
      try {
        const response = await AiAPI.analyzeDebate(inquiryId)
        this.debateAnalysis[inquiryId] = response.data.analysis
        return response.data.analysis
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return null
        }
        Logger.error('Error analyzing debate', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Generate debate summary
     * @param inquiryId
     */
    async generateDebateSummary(inquiryId: number): Promise<string> {
      this.isLoading = true
      try {
        const response = await AiAPI.generateDebateSummary(inquiryId)
        this.debateSummaries[inquiryId] = response.data.summary
        return response.data.summary
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return ''
        }
        Logger.error('Error generating debate summary', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Suggest compromise
     * @param inquiryId
     * @param positions
     */
    async suggestCompromise(inquiryId: number, positions: any[]): Promise<any> {
      this.isLoading = true
      try {
        const response = await AiAPI.suggestCompromise(inquiryId, positions)
        this.compromises[inquiryId] = response.data.compromise
        return response.data.compromise
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return null
        }
        Logger.error('Error suggesting compromise', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Generate rebuttal
     * @param inquiryId
     * @param point
     * @param context
     */
    async generateRebuttal(inquiryId: number, point: string, context: Record<string, any> = {}): Promise<string> {
      this.isLoading = true
      try {
        const response = await AiAPI.generateRebuttal(inquiryId, point, context)
        this.rebuttals[inquiryId] = response.data.rebuttal
        return response.data.rebuttal
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return ''
        }
        Logger.error('Error generating rebuttal', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // ============ TRANSLATOR ============

    /**
     * Translate content
     * @param inquiryId
     * @param targetLanguage
     * @param sourceLanguage
     * @param commentId
     */
    async translateContent(
      inquiryId: number,
      targetLanguage: string,
      sourceLanguage: string = 'auto',
      commentId?: number
    ): Promise<string> {
      this.isLoading = true
      try {
        const response = await AiAPI.translateContent(inquiryId, targetLanguage, sourceLanguage, commentId)
        if (!this.translations[inquiryId]) {
          this.translations[inquiryId] = {}
        }
        this.translations[inquiryId][targetLanguage] = response.data.translated
        return response.data.translated
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return ''
        }
        Logger.error('Error translating content', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Translate to multiple languages
     * @param inquiryId
     * @param targetLanguages
     */
    async translateMultilingual(inquiryId: number, targetLanguages: string[]): Promise<Record<string, string>> {
      this.isLoading = true
      try {
        const response = await AiAPI.translateMultilingual(inquiryId, targetLanguages)
        if (!this.translations[inquiryId]) {
          this.translations[inquiryId] = {}
        }
        this.translations[inquiryId] = { ...this.translations[inquiryId], ...response.data.translations }
        return response.data.translations
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return {}
        }
        Logger.error('Error translating multilingual', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Translate all comments
     * @param inquiryId
     * @param targetLanguage
     */
    async translateAllComments(inquiryId: number, targetLanguage: string): Promise<Record<number, string>> {
      this.isLoading = true
      try {
        const response = await AiAPI.translateAllComments(inquiryId, targetLanguage)
        return response.data.translations
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return {}
        }
        Logger.error('Error translating all comments', { error, inquiryId })
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Clear AI data for inquiry
     * @param inquiryId
     */
    clearAiData(inquiryId: number): void {
      delete this.summaries[inquiryId]
      delete this.keyPoints[inquiryId]
      delete this.tldrs[inquiryId]
      delete this.sentiments[inquiryId]
      delete this.topics[inquiryId]
      delete this.urgencies[inquiryId]
      delete this.actions[inquiryId]
      delete this.pollOptions[inquiryId]
      delete this.decisionOptions[inquiryId]
      delete this.creativeIdeas[inquiryId]
      delete this.documentOptions[inquiryId]
      delete this.arguments[inquiryId]
      delete this.counterArguments[inquiryId]
      delete this.debateAnalysis[inquiryId]
      delete this.debateSummaries[inquiryId]
      delete this.compromises[inquiryId]
      delete this.rebuttals[inquiryId]
      delete this.translations[inquiryId]
    },

    /**
     * Reset all AI data
     */
    reset(): void {
      this.isLoading = false
      this.summaries = {}
      this.keyPoints = {}
      this.tldrs = {}
      this.sentiments = {}
      this.topics = {}
      this.urgencies = {}
      this.actions = {}
      this.pollOptions = {}
      this.decisionOptions = {}
      this.creativeIdeas = {}
      this.documentOptions = {}
      this.arguments = {}
      this.counterArguments = {}
      this.debateAnalysis = {}
      this.debateSummaries = {}
      this.compromises = {}
      this.rebuttals = {}
      this.translations = {}
    }
  }
})
