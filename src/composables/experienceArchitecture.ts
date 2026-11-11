/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// ============================================================
// Experience Architecture Definitions
// ============================================================

import type {
  ExperienceKey,
  ExperienceArchitecture,
} from "../Types/experience.types";

export const EXPERIENCE_ARCHITECTURES: Record<
  ExperienceKey,
  ExperienceArchitecture
> = {
  home: {
    experience: "home",
    layout: { type: "grid", columns: 3, rows: 5, responsive: true },
    context: { type: "group", selection: "all" },
    features: ["hero", "news", "services", "explore", "agenda", "promo"],
    sections: [
      { key: "hero", label: "", order: 1, zones: ["hero"] },
      { key: "news", label: "News", order: 2, zones: ["news"] },
      {
        key: "current",
        label: "Right now",
        order: 3,
        zones: ["current_moment"],
      },
      { key: "spaces", label: "My spaces", order: 4, zones: ["my_spaces"] },
      {
        key: "services",
        label: "Services",
        order: 5,
        zones: ["services_tiles"],
      },
      { key: "explore", label: "Explore", order: 6, zones: ["explore"] },
      { key: "agenda", label: "Agenda", order: 7, zones: ["agenda"] },
      { key: "promo", label: "", order: 8, zones: ["promo"] },
    ],
    displayArchitecture: {
      hero: {
        content: "hero",
        scope: { source: "all" },
        display: { type: "banner" },
        position: { row: 1, column: 1, columnSpan: 2 },
      },
      news: {
        content: "news",
        scope: {
          source: "all",
          pagination: { limit: 5, offset: 0 },
          filter: { type: "news" },
        },
        display: { type: "news_list" },
        position: { row: 1, column: 3, rowSpan: 1 },
        interaction: { action: "open", target: "panel" },
      },
      current_moment: {
        content: "inquiries",
        scope: {
          source: "all",
          sort: { field: "status.lastInteraction", direction: "desc" },
          pagination: { limit: 4, offset: 0 },
        },
        display: {
          type: "current_moment",
          options: { compact: true, showStats: true, showSupport: true },
        },
        position: { row: 2, column: 1, columnSpan: 2 },
        interaction: { action: "open", target: "modal" },
      },
      my_spaces: {
        content: "group_types",
        scope: { source: "all", sort: { field: "title", direction: "asc" } },
        display: {
          type: "my_spaces",
          options: {
            families: [],
            variant: "chips",
            showStats: true,
            showDescription: false,
          },
        },
        position: { row: 3, column: 1, columnSpan: 2 },
        interaction: { action: "open", target: "modal" },
      },
      services_tiles: {
        content: "group_types",
        scope: { source: "all", groupFamily: "service" },
        display: { type: "tiles", options: { limit: 4 } },
        position: { row: 2, column: 3 },
      },
      explore: {
        content: "explore",
        scope: { source: "all" },
        display: { type: "category_grid" },
        position: { row: 4, column: 1, columnSpan: 2 },
      },
      agenda: {
        content: "inquiries",
        scope: {
          source: "all",
          filter: { type: ["meeting", "gathering", "conference", "assembly"] },
          sort: { field: "created", direction: "asc" },
        },
        display: {
          type: "timeline",
          options: { compact: true, hideControls: true, limit: 4 },
        },
        position: { row: 3, column: 3, rowSpan: 3 },
        interaction: { action: "open", target: "dialog" },
      },
      promo: {
        content: "promo",
        scope: { source: "all" },
        display: { type: "promo_card" },
        position: { row: 5, column: 1, columnSpan: 2 },
      },
    },
  },

  dashboard: {
    experience: "dashboard",
    layout: { type: "grid", columns: 3, rows: 3, responsive: true },
    context: { type: "group", selection: "current" },
    features: [
      "statistics",
      "activity",
      "trending",
      "featured",
      "current_inquiry",
    ],
    sections: [
      { key: "stats", label: "Statistics", order: 1, zones: ["statistics"] },
      {
        key: "recent",
        label: "Recent inquiries",
        order: 2,
        zones: ["recent_inquiries"],
      },
      {
        key: "activity",
        label: "Recent activity",
        order: 3,
        zones: ["activity"],
      },
      {
        key: "current",
        label: "Inquiry",
        order: 4,
        zones: ["current_inquiry"],
      },
      {
        key: "trending",
        label: "Trending",
        order: 5,
        zones: ["trending_inquiries"],
      },
      {
        key: "featured",
        label: "Featured",
        order: 6,
        zones: ["featured_inquiries"],
      },
    ],
    displayArchitecture: {
      group_tree: {
        content: "inquiry_groups",
        scope: { source: "children" },
        display: { type: "tree" },
        position: { row: 1, column: 1, rowSpan: 3 },
        interaction: { action: "select", target: "same_view" },
      },

      group_inquiries: {
        content: "inquiries",
        scope: {
          source: "selected_group",
          sort: { field: "status.lastInteraction", direction: "desc" },
        },
        display: { type: "list", options: { compact: true } },
        position: { row: 1, column: 2, columnSpan: 2 },
        interaction: { action: "open", target: "page" },
      },
      statistics: {
        content: "statistics",
        scope: { source: "group" },
        display: {
          type: "widget",
          options: { showStats: true, compact: true },
        },
        position: { row: 1, column: 1 },
        interaction: { action: "open", target: "panel" },
      },
      recent_inquiries: {
        content: "inquiries",
        scope: {
          source: "children",
          sort: { field: "status.lastInteraction", direction: "desc" },
          pagination: { limit: 8, offset: 0 },
        },
        display: { type: "list", options: { dense: true, showMeta: true } },
        position: { row: 1, column: 2, columnSpan: 2 },
        // Phase-1 select → refreshes `current_inquiry`; phase-2 is a no-op.
        interaction: { action: "select", target: "same_view" },
      },
      activity: {
        content: "activity",
        scope: { source: "children" },
        display: { type: "feed", options: { compact: true } },
        position: { row: 2, column: 1 },
        interaction: { action: "open", target: "panel" },
      },
      current_inquiry: {
        content: "inquiries",
        scope: { source: "selected_inquiry" },
        display: {
          type: "book",
          options: { showMeta: true, showStats: true, compact: true },
        },
        position: { row: 2, column: 2, columnSpan: 2 },
        interaction: { action: "open", target: "dialog" },
      },
      trending_inquiries: {
        content: "inquiries",
        scope: {
          source: "children",
          sort: { field: "status.countSupports", direction: "desc" },
          pagination: { limit: 5, offset: 0 },
        },
        display: { type: "list", options: { dense: true, showSupport: true } },
        position: { row: 3, column: 1 },
        interaction: { action: "select", target: "same_view" },
      },
      featured_inquiries: {
        content: "inquiries",
        scope: { source: "featured", pagination: { limit: 4, offset: 0 } },
        display: {
          type: "cards",
          options: { compact: true, showSupport: true },
        },
        position: { row: 3, column: 2, columnSpan: 2 },
        interaction: { action: "select", target: "same_view" },
      },
    },
  },

  social: {
    experience: "social",
    layout: { type: "grid", columns: 3, rows: 3, responsive: true },
    context: { type: "group", selection: "current" },
    features: ["feed", "trending", "featured", "activity"],
    sections: [
      { key: "feed", label: "Feed", order: 1, zones: ["feed"] },
      { key: "trending", label: "Trending", order: 2, zones: ["trending"] },
      { key: "featured", label: "Featured", order: 3, zones: ["featured"] },
      { key: "activity", label: "Activity", order: 4, zones: ["activity"] },
    ],
    displayArchitecture: {
      feed: {
        content: "inquiries",
        scope: {
          source: "children",
          sort: { field: "status.lastInteraction", direction: "desc" },
          pagination: { limit: 20, offset: 0 },
        },
        display: {
          type: "feed",
          pagination: "infinite",
          options: { interactive: true },
        },
        position: { row: 1, column: 1, columnSpan: 2, rowSpan: 3 },
        interaction: { action: "open", target: "panel" },
      },
      trending: {
        content: "inquiries",
        scope: {
          source: "children",
          sort: { field: "status.countSupports", direction: "desc" },
          pagination: { limit: 6, offset: 0 },
        },
        display: {
          type: "list",
          options: { compact: true, dense: true, showSupport: true },
        },
        position: { row: 1, column: 3 },
        interaction: { action: "open", target: "panel" },
      },
      featured: {
        content: "inquiries",
        scope: { source: "featured", pagination: { limit: 4, offset: 0 } },
        display: { type: "cards", options: { compact: true, cardsPerRow: 1 } },
        position: { row: 2, column: 3 },
        interaction: { action: "open", target: "panel" },
      },
      activity: {
        content: "activity",
        scope: { source: "children" },
        display: { type: "feed", options: { compact: true } },
        position: { row: 3, column: 3 },
        interaction: { action: "open", target: "panel" },
      },
    },
  },

  marketplace: {
    experience: "marketplace",
    layout: { type: "grid", columns: 3, rows: 3, responsive: true },
    context: { type: "group", selection: "all" },
    features: ["search", "filter", "compare", "featured"],
    sections: [
      { key: "search", label: "", order: 1, zones: ["search_bar"] },
      { key: "filters", label: "Refine", order: 2, zones: ["filters"] },
      { key: "results", label: "Results", order: 3, zones: ["results_grid"] },
      { key: "featured", label: "Featured", order: 4, zones: ["featured"] },
    ],
    displayArchitecture: {
      search_bar: {
        content: "search",
        scope: { source: "all" },
        display: { type: "search_bar" },
        position: { row: 1, column: 1, columnSpan: 3 },
      },
      filters: {
        content: "statistics",
        scope: { source: "group" },
        display: {
          type: "widget",
          options: { compact: true, showStats: true },
        },
        position: { row: 2, column: 1, rowSpan: 2 },
        interaction: { action: "open", target: "panel" },
      },
      results_grid: {
        content: "inquiries",
        scope: {
          source: "children",
          sort: { field: "status.countSupports", direction: "desc" },
          pagination: { limit: 12, offset: 0 },
        },
        display: {
          type: "cards",
          options: { cardsPerRow: 3, showStats: true, showSupport: true },
        },
        position: { row: 2, column: 2, columnSpan: 2 },
        interaction: { action: "open", target: "page" },
      },
      featured: {
        content: "inquiries",
        scope: { source: "featured", pagination: { limit: 4, offset: 0 } },
        display: {
          type: "cards",
          options: { horizontal: true, cardsPerRow: 2, compact: true },
        },
        position: { row: 3, column: 2, columnSpan: 2 },
        interaction: { action: "open", target: "page" },
      },
    },
  },

  wiki: {
    experience: "wiki",
    layout: { type: "sidebar", columns: 2, rows: 2, responsive: true }, // <-- Change to 'sidebar'
    context: { type: "group", selection: "selected" },
    features: ["tree-navigation", "book-reading"],
    sections: [
      { key: "nav", label: "Contents", order: 1, zones: ["navigation"] },
      {
        key: "content",
        label: "Page",
        order: 2,
        zones: ["content", "child_groups"],
      },
    ],
    displayArchitecture: {
      navigation: {
        content: "inquiry_groups",
        scope: {
          source: "children",
          sort: { field: "title", direction: "asc" },
        },
        display: { type: "tree", options: { dense: true } },
        position: { row: 1, column: 1, rowSpan: 2 }, // Column 1
        interaction: { action: "select", target: "same_view" },
      },
      content: {
        content: "inquiries",
        scope: {
          source: "selected_group",
          sort: { field: "created", direction: "desc" },
        },
        display: { type: "list", options: { compact: true } },
        position: { row: 1, column: 2, columnSpan: 1 }, // Column 2, span 1
        interaction: { action: "open", target: "page" },
      },
      child_groups: {
        content: "inquiry_groups",
        scope: {
          source: "selected_group_children",
          sort: { field: "title", direction: "asc" },
        },
        display: { type: "list" },
        position: { row: 2, column: 2, columnSpan: 1 }, // Column 2, span 1
        interaction: { action: "select", target: "same_view" },
      },
    },
  },

  decision_room: {
    experience: "decision_room",
    layout: { type: "grid", columns: 3, rows: 3, responsive: true },
    context: { type: "group", selection: "selected" },
    features: ["list", "detail", "debate", "vote", "discussion"],
    sections: [
      { key: "list", label: "Inquiries", order: 1, zones: ["inquiry_list"] },
      { key: "debate", label: "Debate", order: 3, zones: ["debate"] },
      { key: "vote", label: "Vote", order: 4, zones: ["vote"] },
      {
        key: "discussion",
        label: "Discussion",
        order: 5,
        zones: ["discussion"],
      },
    ],
    displayArchitecture: {
      inquiry_list: {
        content: "inquiries",
        scope: {
          source: "all",
          sort: { field: "status.lastInteraction", direction: "desc" },
          filter: { type: "proposal" },
        },
        display: {
          type: "list",
          options: {
            compact: true,
            showSupport: false,
            showComment: false,
            showParticipants: false,
            showExpiry: false,
            showStatus: false,
            showMeta: true,
          },
        },
        position: { row: 1, column: 1, rowSpan: 3 },
        interaction: { action: "select", target: "same_view" },
      },
      debate: {
        content: "options",
        scope: { source: "selected_inquiry", optionFamily: "debate" },
        display: { type: "tool", tool: "debate" },
        position: { row: 1, column: 2, columnSpan: 2 },
        interaction: { action: "open", target: "panel" },
      },
      vote: {
        content: "options",
        scope: { source: "selected_inquiry", optionFamily: "vote" },
        display: { type: "tool", tool: "vote" },
        position: { row: 2, column: 2, columnSpan: 2 },
        interaction: { action: "open", target: "panel" },
      },
      discussion: {
        content: "messages",
        scope: {
          source: "selected_inquiry",
          sort: { field: "created", direction: "desc" },
          pagination: { limit: 50, offset: 0 },
        },
        display: { type: "feed", options: { showMeta: true } },
        position: { row: 3, column: 2, columnSpan: 2 },
        interaction: { action: "comment", target: "panel" },
      },
    },
  },

  classic: {
    experience: "classic",
    layout: { type: "full", responsive: true },
    context: { type: "group", selection: "current" },
    features: ["list"],
    displayArchitecture: {
      main: {
        content: "inquiries",
        scope: {
          source: "children",
          sort: { field: "created", direction: "desc" },
          pagination: { limit: 20, offset: 0 },
        },
        display: { type: "list" },
        position: { row: 1, column: 1 },
        interaction: { action: "open", target: "panel" },
      },
    },
  },
};

/**
 * Get the architecture for a given experience
 * @param experience - The experience key
 */
export function getExperienceArchitecture(
  experience: ExperienceKey,
): ExperienceArchitecture {
  return (
    EXPERIENCE_ARCHITECTURES[experience] || EXPERIENCE_ARCHITECTURES.dashboard
  );
}
