import InquiryItem     from '../InquiryGroup/InquiryItem.vue'
import InquirySummary  from '../InquiryGroup/InquirySummary.vue'
import InquiryDetail   from '../InquiryGroup/InquiryDetail.vue'
import InquiryFeed     from '../InquiryGroup/InquiryFeed.vue'
import InquiryTree     from '../InquiryGroup/InquiryTree.vue'
import InquiryTimeline from '../InquiryGroup/InquiryTimeline.vue'
import InquiryKanban   from '../InquiryGroup/InquiryKanban.vue'
import BookDisplay     from '../InquiryGroup/BookDisplay.vue'

export type DisplayMode =
  | 'cards' | 'grid'          // → InquiryItem, displayMode='grid'
  | 'list'                    // → InquiryItem, displayMode='list'
  | 'summary' | 'compact'     // → InquirySummary
  | 'full' | 'book' | 'rich_html'  // → InquiryDetail
  | 'feed' | 'tree' | 'timeline' | 'kanban' | 'book_view'

const MAP: Record<string, { component: any; itemMode?: string }> = {
  cards:     { component: InquiryItem, itemMode: 'grid' },
  grid:      { component: InquiryItem, itemMode: 'grid' },
  list:      { component: InquiryItem, itemMode: 'list' },
  summary:   { component: InquirySummary },
  compact:   { component: InquirySummary, /* → displayMode='compact' */ },
  full:      { component: InquiryDetail, itemMode: 'full' },
  rich_html: { component: InquiryDetail, itemMode: 'rich' },
  book:      { component: InquiryDetail, itemMode: 'book' },
  feed:      { component: InquiryFeed },
  tree:      { component: InquiryTree },
  timeline:  { component: InquiryTimeline },
  kanban:    { component: InquiryKanban },
  book_view: { component: BookDisplay },
}

export function resolveDisplayComponent(mode: string) {
  return MAP[mode] ?? MAP.cards
}
