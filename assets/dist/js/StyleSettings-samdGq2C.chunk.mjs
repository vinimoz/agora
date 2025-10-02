;(function () {
  'use strict'
  try {
    if (typeof document != 'undefined') {
      var elementStyle = document.createElement('style')
      elementStyle.appendChild(
        document.createTextNode(
          '.bully {\n  display: inline-block;\n  width: 11px;\n  height: 11px;\n  border-radius: 50%;\n  margin: 0 4px 0 0;\n}'
        )
      )
      document.head.appendChild(elementStyle)
    }
  } catch (e) {
    console.error('vite-plugin-css-injected-by-js', e)
  }
})()
const A = 'agora',
  h = '1.0.0rc4'
import { I as w } from './index-CnGEXeag.chunk.mjs'
import { u as g } from './NcDashboardWidget-Wkx_9xKh-DfVZeYPI.chunk.mjs'
import {
  k as V,
  c as p,
  o as y,
  a as n,
  f as l,
  w as u,
  B as d,
  z as a,
  u as e,
  t as r,
} from './NcEmptyContent-q-geAf0w-DsDiM4c8.chunk.mjs'
import { N as m } from './NcRichText-G8kzsdwx-DWCeYxXp.chunk.mjs'
const _ = { class: 'user_settings' },
  q = { class: 'settings_details' },
  I = { class: 'user_settings' },
  b = { class: 'settings_details' },
  N = { class: 'user_settings' },
  S = {
    __name: 'FeatureSettings',
    setup(f) {
      const s = g(),
        v = V({
          get() {
            return s.user.defaultViewInquiry === 'list-view'
          },
          set(i) {
            s.user.defaultViewInquiry = i ? 'list-view' : 'table-view'
          },
        })
      return (i, t) => (
        y(),
        p('div', null, [
          n('div', _, [
            l(
              e(m),
              {
                modelValue: v.value,
                'onUpdate:modelValue': [
                  t[0] || (t[0] = (o) => (v.value = o)),
                  t[1] || (t[1] = (o) => e(s).write()),
                ],
                type: 'switch',
              },
              {
                default: u(() => [
                  d(a(e(r)('agora', 'Proposal agora inquiry default view to list view')), 1),
                ]),
                _: 1,
              },
              8,
              ['modelValue']
            ),
            n(
              'div',
              q,
              a(
                e(r)(
                  'agora',
                  'Check this, if you prefer to display text inquiry in grid view. The initial default is list view.'
                )
              ),
              1
            ),
          ]),
          n('div', I, [
            l(
              e(m),
              {
                modelValue: e(s).user.verboseInquiriesList,
                'onUpdate:modelValue': [
                  t[2] || (t[2] = (o) => (e(s).user.verboseInquiriesList = o)),
                  t[3] || (t[3] = (o) => e(s).write()),
                ],
                type: 'switch',
              },
              { default: u(() => [d(a(e(r)('agora', 'Verbose inquiry list')), 1)]), _: 1 },
              8,
              ['modelValue']
            ),
            n(
              'div',
              b,
              a(e(r)('agora', 'Check this for more inquiry information in the overview.')),
              1
            ),
          ]),
          n('div', N, [
            l(
              e(w),
              {
                modelValue: e(s).user.relevantOffset,
                'onUpdate:modelValue': t[4] || (t[4] = (o) => (e(s).user.relevantOffset = o)),
                type: 'number',
                inputmode: 'numeric',
                'use-num-modifiers': '',
                label: e(r)(
                  'agora',
                  'Enter the amount of days, inquiries without activity stay in the relevant list:'
                ),
                onChange: t[5] || (t[5] = (o) => e(s).write()),
              },
              null,
              8,
              ['modelValue', 'label']
            ),
          ]),
        ])
      )
    },
  },
  $ = { class: 'user_settings' },
  U = { class: 'user_settings' },
  x = { class: 'user_settings' },
  C = { class: 'user_settings' },
  k = {
    __name: 'StyleSettings',
    setup(f) {
      const s = g()
      return (v, i) => (
        y(),
        p('div', null, [
          n('b', null, a(e(r)('agora', 'The style settings are still experimental!')), 1),
          n('div', $, [
            l(
              e(m),
              {
                modelValue: e(s).user.useNewInquiryDialogInNavigation,
                'onUpdate:modelValue': [
                  i[0] || (i[0] = (t) => (e(s).user.useNewInquiryDialogInNavigation = t)),
                  i[1] || (i[1] = (t) => e(s).write()),
                ],
                type: 'switch',
              },
              {
                default: u(() => [
                  d(
                    a(
                      e(r)(
                        'agora',
                        "Use modal 'Add inquiry ' dialog instead of embedded dialog in Navigation bar"
                      )
                    ),
                    1
                  ),
                ]),
                _: 1,
              },
              8,
              ['modelValue']
            ),
          ]),
          n('div', U, [
            l(
              e(m),
              {
                modelValue: e(s).user.useNewInquiryInInquiryist,
                'onUpdate:modelValue': [
                  i[2] || (i[2] = (t) => (e(s).user.useNewInquiryInInquiryist = t)),
                  i[3] || (i[3] = (t) => e(s).write()),
                ],
                type: 'switch',
              },
              {
                default: u(() => [
                  d(
                    a(
                      e(r)(
                        'agora',
                        "Use 'Add inquiry ' as button in inquiry list instead of inside the navigation"
                      )
                    ),
                    1
                  ),
                ]),
                _: 1,
              },
              8,
              ['modelValue']
            ),
          ]),
          n('div', x, [
            l(
              e(m),
              {
                modelValue: e(s).user.useCommentsAlternativeStyling,
                'onUpdate:modelValue': [
                  i[4] || (i[4] = (t) => (e(s).user.useCommentsAlternativeStyling = t)),
                  i[5] || (i[5] = (t) => e(s).write()),
                ],
                type: 'switch',
              },
              {
                default: u(() => [
                  d(a(e(r)('agora', 'Use alternative styling for the comments sidebar')), 1),
                ]),
                _: 1,
              },
              8,
              ['modelValue']
            ),
          ]),
          n('div', C, [
            l(
              e(m),
              {
                modelValue: e(s).user.useAlternativeStyling,
                'onUpdate:modelValue': [
                  i[6] || (i[6] = (t) => (e(s).user.useAlternativeStyling = t)),
                  i[7] || (i[7] = (t) => e(s).write()),
                ],
                type: 'switch',
              },
              {
                default: u(() => [d(a(e(r)('agora', 'Use alternative inquiry page styling')), 1)]),
                _: 1,
              },
              8,
              ['modelValue']
            ),
          ]),
        ])
      )
    },
  }
export { S as _, k as a }
//# sourceMappingURL=StyleSettings-samdGq2C.chunk.mjs.map
