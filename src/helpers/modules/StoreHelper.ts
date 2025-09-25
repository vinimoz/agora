/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// import { useVotesStore, Vote } from '../../stores/votes'
import { Inquiry, useInquiryStore } from '../../stores/inquiry.ts'
import { Option, useOptionsStore } from '../../stores/options.ts'

const StoreHelper = {
  updateStores(data: { inquiry?: Inquiry; options?: Option[] }) {
    // updateSupports(data: { inquiry?: Inquiry; supports?: Support[]; options?: Option[] }) {
    const inquiryStore = useInquiryStore()
    //		const inquiriesStore = useInquiriesStore()
    const optionsStore = useOptionsStore()

    if (Object.hasOwn(data, 'inquiry')) {
      inquiryStore.$patch(data.inquiry as Inquiry)
    }
    //		if (Object.hasOwn(data, 'inquiries')) {
    //			votesStore.votes = data.votes as Vote[]
    //		}
    if (Object.hasOwn(data, 'options')) {
      optionsStore.options = data.options as Option[]
    }
  },
}

export { StoreHelper }
