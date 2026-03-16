/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { User } from '../Types/index.ts'

export type InquiryGroupType = {
  id: number | string
  group_type: string 
  label: string
  family: string
  icon?: string
  description?: string
  allowed_inquiry_types?: string | string[]
  allowed_response?: string | string[]
  ui: string[]
  features: string[]
  rules: string[]
  actions: string[]
  is_root: boolean
  sort_order: number
  fields?: string | string[]
}



export type InquiryGroup = {
  id: number
  parentId: number | null       
  created: number               
  deleted: number                
  description: string | null   
  owner: User                
  type: string              
  groupStatus: string     
  title: string          
  titleExt: string | null  
  ownedGroup: string | null    
  order: number             
  expire: number | null   
  metadata: string | null    
  coverId: number | null     
  protected: boolean    
  allowEdit: boolean    
  inquiryIds: number[]         
  childs: number[]           
  slug: string          
  miscFields: Record<string, {key:string , value:string}> 
}
