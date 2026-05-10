/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export interface CreateEngineRequest {
  engine: string  
  type: string       
  title: string         
  description: string          
  inquiry_group_id: number
  inquiry_id: number
  status: 'draft' | 'active' | 'closed'
  config: Record<string, unknown>
  target_type: 'inquiry' | 'option'
  target_ids: number[]
  metadata?: {
    phase?: Phase
    started_at?: number
    ended_at?: number
    quorum?: number
    participation_threshold?: number
  }
}

export interface UpdateEngineConfigRequest {
  config: Record<string, unknown>
}

export interface UpdateEngineStatusRequest {
  status: 'draft' | 'active' | 'closed'
}

export interface UpdateEngineTargetsRequest {
  target_ids: number[]
}

export interface EngineResponse {
  engine: SupportEngine
}

export interface EnginesResponse {
  engines: SupportEngine[]
}
