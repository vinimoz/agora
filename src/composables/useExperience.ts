/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInquiryGroupsStore } from "../stores/inquiryGroups";
// import type { InquiryGroup } from '../Types/inquiryGroups.types'

import {
  ALL_TOOLS,
  type DisplayType,
  type ToolKey,
  type ExperienceKey,
  type ExperienceDefinition,
} from "../Types/experience.types";

// Re-export for convenience
export type { DisplayType, ToolKey, ExperienceKey, ExperienceDefinition };

// ============================================================
// LOCAL TYPES
// ============================================================

export type DisplayMode = DisplayType;
export type DisplayModeWithVariant =
  DisplayMode | "compact" | "summary" | "horizontal";

export interface ExperienceConfig {
  experience: ExperienceKey;
  displayMode: DisplayMode;
  tools: ToolKey[];
  layout: "sidebar" | "full" | "split" | "grid";
  showHeader: boolean;
  showBreadcrumb: boolean;
  showStats: boolean;
  showResources: boolean;
  showComments: boolean;
}

// ============================================================
// EXPERIENCE DEFINITIONS - Single source of truth
// ============================================================

export const EXPERIENCE_DEFINITIONS: Record<
  ExperienceKey,
  ExperienceDefinition
> = {
  home: {
    key: "home",
    label: "Home",
    icon: "Home",
    description: "Welcome to your civic space",
    verb: "Discover",
    question: "What can I do today?",
    defaultDisplay: "banner",
    allowedDisplays: ["banner", "cards", "list"],
    allowedTools: ["search"],
    layout: "grid",
    showHeader: false,
    showBreadcrumb: false,
    showStats: false,
  },

  dashboard: {
    key: "dashboard",
    label: "Dashboard",
    icon: "Home",
    description: "Understand and see what is happening",
    verb: "Understand",
    question: "What is happening here and where can I go?",
    defaultDisplay: "cards",
    allowedDisplays: ["cards", "list", "feed"],
    allowedTools: ["vote", "kanban", "timeline"],
    layout: "grid",
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
  },

  social: {
    key: "social",
    label: "Social",
    icon: "Users",
    description: "Follow and participate",
    verb: "Follow",
    question: "What are others thinking?",
    defaultDisplay: "feed",
    allowedDisplays: ["feed", "cards", "list"],
    allowedTools: [],
    layout: "grid",
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
  },

  marketplace: {
    key: "marketplace",
    label: "Marketplace",
    icon: "Storefront",
    description: "Browse and discover",
    verb: "Discover",
    question: "What is available?",
    defaultDisplay: "cards",
    allowedDisplays: ["cards", "list"],
    allowedTools: ["search"],
    layout: "grid",
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
  },

  wiki: {
    key: "wiki",
    label: "Wiki",
    icon: "Book",
    description: "Understand the content",
    verb: "Understand",
    question: "What does this information mean / contain?",
    defaultDisplay: "book",
    allowedDisplays: ["book"],
    allowedTools: ["structure"],
    layout: "grid",
    showHeader: true,
    showBreadcrumb: true,
    showStats: false,
  },

  decision_room: {
    key: "decision_room",
    label: "Decision Room",
    icon: "Scale",
    description: "Decide",
    verb: "Decide",
    question: "How do we decide?",
    defaultDisplay: "book",
    allowedDisplays: ["book"],
    allowedTools: ["debate", "vote"],
    layout: "grid",
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
  },

  classic: {
    key: "classic",
    label: "Classic View",
    icon: "Home",
    description: "Standard group layout",
    verb: "View",
    question: "Default view",
    defaultDisplay: "list",
    allowedDisplays: ["list"],
    allowedTools: [],
    layout: "full",
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
  },
};

// ------------------------------------------------------------
// Dev-only invariant check
// ------------------------------------------------------------
if (import.meta.env.DEV) {
  for (const key of Object.keys(EXPERIENCE_DEFINITIONS) as ExperienceKey[]) {
    const def = EXPERIENCE_DEFINITIONS[key];

    if (!def.allowedDisplays.includes(def.defaultDisplay)) {
      console.warn(
        `[useExperience] ${key}.defaultDisplay '${def.defaultDisplay}' ` +
          `is not in allowedDisplays [${def.allowedDisplays.join(", ")}]. ` +
          `switchDisplay('${def.defaultDisplay}') will silently no-op.`,
      );
    }
  }
}

// ============================================================
// COMPOSABLE
// ============================================================

export function useExperience(initialExperience?: ExperienceKey) {
  const route = useRoute();
  const router = useRouter();
  const inquiryGroupsStore = useInquiryGroupsStore();

  const experience = ref<ExperienceKey>(
    (route.query.experience as ExperienceKey) ||
      initialExperience ||
      "dashboard",
  );

  const currentGroup = computed(() => {
    const slug = route.params.slug as string;
    if (slug && slug !== "none" && slug !== "undefined") {
      return inquiryGroupsStore.bySlug(slug);
    }
    return null;
  });

  const definition = computed<ExperienceDefinition>(
    () =>
      EXPERIENCE_DEFINITIONS[experience.value] ||
      EXPERIENCE_DEFINITIONS.dashboard,
  );

  const displayMode = ref<DisplayMode>(
    (route.query.display as DisplayMode) || definition.value.defaultDisplay,
  );

  const tools = ref<ToolKey[]>([...definition.value.allowedTools]);

  const showResources = ref(true);
  const showComments = ref(true);

  const config = computed<ExperienceConfig>(() => {
    const def = definition.value;
    return {
      experience: experience.value,
      displayMode: displayMode.value,
      tools: tools.value,
      layout: def.layout as "sidebar" | "full" | "split" | "grid",
      showHeader: def.showHeader,
      showBreadcrumb: def.showBreadcrumb,
      showStats: def.showStats,
      showResources: showResources.value,
      showComments: showComments.value,
    };
  });

  function getAvailableExperiences(): ExperienceKey[] {
    const allKeys = Object.keys(EXPERIENCE_DEFINITIONS) as ExperienceKey[];

    // Top-level (no group): every experience is fair game, including `home`.
    if (!currentGroup.value) return allKeys;

    // Group context: `home` is the landing page only — never offer it here.
    return allKeys.filter((key) => key !== "home");
  }

  function getAvailableDisplays(): DisplayMode[] {
    return definition.value.allowedDisplays;
  }

  function getAvailableTools(): ToolKey[] {
    return definition.value.allowedTools;
  }

  function canUseTool(tool: ToolKey): boolean {
    return definition.value.allowedTools.includes(tool);
  }

  function isToolDisplay(mode: DisplayMode): boolean {
    return mode === "tool";
  }

  function getDefaultTool(): ToolKey | undefined {
    return definition.value.allowedTools[0];
  }

  function buildQuery(extra: Record<string, string>): Record<string, string> {
    return {
      ...Object.fromEntries(
        Object.entries(route.query).filter(
          ([, v]) => typeof v === "string",
        ) as [string, string][],
      ),
      ...extra,
    };
  }

  function switchExperience(key: ExperienceKey) {
    experience.value = key;
    const def = EXPERIENCE_DEFINITIONS[key];
    const extra: Record<string, string> = { experience: key };
    if (def) extra.display = def.defaultDisplay;
    const query = buildQuery(extra);
    delete query.tool;
    router.push({ query });
  }

  function switchDisplay(mode: DisplayMode) {
    if (!definition.value.allowedDisplays.includes(mode)) return;
    displayMode.value = mode;
    router.push({ query: buildQuery({ display: mode }) });
  }

  function toggleTool(tool: ToolKey) {
    const index = tools.value.indexOf(tool);
    if (index > -1) tools.value.splice(index, 1);
    else tools.value.push(tool);

    // Mirror the state change into the URL, matching switchDisplay's contract.
    const query = buildQuery({});
    if (tools.value.length > 0) {
      query.tool = tools.value.join(",");
    } else {
      delete query.tool;
    }
    router.push({ query });
  }

  function toggleResources() {
    showResources.value = !showResources.value;
  }

  function toggleComments() {
    showComments.value = !showComments.value;
  }

  watch(
    () => route.query.experience,
    (newExp) => {
      if (
        newExp &&
        typeof newExp === "string" &&
        EXPERIENCE_DEFINITIONS[newExp as ExperienceKey]
      ) {
        experience.value = newExp as ExperienceKey;
        const def = EXPERIENCE_DEFINITIONS[newExp as ExperienceKey];
        displayMode.value = def.defaultDisplay;
        // Tools are owned by the `tool` watcher below. Only prefill defaults
        // when the URL is silent about them.
        if (route.query.tool === undefined) {
          tools.value = [...def.allowedTools];
        }
      }
    },
  );

  watch(
    () => route.query.tool,
    (newTool) => {
      if (newTool === undefined) {
        // No `tool` in URL → fall back to the current experience's defaults.
        tools.value = [...definition.value.allowedTools];
        return;
      }
      if (typeof newTool !== "string") return;
      const parsed = newTool
        .split(",")
        .filter((s): s is ToolKey =>
          (ALL_TOOLS as readonly string[]).includes(s),
        );
      tools.value = parsed;
    },
    { immediate: true },
  );
  watch(
    () => route.query.display,
    (newDisplay) => {
      if (newDisplay && typeof newDisplay === "string") {
        displayMode.value = newDisplay as DisplayMode;
      }
    },
  );

  return {
    experience,
    displayMode,
    tools,
    config,
    definition,
    showResources,
    showComments,

    currentGroup,
    getAvailableExperiences,
    getAvailableDisplays,
    getAvailableTools,
    canUseTool,
    isToolDisplay,
    getDefaultTool,

    switchExperience,
    switchDisplay,
    toggleTool,
    toggleResources,
    toggleComments,
  };
}
