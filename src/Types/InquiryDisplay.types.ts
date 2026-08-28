import type { Inquiry } from './index'

export interface InquiryDisplayProps {
  /** The inquiry data */
  inquiry: Inquiry
  /** List of inquiries (for list mode) */
  inquiries?: Inquiry[]
  
  // Display feature toggles
  showIcon?: boolean
  showCover?: boolean
  showMeta?: boolean
  showStats?: boolean
  showAuthor?: boolean
  showDescription?: boolean
  showExpiry?: boolean
  showType?: boolean
  showStatus?: boolean
  showComments?: boolean
  showSupport?: boolean
  showParticipants?: boolean
  
  // Layout options
  horizontal?: boolean
  dense?: boolean
  compact?: boolean
  interactive?: boolean
  isActive?: boolean
  
  // Open behavior
  openMode?: 'page' | 'modal' | 'popup' | 'none'
  
  // Display mode
  displayMode?: 'cards' | 'list' | 'full' | 'feed' | 'tree' | 'book' | 'summary' | 'horizontal'
}
