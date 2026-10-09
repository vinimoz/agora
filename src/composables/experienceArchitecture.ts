// ============================================================
// Experience Architecture Definitions
// ============================================================

import type {
  ExperienceKey,
  ExperienceArchitecture,
} from '../Types/experience.types'


export const EXPERIENCE_ARCHITECTURES: Record<ExperienceKey, ExperienceArchitecture> = {


 // ============================================================
// HOME – Hero + main column + right rail (news / services / agenda)
// ============================================================
home: {
  experience: 'home',
  defaultDisplay: 'banner',
  layout: { type: 'grid', columns: 3, rows: 5, responsive: true },
  context: { type: 'group', selection: 'all' },
  features: ['hero', 'news', 'services', 'explore', 'agenda', 'promo'],
  sections: [
    { key: 'hero',    label: '',                      order: 1, zones: ['hero'] },
    { key: 'news',    label: 'City news',             order: 2, zones: ['news'] },
    { key: 'current', label: 'Right now',             order: 3, zones: ['current_moment'] },
    { key: 'spaces',  label: 'My spaces',             order: 4, zones: ['my_spaces'] },
    { key: 'services',label: 'Your online services',  order: 5, zones: ['services'] },
    { key: 'explore', label: 'Explore / Participate', order: 6, zones: ['explore'] },
    { key: 'agenda',  label: 'Agenda',                order: 7, zones: ['agenda'] },
    { key: 'promo',   label: '',                      order: 8, zones: ['promo'] },
  ],
  displayArchitecture: {
    // ---- HERO banner (main column, spans 2) ----
    hero: {
      content: 'hero',
      scope: { source: 'all' },
      display: { type: 'banner' },
      position: { row: 1, column: 1, columnSpan: 2 },
    },

    // ---- Right rail: NEWS ----
    news: {
      content: 'news',
      scope: { source: 'municipal', pagination: { limit: 5, offset: 0 } },
      display: { type: 'news_list' },
      position: { row: 1, column: 3, rowSpan: 2 },
    },

    // ---- Right now ----
          current_moment: {
      content: 'inquiries',
      scope: {
        source: 'all',
        sort: { field: 'status.lastInteraction', direction: 'desc' },
        pagination: { limit: 4, offset: 0 },
      },
       display: {
        type: 'current_moment',
        options: { compact: true, showStats: true, showSupport: true },
      },
      position: { row: 2, column: 1, columnSpan: 2 },
      interaction: { action: 'open', target: 'page' },
    },

    // ---- My spaces ----
    my_spaces: {
      content: 'inquiry_groups',
      scope: {
        source: 'all',
        sort: { field: 'title', direction: 'asc' },
      },
      display: {
        type: 'my_spaces',
        options: { showCover: true, showStats: true, showDescription: false },
      },
      position: { row: 3, column: 1, columnSpan: 2 },
      interaction: { action: 'navigate', target: 'page' },
    },

    // ---- Right rail: SERVICES ----
    services: {
      content: 'services',
      scope: { source: 'all' },
      display: {
        type: 'quick_actions',
        options: { family: 'service', limit: 4 },
      },
      position: { row: 3, column: 3 },
    },

    // ---- Explore / Participate (main column) ----
    explore: {
      content: 'explore',
      scope: { source: 'all' },
      display: { type: 'category_grid' },
      position: { row: 4, column: 1, columnSpan: 2 },
    },

    // ---- Right rail: AGENDA (compact timeline) ----
    agenda: {
      content: 'inquiries',
      scope: {
        source: 'all',
        filter: {
          type: ['meeting', 'gathering', 'conference', 'assembly'],
        },
        sort: { field: 'created', direction: 'asc' },
      },
      display: {
        type: 'timeline',
        options: { compact: true, hideControls: true, limit: 4 },
      },
      position: { row: 4, column: 3, rowSpan: 2 },
      interaction: { action: 'open', target: 'page' },
    },

    // ---- Promo card (main column, bottom) ----
    promo: {
      content: 'promo',
      scope: { source: 'featured' },
      display: { type: 'promo_card' },
      position: { row: 5, column: 1, columnSpan: 2 },
    },
  },
},
	
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
        interaction: { action: 'open', target: 'panel' },
      },
      activity: {
        content: 'activity',
        scope: { source: 'children' },
        filter: { type: ['news', 'announcement'] },
        display: { type: 'feed' },
        position: { row: 1, column: 2 },
        interaction: { action: 'open', target: 'panel' },
      },
      groups: {
        content: 'inquiry_groups',
        scope: { source: 'children' },
        filter: { status: 'active' },
        display: { type: 'cards' },
        position: { row: 2, column: 1 },
        interaction: { action: 'navigate', target: 'page' },
      },
      inquiries: {
        content: 'inquiries',
        scope: {
          source: 'children',
          sort: { field: 'created', direction: 'desc' },
          pagination: { limit: 10, offset: 0 },
        },
        filter: { status: ['published', 'active'] },
        display: { type: 'cards' },
        position: { row: 2, column: 2 },
        interaction: { action: 'open', target: 'panel' },
      },
    },
  },

  // ============================================================
  // SOCIAL – single full-width feed
  // ============================================================
  social: {
    experience: 'social',
    layout: { type: 'full', responsive: true },
    context: { type: 'group', selection: 'current' },
    features: ['feed', 'activity', 'comments', 'support'],
    displayArchitecture: {
              main: {
        content: 'inquiries',
        scope: {
          source: 'children',
          sort: { field: 'status.lastInteraction', direction: 'desc' },
          pagination: { limit: 20, offset: 0 },
        },
	 filter: {
          status: ['published', 'active'],
          inquiry_type: ['discussion', 'poll', 'question'],
        },
        display: { type: 'feed', pagination: 'infinite' },
        position: { row: 1, column: 1 },
      },
    },
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
        filter: {
          status: ['published', 'active'],
          inquiry_type: ['proposal', 'offer', 'service', 'project'],
        },
        display: { type: 'tool', tool: 'search' },
        position: { row: 1, column: 1, columnSpan: 3 },
      },
      main_grid: {
        content: 'inquiries',
        scope: {
          source: 'children',
          sort: { field: 'rating', direction: 'desc' },
          pagination: { limit: 20, offset: 0 },
        },
        filter: {
          status: ['published', 'featured'],
          inquiry_type: ['proposal', 'offer', 'service'],
        },
        display: { type: 'cards', options: { cardsPerRow: 2 } },
        position: { row: 2, column: 1, columnSpan: 2 },
        interaction: { action: 'open', target: 'modal' },
      },
      filters: {
        content: 'statistics',
        scope: { source: 'group' },
        filter: { status: ['published', 'active'] },
        display: { type: 'widget' },
        position: { row: 2, column: 3 },
        interaction: { action: 'open', target: 'panel' },
      },
      map_view: {
        content: 'inquiries',
        scope: { source: 'children' },
        filter: {
          status: ['published', 'active'],
          inquiry_type: ['proposal', 'offer', 'service'],
        },
        display: { type: 'list' },
        position: { row: 3, column: 1, columnSpan: 3 },
        interaction: { action: 'open', target: 'panel' },
      },
    },
  },

  // ============================================================
  // KANBAN – Board view for inquiries
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
          sort: { field: 'priority', direction: 'desc' },
        },
        filter: {
          status: ['active', 'in_progress', 'review'],
          selection: { category: 'board' },
        },
        display: { type: 'kanban' },   // fixed: was 'kaban'
        position: { row: 2, column: 2, rowSpan: 2, columnSpan: 2 },
        interaction: { action: 'select', target: 'same_view' },
      },
    },
  },

  // ============================================================
  // TIMELINE – Chronological history
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
          sort: { field: 'created', direction: 'asc' },
        },
        filter: {
          status: ['published', 'completed', 'archived'],
          // Relative offset in ms – consumer resolves to absolute time.
          // Avoids module-load-time freeze via Date.now().
          date: { from: -365 * 24 * 60 * 60 * 1000 },
          selection: { category: 'history' },
        },
        display: { type: 'timeline' },
        position: { row: 2, column: 2, rowSpan: 2, columnSpan: 2 },
        interaction: { action: 'open', target: 'panel' },
      },
      stats: {
        content: 'statistics',
        scope: { source: 'group' },
        filter: {
          status: ['published', 'completed'],
          selection: { category: 'timeline_stats' },
        },
        display: { type: 'widget' },
        position: { row: 2, column: 1 },
        interaction: { action: 'open', target: 'panel' },
      },
      activity_summary: {
        content: 'activity',
        scope: { source: 'children' },
        filter: {
          type: ['milestone', 'event'],
          selection: { category: 'timeline' },
        },
        display: { type: 'list' },
        position: { row: 2, column: 2 },
        interaction: { action: 'open', target: 'panel' },
      },
    },
  },

  // ============================================================
  // WIKI – Document-style reading with structure
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
          sort: { field: 'order', direction: 'asc' },
        },
        filter: {
          status: ['published', 'active'],
          selection: { category: 'navigation' },
        },
        display: { type: 'tree' },
        position: { row: 1, column: 1, rowSpan: 2, columnSpan: 2 },
        interaction: { action: 'navigate', target: 'same_view' },
      },
      content: {
        content: 'inquiries',
        scope: { source: 'selected_inquiry' },
        filter: {
          status: ['published', 'active'],
          selection: { category: 'content' },
        },
        display: { type: 'book', options: { showMeta: true } },
        position: { row: 1, column: 2 },
        interaction: { action: 'open', target: 'page' },
      },
      structure: {
        content: 'options',
        scope: { source: 'selected_inquiry' },
        filter: {
          family: 'structure',
          status: ['published', 'active'],
          selection: { category: 'structure' },
        },
        display: { type: 'tool', tool: 'structure' },
        position: { row: 2, column: 2 },
        interaction: { action: 'open', target: 'panel' },
      },
    },
  },

  // ============================================================
  // DECISION_ROOM – Full decision-making interface
  // ============================================================
  decision_room: {
    experience: 'decision_room',
    layout: { type: 'grid', columns: 2, rows: 2, responsive: true },
    context: { type: 'group', selection: 'selected' },
    features: ['debate', 'resources', 'comments', 'decision-making'],
    displayArchitecture: {
      inquiry_detail: {
        content: 'inquiries',
        scope: { source: 'selected_inquiry' },
        filter: {
          status: ['active', 'debate', 'voting'],
          selection: { category: 'decision' },
        },
        display: {
          type: 'book',
          options: { showMeta: true, showStats: true },
        },
        position: { row: 1, column: 1 },
        interaction: { action: 'open', target: 'page' },
      },
      resources: {
        content: 'resources',
        scope: { source: 'selected_inquiry' },
        filter: {
          type: ['document', 'link', 'reference'],
          selection: { category: 'resources' },
        },
        display: { type: 'list', options: { showMeta: true } },
        position: { row: 1, column: 2 },
        interaction: { action: 'open', target: 'panel' },
      },
      debate: {
        content: 'options',
        scope: {
          source: 'selected_inquiry',
          sort: { field: 'supportCount', direction: 'desc' },
        },
        filter: {
          family: 'debate',
          status: ['active', 'proposed', 'under_discussion'],
          selection: { category: 'debate' },
        },
        display: { type: 'tool', tool: 'debate' },
        position: { row: 2, column: 1 },
        interaction: { action: 'open', target: 'panel' },
      },
      discussion: {
        content: 'messages',   // 'comments' is not in ContentValue; use 'messages'
        scope: {
          source: 'selected_inquiry',
          sort: { field: 'created', direction: 'desc' },
          pagination: { limit: 50, offset: 0 },
        },
        filter: {
          type: ['comment', 'argument', 'objection'],
          status: 'published',
          selection: { category: 'discussion' },
        },
        display: { type: 'feed', options: { showMeta: true } },
        position: { row: 2, column: 2 },
        interaction: { action: 'comment', target: 'panel' },
      },
    },
  },

  // ============================================================
  // NAVIGATION – Simple navigation
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
          sort: { field: 'order', direction: 'asc' },
        },
        filter: { status: ['active', 'published'] },
        display: { type: 'navigation' },
        position: { row: 1, column: 1 },
        interaction: { action: 'navigate', target: 'page' },
      },
    },
  },

  // ============================================================
  // CLASSIC – Plain list view (required by ExperienceKey)
  // ============================================================
  classic: {
    experience: 'classic',
    defaultDisplay: 'list',
    layout: { type: 'full', responsive: true },
    context: { type: 'group', selection: 'current' },
    features: ['list'],
    displayArchitecture: {
      main: {
        content: 'inquiries',
        scope: {
          source: 'children',
          sort: { field: 'created', direction: 'desc' },
          pagination: { limit: 20, offset: 0 },
        },
        filter: { status: ['published', 'active'] },
        display: { type: 'list' },
        position: { row: 1, column: 1 },
        interaction: { action: 'open', target: 'panel' },
      },
    },
  },
}

/**
 * Get the architecture for a given experience
 * @param experience - The experience key
 */
export function getExperienceArchitecture(experience: ExperienceKey): ExperienceArchitecture {
  return EXPERIENCE_ARCHITECTURES[experience] || EXPERIENCE_ARCHITECTURES.dashboard
}
