// ============================================================
// ============================================================

import type { ExperienceKey } from './useExperience'
import type { ExperienceArchitecture } from '../Types/experience.types'

/**
 * Complete architecture definitions for each experience
 * @see La séparation est maintenant claire.txt - Section 8-11
 */
export const EXPERIENCE_ARCHITECTURES: Record<ExperienceKey, ExperienceArchitecture> = {
  
  // ============================================================
  // DASHBOARD - Overview with statistics and activity
  // ============================================================
  dashboard: {
    experience: 'dashboard',
    layout: { type: 'grid', columns: 2, rows: 2, responsive: true },
    context: { type: 'group', selection: 'current' },
    features: ['statistics', 'activity', 'navigation'],
    display_architecture: {
      top_left: {
        content: 'statistics',
        scope: { 
          source: 'group',
          filter: { 
            status: ['active', 'published'],
            selection: { category: 'overview' }
          }
        },
        display: { type: 'widget' }
      },
      top_right: {
        content: 'activity',
        scope: { 
          source: 'children',
          filter: { 
            type: ['news', 'announcement'],
            selection: { category: 'latest' }
          }
        },
        display: { type: 'feed' }
      },
      bottom_left: {
        content: 'inquiry_groups',
        scope: { 
          source: 'children',
          filter: { 
            status: 'active',
            selection: { category: 'active' }
          }
        },
        display: { type: 'cards' }
      },
      bottom_right: {
        content: 'inquiries',
        scope: { 
          source: 'children',
          filter: {
            status: ['published', 'active'],
            type: ['proposal', 'question'],
            selection: { category: 'recent' }
          },
          sort: { field: 'created', direction: 'desc' },
          pagination: { limit: 10, offset: 0 }
        },
        display: { type: 'cards' }
      }
    }
  },

  // ============================================================
  // SOCIAL - Feed-based social interaction
  // ============================================================
  social: {
    experience: 'social',
    layout: { type: 'full', responsive: true },
    context: { type: 'group', selection: 'current' },
    features: ['feed', 'activity', 'comments', 'support'],
    display_architecture: {
      main: {
        content: 'inquiries',
        scope: { 
          source: 'children',
          filter: {
            status: ['published', 'active'],
            type: ['discussion', 'poll', 'question'],
            selection: { category: 'social' }
          },
          sort: { field: 'lastInteraction', direction: 'desc' },
          pagination: { limit: 20, offset: 0 }
        },
        display: { type: 'feed', pagination: 'infinite' }
      },
      sidebar: {
        content: 'activity',
        scope: { 
          source: 'group',
          filter: { 
            type: ['comment', 'support', 'vote'],
            selection: { category: 'engagement' }
          }
        },
        display: { type: 'list' }
      }
    }
  },

  // ============================================================
  // MARKETPLACE - Browse and discover like Airbnb
  // ============================================================
  marketplace: {
    experience: 'marketplace',
    layout: { type: 'grid', columns: 3, responsive: true },
    context: { type: 'group', selection: 'all' },
    features: ['search', 'filter', 'compare', 'cards'],
    display_architecture: {
      // Search & Filter Bar
      search: {
        content: 'inquiries',
        scope: { 
          source: 'children',
          filter: {
            status: ['published', 'active'],
            type: ['proposal', 'offer', 'service', 'project'],
            selection: { 
              category: 'marketplace',
              // User can filter by location, category, etc.
            }
          },
          sort: { field: 'promoted', direction: 'desc' }
        },
        display: { type: 'tool', tool: 'search' }
      },
      // Main Grid - Cards display like Airbnb
      main: {
        content: 'inquiries',
        scope: { 
          source: 'children',
          filter: {
            status: ['published', 'featured'],
            type: ['proposal', 'offer', 'service'],
            selection: {
              // Selection filters for marketplace
              location: '{user_selected_location}',
              category: '{user_selected_category}',
              tags: ['{user_selected_tags}']
            }
          },
          sort: { field: 'rating', direction: 'desc' },
          pagination: { limit: 20, offset: 0 }
        },
        display: { type: 'cards' }
      },
      // Sidebar with filters
      sidebar: {
        content: 'statistics',
        scope: { 
          source: 'group',
          filter: {
            status: ['published', 'active'],
            selection: { category: 'marketplace_stats' }
          }
        },
        display: { type: 'widget' }
      },
      // Map view for location-based browsing
      map: {
        content: 'inquiries',
        scope: { 
          source: 'children',
          filter: {
            status: ['published', 'active'],
            type: ['proposal', 'offer', 'service'],
            selection: {
              location: '{user_selected_location}',
              category: 'geolocated'
            }
          }
        },
        display: { type: 'map' }
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
    display_architecture: {
      main: {
        content: 'inquiries',
        scope: { 
          source: 'children',
          filter: {
            status: ['active', 'in_progress', 'review'],
            selection: { category: 'board' }
          },
          sort: { field: 'priority', direction: 'desc' }
        },
        display: { 
          type: 'tool',
          tool: 'kanban'
        }
      }
    }
  },

  // ============================================================
  // TIMELINE - Chronological history
  // ============================================================
  timeline: {
    experience: 'timeline',
    layout: { type: 'full', responsive: true },
    context: { type: 'group', selection: 'current' },
    features: ['chronological', 'events', 'milestones'],
    display_architecture: {
      main: {
        content: 'inquiries',
        scope: { 
          source: 'children',
          filter: {
            status: ['published', 'completed', 'archived'],
            date: {
              from: Date.now() - (365 * 24 * 60 * 60 * 1000) // Last year
            },
            selection: { category: 'history' }
          },
          sort: { field: 'created', direction: 'asc' }
        },
        display: { 
          type: 'tool',
          tool: 'timeline'
        }
      },
      sidebar: {
        content: 'statistics',
        scope: { 
          source: 'group',
          filter: { 
            status: ['published', 'completed'],
            selection: { category: 'timeline_stats' }
          }
        },
        display: { type: 'widget' }
      }
    }
  },

  // ============================================================
  // WIKI - Document-style reading with structure
  // ============================================================
  wiki: {
    experience: 'wiki',
    layout: { type: 'sidebar', responsive: true },
    context: { type: 'group', selection: 'selected' },
    features: ['tree-navigation', 'structure', 'book-reading'],
    display_architecture: {
      sidebar: {
        content: 'inquiry_groups',
        scope: { 
          source: 'children',
          filter: { 
            status: ['published', 'active'],
            selection: { category: 'navigation' }
          },
          sort: { field: 'order', direction: 'asc' }
        },
        display: { type: 'tree' }
      },
      main: {
        content: 'inquiry',
        scope: { 
          source: 'selected',
          filter: { 
            status: ['published', 'active'],
            selection: { category: 'content' }
          }
        },
        display: { type: 'full' }
      },
      bottom: {
        content: 'options',
        scope: { 
          source: 'selected_inquiry',
          family: 'structure',
          filter: { 
            status: ['published', 'active'],
            selection: { category: 'structure' }
          }
        },
        display: { 
          type: 'tool',
          tool: 'structure'
        }
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
    display_architecture: {
      top_left: {
        content: 'inquiry',
        scope: { 
          source: 'selected',
          filter: { 
            status: ['active', 'debate', 'voting'],
            selection: { category: 'decision' }
          }
        },
        display: { type: 'full' }
      },
      top_right: {
        content: 'resources',
        scope: { 
          source: 'selected_inquiry',
          filter: { 
            type: ['document', 'link', 'reference'],
            selection: { category: 'resources' }
          }
        },
        display: { type: 'list' }
      },
      bottom_left: {
        content: 'options',
        scope: { 
          source: 'selected_inquiry',
          family: 'debate',
          filter: {
            status: ['active', 'proposed', 'under_discussion'],
            selection: { category: 'debate' }
          },
          sort: { field: 'supportCount', direction: 'desc' }
        },
        display: { 
          type: 'tool',
          tool: 'debate'
        }
      },
      bottom_right: {
        content: 'messages',
        scope: { 
          source: 'selected_inquiry',
          filter: {
            type: ['comment', 'argument', 'objection'],
            status: 'published',
            selection: { category: 'discussion' }
          },
          sort: { field: 'created', direction: 'desc' },
          pagination: { limit: 50, offset: 0 }
        },
        display: { type: 'feed' }
      }
    }
  }
}

/**
 * Get the architecture for a given experience
 * @param experience
 */
export function getExperienceArchitecture(experience: ExperienceKey): ExperienceArchitecture {
  return EXPERIENCE_ARCHITECTURES[experience] || EXPERIENCE_ARCHITECTURES.dashboard
}
