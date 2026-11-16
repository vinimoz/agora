/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { computed, type Component, type Ref } from "vue";
import { t } from "@nextcloud/l10n";
import PlayCircle from "vue-material-design-icons/PlayCircle.vue";
import Lock from "vue-material-design-icons/Lock.vue";
import Refresh from "vue-material-design-icons/Refresh.vue";
import ArrowRight from "vue-material-design-icons/ArrowRight.vue";
import { useSupportEngineStore } from "../stores/supportEngine";
import type { SupportEngine } from "../Types/index";

export type EngineActionKey = "start" | "close" | "reopen" | "next_phase";

export interface EngineAction {
  key: EngineActionKey;
  label: string;
  icon: Component;
  type: "primary" | "secondary" | "tertiary";
  confirm?: string;
}

export function useEngineActions(
  engine: Ref<SupportEngine | null>,
  canManage: Ref<boolean>,
) {
  const store = useSupportEngineStore();

  const actions = computed<EngineAction[]>(() => {
    const e = engine.value;
    if (!e || !canManage.value) return [];

    const list: EngineAction[] = [];

    if (e.status === "draft") {
      list.push({
        key: "start",
        label: t("agora", "Start vote"),
        icon: PlayCircle,
        type: "primary",
        confirm: t(
          "agora",
          "Starting the vote freezes the candidate list and configuration. Continue?",
        ),
      });
    }

    if (e.status === "active") {
      if (e.engine === "phased_voting") {
        list.push({
          key: "next_phase",
          label: t("agora", "Next phase"),
          icon: ArrowRight,
          type: "secondary",
        });
      }
      list.push({
        key: "close",
        label: t("agora", "Close vote"),
        icon: Lock,
        type: "secondary",
        confirm: t(
          "agora",
          "Closing the vote prevents further ballots. Results become final. Continue?",
        ),
      });
    }

    if (e.status === "closed") {
      list.push({
        key: "reopen",
        label: t("agora", "Reopen"),
        icon: Refresh,
        type: "tertiary",
        confirm: t(
          "agora",
          "Reopening the vote allows new ballots. Existing results may change. Continue?",
        ),
      });
    }

    return list;
  });

  const execute = async (key: EngineActionKey): Promise<boolean> => {
    const e = engine.value;
    if (!e) return false;

    switch (key) {
      case "start":
      case "reopen": {
        const r = await store.updateEngine(e.id, { status: "active" });
        return r !== null;
      }
      case "close": {
        const r = await store.updateEngine(e.id, { status: "closed" });
        return r !== null;
      }
      case "next_phase": {
        // ⚠️ See note below — verify the Phase shape in your Types before
        // shipping this. Placeholder: use whatever phase value the engine's
        // current metadata carries.
        const phase = (e.metadata?.phase ?? "next") as any;
        const r = await store.duplicateForPhase(e.id, phase);
        return r !== null;
      }
    }
  };

  return { actions, execute };
}
