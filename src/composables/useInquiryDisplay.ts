/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed, toValue, type MaybeRefOrGetter, type Component } from "vue";
import { DateTime } from "luxon";
import { getInquiryTypeData } from "../helpers/modules/InquiryHelper";
import { InquiryGeneralIcons, StatusIcons } from "../utils/icons";
import { useSessionStore } from "../stores/session";
import type { Inquiry } from "../Types";

/**
 * A single row from either `appSettings.locationTab` or
 * `appSettings.categoryTab` — both are `{ id, name, parentId }` trees.
 */
interface HierarchyItem {
  id: number;
  name: string;
  parentId: number | null;
}

const iconRegistry = InquiryGeneralIcons as Record<
  string,
  Component | undefined
>;

export function useInquiryDisplay(inquiry: MaybeRefOrGetter<Inquiry | null>) {
  const sessionStore = useSessionStore();
  const i = () => toValue(inquiry);

  // ── type ────────────────────────────────────────────
  const typeData = computed(() => {
    const q = i();
    if (!q) return null;
    return getInquiryTypeData(
      q.type,
      sessionStore.appSettings?.inquiryTypeTab ?? [],
    );
  });
  const typeLabel = computed(() => typeData.value?.label ?? i()?.type ?? "");
  const typeIcon = computed(() => {
    const ic = typeData.value?.icon;
    if (typeof ic === "string" && iconRegistry[ic]) {
      return iconRegistry[ic];
    }
    if (ic && typeof ic === "object") return ic as Component;
    return InquiryGeneralIcons.FolderMultiple;
  });

  // ── status (draft / waiting_approval special-cased once) ──
  const statusKey = computed(() => i()?.status?.inquiryStatus ?? "draft");
  const statusInfo = computed(() => {
    const q = i();
    if (!q) return null;
    const special = {
      draft: { label: "Draft", icon: "draft" },
      waiting_approval: { label: "Pending approval", icon: "waitingapproval" },
    } as const;
    if (statusKey.value in special)
      return special[statusKey.value as keyof typeof special];
    return (
      sessionStore.appSettings?.inquiryStatusTab?.find(
        (s) => s.inquiryType === q.type && s.statusKey === statusKey.value,
      ) ?? special.draft
    );
  });
  const statusLabel = computed(() => statusInfo.value?.label ?? "");
  const statusIcon = computed(
    () =>
      StatusIcons[
        (statusInfo.value?.icon as keyof typeof StatusIcons) ?? "Default"
      ] ?? StatusIcons.Default,
  );

  const statusClass = computed(() => {
    const map: Record<string, string> = {
      active: "status-open",
      open: "status-open",
      closed: "status-closed",
      draft: "status-draft",
      waiting_approval: "status-waiting",
      rejected: "status-rejected",
    };
    return map[statusKey.value] ?? "status-unknown";
  });

  // ── cover ───────────────────────────────────────────
  const coverUrl = computed(() => {
    const id = i()?.coverId;
    if (!id) return "";
    return `${window.location.origin}/index.php/core/preview?fileId=${id}&x=1200&y=400&a=1`;
  });

  // ── expiry ──────────────────────────────────────────
  const expiryTs = computed(() => i()?.configuration?.expire ?? 0);
  const showExpiry = computed(() => expiryTs.value > 0);
  const expiryText = computed(() => {
    if (!showExpiry.value) return "";
    const days = Math.floor((expiryTs.value * 1000 - Date.now()) / 86_400_000);
    if (days > 0) return `${days}d`;
    const hours = Math.floor((expiryTs.value * 1000 - Date.now()) / 3_600_000);
    return hours > 0 ? `${hours}h` : "Soon";
  });
  const expiryClass = computed(() => {
    if (!showExpiry.value) return "";
    const h = (expiryTs.value * 1000 - Date.now()) / 3_600_000;
    return h < 24 ? "expiry-soon" : h < 72 ? "expiry-warning" : "expiry-normal";
  });

  // ── dates / author ──────────────────────────────────
  const ownerName = computed(
    () => i()?.ownedGroup || i()?.owner?.displayName || "",
  );
  const created = computed(() => i()?.status?.created);
  const createdRelative = computed(() =>
    created.value
      ? (DateTime.fromMillis(created.value * 1000).toRelative() ?? "")
      : "",
  );
  const createdDate = computed(() =>
    created.value
      ? DateTime.fromMillis(created.value * 1000).toLocaleString(
          DateTime.DATE_MED,
        )
      : "",
  );

  // ── hierarchy (single source of truth, used by Card/Item/Summary/Detail) ──
  function hierarchyPath(
    items: HierarchyItem[] | undefined,
    id: number | undefined,
  ): string {
    if (!items?.length || id == null) return "";
    const byId = new Map(items.map((x) => [x.id, x]));
    const walk = (node: HierarchyItem): string => {
      if (node.parentId === 0 || node.parentId == null) return node.name;
      const parent = byId.get(node.parentId);
      return parent ? `${walk(parent)} → ${node.name}` : node.name;
    };
    const found = byId.get(id);
    return found ? walk(found) : (byId.get(1)?.name ?? "");
  }
  const locationPath = computed(() =>
    hierarchyPath(sessionStore.appSettings?.locationTab, i()?.locationId),
  );
  const categoryPath = computed(() =>
    hierarchyPath(sessionStore.appSettings?.categoryTab, i()?.categoryId),
  );

  // ── description ─────────────────────────────────────
  const plainDescription = computed(() =>
    (i()?.description ?? "").replace(/<[^>]*>/g, ""),
  );

  return {
    typeData,
    typeLabel,
    typeIcon,
    statusKey,
    statusInfo,
    statusLabel,
    statusIcon,
    statusClass,
    coverUrl,
    showExpiry,
    expiryText,
    expiryClass,
    ownerName,
    created,
    createdRelative,
    createdDate,
    locationPath,
    categoryPath,
    plainDescription,
  };
}
