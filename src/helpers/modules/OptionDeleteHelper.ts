/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { t } from '@nextcloud/l10n'
import { showError, showSuccess } from '@nextcloud/dialogs'
import type { Option } from '../Types/index.ts'

// Check if option was imported from THIS specific view/family
export const isImportedFromView = (option: Option, familyKey: string): boolean => {
  return !( option.family === familyKey )
}



// Helper to remove a family key from force_layouts
export const removeLayoutFromOption = (
  option: Option, 
  familyKey: string
): { updatedLayouts: string[] } => {
  let currentLayouts = option.miscFields?.force_layouts || []
  if (typeof currentLayouts === 'string') {
    currentLayouts = JSON.parse(currentLayouts)
  }
  const updatedLayouts = currentLayouts.filter((l: string) => l !== familyKey)
  return { updatedLayouts }
}
