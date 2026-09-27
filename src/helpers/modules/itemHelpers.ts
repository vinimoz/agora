/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { Item } from '../../Types/index.ts'
import type { Option } from '../../stores/option.ts'
import type { Inquiry } from '../../stores/inquiry.ts'
import { useAppSettingsStore } from '../../stores/appSettings.ts'
import { getFamilyUIConfig, getLayoutForFamily } from './InquiryOptionHelper'

// ---------------------------------------------------------------------------
// Type guards
// ---------------------------------------------------------------------------

export function isOption(item: Item | Option | Inquiry): item is Option {
  return 'targetId' in item
}

export function isInquiry(item: Item | Option | Inquiry): item is Inquiry {
  return !('targetId' in item)
}

type AnyItem = Item | Option | Inquiry

// ---------------------------------------------------------------------------
// Adapters
// ---------------------------------------------------------------------------

export function optionToItem(opt: Option): Item {
  return {
    kind: 'option',
    id: opt.id,
    parentId: opt.parentId ?? 0,
    title: opt.title,
    text: opt.text ?? '',
    type: opt.type,
    family: opt.family ?? '',
    owner: opt.owner,
    statusKey: opt.status?.optionStatus ?? 'draft',
    raw: opt,
  }
}

export function inquiryToItem(inq: Inquiry): Item {
  return {
    kind: 'inquiry',
    id: inq.id,
    parentId: inq.parentId ?? 0,
    title: inq.title,
    text: inq.description ?? '',
    type: inq.type,
    family: inq.family ?? '',
    owner: inq.owner,
    statusKey: inq.status?.inquiryStatus ?? 'draft',
    raw: inq,
  }
}

export function toItem(obj: Option | Inquiry): Item {
  return isOption(obj) ? optionToItem(obj) : inquiryToItem(obj)
}

export function toItems(list: (Option | Inquiry)[]): Item[] {
  return list.map(toItem)
}

/**
 * Resolve the layout key for a family.
 *
 * Priority:
 *   1. appSettings.optionFamilyTab[familyKey].ui.layout   (live config)
 *   2. InquiryOptionHelper.getLayoutForFamily()           (static map)
 *   3. familyKey itself                                   (fallback)
 */
export function getLayoutKeyForFamily(familyKey: string | undefined): string {
  if (!familyKey) return ''

  // 1. Live config from appSettings
  try {
    const store = useAppSettingsStore()
    const layout = store?.optionFamilyTab?.find(
      (f: { family_type?: string }) => f.family_type === familyKey
    )?.ui?.layout

    if (typeof layout === 'string' && layout.length > 0) {
      return layout
    }
  } catch {
    // store not available outside setup
  }

  // 2. Static map from the helper
  return getLayoutForFamily(familyKey)
}

// ---------------------------------------------------------------------------
// Unwrap helpers — work on both Item wrappers and raw Option/Inquiry
// ---------------------------------------------------------------------------

function unwrap(item: AnyItem): Option | Inquiry {
  if ('raw' in item && item.raw) {
    return item.raw as Option | Inquiry
  }
  return item as Option | Inquiry
}

function getMiscFields(item: AnyItem): Record<string, unknown> {
  const raw = unwrap(item)
  return (raw.miscFields as Record<string, unknown>) ?? {}
}

function getFamily(item: AnyItem): string {
  return unwrap(item).family ?? ''
}

// ---------------------------------------------------------------------------
// Force-layouts primitives
// ---------------------------------------------------------------------------

export function parseForceLayouts(
  miscFields: Record<string, unknown> | null | undefined
): string[] {
  if (!miscFields) return []

  const forceLayouts = miscFields.force_layouts
  if (!forceLayouts) return []

  if (typeof forceLayouts === 'string') {
    try {
      const parsed = JSON.parse(forceLayouts)
      if (Array.isArray(parsed)) {
        return parsed.filter((v): v is string => typeof v === 'string')
      }
    } catch {
      return [forceLayouts]
    }
  }

  if (Array.isArray(forceLayouts)) {
    return forceLayouts.filter((v): v is string => typeof v === 'string')
  }

  return []
}

export function hasForceLayout(item: AnyItem, layout: string): boolean {
  return parseForceLayouts(getMiscFields(item)).includes(layout)
}

// ---------------------------------------------------------------------------
// Family-based filtering
//
// Rule:
//   Option  → include if family === familyKey OR force_layouts ∋ familyKey
//   Inquiry → include if force_layouts ∋ familyKey
// ---------------------------------------------------------------------------

export function getOptionsForFamily(
  options: Option[],
  familyKey: string | undefined
): Option[] {
  if (!familyKey) return []

  const layoutKey = getLayoutKeyForFamily(familyKey)

  return options.filter(option =>
    option.family === familyKey ||
    hasForceLayout(option, layoutKey) ||
    hasForceLayout(option, familyKey)
  )
}

export function getInquiriesForFamily(
  inquiries: Inquiry[],
  familyKey: string | undefined
): Inquiry[] {
  if (!familyKey) return []

  const layoutKey = getLayoutKeyForFamily(familyKey)

  return inquiries.filter(inquiry =>
    hasForceLayout(inquiry, layoutKey) ||
    hasForceLayout(inquiry, familyKey)
  )
}

export function getItemsForFamily(
  items: Item[],
  familyKey: string | undefined
): Item[] {
  if (!familyKey) return []

  const layoutKey = getLayoutKeyForFamily(familyKey)

  return items.filter(item => {
    if (item.kind === 'option') {
      return (
        getFamily(item) === familyKey ||
        hasForceLayout(item, layoutKey) ||
        hasForceLayout(item, familyKey)
      )
    }
    return hasForceLayout(item, layoutKey) || hasForceLayout(item, familyKey)
  })
}

// ---------------------------------------------------------------------------
// Generic helpers (work on raw Option/Inquiry; use item.raw for Item wrappers)
// ---------------------------------------------------------------------------

export function getItemsByForceLayout<T extends AnyItem>(
  items: T[],
  layout: string
): T[] {
  return items.filter(item => hasForceLayout(item, layout))
}

export function getItemsByFamily<T extends AnyItem>(
  items: T[],
  familyKey: string
): T[] {
  return items.filter(item => getFamily(item) === familyKey)
}

// ---------------------------------------------------------------------------
// Mutators — operate on raw Option/Inquiry (miscFields lives on raw)
// ---------------------------------------------------------------------------

export function addForceLayout<T extends Option | Inquiry>(
  item: T,
  layout: string
): T {
  const miscFields = { ...(item.miscFields || {}) }
  const currentLayouts = parseForceLayouts(miscFields)

  if (!currentLayouts.includes(layout)) {
    currentLayouts.push(layout)
    miscFields.force_layouts = JSON.stringify(currentLayouts)
  }

  return { ...item, miscFields }
}

export function removeForceLayout<T extends Option | Inquiry>(
  item: T,
  layout: string
): T {
  const miscFields = { ...(item.miscFields || {}) }
  const currentLayouts = parseForceLayouts(miscFields)
  const updatedLayouts = currentLayouts.filter(l => l !== layout)

  if (updatedLayouts.length === 0) {
    delete miscFields.force_layouts
  } else {
    miscFields.force_layouts = JSON.stringify(updatedLayouts)
  }

  return { ...item, miscFields }
}
