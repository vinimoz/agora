;(function () {
  'use strict'
  try {
    if (typeof document != 'undefined') {
      var elementStyle = document.createElement('style')
      elementStyle.appendChild(
        document.createTextNode(
          '.inquiry-item__item[data-v-43039805] {\n  display: flex;\n  padding: 4px 0;\n}\n.inquiry-item__item.active[data-v-43039805] {\n  background-color: var(--color-primary-element-light);\n}\n.inquiry-item__item[data-v-43039805]:hover {\n  background-color: var(--color-background-hover);\n}\n.item__title[data-v-43039805] {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.item__title[data-v-43039805] * {\n  display: block;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.item__title .item__title__description[data-v-43039805] {\n  opacity: 0.5;\n}\n.item__icon-spacer[data-v-43039805] {\n  width: 44px;\n  min-width: 44px;\n}/*!\n * SPDX-FileCopyrightText: 2025 Trappe Vincent \n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n.icon-agora {\n  background-image: url(../img/agora.svg);\n  filter: var(--background-invert-if-dark);\n}\n\n.icon-agora-dark {\n  background-image: url(../img/agora-dark.svg);\n  filter: var(--background-invert-if-dark);\n}'
        )
      )
      document.head.appendChild(elementStyle)
    }
  } catch (e) {
    console.error('vite-plugin-css-injected-by-js', e)
  }
})()
const O = 'agora',
  W = '1.0.0rc4'
import {
  d as m,
  t as o,
  b as h,
  c as g,
  o as n,
  f as d,
  w as c,
  a as s,
  u as e,
  C as u,
  e as l,
  s as f,
  z as _,
  D as y,
  _ as b,
  h as v,
  p as q,
} from './NcEmptyContent-q-geAf0w-DsDiM4c8.chunk.mjs'
import {
  a as D,
  I as C,
  N as w,
  L as x,
  s as I,
} from './NcDashboardWidget-Wkx_9xKh-DfVZeYPI.chunk.mjs'
import { _ as L } from './AgoraAppIcon.vue_vue_type_script_setup_true_lang-DNUd1xzt.chunk.mjs'

const N = ['href'],
  M = { class: 'inquiry-item__item' },
  A = { class: 'type-icon' },
  B = { class: 'item__title' },
  E = { class: 'item__title__title' },
  k = { class: 'item__title__description' },
  S = m({
    __name: 'Dashboard',
    setup(r) {
      const a = {
          emptyContentMessage: o('agora', 'No inquiries found for this category'),
          showMoreText: o('agora', 'Relevant inquiries'),
        },
        i = D()
      function p() {
        x.debug('Loading inquiries in dashboard widget')
        try {
          i.load()
        } catch {
          I(o('agora', 'Error setting dashboard list'))
        }
      }
      return (
        h(() => {
          p()
        }),
        (V, z) => (
          n(),
          g('div', null, [
            d(
              e(w),
              {
                items: e(i).dashboardList,
                'empty-content-message': a.emptyContentMessage,
                'show-more-text': a.showMoreText,
                loading: e(i).inquiriesLoading,
              },
              {
                emptyContentIcon: c(() => [d(e(L))]),
                default: c(({ item: t }) => [
                  s(
                    'a',
                    { href: e(u)(`/apps/agora/inquiry/${t.id}`) },
                    [
                      s('div', M, [
                        s('div', A, [(n(), l(f(e(C)[t.type].icon)))]),
                        s('div', B, [
                          s('div', E, _(t.title), 1),
                          s(
                            'div',
                            k,
                            _(
                              e(y).sanitize(
                                t.description
                                  ? t.description
                                  : e(o)('agora', 'No description provided')
                              )
                            ),
                            1
                          ),
                        ]),
                      ]),
                    ],
                    8,
                    N
                  ),
                ]),
                _: 1,
              },
              8,
              ['items', 'empty-content-message', 'show-more-text', 'loading']
            ),
          ])
        )
      )
    },
  }),
  T = b(S, [['__scopeId', 'data-v-43039805']])
document.addEventListener('DOMContentLoaded', () => {
  OCA.Dashboard.register('agora', (r) => v(T).use(q).mount(r))
})
//# sourceMappingURL=agora-dashboard.mjs.map
