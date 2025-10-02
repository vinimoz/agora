;(function () {
  'use strict'
  try {
    if (typeof document != 'undefined') {
      var elementStyle = document.createElement('style')
      elementStyle.appendChild(
        document.createTextNode(
          '@charset "UTF-8";\n/*!\n * SPDX-FileCopyrightText: 2022 René Gieling <github@dartcafe.de>\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n.inquiries-markdown * {\n  margin: revert;\n  padding: revert;\n  font-size: revert;\n  text-decoration: revert;\n  list-style: revert;\n  opacity: revert;\n  min-height: revert;\n}\n.inquiries-markdown table {\n  border-spacing: 2px;\n}\n.inquiries-markdown thead {\n  background-color: var(--color-background-darker);\n  color: var(--color-main-text);\n}\n.inquiries-markdown td,\n.inquiries-markdown th {\n  padding: 1px 4px;\n}'
        )
      )
      document.head.appendChild(elementStyle)
    }
  } catch (e) {
    console.error('vite-plugin-css-injected-by-js', e)
  }
})()
const be = 'agora',
  we = '1.0.0rc4'
import {
  i as O,
  d as b,
  k as w,
  E as M,
  F as N,
  G as k,
  H as F,
  c as S,
  o as p,
  r as T,
  a as h,
  f as P,
  I as R,
  u as v,
  J as V,
  x as B,
  z as q,
  K as z,
  e as _,
  n as j,
  g as H,
  w as C,
  m as E,
  j as J,
  L as K,
  M as W,
  B as Q,
} from './NcEmptyContent-q-geAf0w-DsDiM4c8.chunk.mjs'
import { b as f, c as d, L as c } from './NcDashboardWidget-Wkx_9xKh-DfVZeYPI.chunk.mjs'
import { N as X } from './NcRichText-G8kzsdwx-DWCeYxXp.chunk.mjs'
const Y = ['role'],
  Z = { key: 0, class: 'notecard__heading' },
  x = { class: 'notecard__text' },
  ee = b({
    __name: 'NcNoteCard',
    props: {
      heading: { default: void 0 },
      showAlert: { type: Boolean },
      text: { default: void 0 },
      type: { default: 'warning' },
    },
    setup(e) {
      const t = e,
        r = w(() => t.showAlert || t.type === 'error'),
        a = w(() => {
          switch (t.type) {
            case 'error':
              return F
            case 'success':
              return k
            case 'info':
              return N
            case 'warning':
            default:
              return M
          }
        })
      return (s, o) => (
        p(),
        S(
          'div',
          { class: R(['notecard', `notecard--${s.type}`]), role: r.value ? 'alert' : 'note' },
          [
            T(
              s.$slots,
              'icon',
              {},
              () => [
                P(
                  v(V),
                  {
                    path: a.value,
                    class: R(['notecard__icon', { 'notecard__icon--heading': s.heading }]),
                    inline: '',
                  },
                  null,
                  8,
                  ['path', 'class']
                ),
              ],
              true
            ),
            h('div', null, [
              s.heading ? (p(), S('p', Z, q(s.heading), 1)) : B('', true),
              T(s.$slots, 'default', {}, () => [h('p', x, q(s.text), 1)], true),
            ]),
          ],
          10,
          Y
        )
      )
    },
  }),
  te = O(ee, [['__scopeId', 'data-v-1893b364']]),
  re = {
    changeInquiryStatus: true,
    deleteInquiry: true,
    archiveInquiry: true,
    transferInquiry: true,
    modifyInquiry: true,
    addShares: true,
    addSharesExternal: false,
    deanonymize: false,
  },
  se = {
    changeInquiryStatus: false,
    deleteInquiry: false,
    archiveInquiry: false,
    transferInquiry: false,
    modifyInquiry: false,
  }
var A = ((e) => (
  (e.Inquiry = 'inquiry'),
  (e.Comment = 'comment'),
  (e.Support = 'support'),
  (e.Attachment = 'attachment'),
  (e.Share = 'share'),
  e
))(A || {})
function ae() {
  const t = f().currentUser
  return t ? (t.isAdmin ? 'admin' : t.isModerator ? 'moderator' : (t.isOfficial, 'user')) : 'guest'
}
function ie() {
  return f().currentUser?.groups || []
}
function g() {
  const e = f(),
    t = I()
  return e.currentUser?.isModerator ? t.moderatorRights : null
}
function m() {
  const e = f(),
    t = I()
  return e.currentUser?.isOfficial ? t.officialRights : null
}
function oe(e) {
  return f().currentUser?.id === e
}
function G(e, t) {
  return f().appSettings.inquiryTypeRights[e]?.[t] ?? false
}
function U(e) {
  return !e.hasGroupRestrictions ||
    e.userType === 'guest' ||
    e.userType === 'admin' ||
    e.userType === 'moderator'
    ? true
    : e.userGroups.some((t) => e.allowedGroups.includes(t))
}
function $(e) {
  return e.isArchived || e.isDeleted || e.isLocked || e.isExpired
}
function ne(e) {
  return e.isDeleted
    ? false
    : e.userType === 'admin' || e.isOwner
      ? true
      : e.userType === 'moderator'
        ? (g()?.deleteInquiry ?? false)
        : e.userType === 'user'
          ? (m()?.deleteInquiry ?? false)
          : false
}
function ue(e) {
  return e.isArchived || e.isDeleted
    ? e.userType === 'admin' || e.isOwner
      ? true
      : e.userType === 'moderator'
        ? (g()?.archiveInquiry ?? false)
        : e.userType === 'user'
          ? (m()?.archiveInquiry ?? false)
          : false
    : false
}
function de(e) {
  return e.isArchived || e.isDeleted
    ? false
    : e.userType === 'admin' || e.isOwner
      ? true
      : e.userType === 'moderator'
        ? (g()?.archiveInquiry ?? false)
        : e.userType === 'user'
          ? (m()?.archiveInquiry ?? false)
          : false
}
function ce(e) {
  return e.userType === 'admin' || e.isOwner
    ? true
    : e.userType === 'moderator'
      ? (g()?.transferInquiry ?? false)
      : e.userType === 'user'
        ? (m()?.transferInquiry ?? false)
        : false
}
function le(e) {
  return e.isLocked || e.isArchived || e.isDeleted
    ? false
    : e.userType === 'admin' || e.isOwner
      ? true
      : e.userType === 'moderator'
        ? (g()?.modifyInquiry ?? false)
        : e.userType === 'user'
          ? (m()?.modifyInquiry ?? false)
          : false
}
function fe(e) {
  const t = I()
  return $(e) || (e.inquiryType && !G(e.inquiryType, 'commentInquiry')) || !U(e)
    ? false
    : e.userType === 'guest'
      ? e.isPublic && t.allowGuestComments
      : true
}
function pe(e) {
  const t = f().appSettings
  return $(e) || (e.inquiryType && !G(e.inquiryType, 'supportInquiry')) || !U(e)
    ? false
    : e.userType === 'guest'
      ? e.isPublic && t.allowGuestSupport
      : true
}
function he(e, t, r = true, a = false, s = false, o = false, u = false, n = false, i = [], l) {
  const y = ae(),
    D = ie(),
    L = oe(t)
  return {
    userType: y,
    contentType: e,
    isOwner: L,
    isPublic: r,
    isLocked: a,
    isExpired: s,
    isDeleted: o,
    isArchived: u,
    hasGroupRestrictions: n,
    userGroups: D,
    allowedGroups: i,
    inquiryType: l,
  }
}
const I = z('appSettings', {
    state: () => ({
      allAccessGroups: [],
      allowCombo: true,
      allowPublicShares: true,
      allowAllAccess: true,
      allowInquiryCreation: true,
      allowInquiryDownload: true,
      autoArchive: false,
      autoDelete: false,
      autoArchiveOffset: 30,
      autoDeleteOffset: 30,
      defaultPrivacyUrl: '',
      defaultImprintUrl: '',
      disclaimer: '',
      imprintUrl: '',
      legalTermsInEmail: false,
      privacyUrl: '',
      showMailAddresses: false,
      showLogin: true,
      unrestrictedOwner: false,
      updateType: 'noInquirying',
      useActivity: false,
      useCollaboration: true,
      useSiteLegalTerms: true,
      navigationInquiriesInList: true,
      finalPrivacyUrl: '',
      finalImprintUrl: '',
      comboGroups: [],
      publicSharesGroups: [],
      inquiryCreationGroups: [],
      inquiryDownloadGroups: [],
      showMailAddressesGroups: [],
      unrestrictedOwnerGroups: [],
      categoryTab: [],
      locationTab: [],
      moderationStatusTab: [],
      groups: [],
      inquiryTypeRights: {},
      moderatorRights: { ...re },
      officialRights: { ...se },
      status: { loadingGroups: false },
    }),
    actions: {
      async load() {
        try {
          const t = (await d.getAppSettings()).data.appSettings
          return (this.$patch(t), t)
        } catch (e) {
          c.error('Error getting appSettings', { error: e })
        }
      },
      async write() {
        try {
          const e = await d.writeAppSettings(this.$state)
          this.$patch(e.data.appSettings)
        } catch (e) {
          if (e?.code === 'ERR_CANCELED') return
          throw (c.error('Error writing appSettings', { error: e, appSettings: this.$state }), e)
        }
      },
      loadGroups(e) {
        this.$debounce(async () => {
          this.status.loadingGroups = true
          try {
            const r = await d.getGroups(e)
            ;((this.groups = r.data.groups), (this.status.loadingGroups = false))
          } catch (r) {
            if (r?.code === 'ERR_CANCELED') return
            ;(c.error('Error getting groups', { error: r }), (this.status.loadingGroups = false))
          }
        }, 500)()
      },
      getStatusesForInquiryType(e) {
        return this.moderationStatusTab
          .filter((t) => t.inquiryType === e)
          .sort((t, r) => (t.order || 0) - (r.order || 0))
      },
      async addStatusForInquiryType(e, t) {
        const a = this.getStatusesForInquiryType(e).length,
          s = { inquiryType: e, ...t, order: a }
        try {
          const o = await d.addModerationStatus(s)
          o.data.moderationStatus
            ? this.moderationStatusTab.push(o.data.moderationStatus)
            : this.moderationStatusTab.push(s)
        } catch (o) {
          ;(c.error('Error adding moderation status', { error: o }),
            this.moderationStatusTab.push(s))
        }
      },
      async updateStatusForInquiryType(e, t, r) {
        const a = this.moderationStatusTab.findIndex((o) => o.inquiryType === e && o.id === t)
        if (a === -1) return
        const s = { ...this.moderationStatusTab[a] }
        this.moderationStatusTab[a] = { ...this.moderationStatusTab[a], ...r }
        try {
          await d.updateModerationStatus(t, { ...s, ...r })
        } catch (o) {
          ;(c.error('Error updating moderation status', { error: o }),
            (this.moderationStatusTab[a] = s))
        }
      },
      async deleteStatusForInquiryType(e, t) {
        ;((this.moderationStatusTab = this.moderationStatusTab.filter(
          (r) => !(r.inquiryType === e && r.id === t)
        )),
          this.reorderStatuses(e))
        try {
          await d.deleteModerationStatus(t)
        } catch (r) {
          ;(c.error('Error deleting moderation status', { error: r }),
            this.moderationStatusTab.splice(backupIndex, 0, backupStatus),
            this.reorderStatuses(e))
        }
      },
      reorderStatuses(e) {
        this.getStatusesForInquiryType(e).forEach((r, a) => {
          const s = this.moderationStatusTab.findIndex(
            (o) => o.inquiryType === e && o.id === r.statusId
          )
          s !== -1 && (this.moderationStatusTab[s].order = a)
        })
      },
      moveStatusUp(e, t) {
        const r = this.getStatusesForInquiryType(e),
          a = r.findIndex((s) => s.id === t)
        if (a > 0) {
          const s = r[a - 1],
            o = r[a],
            u = this.moderationStatusTab.findIndex(
              (i) => i.inquiryType === e && i.statusId === s.statusId
            ),
            n = this.moderationStatusTab.findIndex(
              (i) => i.inquiryType === e && i.statusId === o.statusId
            )
          if (u !== -1 && n !== -1) {
            const i = this.moderationStatusTab[n].order
            ;((this.moderationStatusTab[n].order = this.moderationStatusTab[u].order),
              (this.moderationStatusTab[u].order = i))
          }
          this.reorderStatuses(e)
        }
      },
      moveStatusDown(e, t) {
        const r = this.getStatusesForInquiryType(e),
          a = r.findIndex((s) => s.id === t)
        if (a < r.length - 1) {
          const s = r[a + 1],
            o = r[a],
            u = this.moderationStatusTab.findIndex(
              (i) => i.inquiryType === e && i.statusId === s.statusId
            ),
            n = this.moderationStatusTab.findIndex(
              (i) => i.inquiryType === e && i.statusId === o.statusId
            )
          if (u !== -1 && n !== -1) {
            const i = this.moderationStatusTab[n].order
            ;((this.moderationStatusTab[n].order = this.moderationStatusTab[u].order),
              (this.moderationStatusTab[u].order = i))
          }
          this.reorderStatuses(e)
        }
      },
      async addCategory(e, t = 0) {
        const a =
          (this.categoryTab.length > 0 ? Math.max(...this.categoryTab.map((s) => s.id)) : 0) + 1
        try {
          ;(await d.addCategory({ name: e, parentId: t }),
            this.categoryTab.push({ id: a, name: e, parentId: t }))
        } catch (s) {
          c.error('Error getting appSettings', { error: s })
        }
      },
      async updateCategory(e, t, r) {
        const a = this.categoryTab.find((s) => s.id === e)
        try {
          ;(await d.updateCategory(e, t, r), a && ((a.name = t), (a.parentId = r)))
        } catch (s) {
          c.error('Error getting appSettings', { error: s })
        }
      },
      async deleteCategory(e) {
        const t = (r) => {
          ;(this.categoryTab
            .filter((s) => s.parentId === r)
            .forEach((s) => {
              t(s.id)
            }),
            (this.categoryTab = this.categoryTab.filter((s) => s.id !== r)))
        }
        try {
          ;(await d.deleteCategory(e), t(e))
        } catch (r) {
          c.error('Error deleting category', { error: r })
        }
      },
      async addLocation(e, t = 0) {
        const a =
          (this.locationTab.length > 0 ? Math.max(...this.locationTab.map((s) => s.id)) : 0) + 1
        try {
          ;(await d.addLocation({ name: e, parentId: t }),
            this.locationTab.push({ id: a, name: e, parentId: t }))
        } catch (s) {
          c.error('Error getting appSettings', { error: s })
        }
      },
      async updateLocation(e, t, r) {
        const a = this.locationTab.find((s) => s.id === e)
        try {
          ;(await d.updateLocation(e, t, r), a && ((a.name = t), (a.parentId = r)))
        } catch (s) {
          c.error('Error getting appSettings', { error: s })
        }
      },
      async deleteLocation(e) {
        const t = (r) => {
          ;(this.locationTab
            .filter((s) => s.parentId === r)
            .forEach((s) => {
              t(s.id)
            }),
            (this.locationTab = this.locationTab.filter((s) => s.id !== r)))
        }
        try {
          ;(await d.deleteLocation(e), t(e))
        } catch (r) {
          c.error('Error deleting location', { error: r })
        }
      },
      buildTree(e, t = 0) {
        return e
          .filter((r) => r.parentId === t)
          .map((r) => ({ ...r, children: this.buildTree(e, r.id) }))
      },
      getParentOptions(e, t = null) {
        const r = e === 'category' ? this.categoryTab : this.locationTab,
          a = this.buildTree(r),
          s = [{ id: 0, name: 'No parent' }],
          o = (u, n = 0) => {
            let i = []
            return (
              u.forEach((l) => {
                ;(l.id !== t && i.push({ id: l.id, name: `${'--'.repeat(n)} ${l.name}` }),
                  l.children && l.children.length > 0 && (i = i.concat(o(l.children, n + 1))))
              }),
              i
            )
          }
        return s.concat(o(a))
      },
    },
  }),
  ge = { class: 'card-content' },
  me = { class: 'left-card-side' },
  ye = { class: 'right-card-side' },
  Se = b({
    __name: 'CardDiv',
    setup(e) {
      return (t, r) => (
        p(),
        _(
          v(te),
          j(H(t.$attrs)),
          {
            default: C(() => [
              h('div', ge, [
                h('div', me, [T(t.$slots, 'default')]),
                h('div', ye, [T(t.$slots, 'button')]),
              ]),
            ]),
            _: 3,
          },
          16
        )
      )
    },
  }),
  Te = { class: 'radio-group-div' },
  Ie = b({
    __name: 'RadioGroupDiv',
    props: E({ id: {}, options: {} }, { modelValue: { required: true }, modelModifiers: {} }),
    emits: E(['update'], ['update:modelValue']),
    setup(e, { emit: t }) {
      const r = J(e, 'modelValue'),
        a = () =>
          Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .slice(2, 12),
        s = t,
        o = w(() => e.id ?? `rg-${a()}`)
      return (u, n) => (
        p(),
        S('div', Te, [
          (p(true),
          S(
            K,
            null,
            W(
              u.options,
              (i, l) => (
                p(),
                _(
                  v(X),
                  {
                    key: i.value,
                    modelValue: r.value,
                    'onUpdate:modelValue': [
                      n[0] || (n[0] = (y) => (r.value = y)),
                      n[1] || (n[1] = (y) => s('update')),
                    ],
                    value: i.value,
                    name: o.value + l,
                    type: 'radio',
                  },
                  { default: C(() => [Q(q(i.label), 1)]), _: 2 },
                  1032,
                  ['modelValue', 'value', 'name']
                )
              )
            ),
            128
          )),
        ])
      )
    },
  })
export {
  A as C,
  Ie as _,
  Se as a,
  fe as b,
  he as c,
  pe as d,
  de as e,
  ue as f,
  ne as g,
  ce as h,
  le as i,
  I as u,
}
//# sourceMappingURL=markdown-COVOixFZ.chunk.mjs.map
