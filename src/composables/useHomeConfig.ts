/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed } from "vue";
import { useSessionStore } from "../stores/session";
import { getHomeTemplate } from "./homeDefaults";
import {
  ORGANIZATION_TYPES,
  type OrganizationType,
} from "../Types/experience.types";
import type { HomeConfig, HomeConfigData } from "../Types/appSettings.types.ts";

export function useHomeConfig() {
  const session = useSessionStore();

  /**
   * Active organization type, sourced from session.appSettings.organization.type.
   * Falls back to 'municipality' when the server doesn't provide one (i.e.
   * before the DB-backed home config lands) or when the value is invalid.
   */
  const organizationType = computed<OrganizationType>(() => {
    const candidate = session.appSettings?.organization?.type;
    if (
      candidate &&
      (ORGANIZATION_TYPES as readonly string[]).includes(candidate)
    ) {
      return candidate as OrganizationType;
    }
    return "municipality";
  });

  /** The selected template — useful for admin previews ("what would a university see?") */
  const template = computed<HomeConfig>(() =>
    getHomeTemplate(organizationType.value),
  );

  /**
   * Final merged config, resolution order:
   *
   *   1. session.appSettings.home            (tenant override, HomeConfigData)
   *   2. HOME_TEMPLATES[organizationType]    (org-type defaults, HomeConfig)
   *
   * The server (`HomeConfigService::resolveForOrganization()`) already merged
   * template + instance on the backend and injected `hero.imageUrl` /
   * `promo.imageUrl` as `/apps/agora/home-config/<id>/images/<slot>` URLs.
   * What arrives under `session.appSettings.home` is therefore
   * `HomeConfigData`, NOT `HomeConfig` — the two shapes use different field
   * names (`image` vs `backgroundUrl`, `description` vs `text`,
   * `cta: {label,url}` vs `cta: string`). This computed projects the
   * admin-editable blob back onto the renderer shape.
   */
  const config = computed<HomeConfig>(() => {
    // `AppSettings.home` is typed as `HomeConfig` for backwards compatibility,
    // but at runtime the server returns a `HomeConfigData` blob.
    const override = session.appSettings?.home as HomeConfigData | undefined;
    const tpl = template.value;
    if (!override) return tpl;

    return {
      sections: override.sections ?? tpl.sections,

      // ── Hero ────────────────────────────────────────────────────────
      // Only copy the fields HomeConfigData actually owns; explicit picks
      // keep admin-only fields (image, imageConfigId, imageUpdated) from
      // leaking into the returned HomeConfig.
      hero: {
        ...tpl.hero,
        title: override.hero?.title ?? tpl.hero.title,
        subtitle: override.hero?.subtitle ?? tpl.hero.subtitle,
        backgroundUrl: override.hero?.imageUrl ?? tpl.hero.backgroundUrl,
        actions: override.hero?.actions?.length
          ? override.hero.actions
          : tpl.hero.actions,
      },

      // ── Promo ───────────────────────────────────────────────────────
      promo: {
        ...tpl.promo,
        title: override.promo?.title ?? tpl.promo.title,
        // HomeConfigData: `description` → HomeConfig: `text`
        text: override.promo?.description ?? tpl.promo.text,
        // HomeConfigData: `cta: {label?, url?}` → HomeConfig: `cta: string`
        cta: override.promo?.cta?.label ?? tpl.promo.cta,
        // HomeConfigData: `image` (filename) or `imageUrl` (resolved URL)
        imageUrl:
          override.promo?.imageUrl ??
          override.promo?.image ??
          tpl.promo.imageUrl,
      },

      // ── Relevance ───────────────────────────────────────────────────
      relevance: {
        ...tpl.relevance,
        ...override.relevance,
        tiers: override.relevance?.tiers ?? tpl.relevance.tiers,
        weights: {
          ...tpl.relevance.weights,
          ...override.relevance?.weights,
        },
      },

      // ── Section labels ──────────────────────────────────────────────
      sectionLabels: {
        ...tpl.sectionLabels,
        ...override.sectionLabels,
      },
    };
  });

  return { config, template, organizationType };
}
