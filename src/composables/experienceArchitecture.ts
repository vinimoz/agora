// ============================================================
// Experience Architecture Definitions – using GridPosition
// ============================================================

import type { ExperienceKey } from './useExperience'
import type { ExperienceArchitecture } from '../Types/experience.types'

export const EXPERIENCE_ARCHITECTURES: Record<ExperienceKey, ExperienceArchitecture> = {

  // ============================================================
  // DASHBOARD – 2×2 grid
  // ============================================================
  dashboard: {
    experience: 'dashboard',
    layout: { type: 'grid', columns: 2, rows: 2, responsive: true },
    context: { type: 'group', selection: 'current' },
    features: ['statistics', 'activity', 'navigation'],
    displayArchitecture: {
      stats: {
        content: 'statistics',
        scope: { source: 'group' },
        filter: { status: ['active', 'published'] },
        display: { type: 'widget' },
        position: { row: 1, column: 1 },
        interaction: { action: 'open', target: 'panel' }
      },
      activity: {
        content: 'activity',
        scope: { source: 'children' },
        filter: { type: ['news', 'announcement'] },
        display: { type: 'feed' },
        position: { row: 1, column: 2 },
        interaction: { action: 'open', target: 'panel' }
      },
      groups: {
        content: 'inquiry_groups',
        scope: { source: 'children' },
        filter: { status: 'active' },
        display: { type: 'cards' },
        position: { row: 2, column: 1 },
        interaction: { action: 'navigate', target: 'page' }
      },
      inquiries: {
        content: 'inquiries',
        scope: { source: 'children', sort: { field: 'created', direction: 'desc' }, pagination: { limit: 10, offset: 0 } },
        filter: { status: ['published', 'active'] },
        display: { type: 'cards' },
        position: { row: 2, column: 2 },
        interaction: { action: 'open', target: 'panel' }
      }
    }
  },

  // ============================================================
  // SOCIAL – single full‑width feed
  // ============================================================
  social: {
    experience: 'social',
    layout: { type: 'full', responsive: true },
    context: { type: 'group', selection: 'current' },
    features: ['feed', 'activity', 'comments', 'support'],
    displayArchitecture: {
      main: {
        content: 'inquiries',
        scope: { source: 'children', sort: { field: 'lastInteraction', direction: 'desc' }, pagination: { limit: 20, offset: 0 } },
        filter: { status: ['published', 'active'], inquiry_type: ['discussion', 'poll', 'question'] },
        display: { type: 'feed', pagination: 'infinite' },
        position: { row: 1, column: 1 }
      }
    }
  },

  // ============================================================
  // MARKETPLACE – 3×3 grid with search, cards, filters, map
  // ============================================================
  marketplace: {
    experience: 'marketplace',
    layout: { type: 'grid', columns: 3, rows: 3, responsive: true },
    context: { type: 'group', selection: 'all' },
    features: ['search', 'filter', 'compare', 'cards'],
    displayArchitecture: {
      search_bar: {
        content: 'inquiries',
        scope: { source: 'children', sort: { field: 'promoted', direction: 'desc' } },
        filter: { status: ['published', 'active'], inquiry_type: ['proposal', 'offer', 'service', 'project'] },
        display: { type: 'tool', tool: 'search' },
        position: { row: 1, column: 1, columnSpan: 3 }
      },
      main_grid: {
        content: 'inquiries',
        scope: { source: 'children', sort: { field: 'rating', direction: 'desc' }, pagination: { limit: 20, offset: 0 } },
        filter: { status: ['published', 'featured'], inquiry_type: ['proposal', 'offer', 'service'] },
        display: { type: 'cards', options: { cardsPerRow: 2 } },
        position: { row: 2, column: 1, columnSpan: 2 },
        interaction: { action: 'open', target: 'modal' }
      },
      filters: {
        content: 'statistics',
        scope: { source: 'group' },
        filter: { status: ['published', 'active'] },
        display: { type: 'widget' },
        position: { row: 2, column: 3 },
        interaction: { action: 'open', target: 'panel' }
      },
      map_view: {
        content: 'inquiries',
        scope: { source: 'children' },
        filter: { status: ['published', 'active'], inquiry_type: ['proposal', 'offer', 'service'] },
        display: { type: 'list' },
        position: { row: 3, column: 1, columnSpan: 3 },
        interaction: { action: 'open', target: 'panel' }
      }
    }
  },

  // ============================================================
  // KANBAN - Board view for inquiries
  // ============================================================
  kanban: {
    experience: 'kanban',
    layout: { type: 'full', responsive: true },
    context: { type: 'group', selection: 'current' },
    features: ['drag-drop', 'status-tracking', 'progress'],
    displayArchitecture: {
      board: {
        content: 'inquiries',
        scope: { 
          source: 'children',
          sort: { field: 'priority', direction: 'desc' }
        },
        filter: {
          status: ['active', 'in_progress', 'review'],
          selection: { category: 'board' }
        },
        display: { type: 'tool', tool: 'kanban' },
        position: { row: 1, column: 1, rowSpan: 1 },
        interaction: { action: 'select', target: 'same_view' }
      }
    }
  },

  // ============================================================
  // TIMELINE - Chronological history
  // ============================================================
  timeline: {
    experience: 'timeline',
    layout: { type: 'grid', columns: 2, rows: 2, responsive: true },
    context: { type: 'group', selection: 'current' },
    features: ['chronological', 'events', 'milestones'],
    displayArchitecture: {
      timeline_view: {
        content: 'inquiries',
        scope: { 
          source: 'children',
          sort: { field: 'created', direction: 'asc' }
        },
        filter: {
          status: ['published', 'completed', 'archived'],
          date: {
            from: Date.now() - (365 * 24 * 60 * 60 * 1000) // Last year
          },
          selection: { category: 'history' }
        },
        display: { type: 'tool', tool: 'timeline' },
        position: { row: 1, column: 1, columnSpan: 2 },
        interaction: { action: 'open', target: 'panel' }
      },
      stats: {
        content: 'statistics',
        scope: { source: 'group' },
        filter: { 
          status: ['published', 'completed'],
          selection: { category: 'timeline_stats' }
        },
        display: { type: 'widget' },
        position: { row: 2, column: 1 },
        interaction: { action: 'open', target: 'panel' }
      },
      activity_summary: {
        content: 'activity',
        scope: { source: 'children' },
        filter: {
          type: ['milestone', 'event'],
          selection: { category: 'timeline' }
        },
        display: { type: 'list' },
        position: { row: 2, column: 2 },
        interaction: { action: 'open', target: 'panel' }
      }
    }
  },

  // ============================================================
  // WIKI - Document-style reading with structure
  // ============================================================
  wiki: {
    experience: 'wiki',
    layout: { type: 'grid', columns: 2, rows: 2, responsive: true },
    context: { type: 'group', selection: 'selected' },
    features: ['tree-navigation', 'structure', 'book-reading'],
    displayArchitecture: {
      navigation: {
        content: 'inquiry_groups',
        scope: { 
          source: 'children',
          sort: { field: 'order', direction: 'asc' }
        },
        filter: { 
          status: ['published', 'active'],
          selection: { category: 'navigation' }
        },
        display: { type: 'tree' },
        position: { row: 1, column: 1, rowSpan: 2, columnSpan: 2 },
        interaction: { action: 'navigate', target: 'same_view' }
      },
      content: {
        content: 'inquiries',  // was 'inquiry' – now uses plural
        scope: { source: 'selected_inquiry' },
        filter: { 
          status: ['published', 'active'],
          selection: { category: 'content' }
        },
        display: { 
          type: 'book',
          options: { showMeta: true }
        },
        position: { row: 1, column: 2 },
        interaction: { action: 'open', target: 'page' }
      },
      structure: {
        content: 'options',
        scope: { source: 'selected_inquiry' },
        filter: { 
          family: 'structure',
          status: ['published', 'active'],
          selection: { category: 'structure' }
        },
        display: { type: 'tool', tool: 'structure' },
        position: { row: 2, column: 2 },
        interaction: { action: 'open', target: 'panel' }
      }
    }
  },

  // ============================================================
  // DECISION_ROOM - Full decision-making interface
  // ============================================================
  decision_room: {
    experience: 'decision_room',
    layout: { type: 'grid', columns: 2, rows: 2, responsive: true },
    context: { type: 'group', selection: 'selected' },
    features: ['debate', 'resources', 'comments', 'decision-making'],
    displayArchitecture: {
      inquiry_detail: {
        content: 'inquiries',  // was 'inquiry'
        scope: { source: 'selected_inquiry' },
        filter: { 
          status: ['active', 'debate', 'voting'],
          selection: { category: 'decision' }
        },
        display: { 
          type: 'book',  // was 'full' – replaced with 'book'
          options: { showMeta: true, showStats: true }
        },
        position: { row: 1, column: 1 },
        interaction: { action: 'open', target: 'page' }
      },
      resources: {
        content: 'resources',
        scope: { source: 'selected_inquiry' },
        filter: { 
          type: ['document', 'link', 'reference'],
          selection: { category: 'resources' }
        },
        display: { 
          type: 'list',
          options: { showMeta: true }
        },
        position: { row: 1, column: 2 },
        interaction: { action: 'open', target: 'panel' }
      },
      debate: {
        content: 'options',
        scope: { 
          source: 'selected_inquiry',
          sort: { field: 'supportCount', direction: 'desc' }
        },
        filter: {
          family: 'debate',
          status: ['active', 'proposed', 'under_discussion'],
          selection: { category: 'debate' }
        },
        display: { type: 'tool', tool: 'debate' },
        position: { row: 2, column: 1 },
        interaction: { action: 'open', target: 'panel' }
      },
      discussion: {
        content: 'comments',
        scope: { 
          source: 'selected_inquiry',
          sort: { field: 'created', direction: 'desc' },
          pagination: { limit: 50, offset: 0 }
        },
        filter: {
          type: ['comment', 'argument', 'objection'],
          status: 'published',
          selection: { category: 'discussion' }
        },
        display: { 
          type: 'feed',
          options: { showMeta: true }
        },
        position: { row: 2, column: 2 },
        interaction: { action: 'comment', target: 'panel' }
      }
    }
  },

  // ============================================================
  // NAVIGATION - Simple navigation
  // ============================================================
  navigation: {
    experience: 'navigation',
    layout: { type: 'full', responsive: true },
    context: { type: 'group', selection: 'current' },
    features: ['navigation'],
    displayArchitecture: {
      groups: {
        content: 'inquiry_groups',
        scope: { 
          source: 'children',
          sort: { field: 'order', direction: 'asc' }
        },
        filter: {
          status: ['active', 'published']
        },
        display: { type: 'navigation' },
        position: { row: 1, column: 1 },
	interaction: { action: 'navigate', target: 'page' }
      }
    }
  },

  classic: {
	  key: 'classic',
	  label: 'Classic View',
	  icon: 'Home',
	  description: 'Standard group layout',
	  verb: 'View',
	  question: 'Default view',
	  defaultTools: [],
	  defaultDisplay: 'list' as DisplayType,
	  allowedDisplays: ['list', 'cards'] as DisplayType[],
	  allowedTools: [],
	  layout: 'full',
	  showHeader: true,
	  showBreadcrumb: true,
	  showStats: true,
	  supportedGroupTypes: [],
  }
}
/**
 * Get the architecture for a given experience
 * @param experience - The experience key
 */
export function getExperienceArchitecture(experience: ExperienceKey): ExperienceArchitecture {
	return EXPERIENCE_ARCHITECTURES[experience] || EXPERIENCE_ARCHITECTURES.dashboard
}
