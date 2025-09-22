/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Support } from '../../Types'

function groupSupports(inputArray: Support[]) {
  const idToElement: { [key: number]: Support } = inputArray.reduce(
    (idToSupportMap, item) => {
      idToSupportMap[item.id] = item
      return idToSupportMap
    },
    {} as { [key: number]: Support }
  )

  const resultArray = inputArray
    .filter((support: Support) => support.parent === 0)
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((parentItem: Support) => {
      const supports = getSupports(parentItem.id)

      const sortedSupports = supports.sort((a, b) => {
        const supportA = idToElement[a.id]
        const supportB = idToElement[b.id]

        // Verify elementA and elementB are defined
        if (supportA && supportB) {
          // compare timestamps
          if (supportA.timestamp !== supportB.timestamp) {
            return supportB.timestamp - supportA.timestamp
          }

          // sort by id, if timestamps are identical
          return supportB.id - supportA.id
        }

        // otherwise sort by id
        return b.id - a.id
      })

      return {
        ...parentItem,
        supports: sortedSupports,
      }
    })

  /**
   * Get supports by parent ID
   * @param parentId - Parent support ID
   * @return Array of child supports
   */
  function getSupports(parentId: number): Support[] {
    const supports: Support[] = []
    const stack: number[] = [parentId]

    while (stack.length > 0) {
      const currentId = stack.pop()
      if (currentId !== undefined) {
        const currentElement = idToElement[currentId]
        if (currentElement) {
          supports.push({ ...currentElement })
          const childIds = inputArray
            .filter((item) => item.parent === currentId)
            .map((item) => item.id)

          stack.push(...childIds)
        }
      }
    }

    return supports
  }

  return resultArray
}

export { groupSupports }
