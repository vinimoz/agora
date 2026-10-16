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
  { key: 'hero',          label: '',                       order: 1, zones: ['hero'] },
  { key: 'news',          label: 'City news',              order: 2, zones: ['news'] },
  { key: 'current',       label: 'Right now',              order: 3, zones: ['current_moment'] },
  { key: 'spaces',        label: 'My spaces',              order: 4, zones: ['my_spaces'] },
  { key: 'services',      label: 'Your online services',   order: 5, zones: ['services_tiles'] }, 
  { key: 'explore',       label: 'Explore / Participate',  order: 6, zones: ['explore'] },
  { key: 'agenda',        label: 'Agenda',                 order: 7, zones: ['agenda'] },
  { key: 'promo',         label: '',                       order: 8, zones: ['promo'] },
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
      position: { row: 1, column: 3, rowSpan: 1 },
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
	    content: 'group_types',
	    scope: {
		    source: 'all',
		    sort: { field: 'title', direction: 'asc' },
	    },
	    display: {
		    type: 'my_spaces',
		    options: { families: [], variant:'chips',showCover: true, showStats: true, showDescription: false },
	    },
	    position: { row: 3, column: 1, columnSpan: 2 },
	    interaction: { action: 'navigate', target: 'page' },
    },

    // ---- Right rail: SERVICES ----
    services_tiles: {
	    content: 'group_types',
	    scope: { source: 'all', family: 'service' },
	    display: { type: 'tiles', options: { limit: 4 } },
	    position: { row: 2, column: 3 },
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
	    position: { row: 3, column: 3, rowSpan: 3 },

	    interaction: { action: 'open', target: 'dialog' },
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
// DASHBOARD — Monitoring view. Numbers → flow → items.
// 3 cols × 2 rows
// ┌────────┬────────┬────────┐
// │  stats │ activity (2r)   │ recent │
// ├────────┤        ├────────┤
// │ trending│       │ featured│
// └────────┴────────┴────────┘
// ============================================================
dashboard: {
  experience: 'dashboard',
  defaultDisplay: 'widget',
  layout: { type: 'grid', columns: 3, rows: 2, responsive: true },
  context: { type: 'group', selection: 'current' },
  features: ['statistics', 'activity', 'trending', 'featured'],
  sections: [
    { key: 'stats',    label: 'Statistics',        order: 1, zones: ['statistics'] },
    { key: 'activity', label: 'Recent activity',   order: 2, zones: ['activity'] },
    { key: 'recent',   label: 'Recent inquiries',  order: 3, zones: ['recent_inquiries'] },
    { key: 'trending', label: 'Trending',          order: 4, zones: ['trending_inquiries'] },
    { key: 'featured', label: 'Featured',          order: 5, zones: ['featured_inquiries'] },
  ],
  displayArchitecture: {
    statistics: {
      content: 'statistics',
      scope: { source: 'group' },
      filter: { status: ['active', 'published'] },
      display: { type: 'widget', options: { showStats: true, compact: true } },
      position: { row: 1, column: 1 },
      interaction: { action: 'open', target: 'panel' },
    },
    activity: {
      content: 'activity',
      scope: { source: 'children' },
      filter: { status: ['published', 'active'] },
      display: { type: 'feed', options: { compact: true } },
      position: { row: 1, column: 2, rowSpan: 2 },
      interaction: { action: 'open', target: 'panel' },
    },
    recent_inquiries: {
      content: 'inquiries',
      scope: {
        source: 'children',
        sort: { field: 'status.created', direction: 'desc' },
        pagination: { limit: 5, offset: 0 },
      },
      filter: { status: ['published', 'active'] },
      display: { type: 'list', options: { dense: true, showMeta: true } },
      position: { row: 1, column: 3 },
      interaction: { action: 'open', target: 'panel' },
    },
    trending_inquiries: {
      content: 'inquiries',
      scope: {
        source: 'children',
        sort: { field: 'status.countSupports', direction: 'desc' },
        pagination: { limit: 5, offset: 0 },
      },
      filter: { status: ['published', 'active'] },
      display: { type: 'list', options: { dense: true, showSupport: true } },
      position: { row: 2, column: 1 },
      interaction: { action: 'open', target: 'panel' },
    },
    featured_inquiries: {
      content: 'inquiries',
      scope: {
        source: 'featured',
        pagination: { limit: 4, offset: 0 },
      },
      display: { type: 'cards', options: { compact: true, showSupport: true } },
      position: { row: 2, column: 3 },
      interaction: { action: 'open', target: 'panel' },
    },
  },
},

// ============================================================
// SOCIAL — Conversation stream + context rail.
// 3 cols × 3 rows
// ┌─────────────┬─────────────┬──────────┐
// │              │             │ trending │
// │   feed       │             ├──────────┤
// │  (col-span 2,│             │ featured │
// │   row-span 3)│             ├──────────┤
// │              │             │ activity │
// └─────────────┴─────────────┴──────────┘
// ============================================================
social: {
  experience: 'social',
  defaultDisplay: 'feed',
  layout: { type: 'grid', columns: 3, rows: 3, responsive: true },
  context: { type: 'group', selection: 'current' },
  features: ['feed', 'trending', 'featured', 'activity'],
  sections: [
    { key: 'feed',     label: 'Feed',     order: 1, zones: ['feed'] },
    { key: 'trending', label: 'Trending', order: 2, zones: ['trending'] },
    { key: 'featured', label: 'Featured', order: 3, zones: ['featured'] },
    { key: 'activity', label: 'Activity', order: 4, zones: ['activity'] },
  ],
  displayArchitecture: {
    feed: {
      content: 'inquiries',
      scope: {
        source: 'children',
        sort: { field: 'status.lastInteraction', direction: 'desc' },
        pagination: { limit: 20, offset: 0 },
      },
      filter: {
        status: ['published', 'active'],
      //  inquiry_type: ['discussion', 'poll', 'question', 'debate'],
      },
      display: { type: 'feed', pagination: 'infinite', options: { interactive: true } },
      position: { row: 1, column: 1, columnSpan: 2, rowSpan: 3 },
      interaction: { action: 'open', target: 'panel' },
    },
    trending: {
      content: 'inquiries',
      scope: {
        source: 'children',
        sort: { field: 'status.countSupports', direction: 'desc' },
        pagination: { limit: 6, offset: 0 },
      },
      filter: { status: ['published', 'active'] },
      display: { type: 'list', options: { compact: true, dense: true, showSupport: true } },
      position: { row: 1, column: 3 },
      interaction: { action: 'open', target: 'panel' },
    },
    featured: {
      content: 'inquiries',
      scope: {
        source: 'featured',
        pagination: { limit: 4, offset: 0 },
      },
      display: { type: 'cards', options: { compact: true, cardsPerRow: 1 } },
      position: { row: 2, column: 3 },
      interaction: { action: 'open', target: 'panel' },
    },
    activity: {
      content: 'activity',
      scope: { source: 'children' },
      filter: { status: ['published', 'active'] },
      display: { type: 'feed', options: { compact: true } },
      position: { row: 3, column: 3 },
      interaction: { action: 'open', target: 'panel' },
    },
  },
},

// ============================================================
// MARKETPLACE — Search → filter → browse → feature.
// 3 cols × 3 rows
// ┌───────────────────────────────────────┐
// │            search_bar (span 3)        │
// ├──────────┬────────────────────────────┤
// │          │     results_grid (span 2)  │
// │  filters ├────────────────────────────┤
// │ (2 rows) │     featured (span 2)      │
// └──────────┴────────────────────────────┘
// ============================================================
marketplace: {
  experience: 'marketplace',
  defaultDisplay: 'cards',
  layout: { type: 'grid', columns: 3, rows: 3, responsive: true },
  context: { type: 'group', selection: 'all' },
  features: ['search', 'filter', 'compare', 'featured'],
  sections: [
    { key: 'search',   label: '',            order: 1, zones: ['search_bar'] },
    { key: 'filters',  label: 'Refine',      order: 2, zones: ['filters'] },
    { key: 'results',  label: 'Results',     order: 3, zones: ['results_grid'] },
    { key: 'featured', label: 'Featured',    order: 4, zones: ['featured'] },
  ],
  displayArchitecture: {
    search_bar: {
      content: 'inquiries',
      scope: {
        source: 'children',
        sort: { field: 'status.lastInteraction', direction: 'desc' },
      },
      filter: {
        status: ['published', 'active'],
      //  inquiry_type: ['proposal', 'offer', 'service', 'project', 'classified_ad', 'job_offer'],
      },
      display: { type: 'tool', tool: 'search' },
      position: { row: 1, column: 1, columnSpan: 3 },
    },
    filters: {
      content: 'statistics',
      scope: { source: 'group' },
      filter: { status: ['published', 'active'] },
      display: { type: 'widget', options: { compact: true, showStats: true } },
      position: { row: 2, column: 1, rowSpan: 2 },
      interaction: { action: 'open', target: 'panel' },
    },
    results_grid: {
      content: 'inquiries',
      scope: {
        source: 'children',
        sort: { field: 'status.countSupports', direction: 'desc' },
        pagination: { limit: 12, offset: 0 },
      },
      filter: {
        status: ['published', 'featured'],
      //  inquiry_type: ['proposal', 'offer', 'service', 'project'],
      },
      display: { type: 'cards', options: { cardsPerRow: 3, showStats: true, showSupport: true } },
      position: { row: 2, column: 2, columnSpan: 2 },
      interaction: { action: 'open', target: 'page' },
    },
    featured: {
      content: 'inquiries',
      scope: {
        source: 'featured',
        pagination: { limit: 4, offset: 0 },
      },
      display: { type: 'cards', options: { horizontal: true, cardsPerRow: 2, compact: true } },
      position: { row: 3, column: 2, columnSpan: 2 },
      interaction: { action: 'open', target: 'page' },
    },
  },
},

// ============================================================
// KANBAN — Wide board + status rail.
// 3 cols × 2 rows
// ┌───────────────────┬────────┐
// │                   │  stats │
// │   board (span 2,  ├────────┤
// │   span 2 rows)    │activity│
// └───────────────────┴────────┘
// ============================================================
kanban: {
  experience: 'kanban',
  defaultDisplay: 'tool',
  defaultTool: 'kanban',
  layout: { type: 'grid', columns: 3, rows: 2, responsive: true },
  context: { type: 'group', selection: 'current' },
  features: ['drag-drop', 'status-tracking', 'progress'],
  sections: [
    { key: 'board',    label: 'Board',           order: 1, zones: ['board'] },
    { key: 'stats',    label: 'Progress',        order: 2, zones: ['statistics'] },
    { key: 'activity', label: 'Recent activity', order: 3, zones: ['activity'] },
  ],
  displayArchitecture: {
    board: {
      content: 'inquiries',
      scope: {
        source: 'children',
        sort: { field: 'status.lastInteraction', direction: 'desc' },
      },
      filter: { status: ['active', 'in_progress', 'review'] },
      display: { type: 'tool', tool: 'kanban', options: { interactive: true } },
      position: { row: 1, column: 1, columnSpan: 2, rowSpan: 2 },
      interaction: { action: 'select', target: 'same_view' },
    },
    statistics: {
      content: 'statistics',
      scope: { source: 'group' },
      filter: { status: ['active', 'in_progress', 'review'] },
      display: { type: 'widget', options: { compact: true } },
      position: { row: 1, column: 3 },
      interaction: { action: 'open', target: 'panel' },
    },
    activity: {
      content: 'activity',
      scope: { source: 'children' },
      // filter: { type: ['status_change', 'milestone', 'workflow_transition'] },
      display: { type: 'feed', options: { compact: true, dense: true } },
      position: { row: 2, column: 3 },
      interaction: { action: 'open', target: 'panel' },
    },
  },
},

// ============================================================
// TIMELINE — Chronological spine + stats & activity rail.
// 3 cols × 2 rows
// ┌───────────────────┬────────┐
// │   timeline_view   │  stats │
// │   (span 2,        ├────────┤
// │   span 2 rows)    │activity│
// └───────────────────┴────────┘
// ============================================================
timeline: {
  experience: 'timeline',
  defaultDisplay: 'timeline',
  layout: { type: 'grid', columns: 3, rows: 2, responsive: true },
  context: { type: 'group', selection: 'current' },
  features: ['chronological', 'events', 'milestones'],
  sections: [
    { key: 'timeline', label: 'History',         order: 1, zones: ['timeline_view'] },
    { key: 'stats',    label: 'At a glance',     order: 2, zones: ['statistics'] },
    { key: 'activity', label: 'Milestones',      order: 3, zones: ['activity'] },
  ],
  displayArchitecture: {
    timeline_view: {
      content: 'inquiries',
      scope: {
        source: 'children',
        sort: { field: 'status.created', direction: 'asc' },
      },
      filter: { status: ['published', 'active', 'completed', 'archived'] },
      display: { type: 'timeline', options: { interactive: true } },
      position: { row: 1, column: 1, columnSpan: 2, rowSpan: 2 },
      interaction: { action: 'open', target: 'panel' },
    },
    statistics: {
      content: 'statistics',
      scope: { source: 'group' },
      filter: { status: ['published', 'completed', 'active'] },
      display: { type: 'widget', options: { compact: true } },
      position: { row: 1, column: 3 },
      interaction: { action: 'open', target: 'panel' },
    },
    activity: {
      content: 'activity',
      scope: { source: 'children' },
      // filter: { type: ['milestone', 'event', 'status_change'] },
      display: { type: 'feed', options: { compact: true, dense: true } },
      position: { row: 2, column: 3 },
      interaction: { action: 'open', target: 'panel' },
    },
  },
},

// ============================================================
// WIKI — Tree sidebar + book + structure tool.
// 3 cols × 2 rows
// ┌──────────┬────────────────────────────┐
// │          │         content (span 2)   │
// │   tree   ├────────────────────────────┤
// │ (2 rows) │         structure (span 2) │
// └──────────┴────────────────────────────┘
// ============================================================
wiki: {
  experience: 'wiki',
  defaultDisplay: 'book',
  layout: { type: 'grid', columns: 3, rows: 2, responsive: true },
  context: { type: 'group', selection: 'selected' },
  features: ['tree-navigation', 'structure', 'book-reading'],
  sections: [
    { key: 'nav',       label: 'Contents',  order: 1, zones: ['navigation'] },
    { key: 'content',   label: 'Document',  order: 2, zones: ['content'] },
    { key: 'structure', label: 'Structure', order: 3, zones: ['structure'] },
  ],
  displayArchitecture: {
    navigation: {
      content: 'inquiry_groups',
      scope: {
        source: 'children',
        sort: { field: 'order', direction: 'asc' },
      },
      filter: { status: ['published', 'active'] },
      display: { type: 'tree', options: { dense: true } },
      position: { row: 1, column: 1, rowSpan: 2 },
      interaction: { action: 'navigate', target: 'same_view' },
    },
    content: {
      content: 'inquiries',
      scope: { source: 'selected_group' },
      filter: { status: ['published', 'active'] },
      display: { type: 'book', options: { showMeta: true } },
      position: { row: 1, column: 2, columnSpan: 2 },
      interaction: { action: 'open', target: 'page' },
    },
    structure: {
      content: 'options',
      scope: { source: 'selected_inquiry' },
      filter: { family: 'structure', status: ['published', 'active'] },
      display: { type: 'tool', tool: 'structure' },
      position: { row: 2, column: 2, columnSpan: 2 },
      interaction: { action: 'open', target: 'panel' },
    },
  },
},

// ============================================================
// DECISION_ROOM — Reading → debate + evidence → discussion.
// 2 cols × 3 rows
// ┌───────────────────────────────────────┐
// │       inquiry_detail (span 2)         │
// ├───────────────────┬───────────────────┤
// │      debate       │     resources     │
// ├───────────────────┴───────────────────┤
// │       discussion (span 2)             │
// └───────────────────────────────────────┘
// ============================================================
decision_room: {
  experience: 'decision_room',
  defaultDisplay: 'book',
  layout: { type: 'grid', columns: 2, rows: 3, responsive: true },
  context: { type: 'group', selection: 'selected' },
  features: ['debate', 'resources', 'comments', 'decision-making'],
  sections: [
    { key: 'detail',     label: '',             order: 1, zones: ['inquiry_detail'] },
    { key: 'debate',     label: 'Debate',       order: 2, zones: ['debate'] },
    { key: 'resources',  label: 'Resources',    order: 3, zones: ['resources'] },
    { key: 'discussion', label: 'Discussion',   order: 4, zones: ['discussion'] },
  ],
  displayArchitecture: {
    inquiry_detail: {
      content: 'inquiries',
      scope: { source: 'selected_inquiry' },
      filter: { status: ['active', 'debate', 'voting'] },
      display: { type: 'book', options: { showMeta: true, showStats: true } },
      position: { row: 1, column: 1, columnSpan: 2 },
      interaction: { action: 'open', target: 'page' },
    },
    debate: {
      content: 'options',
      scope: {
        source: 'selected_inquiry',
        sort: { field: 'supportCount', direction: 'desc' },
      },
      filter: { family: 'debate', status: ['active', 'proposed', 'under_discussion'] },
      display: { type: 'tool', tool: 'debate' },
      position: { row: 2, column: 1 },
      interaction: { action: 'open', target: 'panel' },
    },
    resources: {
      content: 'resources',
      scope: { source: 'selected_inquiry' },
      filter: { status: ['published', 'active'] },
      display: { type: 'list', options: { showMeta: true } },
      position: { row: 2, column: 2 },
      interaction: { action: 'open', target: 'panel' },
    },
    discussion: {
      content: 'messages',
      scope: {
        source: 'selected_inquiry',
        sort: { field: 'created', direction: 'desc' },
        pagination: { limit: 50, offset: 0 },
      },
      filter: { status: 'published' },
      display: { type: 'feed', options: { showMeta: true } },
      position: { row: 3, column: 1, columnSpan: 2 },
      interaction: { action: 'comment', target: 'panel' },
    },
  },
},

// ============================================================
// NAVIGATION — Simple navigation. Groups ARE the point.
// ============================================================
navigation: {
  experience: 'navigation',
  defaultDisplay: 'navigation',
  layout: { type: 'full', responsive: true },
  context: { type: 'group', selection: 'current' },
  features: ['navigation'],
  displayArchitecture: {
    groups: {
      content: 'inquiry_groups',
      scope: { source: 'children', sort: { field: 'order', direction: 'asc' } },
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
