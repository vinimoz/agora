/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'

// ============ TYPES ============

export interface EnhanceContentResponse {
  enhanced: string
}

export interface OptionsResponse {
  options: string[]
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

export interface DecisionOptionsResponse {
  options: Array<{
    id: string
    title: string
    pros: string[]
    cons: string[]
  }>
}

export interface SummaryResponse {
  summary: string
}

export interface SentimentResponse {
  sentiment: {
    sentiment: 'positive' | 'neutral' | 'negative'
    score: number
    confidence: number
  }
}

// ============ AI API ============

const aiApi = {
  /**
   * Enhance or generate content with AI
   * Used for general AI assistance in editor
   */
  enhanceContent(
    inquiryId: number,
    prompt: string
  ): Promise<AxiosResponse<EnhanceContentResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/enhance`,
      data: { prompt },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.enhanceContent.name].handleRequestCancellation().token,
    })
  },

  /**
   * Generate options from inquiry title and description
   * Primary method for creating options from discussion
   */
  generateOptionsFromInquiry(
    inquiryId: number,
    count: number = 4
  ): Promise<AxiosResponse<OptionsResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/generate-options`,
      data: { count },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.generateOptionsFromInquiry.name].handleRequestCancellation().token,
    })
  },

  /**
   * Generate options from uploaded document
   * For future use
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

  /**
   * Generate decision options with pros/cons
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
  ): Promise<AxiosResponse<{ ideas: string[] }>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/creative-ideas`,
      data: { count },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.generateCreativeIdeas.name].handleRequestCancellation().token,
    })
  },

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
   * Analyze sentiment
   */
  analyzeSentiment(inquiryId: number): Promise<AxiosResponse<SentimentResponse>> {
    return httpInstance.request({
      method: 'POST',
      url: `ai/inquiry/${inquiryId}/sentiment`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.analyzeSentiment.name].handleRequestCancellation().token,
    })
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(aiApi)

export default aiApi
