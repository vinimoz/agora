/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'

// ============ TYPES ============

export interface SentimentAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative'
  score: number
  confidence: number
}

export interface SummaryResponse {
  summary: string
}

export interface KeyPointsResponse {
  key_points: string[]
}

export interface TldrResponse {
  tldr: string
}

export interface TopicClassificationResponse {
  topic: string
}

export interface UrgencyResponse {
  urgency: 'low' | 'medium' | 'high'
}

export interface ActionItemsResponse {
  actions: string[]
}

export interface DuplicateCheckResponse {
  is_duplicate: boolean
}

export interface SimilarContentResponse {
  similar: Array<{
    content: string
    similarity_score: number
  }>
}

export interface OptionsResponse {
  options: string[]
}

export interface DecisionOptionsResponse {
  options: Array<{
    id: string
    title: string
    pros: string[]
    cons: string[]
  }>
}

export interface CreativeIdeasResponse {
  ideas: string[]
}

export interface DocumentOptionsResponse {
  options: Array<{
    id: string
    type: string
    title: string
    content: string
    summary: string
    metadata: Record<string, any>
  }>
}

export interface ArgumentsResponse {
  arguments: Array<{
    point: string
    evidence: string[]
  }>
}

export interface CounterArgumentsResponse {
  counter_arguments: Array<{
    original: string
    counter: string
  }>
}

export interface DebateAnalysisResponse {
  analysis: {
    structure: string
    main_points: string[]
    conflicts: string[]
    consensus: string[]
  }
}

export interface DebateSummaryResponse {
  summary: string
}

export interface CompromiseResponse {
  compromise: {
    position: string
    reasoning: string
    benefits: string[]
  }
}

export interface RebuttalResponse {
  rebuttal: string
}

export interface TranslationResponse {
  translated: string
  detected_language?: string
}

export interface MultilingualTranslationResponse {
  translations: Record<string, string>
  original_language: string
}

export interface TranslateAllResponse {
  translations: Record<number, string>
}

// ============ AI API ============

const aiApi = {
  // ============ SUMMARIZER ============

  /**
   * Summarize inquiry discussion
   */
  summarizeInquiry(
    inquiryId: number,
    format: 'concise' | 'detailed' | 'bullet_points' = 'concise'
  ): Promise<AxiosResponse<SummaryResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/summarize`,
      data: { format },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.summarizeInquiry.name].handleRequestCancellation().token,
    })
  },

  /**
   * Get key points from inquiry
   */
  getKeyPoints(inquiryId: number): Promise<AxiosResponse<KeyPointsResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/key-points`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.getKeyPoints.name].handleRequestCancellation().token,
    })
  },

  /**
   * Get TL;DR for inquiry
   */
  getTldr(inquiryId: number, maxLength: number = 100): Promise<AxiosResponse<TldrResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/tldr`,
      data: { maxLength },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.getTldr.name].handleRequestCancellation().token,
    })
  },

  // ============ CLASSIFIER ============

  /**
   * Analyze sentiment of inquiry or specific comment
   */
  analyzeSentiment(
    inquiryId: number,
    commentId?: number
  ): Promise<AxiosResponse<{ sentiment: SentimentAnalysis }>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/sentiment`,
      data: { commentId },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.analyzeSentiment.name].handleRequestCancellation().token,
    })
  },

  /**
   * Classify topic of inquiry
   */
  classifyTopic(
    inquiryId: number,
    categories: string[] = []
  ): Promise<AxiosResponse<TopicClassificationResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/topic`,
      data: { categories },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.classifyTopic.name].handleRequestCancellation().token,
    })
  },

  /**
   * Detect urgency of inquiry
   */
  detectUrgency(inquiryId: number): Promise<AxiosResponse<UrgencyResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/urgency`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.detectUrgency.name].handleRequestCancellation().token,
    })
  },

  /**
   * Extract action items from inquiry
   */
  extractActions(inquiryId: number): Promise<AxiosResponse<ActionItemsResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/actions`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.extractActions.name].handleRequestCancellation().token,
    })
  },

  // ============ DUPLICATE DETECTOR ============

  /**
   * Check if content is duplicate
   */
  checkDuplicate(
    inquiryId: number,
    content: string
  ): Promise<AxiosResponse<DuplicateCheckResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/duplicate-check`,
      data: { content },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.checkDuplicate.name].handleRequestCancellation().token,
    })
  },

  /**
   * Find similar content
   */
  findSimilar(
    inquiryId: number,
    content: string,
    limit: number = 10
  ): Promise<AxiosResponse<SimilarContentResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/similar`,
      data: { content, limit },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.findSimilar.name].handleRequestCancellation().token,
    })
  },

  // ============ OPTION GENERATOR ============

  /**
   * Generate options
   */
  generateOptions(
    inquiryId: number,
    count: number = 4,
    optionId?: number
  ): Promise<AxiosResponse<OptionsResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/options`,
      data: { count, optionId },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.generateOptions.name].handleRequestCancellation().token,
    })
  },

  /**
   * Generate decision options
   */
  generateDecisionOptions(
    inquiryId: number,
    constraints: Record<string, any> = {}
  ): Promise<AxiosResponse<DecisionOptionsResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/decision-options`,
      data: { constraints },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.generateDecisionOptions.name].handleRequestCancellation().token,
    })
  },

  /**
   * Generate creative ideas
   */
  generateCreativeIdeas(
    inquiryId: number,
    count: number = 5
  ): Promise<AxiosResponse<CreativeIdeasResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/creative-ideas`,
      data: { count },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.generateCreativeIdeas.name].handleRequestCancellation().token,
    })
  },

  /**
   * Generate options from document
   */
  generateDocumentOptions(
    inquiryId: number,
    documentPath: string,
    optionType: 'chapter' | 'section' | 'subsection' | 'paragraph' | 'custom' = 'section',
    options: Record<string, any> = {}
  ): Promise<AxiosResponse<DocumentOptionsResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/document-options`,
      data: { documentPath, optionType, options },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.generateDocumentOptions.name].handleRequestCancellation().token,
    })
  },

  // ============ DEBATE ASSISTANT ============

  /**
   * Generate arguments for a position
   */
  generateArguments(
    inquiryId: number,
    position: string,
    count: number = 3
  ): Promise<AxiosResponse<ArgumentsResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/arguments`,
      data: { position, count },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.generateArguments.name].handleRequestCancellation().token,
    })
  },

  /**
   * Generate counter-arguments
   * 
   * @param inquiryId - The inquiry ID
   * @param args - Array of arguments to counter (renamed from 'arguments' to avoid reserved keyword)
   */
  generateCounterArguments(
    inquiryId: number,
    args: Array<{ point: string; evidence?: string[] }>
  ): Promise<AxiosResponse<CounterArgumentsResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/counter-arguments`,
      data: { arguments: args }, // Send as 'arguments' in the request body
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.generateCounterArguments.name].handleRequestCancellation().token,
    })
  },

  /**
   * Analyze debate
   */
  analyzeDebate(inquiryId: number): Promise<AxiosResponse<DebateAnalysisResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/debate-analysis`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.analyzeDebate.name].handleRequestCancellation().token,
    })
  },

  /**
   * Generate debate summary
   */
  generateDebateSummary(inquiryId: number): Promise<AxiosResponse<DebateSummaryResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/debate-summary`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.generateDebateSummary.name].handleRequestCancellation().token,
    })
  },

  /**
   * Suggest compromise
   */
  suggestCompromise(
    inquiryId: number,
    positions: Array<{ title: string; arguments: string[] }>
  ): Promise<AxiosResponse<CompromiseResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/compromise`,
      data: { positions },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.suggestCompromise.name].handleRequestCancellation().token,
    })
  },

  /**
   * Generate rebuttal
   */
  generateRebuttal(
    inquiryId: number,
    point: string,
    context: Record<string, any> = {}
  ): Promise<AxiosResponse<RebuttalResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/rebuttal`,
      data: { point, context },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.generateRebuttal.name].handleRequestCancellation().token,
    })
  },

  // ============ TRANSLATOR ============

  /**
   * Translate content
   */
  translateContent(
    inquiryId: number,
    targetLanguage: string,
    sourceLanguage: string = 'auto',
    commentId?: number
  ): Promise<AxiosResponse<TranslationResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/translate`,
      data: { targetLanguage, sourceLanguage, commentId },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.translateContent.name].handleRequestCancellation().token,
    })
  },

  /**
   * Translate to multiple languages
   */
  translateMultilingual(
    inquiryId: number,
    targetLanguages: string[]
  ): Promise<AxiosResponse<MultilingualTranslationResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/translate-multilingual`,
      data: { targetLanguages },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.translateMultilingual.name].handleRequestCancellation().token,
    })
  },

  /**
   * Translate all comments
   */
  translateAllComments(
    inquiryId: number,
    targetLanguage: string
  ): Promise<AxiosResponse<TranslateAllResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/translate-all`,
      data: { targetLanguage },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.translateAllComments.name].handleRequestCancellation().token,
    })
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(aiApi)

export default aiApi
