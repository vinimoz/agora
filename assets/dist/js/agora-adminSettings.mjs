;(function () {
  'use strict'
  try {
    if (typeof document != 'undefined') {
      var elementStyle = document.createElement('style')
      elementStyle.appendChild(
        document.createTextNode(
          '.disclaimer_group {\n  display: flex;\n  align-items: center;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.disclaimer_group .grow_title {\n  display: flex;\n  flex-grow: 1;\n  margin-inline-end: 12px;\n}\n.disclaimer_group .grow_title .material-design-icon {\n  margin-inline-start: 4px;\n}.user_settings {\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.user_settings .job_buttons_section {\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 20px;\n  gap: 12px;\n}\n.user_settings .job_hints p {\n  margin-bottom: 0.5em;\n}\n.tree-item[data-v-a358f3ad] {\n  margin-bottom: 8px;\n}\n.tree-node[data-v-a358f3ad] {\n  display: flex;\n  align-items: center;\n  padding: 8px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.tree-label[data-v-a358f3ad] {\n  flex-grow: 1;\n  font-weight: bold;\n}\n.tree-actions[data-v-a358f3ad] {\n  display: flex;\n  gap: 8px;\n}\n.tree-children[data-v-a358f3ad] {\n  margin-left: 20px;\n  margin-top: 8px;\n}\n\n/* Vos styles existants */\n.category-location-manager[data-v-e2c84539] {\n  padding: 20px;\n}\n.tabs[data-v-e2c84539] {\n  display: flex;\n  margin-bottom: 20px;\n  border-bottom: 1px solid var(--color-border);\n}\n.tabs button[data-v-e2c84539] {\n  padding: 10px 20px;\n  border: none;\n  background: none;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n}\n.tabs button.active[data-v-e2c84539] {\n  border-bottom-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.tab-content[data-v-e2c84539] {\n  margin-top: 20px;\n}\n.add-form[data-v-e2c84539] {\n  margin-bottom: 30px;\n  padding: 20px;\n  background: var(--color-background-dark);\n  border-radius: 8px;\n}\n.form-fields[data-v-e2c84539] {\n  display: flex;\n  gap: 15px;\n  align-items: end;\n}\n.tree-view[data-v-e2c84539] {\n  margin-top: 30px;\n}\n.tree-container[data-v-e2c84539] {\n  margin-top: 15px;\n}\n.loading[data-v-e2c84539],\n.error[data-v-e2c84539] {\n  text-align: center;\n  padding: 40px;\n  color: var(--color-text-lighter);\n}\n.error[data-v-e2c84539] {\n  color: var(--color-error);\n}\n.modal[data-v-e2c84539] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.modal-content[data-v-e2c84539] {\n  background: var(--color-main-background);\n  padding: 30px;\n  border-radius: 12px;\n  min-width: 400px;\n}\n.modal-actions[data-v-e2c84539] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n}\n\n.inquiry-rights-management[data-v-54fc3f18] {\n  padding: 20px;\n  max-width: 700px;\n}\n.description[data-v-54fc3f18] {\n  color: var(--color-text-lighter);\n  margin-bottom: 25px;\n}\n.loading[data-v-54fc3f18],\n.error[data-v-54fc3f18] {\n  padding: 20px;\n  text-align: center;\n  color: var(--color-text-lighter);\n}\n.type-selection[data-v-54fc3f18] {\n  margin-bottom: 30px;\n}\n.type-selection label[data-v-54fc3f18] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: bold;\n}\n.type-select[data-v-54fc3f18] {\n  max-width: 300px;\n}\n.settings-container[data-v-54fc3f18] {\n  padding: 20px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.settings-container h3[data-v-54fc3f18] {\n  margin-top: 0;\n  margin-bottom: 20px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid var(--color-border);\n}\n.settings-list[data-v-54fc3f18] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.setting-item[data-v-54fc3f18] {\n  padding: 15px;\n  background-color: var(--color-background-darker);\n  border-radius: 8px;\n}\n.setting-item label[data-v-54fc3f18] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: bold;\n}\n.editor-select[data-v-54fc3f18] {\n  max-width: 250px;\n  margin-top: 8px;\n}\n.setting-description[data-v-54fc3f18] {\n  margin: 8px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  padding-left: 36px;\n}\n\n.rights-management[data-v-bd584daa] {\n  padding: 20px;\n  max-width: 700px;\n}\n.description[data-v-bd584daa] {\n  color: var(--color-text-lighter);\n  margin-bottom: 25px;\n}\n.rights-list[data-v-bd584daa] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.right-item[data-v-bd584daa] {\n  padding: 15px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.right-description[data-v-bd584daa] {\n  margin: 8px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  padding-left: 36px;\n}\n\n.rights-management[data-v-cee931a9] {\n  padding: 20px;\n  max-width: 700px;\n}\n.description[data-v-cee931a9] {\n  color: var(--color-text-lighter);\n  margin-bottom: 25px;\n}\n.rights-list[data-v-cee931a9] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.right-item[data-v-cee931a9] {\n  padding: 15px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.right-description[data-v-cee931a9] {\n  margin: 8px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  padding-left: 36px;\n}\n\n.moderation-status-settings[data-v-ae9c1d22] {\n	padding: 20px;\n	max-width: 1000px;\n}\n.settings-description[data-v-ae9c1d22] {\n	margin-bottom: 25px;\n	color: var(--color-text-lighter);\n}\n.inquiry-type-selector[data-v-ae9c1d22] {\n	margin-bottom: 30px;\n	padding: 20px;\n	background-color: var(--color-background-dark);\n	border-radius: 8px;\n}\n.status-list[data-v-ae9c1d22] {\n	margin-bottom: 30px;\n	padding: 20px;\n	background-color: var(--color-background-dark);\n	border-radius: 8px;\n}\n.empty-state[data-v-ae9c1d22] {\n	text-align: center;\n	padding: 40px;\n	color: var(--color-text-lighter);\n}\n.status-items[data-v-ae9c1d22] {\n	display: flex;\n	flex-direction: column;\n	gap: 15px;\n}\n.status-item[data-v-ae9c1d22] {\n	display: flex;\n	justify-content: space-between;\n	align-items: center;\n	padding: 15px;\n	background-color: var(--color-background-darker);\n	border-radius: 8px;\n	border-left: 4px solid var(--color-primary);\n}\n.status-content[data-v-ae9c1d22] {\n	display: flex;\n	align-items: flex-start;\n	gap: 15px;\n	flex: 1;\n}\n.status-icon[data-v-ae9c1d22] {\n	width: 40px;\n	height: 40px;\n	display: flex;\n	align-items: center;\n	justify-content: center;\n	background-color: var(--color-primary);\n	color: white;\n	border-radius: 8px;\n	flex-shrink: 0;\n}\n.status-icon[data-v-ae9c1d22] svg {\n	fill: white;\n}\n.status-info h4[data-v-ae9c1d22] {\n	margin: 0 0 5px 0;\n	font-weight: 600;\n}\n.status-key[data-v-ae9c1d22] {\n	margin: 0 0 8px 0;\n	font-size: 0.9em;\n	color: var(--color-text-lighter);\n	font-family: monospace;\n}\n.status-description[data-v-ae9c1d22] {\n	margin: 0 0 10px 0;\n	color: var(--color-text-lighter);\n	font-size: 0.95em;\n}\n.status-properties[data-v-ae9c1d22] {\n	display: flex;\n	gap: 10px;\n}\n.status-badge[data-v-ae9c1d22] {\n	padding: 4px 8px;\n	border-radius: 12px;\n	font-size: 0.8em;\n	font-weight: 600;\n}\n.status-badge.final[data-v-ae9c1d22] {\n	background-color: var(--color-success);\n	color: white;\n}\n.status-badge.non-final[data-v-ae9c1d22] {\n	background-color: var(--color-warning);\n	color: white;\n}\n.status-actions[data-v-ae9c1d22] {\n	display: flex;\n	gap: 8px;\n	flex-wrap: wrap;\n}\n.add-status-form[data-v-ae9c1d22] {\n	padding: 20px;\n	background-color: var(--color-background-dark);\n	border-radius: 8px;\n}\n.form-grid[data-v-ae9c1d22] {\n	display: grid;\n	grid-template-columns: 1fr 1fr;\n	gap: 20px;\n	align-items: start;\n}\n.checkbox-field[data-v-ae9c1d22] {\n	grid-column: span 2;\n}\n.field-description[data-v-ae9c1d22] {\n	margin: 5px 0 0 0;\n	font-size: 0.9em;\n	color: var(--color-text-lighter);\n}\n.modal-overlay[data-v-ae9c1d22] {\n	position: fixed;\n	top: 0;\n	left: 0;\n	right: 0;\n	bottom: 0;\n	background-color: rgba(0, 0, 0, 0.5);\n	display: flex;\n	justify-content: center;\n	align-items: center;\n	z-index: 1000;\n}\n.modal-content[data-v-ae9c1d22] {\n	background-color: var(--color-main-background);\n	padding: 30px;\n	border-radius: 12px;\n	width: 600px;\n	max-width: 90%;\n	max-height: 90vh;\n	overflow-y: auto;\n}\n.modal-actions[data-v-ae9c1d22] {\n	display: flex;\n	justify-content: flex-end;\n	gap: 10px;\n	margin-top: 25px;\n	padding-top: 20px;\n	border-top: 1px solid var(--color-border);\n}\n@media (max-width: 768px) {\n.form-grid[data-v-ae9c1d22] {\n		  grid-template-columns: 1fr;\n}\n.status-item[data-v-ae9c1d22] {\n		  flex-direction: column;\n		  align-items: stretch;\n		  gap: 15px;\n}\n.status-actions[data-v-ae9c1d22] {\n		  justify-content: center;\n}\n}'
        )
      )
      document.head.appendChild(elementStyle)
    }
  } catch (e) {
    console.error('vite-plugin-css-injected-by-js', e)
  }
})()
const ol = 'agora',
  il = '1.0.0rc4'
import {
  c,
  o as p,
  f as i,
  w as u,
  B as m,
  z as n,
  u as e,
  t,
  e as F,
  x as k,
  _ as D,
  a as s,
  v as ce,
  P as U,
  k as A,
  D as ge,
  Q as se,
  S as ne,
  T as me,
  U as C,
  L as G,
  d as H,
  V as ve,
  y as ye,
  M as Z,
  b as Q,
  I as ae,
  q as re,
  s as fe,
  n as N,
  g as R,
  h as _e,
  p as be,
} from './NcEmptyContent-q-geAf0w-DsDiM4c8.chunk.mjs'
import { I as W, N as T } from './index-CnGEXeag.chunk.mjs'
import {
  m as de,
  g as he,
  d as le,
  L as oe,
  I as z,
  e as X,
  S as ie,
} from './NcDashboardWidget-Wkx_9xKh-DfVZeYPI.chunk.mjs'
import { F as Ve } from './FlexSettings-Dk7Etco1.chunk.mjs'
import { u as I, _ as $e, a as we } from './markdown-COVOixFZ.chunk.mjs'
import { N as q, a as M, b as L } from './NcRichText-G8kzsdwx-DWCeYxXp.chunk.mjs'
const Se = { class: 'user_settings' },
  qe = {
    __name: 'AdminActivities',
    setup(_) {
      const a = I()
      return (r, l) => (
        p(),
        c('div', Se, [
          i(
            e(q),
            {
              modelValue: e(a).useActivity,
              'onUpdate:modelValue': [
                l[0] || (l[0] = (o) => (e(a).useActivity = o)),
                l[1] || (l[1] = (o) => e(a).write()),
              ],
              type: 'switch',
            },
            {
              default: u(() => [
                m(
                  n(e(t)('inquiries', 'Enable the tracking of activities with the Activities app')),
                  1
                ),
              ]),
              _: 1,
            },
            8,
            ['modelValue']
          ),
        ])
      )
    },
  },
  Ie = { class: 'user_settings' },
  Ae = {
    __name: 'AdminArchiveInquiries',
    setup(_) {
      const a = I()
      return (r, l) => (
        p(),
        c('div', Ie, [
          i(
            e(q),
            {
              modelValue: e(a).autoArchive,
              'onUpdate:modelValue': [
                l[0] || (l[0] = (o) => (e(a).autoArchive = o)),
                l[1] || (l[1] = (o) => e(a).write()),
              ],
              type: 'switch',
            },
            {
              default: u(() => [m(n(e(t)('agora', 'Enable the automatic inquiry archiving')), 1)]),
              _: 1,
            },
            8,
            ['modelValue']
          ),
          e(a).autoArchive
            ? (p(),
              F(
                e(W),
                {
                  key: 0,
                  modelValue: e(a).autoArchiveOffset,
                  'onUpdate:modelValue': l[2] || (l[2] = (o) => (e(a).autoArchiveOffset = o)),
                  class: 'settings_details',
                  type: 'number',
                  inputmode: 'numeric',
                  'use-num-modifiers': '',
                  label: e(t)(
                    'agora',
                    'Days after which inquiries should be archived after closing'
                  ),
                  onChange: l[3] || (l[3] = (o) => e(a).write()),
                },
                null,
                8,
                ['modelValue', 'label']
              ))
            : k('', true),
        ])
      )
    },
  },
  ke = { class: 'user_settings' },
  Ce = {
    __name: 'AdminDeleteInquiries',
    setup(_) {
      const a = I()
      return (r, l) => (
        p(),
        c('div', ke, [
          i(
            e(q),
            {
              modelValue: e(a).autoDelete,
              'onUpdate:modelValue': [
                l[0] || (l[0] = (o) => (e(a).autoDelete = o)),
                l[1] || (l[1] = (o) => e(a).write()),
              ],
              type: 'switch',
            },
            {
              default: u(() => [
                m(n(e(t)('agora', 'Enable the automatic deletion of archived inquiries')), 1),
              ]),
              _: 1,
            },
            8,
            ['modelValue']
          ),
          e(a).autoDelete
            ? (p(),
              F(
                e(W),
                {
                  key: 0,
                  modelValue: e(a).autoDeleteOffset,
                  'onUpdate:modelValue': l[2] || (l[2] = (o) => (e(a).autoDeleteOffset = o)),
                  class: 'settings_details',
                  type: 'number',
                  inputmode: 'numeric',
                  'use-num-modifiers': '',
                  label: e(t)(
                    'inquiries',
                    'Days after which archived inquiries should be finally deleted'
                  ),
                  onChange: l[3] || (l[3] = (o) => e(a).write()),
                },
                null,
                8,
                ['modelValue', 'label']
              ))
            : k('', true),
        ])
      )
    },
  },
  Ue = {
    name: 'LanguageMarkdownIcon',
    emits: ['click'],
    props: {
      title: { type: String },
      fillColor: { type: String, default: 'currentColor' },
      size: { type: Number, default: 24 },
    },
  },
  Le = ['aria-hidden', 'aria-label'],
  Te = ['fill', 'width', 'height'],
  xe = {
    d: 'M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6H20.56C21.35 6 22 6.63 22 7.41V16.59C22 17.37 21.35 18 20.56 18M6.81 15.19V11.53L8.73 13.88L10.65 11.53V15.19H12.58V8.81H10.65L8.73 11.16L6.81 8.81H4.89V15.19H6.81M19.69 12H17.77V8.81H15.85V12H13.92L16.81 15.28L19.69 12Z',
  },
  Ee = { key: 0 }
function Ne(_, a, r, l, o, b) {
  return (
    p(),
    c(
      'span',
      ce(_.$attrs, {
        'aria-hidden': r.title ? null : 'true',
        'aria-label': r.title,
        class: 'material-design-icon language-markdown-icon',
        role: 'img',
        onClick: a[0] || (a[0] = (h) => _.$emit('click', h)),
      }),
      [
        (p(),
        c(
          'svg',
          {
            fill: r.fillColor,
            class: 'material-design-icon__svg',
            width: r.size,
            height: r.size,
            viewBox: '0 0 24 24',
          },
          [s('path', xe, [r.title ? (p(), c('title', Ee, n(r.title), 1)) : k('', true)])],
          8,
          Te
        )),
      ],
      16,
      Le
    )
  )
}
const Re = D(Ue, [['render', Ne]]),
  Me = { class: 'user_settings' },
  Oe = { class: 'disclaimer_group' },
  De = { class: 'grow_title' },
  Fe = ['innerHTML'],
  Pe = {
    __name: 'AdminEmail',
    setup(_) {
      const a = I(),
        r = { prefix: 'disclaimer-' },
        l = U(false),
        o = A(() => (de.use(he(r)), ge.sanitize(de.parse(a.disclaimer))))
      return (b, h) => (
        p(),
        c('div', Me, [
          i(
            e(q),
            {
              modelValue: e(a).legalTermsInEmail,
              'onUpdate:modelValue': [
                h[0] || (h[0] = (g) => (e(a).legalTermsInEmail = g)),
                h[1] || (h[1] = (g) => e(a).write()),
              ],
              type: 'switch',
            },
            {
              default: u(() => [
                m(n(e(t)('agora', 'Add terms links also to the email footer')), 1),
              ]),
              _: 1,
            },
            8,
            ['modelValue']
          ),
          s('div', Oe, [
            s('div', De, [
              s('span', null, n(e(t)('agora', 'Additional email disclaimer')), 1),
              i(Re),
            ]),
            i(
              e(q),
              {
                modelValue: l.value,
                'onUpdate:modelValue': h[2] || (h[2] = (g) => (l.value = g)),
                type: 'switch',
                onChange: h[3] || (h[3] = (g) => e(a).write()),
              },
              { default: u(() => [m(n(e(t)('agora', 'Preview')), 1)]), _: 1 },
              8,
              ['modelValue']
            ),
          ]),
          se(
            s(
              'textarea',
              {
                'onUpdate:modelValue': h[4] || (h[4] = (g) => (e(a).disclaimer = g)),
                onChange: h[5] || (h[5] = (g) => e(a).write()),
              },
              null,
              544
            ),
            [
              [ne, !l.value],
              [me, e(a).disclaimer],
            ]
          ),
          se(s('div', { class: 'inquiries-markdown', innerHTML: o.value }, null, 8, Fe), [
            [ne, l.value],
          ]),
        ])
      )
    },
  },
  je = { class: 'user_settings' },
  Ke = { class: 'job_hints' },
  Ge = { class: 'job_buttons_section' },
  He = {
    __name: 'AdminJobs',
    setup(_) {
      const a = { text: t('agora', 'Run autoreminder'), disabled: false },
        r = { text: t('agora', 'Run janitor'), disabled: false },
        l = { text: t('agora', 'Run notification'), disabled: false }
      async function o() {
        try {
          ;(le.runAutoReminder(),
            (a.disabled = true),
            (a.text = t('agora', 'Autoreminder started')))
        } catch (g) {
          ;((a.text = t('agora', 'Autoreminder failed')),
            oe.error('Error on executing autoreminder job', { error: g }))
        } finally {
          a.disabled = true
        }
      }
      async function b() {
        try {
          ;(le.runJanitor(), (r.text = t('agora', 'Janitor started')))
        } catch (g) {
          ;((r.text = t('agora', 'Janitor failed')),
            oe.error('Error on executing janitor job', { error: g }))
        } finally {
          r.disabled = true
        }
      }
      async function h() {
        try {
          ;(le.runNotification(), (l.text = t('agora', 'Notification started')))
        } catch (g) {
          ;((l.text = t('agora', 'Notification failed')),
            oe.error('Error on executing notification job', { error: g }))
        } finally {
          l.disabled = true
        }
      }
      return (g, d) => (
        p(),
        c('div', je, [
          s('div', Ke, [
            s(
              'p',
              null,
              n(
                e(t)(
                  'agora',
                  'Please understand, that the jobs were defined as asynchronous jobs by intention.'
                )
              ) +
                ' ' +
                n(
                  e(t)(
                    'agora',
                    'Only use them, if it is absolutely neccessary (i.error. your cron does not work properly) or for testing.'
                  )
                ) +
                ' ' +
                n(
                  e(t)(
                    'agora',
                    'Starting the jobs does not mean, that the rules for these actions are overridden.'
                  )
                ),
              1
            ),
            s(
              'p',
              null,
              n(
                e(t)(
                  'agora',
                  'Each job can only be run once. If you want to rerun them, you have to refresh the page.'
                )
              ) +
                ' ' +
                n(e(t)('agora', 'If you want to see the result, please check the logs.')),
              1
            ),
          ]),
          s('div', Ge, [
            i(
              e(C),
              {
                variant: 'primary',
                'aria-label': a.text,
                disabled: a.disabled,
                onClick: d[0] || (d[0] = (V) => o()),
              },
              { default: u(() => [m(n(a.text), 1)]), _: 1 },
              8,
              ['aria-label', 'disabled']
            ),
            i(
              e(C),
              {
                variant: 'primary',
                'aria-label': r.text,
                disabled: r.disabled,
                onClick: d[1] || (d[1] = (V) => b()),
              },
              { default: u(() => [m(n(r.text), 1)]), _: 1 },
              8,
              ['aria-label', 'disabled']
            ),
            i(
              e(C),
              {
                variant: 'primary',
                'aria-label': l.text,
                disabled: l.disabled,
                onClick: d[2] || (d[2] = (V) => h()),
              },
              { default: u(() => [m(n(l.text), 1)]), _: 1 },
              8,
              ['aria-label', 'disabled']
            ),
          ]),
        ])
      )
    },
  },
  ze = { class: 'user_settings' },
  Je = { key: 0, class: 'user_settings' },
  Be = { class: 'settings-description' },
  Ze = {
    __name: 'AdminLegal',
    setup(_) {
      const a = I(),
        r = A(() => {
          let l = t('agora', 'Enter the URL of your privacy policy'),
            o = t('agora', 'Enter the URL of your legal notice')
          return (
            a.defaultPrivacyUrl && (l = a.defaultPrivacyUrl),
            a.defaultImprintUrl && (o = a.defaultImprintUrl),
            { privacy: l, imprint: o }
          )
        })
      return (l, o) => (
        p(),
        c(
          G,
          null,
          [
            s('div', ze, [
              i(
                e(q),
                {
                  modelValue: e(a).useSiteLegalTerms,
                  'onUpdate:modelValue': [
                    o[0] || (o[0] = (b) => (e(a).useSiteLegalTerms = b)),
                    o[1] || (o[1] = (b) => e(a).write()),
                  ],
                  type: 'switch',
                },
                {
                  default: u(() => [
                    m(
                      n(
                        e(t)(
                          'inquiries',
                          'Use the default terms for public inquiries and enable the default footer'
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
            e(a).useSiteLegalTerms
              ? k('', true)
              : (p(),
                c('div', Je, [
                  s(
                    'p',
                    Be,
                    n(
                      e(t)(
                        'inquiries',
                        'If you want to use different terms for public inquiries, enter them below.'
                      )
                    ),
                    1
                  ),
                  i(
                    e(W),
                    {
                      modelValue: e(a).privacyUrl,
                      'onUpdate:modelValue': o[2] || (o[2] = (b) => (e(a).privacyUrl = b)),
                      type: 'url',
                      placeholder: r.value.privacy,
                      label: e(t)('agora', 'Privacy policy link:'),
                      onChange: o[3] || (o[3] = (b) => e(a).write()),
                    },
                    null,
                    8,
                    ['modelValue', 'placeholder', 'label']
                  ),
                  i(
                    e(W),
                    {
                      modelValue: e(a).imprintUrl,
                      'onUpdate:modelValue': o[4] || (o[4] = (b) => (e(a).imprintUrl = b)),
                      type: 'url',
                      inputmode: 'url',
                      label: e(t)('agora', 'Legal terms link:'),
                      placeholder: r.value.imprint,
                      onChange: o[5] || (o[5] = (b) => e(a).write()),
                    },
                    null,
                    8,
                    ['modelValue', 'label', 'placeholder']
                  ),
                ])),
          ],
          64
        )
      )
    },
  },
  Qe = { class: 'user_settings' },
  We = H({
    __name: 'AdminPerformance',
    setup(_) {
      const a = I(),
        r = [
          {
            value: 'longInquirying',
            label: t('agora', 'Enable "long inquirying" for instant updates'),
          },
          {
            value: 'periodicInquirying',
            label: t('agora', 'Enable periodic requests of inquiry updates from the client'),
          },
          {
            value: 'noInquirying',
            label: t(
              'agora',
              'Disable automatic updates (inquiry must be reloaded to get updates)'
            ),
          },
        ]
      return (l, o) => (
        p(),
        c('div', Qe, [
          i(
            e($e),
            {
              modelValue: e(a).updateType,
              'onUpdate:modelValue': o[0] || (o[0] = (b) => (e(a).updateType = b)),
              options: r,
              onUpdate: o[1] || (o[1] = (b) => e(a).write()),
            },
            null,
            8,
            ['modelValue']
          ),
        ])
      )
    },
  }),
  Xe = { class: 'tree-item' },
  Ye = { class: 'tree-label' },
  et = { class: 'tree-actions' },
  tt = { key: 0, class: 'tree-children' },
  at = H({
    __name: 'TreeItem',
    props: {
      item: { type: Object, default: () => ({ id: 0, name: '' }) },
      items: { type: Array, default: () => [] },
      level: { type: Number, default: 0 },
      type: { type: String, default: 'default' },
    },
    emits: ['edit', 'delete'],
    setup(_, { emit: a }) {
      const r = _,
        l = a,
        o = A(() => r.items.filter((g) => g.parentId === r.item.id)),
        b = () => {
          l('edit', r.item, r.type)
        },
        h = () => {
          l('delete', r.item.id, r.type)
        }
      return (g, d) => {
        const V = ve('TreeItem', true)
        return (
          p(),
          c('div', Xe, [
            s(
              'div',
              { class: 'tree-node', style: ye('margin-left: ' + _.level * 20 + 'px') },
              [
                s('span', Ye, n(_.item.name), 1),
                s('div', et, [
                  i(
                    e(C),
                    { onClick: b },
                    { default: u(() => [m(n(e(t)('agora', 'Edit')), 1)]), _: 1 }
                  ),
                  i(
                    e(C),
                    { onClick: h },
                    { default: u(() => [m(n(e(t)('agora', 'Delete')), 1)]), _: 1 }
                  ),
                ]),
              ],
              4
            ),
            o.value.length > 0
              ? (p(),
                c('div', tt, [
                  (p(true),
                  c(
                    G,
                    null,
                    Z(
                      o.value,
                      (x) => (
                        p(),
                        F(
                          V,
                          {
                            key: x.id,
                            item: x,
                            items: _.items,
                            level: _.level + 1,
                            type: _.type,
                            onEdit: d[0] || (d[0] = (E) => g.$emit('edit', E, _.type)),
                            onDelete: d[1] || (d[1] = (E) => g.$emit('delete', E, _.type)),
                          },
                          null,
                          8,
                          ['item', 'items', 'level', 'type']
                        )
                      )
                    ),
                    128
                  )),
                ]))
              : k('', true),
          ])
        )
      }
    },
  }),
  ue = D(at, [['__scopeId', 'data-v-a358f3ad']]),
  lt = { class: 'category-location-manager' },
  ot = { key: 0, class: 'loading' },
  it = { key: 1 },
  st = { class: 'tabs' },
  nt = { key: 0, class: 'tab-content' },
  rt = { class: 'add-form' },
  dt = { class: 'form-fields' },
  ut = { class: 'tree-view' },
  pt = { class: 'tree-container' },
  ct = { key: 1, class: 'tab-content' },
  gt = { class: 'add-form' },
  mt = { class: 'form-fields' },
  vt = { class: 'tree-view' },
  yt = { class: 'tree-container' },
  ft = { key: 2, class: 'modal' },
  _t = { class: 'modal-content' },
  bt = { class: 'modal-actions' },
  ht = H({
    __name: 'AdminCategoryLocation',
    setup(_) {
      const a = I(),
        r = U({ value: 0, label: t('agora', 'No parent') }),
        l = U({ value: 0, label: t('agora', 'No parent') }),
        o = A(() => a.categoryTab || []),
        b = A(() => a.locationTab || []),
        h = U({ name: '', parentId: 0 }),
        g = U({ name: '', parentId: 0 }),
        d = U(null),
        V = U('categories'),
        x = U(false)
      Q(() => {
        x.value = true
      })
      const E = A(() => {
          if (!Array.isArray(a.categoryTab)) return []
          const f = j(a.categoryTab).map((y) => ({
            value: y.id,
            label: `${'— '.repeat(y.depth ?? 0)}${y.name ?? '[no name]'}`,
            original: y,
          }))
          return [{ value: 0, label: t('agora', 'No parent') }, ...f]
        }),
        P = A(() => {
          if (!Array.isArray(a.locationTab)) return []
          const f = j(a.locationTab).map((y) => ({
            value: y.id,
            label: `${'— '.repeat(y.depth ?? 0)}${y.name ?? '[no name]'}`,
            original: y,
          }))
          return [{ value: 0, label: t('agora', 'No parent') }, ...f]
        })
      function j(f, y = 0, S = 0) {
        return Array.isArray(f)
          ? f
              .filter((O) => O?.parentId === y)
              .map((O) => {
                const pe = j(f, O.id, S + 1)
                return { ...O, depth: S, children: pe }
              })
              .flatMap((O) => [O, ...O.children])
          : []
      }
      const Y = A(() =>
          d.value
            ? d.value.type === 'category'
              ? E.value.filter((f) => f.value !== d.value.id)
              : P.value.filter((f) => f.value !== d.value.id)
            : []
        ),
        ee = () => {
          if (h.value.name.trim()) {
            const f = r.value?.value || 0
            ;(a.addCategory(h.value.name, f),
              (h.value.name = ''),
              (r.value = { value: 0, label: t('agora', 'No parent') }))
          }
        },
        te = () => {
          if (g.value.name.trim()) {
            const f = l.value?.value || 0
            ;(a.addLocation(g.value.name, f),
              (g.value.name = ''),
              (l.value = { value: 0, label: t('agora', 'No parent') }))
          }
        },
        J = A({
          get: () => {
            if (!d.value) return { value: 0, label: t('agora', 'No parent') }
            const f = d.value.parentId || 0
            return d.value.type === 'category'
              ? E.value.find((y) => y.value === f) || { value: 0, label: t('agora', 'No parent') }
              : P.value.find((y) => y.value === f) || { value: 0, label: t('agora', 'No parent') }
          },
          set: (f) => {
            d.value && f && (d.value.parentId = Number(f.value) || 0)
          },
        }),
        $ = (f, y) => {
          d.value = { ...f, type: y, parentId: f.parentId || 0 }
        },
        w = () => {
          d.value &&
            (d.value.type === 'category'
              ? a.updateCategory(d.value.id, d.value.name, d.value.parentId)
              : a.updateLocation(d.value.id, d.value.name, d.value.parentId),
            (d.value = null))
        },
        v = (f, y) => {
          if (confirm(t('agora', 'Are you sure you want to delete this item?')))
            try {
              y === 'category' ? a.deleteCategory(f) : a.deleteLocation(f)
            } catch (S) {
              ;(console.error('Error deleting item:', S), alert(t('agora', 'Error deleting item')))
            }
        },
        B = A(() => o.value.filter((f) => f.parentId === 0)),
        K = A(() => b.value.filter((f) => f.parentId === 0))
      return (f, y) => (
        p(),
        c('div', lt, [
          x.value
            ? (p(),
              c('div', it, [
                s('div', st, [
                  s(
                    'button',
                    {
                      class: ae({ active: V.value === 'categories' }),
                      onClick: y[0] || (y[0] = (S) => (V.value = 'categories')),
                    },
                    n(e(t)('agora', 'Categories')),
                    3
                  ),
                  s(
                    'button',
                    {
                      class: ae({ active: V.value === 'locations' }),
                      onClick: y[1] || (y[1] = (S) => (V.value = 'locations')),
                    },
                    n(e(t)('agora', 'Locations')),
                    3
                  ),
                ]),
                V.value === 'categories'
                  ? (p(),
                    c('div', nt, [
                      s('div', rt, [
                        s('h3', null, n(e(t)('agora', 'Add New Category')), 1),
                        s('div', dt, [
                          i(
                            e(M),
                            {
                              modelValue: h.value.name,
                              'onUpdate:modelValue': y[2] || (y[2] = (S) => (h.value.name = S)),
                              label: e(t)('agora', 'Category Name'),
                              placeholder: e(t)('agora', 'Enter category name'),
                            },
                            null,
                            8,
                            ['modelValue', 'label', 'placeholder']
                          ),
                          i(
                            e(L),
                            {
                              modelValue: r.value,
                              'onUpdate:modelValue': y[3] || (y[3] = (S) => (r.value = S)),
                              options: E.value,
                              clearable: false,
                              placeholder: e(t)('agora', 'Select parent category'),
                            },
                            null,
                            8,
                            ['modelValue', 'options', 'placeholder']
                          ),
                          i(
                            e(C),
                            { type: 'primary', disabled: !h.value.name.trim(), onClick: ee },
                            { default: u(() => [m(n(e(t)('agora', 'Add Category')), 1)]), _: 1 },
                            8,
                            ['disabled']
                          ),
                        ]),
                      ]),
                      s('div', ut, [
                        s('h3', null, n(e(t)('agora', 'Categories Tree')), 1),
                        s('div', pt, [
                          (p(true),
                          c(
                            G,
                            null,
                            Z(
                              B.value,
                              (S) => (
                                p(),
                                F(
                                  ue,
                                  {
                                    key: 'cat-' + S.id,
                                    item: S,
                                    items: o.value,
                                    level: 0,
                                    type: 'category',
                                    onEdit: $,
                                    onDelete: v,
                                  },
                                  null,
                                  8,
                                  ['item', 'items']
                                )
                              )
                            ),
                            128
                          )),
                        ]),
                      ]),
                    ]))
                  : k('', true),
                V.value === 'locations'
                  ? (p(),
                    c('div', ct, [
                      s('div', gt, [
                        s('h3', null, n(e(t)('agora', 'Add New Location')), 1),
                        s('div', mt, [
                          i(
                            e(M),
                            {
                              modelValue: g.value.name,
                              'onUpdate:modelValue': y[4] || (y[4] = (S) => (g.value.name = S)),
                              label: e(t)('agora', 'Location Name'),
                              placeholder: e(t)('agora', 'Enter location name'),
                            },
                            null,
                            8,
                            ['modelValue', 'label', 'placeholder']
                          ),
                          i(
                            e(L),
                            {
                              modelValue: l.value,
                              'onUpdate:modelValue': y[5] || (y[5] = (S) => (l.value = S)),
                              options: P.value,
                              clearable: false,
                              placeholder: e(t)('agora', 'Select parent location'),
                            },
                            null,
                            8,
                            ['modelValue', 'options', 'placeholder']
                          ),
                          i(
                            e(C),
                            { type: 'primary', disabled: !g.value.name.trim(), onClick: te },
                            { default: u(() => [m(n(e(t)('agora', 'Add Location')), 1)]), _: 1 },
                            8,
                            ['disabled']
                          ),
                        ]),
                      ]),
                      s('div', vt, [
                        s('h3', null, n(e(t)('agora', 'Locations Tree')), 1),
                        s('div', yt, [
                          (p(true),
                          c(
                            G,
                            null,
                            Z(
                              K.value,
                              (S) => (
                                p(),
                                F(
                                  ue,
                                  {
                                    key: 'loc-' + S.id,
                                    item: S,
                                    items: b.value,
                                    level: 0,
                                    type: 'location',
                                    onEdit: $,
                                    onDelete: v,
                                  },
                                  null,
                                  8,
                                  ['item', 'items']
                                )
                              )
                            ),
                            128
                          )),
                        ]),
                      ]),
                    ]))
                  : k('', true),
                d.value
                  ? (p(),
                    c('div', ft, [
                      s('div', _t, [
                        s(
                          'h3',
                          null,
                          n(e(t)('agora', 'Edit')) +
                            ' ' +
                            n(
                              d.value.type === 'category'
                                ? e(t)('agora', 'Category')
                                : e(t)('agora', 'Location')
                            ),
                          1
                        ),
                        i(
                          e(M),
                          {
                            modelValue: d.value.name,
                            'onUpdate:modelValue': y[6] || (y[6] = (S) => (d.value.name = S)),
                            label:
                              d.value.type === 'category'
                                ? e(t)('agora', 'Category Name')
                                : e(t)('agora', 'Location Name'),
                          },
                          null,
                          8,
                          ['modelValue', 'label']
                        ),
                        i(
                          e(L),
                          {
                            modelValue: J.value,
                            'onUpdate:modelValue': y[7] || (y[7] = (S) => (J.value = S)),
                            options: Y.value,
                            clearable: false,
                            placeholder: e(t)('agora', 'Select parent'),
                          },
                          null,
                          8,
                          ['modelValue', 'options', 'placeholder']
                        ),
                        s('div', bt, [
                          i(
                            e(C),
                            { onClick: y[8] || (y[8] = (S) => (d.value = null)) },
                            { default: u(() => [m(n(e(t)('agora', 'Cancel')), 1)]), _: 1 }
                          ),
                          i(
                            e(C),
                            { type: 'primary', onClick: w },
                            { default: u(() => [m(n(e(t)('agora', 'Save')), 1)]), _: 1 }
                          ),
                        ]),
                      ]),
                    ]))
                  : k('', true),
              ]))
            : (p(), c('div', ot, n(e(t)('agora', 'Loading categories and locations...')), 1)),
        ])
      )
    },
  }),
  Vt = D(ht, [['__scopeId', 'data-v-e2c84539']]),
  $t = { class: 'inquiry-rights-management' },
  wt = { class: 'description' },
  St = { key: 0, class: 'loading' },
  qt = { key: 1, class: 'error' },
  It = { key: 2 },
  At = { class: 'type-selection' },
  kt = { for: 'inquiry-type-select' },
  Ct = { class: 'settings-container' },
  Ut = { class: 'settings-list' },
  Lt = { class: 'setting-item' },
  Tt = { class: 'setting-description' },
  xt = { class: 'setting-item' },
  Et = { class: 'setting-description' },
  Nt = { class: 'setting-item' },
  Rt = { class: 'setting-description' },
  Mt = { class: 'setting-item' },
  Ot = { for: 'editor-type-select' },
  Dt = { class: 'setting-description' },
  Ft = {
    __name: 'AdminInquiryRights',
    setup(_) {
      const a = I(),
        r = U(''),
        l = U(true),
        o = [
          { value: 'wysiwyg', label: t('agora', 'Rich Text Editor') },
          { value: 'textarea', label: t('agora', 'Simple Text Area') },
          { value: 'texteditor', label: t('agora', 'Nextcloud text editor') },
        ]
      Q(async () => {
        try {
          const g = Object.keys(z)
          g.length > 0 && (r.value = g[0])
        } catch (g) {
          console.error('Failed to load inquiry types:', g)
        } finally {
          l.value = false
        }
      })
      const b = A(() => Object.keys(z).map((g) => ({ value: g, label: z[g]?.label || g }))),
        h = A(() => r.value && z[r.value])
      return (
        re(r, (g) => {
          g.value && (r.value = g.value)
        }),
        (g, d) => (
          p(),
          c('div', $t, [
            s('h2', null, n(e(t)('agora', 'Inquiry Type Settings')), 1),
            s('p', wt, n(e(t)('agora', 'Configure default settings for each inquiry type')), 1),
            l.value
              ? (p(), c('div', St, n(e(t)('agora', 'Loading inquiry types...')), 1))
              : h.value
                ? (p(),
                  c('div', It, [
                    s('div', At, [
                      s('label', kt, n(e(t)('agora', 'Select inquiry type:')), 1),
                      i(
                        e(L),
                        {
                          id: 'inquiry-type-select',
                          modelValue: r.value,
                          'onUpdate:modelValue': d[0] || (d[0] = (V) => (r.value = V)),
                          options: b.value,
                          'value-field': 'value',
                          'label-field': 'label',
                          'track-bye': 'value',
                          clearable: false,
                          class: 'type-select',
                        },
                        null,
                        8,
                        ['modelValue', 'options']
                      ),
                    ]),
                    s('div', Ct, [
                      s(
                        'h3',
                        null,
                        n(e(z)[r.value]?.label || r.value) + ' ' + n(e(t)('agora', 'Settings')),
                        1
                      ),
                      s('div', Ut, [
                        s('div', Lt, [
                          i(
                            e(q),
                            {
                              modelValue: e(a).inquiryTypeRights[r.value].supportInquiry,
                              'onUpdate:modelValue': [
                                d[1] ||
                                  (d[1] = (V) =>
                                    (e(a).inquiryTypeRights[r.value].supportInquiry = V)),
                                d[2] || (d[2] = (V) => e(a).write()),
                              ],
                              type: 'switch',
                            },
                            { default: u(() => [m(n(e(t)('agora', 'Allow support')), 1)]), _: 1 },
                            8,
                            ['modelValue']
                          ),
                          s(
                            'p',
                            Tt,
                            n(e(t)('agora', 'Allow users to support this inquiry type')),
                            1
                          ),
                        ]),
                        s('div', xt, [
                          i(
                            e(q),
                            {
                              modelValue: e(a).inquiryTypeRights[r.value].commentInquiry,
                              'onUpdate:modelValue': [
                                d[3] ||
                                  (d[3] = (V) =>
                                    (e(a).inquiryTypeRights[r.value].commentInquiry = V)),
                                d[4] || (d[4] = (V) => e(a).write()),
                              ],
                              type: 'switch',
                            },
                            { default: u(() => [m(n(e(t)('agora', 'Allow comments')), 1)]), _: 1 },
                            8,
                            ['modelValue']
                          ),
                          s(
                            'p',
                            Et,
                            n(e(t)('agora', 'Allow users to comment on this inquiry type')),
                            1
                          ),
                        ]),
                        s('div', Nt, [
                          i(
                            e(q),
                            {
                              modelValue: e(a).inquiryTypeRights[r.value].attachFileInquiry,
                              'onUpdate:modelValue': [
                                d[5] ||
                                  (d[5] = (V) =>
                                    (e(a).inquiryTypeRights[r.value].attachFileInquiry = V)),
                                d[6] || (d[6] = (V) => e(a).write()),
                              ],
                              type: 'switch',
                            },
                            {
                              default: u(() => [m(n(e(t)('agora', 'Allow file attachments')), 1)]),
                              _: 1,
                            },
                            8,
                            ['modelValue']
                          ),
                          s(
                            'p',
                            Rt,
                            n(e(t)('agora', 'Allow users to attach files to this inquiry type')),
                            1
                          ),
                        ]),
                        s('div', Mt, [
                          s('label', Ot, n(e(t)('agora', 'Editor type:')), 1),
                          i(
                            e(L),
                            {
                              id: 'editor-type-select',
                              modelValue: e(a).inquiryTypeRights[r.value].editorType,
                              'onUpdate:modelValue': [
                                d[7] ||
                                  (d[7] = (V) => (e(a).inquiryTypeRights[r.value].editorType = V)),
                                d[8] || (d[8] = (V) => e(a).write()),
                              ],
                              options: o,
                              'option-value': 'value',
                              'option-label': 'label',
                              class: 'editor-select',
                            },
                            null,
                            8,
                            ['modelValue']
                          ),
                          s(
                            'p',
                            Dt,
                            n(e(t)('agora', 'Select the editor type for this inquiry')),
                            1
                          ),
                        ]),
                      ]),
                    ]),
                  ]))
                : (p(), c('div', qt, n(e(t)('agora', 'No inquiry types available')), 1)),
          ])
        )
      )
    },
  },
  Pt = D(Ft, [['__scopeId', 'data-v-54fc3f18']]),
  jt = { class: 'rights-management' },
  Kt = { class: 'description' },
  Gt = { class: 'rights-list' },
  Ht = { class: 'right-item' },
  zt = { class: 'right-description' },
  Jt = { class: 'right-item' },
  Bt = { class: 'right-description' },
  Zt = { class: 'right-item' },
  Qt = { class: 'right-description' },
  Wt = {
    __name: 'AdminModeratorRights',
    setup(_) {
      const a = I()
      return (r, l) => (
        p(),
        c('div', jt, [
          s('h2', null, n(e(t)('agora', 'Moderator Rights')), 1),
          s('p', Kt, n(e(t)('agora', 'Define permissions for users with moderator role')), 1),
          s('div', Gt, [
            s('div', Ht, [
              i(
                e(q),
                {
                  modelValue: e(a).moderatorRights.modifyInquiry,
                  'onUpdate:modelValue': [
                    l[0] || (l[0] = (o) => (e(a).moderatorRights.modifyInquiry = o)),
                    l[1] || (l[1] = (o) => e(a).write()),
                  ],
                  type: 'switch',
                },
                { default: u(() => [m(n(e(t)('agora', 'Modify inquiries')), 1)]), _: 1 },
                8,
                ['modelValue']
              ),
              s('p', zt, n(e(t)('agora', 'Allow moderators to modify existing inquiries')), 1),
            ]),
            s('div', Jt, [
              i(
                e(q),
                {
                  modelValue: e(a).moderatorRights.deleteInquiry,
                  'onUpdate:modelValue': [
                    l[2] || (l[2] = (o) => (e(a).moderatorRights.deleteInquiry = o)),
                    l[3] || (l[3] = (o) => e(a).write()),
                  ],
                  type: 'switch',
                },
                { default: u(() => [m(n(e(t)('agora', 'Delete inquiries')), 1)]), _: 1 },
                8,
                ['modelValue']
              ),
              s('p', Bt, n(e(t)('agora', 'Allow moderators to delete inquiries')), 1),
            ]),
            s('div', Zt, [
              i(
                e(q),
                {
                  modelValue: e(a).moderatorRights.archiveInquiry,
                  'onUpdate:modelValue': [
                    l[4] || (l[4] = (o) => (e(a).moderatorRights.archiveInquiry = o)),
                    l[5] || (l[5] = (o) => e(a).write()),
                  ],
                  type: 'switch',
                },
                { default: u(() => [m(n(e(t)('agora', 'Archive inquiries')), 1)]), _: 1 },
                8,
                ['modelValue']
              ),
              s('p', Qt, n(e(t)('agora', 'Allow moderators to archive inquiries')), 1),
            ]),
          ]),
        ])
      )
    },
  },
  Xt = D(Wt, [['__scopeId', 'data-v-bd584daa']]),
  Yt = { class: 'rights-management' },
  ea = { class: 'description' },
  ta = { class: 'rights-list' },
  aa = { class: 'right-item' },
  la = { class: 'right-description' },
  oa = { class: 'right-item' },
  ia = { class: 'right-description' },
  sa = { class: 'right-item' },
  na = { class: 'right-description' },
  ra = { class: 'right-item' },
  da = { class: 'right-description' },
  ua = {
    __name: 'AdminOfficialRights',
    setup(_) {
      const a = I()
      return (r, l) => (
        p(),
        c('div', Yt, [
          s('h2', null, n(e(t)('agora', 'Official Rights')), 1),
          s('p', ea, n(e(t)('agora', 'Define permissions for users with official role')), 1),
          s('div', ta, [
            s('div', aa, [
              i(
                e(q),
                {
                  modelValue: e(a).officialRights.modifyInquiry,
                  'onUpdate:modelValue': [
                    l[0] || (l[0] = (o) => (e(a).officialRights.modifyInquiry = o)),
                    l[1] || (l[1] = (o) => e(a).write()),
                  ],
                  type: 'switch',
                },
                { default: u(() => [m(n(e(t)('agora', 'Modify inquiries')), 1)]), _: 1 },
                8,
                ['modelValue']
              ),
              s('p', la, n(e(t)('agora', 'Allow officials to modify existing inquiries')), 1),
            ]),
            s('div', oa, [
              i(
                e(q),
                {
                  modelValue: e(a).officialRights.deleteInquiry,
                  'onUpdate:modelValue': [
                    l[2] || (l[2] = (o) => (e(a).officialRights.deleteInquiry = o)),
                    l[3] || (l[3] = (o) => e(a).write()),
                  ],
                  type: 'switch',
                },
                { default: u(() => [m(n(e(t)('agora', 'Delete inquiries')), 1)]), _: 1 },
                8,
                ['modelValue']
              ),
              s('p', ia, n(e(t)('agora', 'Allow officials to delete inquiries')), 1),
            ]),
            s('div', sa, [
              i(
                e(q),
                {
                  modelValue: e(a).officialRights.archiveInquiry,
                  'onUpdate:modelValue': [
                    l[4] || (l[4] = (o) => (e(a).officialRights.archiveInquiry = o)),
                    l[5] || (l[5] = (o) => e(a).write()),
                  ],
                  type: 'switch',
                },
                { default: u(() => [m(n(e(t)('agora', 'Archive inquiries')), 1)]), _: 1 },
                8,
                ['modelValue']
              ),
              s('p', na, n(e(t)('agora', 'Allow officials to archive inquiries')), 1),
            ]),
            s('div', ra, [
              i(
                e(q),
                {
                  modelValue: e(a).officialRights.manageModerationStatus,
                  'onUpdate:modelValue': [
                    l[6] || (l[6] = (o) => (e(a).officialRights.manageModerationStatus = o)),
                    l[7] || (l[7] = (o) => e(a).write()),
                  ],
                  type: 'switch',
                },
                { default: u(() => [m(n(e(t)('agora', 'Moderation status')), 1)]), _: 1 },
                8,
                ['modelValue']
              ),
              s(
                'p',
                da,
                n(e(t)('agora', 'Allow officials to manage Moderation status for all inquiry')),
                1
              ),
            ]),
          ]),
        ])
      )
    },
  },
  pa = D(ua, [['__scopeId', 'data-v-cee931a9']]),
  ca = { class: 'moderation-status-settings' },
  ga = { class: 'inquiry-type-selector' },
  ma = { class: 'status-list' },
  va = { key: 0, class: 'empty-state' },
  ya = { key: 1, class: 'status-items' },
  fa = { class: 'status-content' },
  _a = ['title'],
  ba = { class: 'status-info' },
  ha = { class: 'status-key' },
  Va = { key: 0, class: 'status-description' },
  $a = { class: 'status-properties' },
  wa = { class: 'status-actions' },
  Sa = { class: 'add-status-form' },
  qa = { class: 'form-grid' },
  Ia = { class: 'checkbox-field' },
  Aa = { class: 'field-description' },
  ka = { key: 0, class: 'modal-overlay' },
  Ca = { class: 'modal-content' },
  Ua = { class: 'form-grid' },
  La = { class: 'checkbox-field' },
  Ta = { class: 'field-description' },
  xa = { class: 'modal-actions' },
  Ea = H({
    __name: 'AdminModerationStatus',
    setup(_) {
      const a = I(),
        r = U(null),
        l = U(null),
        o = U({ statusKey: '', label: '', description: '', isFinal: false, icon: 'ClockOutline' }),
        b = A(() => r.value?.id || X.PETITION),
        h = A(() => r.value?.label || X.PETITION.replace(/_/g, ' '))
      Q(() => {
        r.value || (r.value = V.value.find(($) => $.id === X.PETITION) || V.value[0])
      })
      const g = A(() =>
          Object.keys(ie)
            .filter(($) => $ !== 'default')
            .map(($) => ({ id: $, label: t('agora', $.replace(/([A-Z])/g, ' $1').trim()) }))
        ),
        d = ($) => ie[$] || ie.ClockOutline,
        V = A(() =>
          Object.values(X).map(($) => ({
            id: $,
            label: t(
              'agora',
              $.replace(/_/g, ' ').replace(/\b\w/g, (w) => w.toUpperCase())
            ),
          }))
        ),
        x = A(() => a.getStatusesForInquiryType(b.value))
      re(b, () => {
        l.value = null
      })
      const E = () => {
          !o.value.statusKey ||
            !o.value.label ||
            (a.addStatusForInquiryType(b.value, { ...o.value, icon: String(o.value.icon) }),
            (o.value = {
              statusKey: '',
              label: '',
              description: '',
              isFinal: false,
              icon: 'ClockOutline',
            }))
        },
        P = ($) => {
          l.value = {
            id: $.id,
            statusKey: $.statusKey,
            label: $.label,
            description: $.description || '',
            isFinal: $.isFinal,
            icon: $.icon || 'ClockOutline',
          }
        },
        j = () => {
          l.value &&
            (a.updateStatusForInquiryType(b.value, l.value.id, {
              ...l.value,
              icon: l.value.icon?.id || String(l.value.icon),
            }),
            (l.value = null))
        },
        Y = ($) => {
          confirm(t('agora', 'Are you sure you want to delete this status?')) &&
            a.deleteStatusForInquiryType(b.value, $)
        },
        ee = ($) => {
          a.moveStatusUp(b.value, $)
        },
        te = ($) => {
          a.moveStatusDown(b.value, $)
        },
        J = () => {
          l.value = null
        }
      return ($, w) => (
        p(),
        c('div', ca, [
          s('div', ga, [
            s('h3', null, n(e(t)('agora', 'Select Inquiry Type')), 1),
            i(
              e(L),
              {
                modelValue: r.value,
                'onUpdate:modelValue': w[0] || (w[0] = (v) => (r.value = v)),
                options: V.value,
                label: 'label',
                'input-label': e(t)('agora', 'Inquiry Type'),
              },
              null,
              8,
              ['modelValue', 'options', 'input-label']
            ),
          ]),
          s('div', ma, [
            s('h3', null, n(e(t)('agora', 'Statuses for {type}', { type: h.value })), 1),
            x.value.length === 0
              ? (p(),
                c('div', va, [
                  s(
                    'p',
                    null,
                    n(e(t)('agora', 'No statuses configured for this inquiry type.')),
                    1
                  ),
                ]))
              : (p(),
                c('div', ya, [
                  (p(true),
                  c(
                    G,
                    null,
                    Z(
                      x.value,
                      (v, B) => (
                        p(),
                        c('div', { key: v.statusKey, class: 'status-item' }, [
                          s('div', fa, [
                            s(
                              'div',
                              { class: 'status-icon', title: v.icon },
                              [(p(), F(fe(d(v.icon)), { size: 20 }))],
                              8,
                              _a
                            ),
                            s('div', ba, [
                              s('h4', null, n(v.label), 1),
                              s('p', ha, n(v.statusKey), 1),
                              v.description ? (p(), c('p', Va, n(v.description), 1)) : k('', true),
                              s('div', $a, [
                                s(
                                  'span',
                                  {
                                    class: ae(['status-badge', v.isFinal ? 'final' : 'non-final']),
                                  },
                                  n(
                                    v.isFinal ? e(t)('agora', 'Final') : e(t)('agora', 'Non-Final')
                                  ),
                                  3
                                ),
                              ]),
                            ]),
                          ]),
                          s('div', wa, [
                            i(
                              e(C),
                              { disabled: B === 0, onClick: (K) => ee(v.statusKey) },
                              { default: u(() => [m(n(e(t)('agora', 'Up')), 1)]), _: 2 },
                              1032,
                              ['disabled', 'onClick']
                            ),
                            i(
                              e(C),
                              {
                                disabled: B === x.value.length - 1,
                                onClick: (K) => te(v.statusKey),
                              },
                              { default: u(() => [m(n(e(t)('agora', 'Down')), 1)]), _: 2 },
                              1032,
                              ['disabled', 'onClick']
                            ),
                            i(
                              e(C),
                              { onClick: (K) => P(v) },
                              { default: u(() => [m(n(e(t)('agora', 'Edit')), 1)]), _: 2 },
                              1032,
                              ['onClick']
                            ),
                            i(
                              e(C),
                              { onClick: (K) => Y(v.id) },
                              { default: u(() => [m(n(e(t)('agora', 'Delete')), 1)]), _: 2 },
                              1032,
                              ['onClick']
                            ),
                          ]),
                        ])
                      )
                    ),
                    128
                  )),
                ])),
          ]),
          s('div', Sa, [
            s('h3', null, n(e(t)('agora', 'Add New Status')), 1),
            s('div', qa, [
              i(
                e(M),
                {
                  modelValue: o.value.statusKey,
                  'onUpdate:modelValue': w[1] || (w[1] = (v) => (o.value.statusKey = v)),
                  label: e(t)('agora', 'Status Key'),
                  placeholder: e(t)('agora', 'Enter unique status key'),
                  required: '',
                },
                null,
                8,
                ['modelValue', 'label', 'placeholder']
              ),
              i(
                e(M),
                {
                  modelValue: o.value.label,
                  'onUpdate:modelValue': w[2] || (w[2] = (v) => (o.value.label = v)),
                  label: e(t)('agora', 'Label'),
                  placeholder: e(t)('agora', 'Enter display label'),
                  required: '',
                },
                null,
                8,
                ['modelValue', 'label', 'placeholder']
              ),
              i(
                e(M),
                {
                  modelValue: o.value.description,
                  'onUpdate:modelValue': w[3] || (w[3] = (v) => (o.value.description = v)),
                  label: e(t)('agora', 'Description'),
                  placeholder: e(t)('agora', 'Enter description (optional)'),
                  type: 'textarea',
                },
                null,
                8,
                ['modelValue', 'label', 'placeholder']
              ),
              i(
                e(L),
                {
                  modelValue: o.value.icon,
                  'onUpdate:modelValue': w[4] || (w[4] = (v) => (o.value.icon = v)),
                  options: g.value,
                  label: 'label',
                  'input-label': e(t)('agora', 'Select Icon'),
                },
                null,
                8,
                ['modelValue', 'options', 'input-label']
              ),
              s('div', Ia, [
                i(
                  e(q),
                  {
                    modelValue: o.value.isFinal,
                    'onUpdate:modelValue': w[5] || (w[5] = (v) => (o.value.isFinal = v)),
                    type: 'switch',
                  },
                  { default: u(() => [m(n(e(t)('agora', 'Final Status')), 1)]), _: 1 },
                  8,
                  ['modelValue']
                ),
                s('p', Aa, n(e(t)('agora', 'Final statuses cannot be changed once set')), 1),
              ]),
              i(
                e(C),
                { type: 'primary', disabled: !o.value.statusKey || !o.value.label, onClick: E },
                { default: u(() => [m(n(e(t)('agora', 'Add Status')), 1)]), _: 1 },
                8,
                ['disabled']
              ),
            ]),
          ]),
          l.value
            ? (p(),
              c('div', ka, [
                s('div', Ca, [
                  s('h3', null, n(e(t)('agora', 'Edit Status')), 1),
                  s('div', Ua, [
                    i(
                      e(M),
                      {
                        modelValue: l.value.statusKey,
                        'onUpdate:modelValue': w[6] || (w[6] = (v) => (l.value.statusKey = v)),
                        label: e(t)('agora', 'Status Key'),
                        placeholder: e(t)('agora', 'Enter unique status key'),
                        required: '',
                      },
                      null,
                      8,
                      ['modelValue', 'label', 'placeholder']
                    ),
                    i(
                      e(M),
                      {
                        modelValue: l.value.label,
                        'onUpdate:modelValue': w[7] || (w[7] = (v) => (l.value.label = v)),
                        label: e(t)('agora', 'Label'),
                        placeholder: e(t)('agora', 'Enter display label'),
                        required: '',
                      },
                      null,
                      8,
                      ['modelValue', 'label', 'placeholder']
                    ),
                    i(
                      e(M),
                      {
                        modelValue: l.value.description,
                        'onUpdate:modelValue': w[8] || (w[8] = (v) => (l.value.description = v)),
                        label: e(t)('agora', 'Description'),
                        placeholder: e(t)('agora', 'Enter description (optional)'),
                        type: 'textarea',
                      },
                      null,
                      8,
                      ['modelValue', 'label', 'placeholder']
                    ),
                    i(
                      e(L),
                      {
                        modelValue: l.value.icon,
                        'onUpdate:modelValue': w[9] || (w[9] = (v) => (l.value.icon = v)),
                        options: g.value,
                        label: 'label',
                        'input-label': e(t)('agora', 'Select Icon'),
                      },
                      null,
                      8,
                      ['modelValue', 'options', 'input-label']
                    ),
                    s('div', La, [
                      i(
                        e(q),
                        {
                          modelValue: l.value.isFinal,
                          'onUpdate:modelValue': w[10] || (w[10] = (v) => (l.value.isFinal = v)),
                          type: 'switch',
                        },
                        { default: u(() => [m(n(e(t)('agora', 'Final Status')), 1)]), _: 1 },
                        8,
                        ['modelValue']
                      ),
                      s('p', Ta, n(e(t)('agora', 'Final statuses cannot be changed once set')), 1),
                    ]),
                  ]),
                  s('div', xa, [
                    i(
                      e(C),
                      { onClick: J },
                      { default: u(() => [m(n(e(t)('agora', 'Cancel')), 1)]), _: 1 }
                    ),
                    i(
                      e(C),
                      {
                        type: 'primary',
                        disabled: !l.value.statusKey || !l.value.label,
                        onClick: j,
                      },
                      { default: u(() => [m(n(e(t)('agora', 'Save Changes')), 1)]), _: 1 },
                      8,
                      ['disabled']
                    ),
                  ]),
                ]),
              ]))
            : k('', true),
        ])
      )
    },
  }),
  Na = D(Ea, [['__scopeId', 'data-v-ae9c1d22']]),
  Ra = { class: 'user_settings' },
  Ma = { key: 0, class: 'settings_details' },
  Oa = {
    __name: 'AdminInquiryCreation',
    setup(_) {
      const a = I()
      return (r, l) => (
        p(),
        c('div', Ra, [
          i(
            e(q),
            {
              modelValue: e(a).allowInquiryCreation,
              'onUpdate:modelValue': [
                l[0] || (l[0] = (o) => (e(a).allowInquiryCreation = o)),
                l[1] || (l[1] = (o) => e(a).write()),
              ],
              type: 'switch',
            },
            {
              default: u(() => [m(n(e(t)('agora', 'Enable the inquiry creation globally')), 1)]),
              _: 1,
            },
            8,
            ['modelValue']
          ),
          e(a).allowInquiryCreation
            ? k('', true)
            : (p(),
              c('div', Ma, [
                i(
                  e(L),
                  {
                    modelValue: e(a).inquiryCreationGroups,
                    'onUpdate:modelValue': [
                      l[2] || (l[2] = (o) => (e(a).inquiryCreationGroups = o)),
                      l[3] || (l[3] = (o) => e(a).write()),
                    ],
                    'input-label': e(t)('agora', 'Enable only for the following groups'),
                    label: 'displayName',
                    options: e(a).groups,
                    'user-select': true,
                    multiple: true,
                    loading: r.isLoading,
                    placeholder: e(t)('agora', 'Leave empty to disable globally'),
                    onSearch: e(a).loadGroups,
                  },
                  null,
                  8,
                  ['modelValue', 'input-label', 'options', 'loading', 'placeholder', 'onSearch']
                ),
              ])),
        ])
      )
    },
  },
  Da = { class: 'user_settings' },
  Fa = {
    __name: 'AdminInquiriesInNavigation',
    setup(_) {
      const a = I()
      return (r, l) => (
        p(),
        c('div', Da, [
          i(
            e(q),
            {
              modelValue: e(a).navigationInquiriesInList,
              'onUpdate:modelValue': [
                l[0] || (l[0] = (o) => (e(a).navigationInquiriesInList = o)),
                l[1] || (l[1] = (o) => e(a).write()),
              ],
              type: 'switch',
            },
            {
              default: u(() => [m(n(e(t)('agora', 'Load inquiries into the navigation.')), 1)]),
              _: 1,
            },
            8,
            ['modelValue']
          ),
        ])
      )
    },
  },
  Pa = { class: 'user_settings' },
  ja = { key: 0, class: 'settings_details' },
  Ka = {
    __name: 'AdminShareOpenInquiry',
    setup(_) {
      const a = I()
      return (r, l) => (
        p(),
        c('div', Pa, [
          i(
            e(q),
            {
              modelValue: e(a).allowAllAccess,
              'onUpdate:modelValue': [
                l[0] || (l[0] = (o) => (e(a).allowAllAccess = o)),
                l[1] || (l[1] = (o) => e(a).write()),
              ],
              type: 'switch',
            },
            {
              default: u(() => [
                m(
                  n(e(t)('agora', 'Enable the creation of openly accessible inquiries globally')),
                  1
                ),
              ]),
              _: 1,
            },
            8,
            ['modelValue']
          ),
          e(a).allowAllAccess
            ? k('', true)
            : (p(),
              c('div', ja, [
                i(
                  e(L),
                  {
                    modelValue: e(a).allAccessGroups,
                    'onUpdate:modelValue': [
                      l[2] || (l[2] = (o) => (e(a).allAccessGroups = o)),
                      l[3] || (l[3] = (o) => e(a).write()),
                    ],
                    'input-label': e(t)('agora', 'Enable only for the following groups'),
                    label: 'displayName',
                    options: e(a).groups,
                    'user-select': true,
                    multiple: true,
                    loading: r.isLoading,
                    placeholder: e(t)('agora', 'Leave empty to disable globally'),
                    onSearch: e(a).loadGroups,
                  },
                  null,
                  8,
                  ['modelValue', 'input-label', 'options', 'loading', 'placeholder', 'onSearch']
                ),
              ])),
        ])
      )
    },
  },
  Ga = { class: 'user_settings' },
  Ha = { key: 0, class: 'settings_details' },
  za = {
    __name: 'AdminSharePublicCreate',
    setup(_) {
      const a = I()
      return (r, l) => (
        p(),
        c('div', Ga, [
          i(
            e(q),
            {
              modelValue: e(a).allowPublicShares,
              'onUpdate:modelValue': [
                l[0] || (l[0] = (o) => (e(a).allowPublicShares = o)),
                l[1] || (l[1] = (o) => e(a).write()),
              ],
              type: 'switch',
            },
            {
              default: u(() => [
                m(n(e(t)('agora', 'Enable public shares of inquiries globally')), 1),
              ]),
              _: 1,
            },
            8,
            ['modelValue']
          ),
          e(a).allowPublicShares
            ? k('', true)
            : (p(),
              c('div', Ha, [
                i(
                  e(L),
                  {
                    modelValue: e(a).publicSharesGroups,
                    'onUpdate:modelValue': [
                      l[2] || (l[2] = (o) => (e(a).publicSharesGroups = o)),
                      l[3] || (l[3] = (o) => e(a).write()),
                    ],
                    'input-label': e(t)('agora', 'Enable only for the following groups'),
                    label: 'displayName',
                    options: e(a).groups,
                    'user-select': true,
                    multiple: true,
                    loading: r.isLoading,
                    placeholder: e(t)('agora', 'Leave empty to disable globally'),
                    onSearch: e(a).loadGroups,
                  },
                  null,
                  8,
                  ['modelValue', 'input-label', 'options', 'loading', 'placeholder', 'onSearch']
                ),
              ])),
        ])
      )
    },
  },
  Ja = { class: 'user_settings' },
  Ba = {
    __name: 'AdminSharePublicShowLogin',
    setup(_) {
      const a = I()
      return (r, l) => (
        p(),
        c('div', Ja, [
          i(
            e(q),
            {
              modelValue: e(a).showLogin,
              'onUpdate:modelValue': [
                l[0] || (l[0] = (o) => (e(a).showLogin = o)),
                l[1] || (l[1] = (o) => e(a).write()),
              ],
              type: 'switch',
            },
            {
              default: u(() => [
                m(
                  n(
                    e(t)(
                      'inquiries',
                      'Enable the login option in the registration dialog of public inquiries'
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
        ])
      )
    },
  },
  Za = { class: 'user_settings' },
  Qa = { key: 0, class: 'settings_details' },
  Wa = {
    __name: 'AdminShowMailAddresses',
    setup(_) {
      const a = I()
      return (r, l) => (
        p(),
        c('div', Za, [
          i(
            e(q),
            {
              modelValue: e(a).showMailAddresses,
              'onUpdate:modelValue': [
                l[0] || (l[0] = (o) => (e(a).showMailAddresses = o)),
                l[1] || (l[1] = (o) => e(a).write()),
              ],
              type: 'switch',
            },
            {
              default: u(() => [
                m(n(e(t)('agora', 'Show email addresses of internal accounts')), 1),
              ]),
              _: 1,
            },
            8,
            ['modelValue']
          ),
          e(a).showMailAddresses
            ? k('', true)
            : (p(),
              c('div', Qa, [
                i(
                  e(L),
                  {
                    modelValue: e(a).showMailAddressesGroups,
                    'onUpdate:modelValue': [
                      l[2] || (l[2] = (o) => (e(a).showMailAddressesGroups = o)),
                      l[3] || (l[3] = (o) => e(a).write()),
                    ],
                    'input-label': e(t)('agora', 'Show only to members of the following groups'),
                    label: 'displayName',
                    options: e(a).groups,
                    'user-select': true,
                    multiple: true,
                    loading: r.isLoading,
                    placeholder: e(t)('agora', 'Leave empty to disable globally.'),
                    onSearch: e(a).loadGroups,
                  },
                  null,
                  8,
                  ['modelValue', 'input-label', 'options', 'loading', 'placeholder', 'onSearch']
                ),
              ])),
        ])
      )
    },
  },
  Xa = { class: 'user_settings' },
  Ya = { key: 0, class: 'settings_details' },
  el = {
    __name: 'AdminUnrescrictedOwners',
    setup(_) {
      const a = I()
      return (r, l) => (
        p(),
        c('div', Xa, [
          i(
            e(q),
            {
              modelValue: e(a).unrestrictedOwner,
              'onUpdate:modelValue': [
                l[0] || (l[0] = (o) => (e(a).unrestrictedOwner = o)),
                l[1] || (l[1] = (o) => e(a).write()),
              ],
              type: 'switch',
            },
            {
              default: u(() => [m(n(e(t)('agora', 'Enable unrestricted owners globally')), 1)]),
              _: 1,
            },
            8,
            ['modelValue']
          ),
          e(a).unrestrictedOwner
            ? k('', true)
            : (p(),
              c('div', Ya, [
                i(
                  e(L),
                  {
                    modelValue: e(a).unrestrictedOwnerGroups,
                    'onUpdate:modelValue': [
                      l[2] || (l[2] = (o) => (e(a).unrestrictedOwnerGroups = o)),
                      l[3] || (l[3] = (o) => e(a).write()),
                    ],
                    'input-label': e(t)('agora', 'Enable only for the following groups'),
                    label: 'displayName',
                    options: e(a).groups,
                    'user-select': true,
                    multiple: true,
                    loading: e(a).status.loadingGroups,
                    placeholder: e(t)('agora', 'Leave empty to disable globally'),
                    onSearch: e(a).loadGroups,
                  },
                  null,
                  8,
                  ['modelValue', 'input-label', 'options', 'loading', 'placeholder', 'onSearch']
                ),
              ])),
          i(
            we,
            { type: 'info' },
            {
              default: u(() => [
                s('p', null, n(e(t)('agora', 'Effects on restricted owners:')), 1),
                s('ul', null, [
                  s(
                    'li',
                    null,
                    n(
                      e(t)(
                        'agora',
                        'Anonymizing a inquiry of a restricted owner means that this inquiry is anonymous for everyone, including the owner.'
                      )
                    ),
                    1
                  ),
                  s(
                    'li',
                    null,
                    n(
                      e(t)(
                        'agora',
                        'Deleting and changing inquiries of participants is not possible'
                      )
                    ),
                    1
                  ),
                ]),
              ]),
              _: 1,
            }
          ),
        ])
      )
    },
  },
  tl = { key: 0 },
  al = H({
    __name: 'AdminSettingsPage',
    setup(_) {
      const a = I(),
        r = U(false),
        l = {
          inquiryCategoryLocation: {
            name: t('agora', 'Categories and Locations Management'),
            description: t('agora', 'Change globally location and category (for all accounts)'),
          },
          inquiryModerationStatus: {
            name: t('agora', 'Moderation status settings'),
            description: t(
              'agora',
              'Configure moderation statuses for each type of inquiry. Moderators will be able to set these statuses on inquiries.'
            ),
          },
          inquirySettings: {
            name: t('agora', 'Inquiry settings'),
            description: t('agora', 'Change inquiry settings globally (for all accounts)'),
          },
          inquiryRights: {
            name: t('agora', 'Inquiry rights'),
            description: t('agora', 'Change inquiry rights globally (for all accounts)'),
          },
          shareSettings: {
            name: t('agora', 'Share settings'),
            description: t('agora', 'Change share settings globally (for all accounts)'),
          },
          otherSettings: {
            name: t('agora', 'Other settings'),
            description: t('agora', 'Enable or disable individual features.'),
          },
          performanceSettings: {
            name: t('agora', 'Performance settings'),
            description: t(
              'agora',
              'If you are experiencing connection problems, change how auto updates are retrieved.'
            ),
          },
          publicSettings: {
            name: t('agora', 'Public inquiry registration dialog options'),
            description: t(
              'agora',
              'These options regard the appearence of the registration dialog of public inquiries.'
            ),
          },
          emailSettings: {
            name: t('agora', 'Email options'),
            description: t(
              'agora',
              'Add links to legal terms, if they exist and add an optional disclaimer to emails.'
            ),
          },
          jobSettings: {
            name: t('agora', 'Job control'),
            description: t(
              'agora',
              'Manually start backgropund jobs, independent from the cron schedule.'
            ),
          },
        }
      return (
        Q(async () => {
          try {
            await a.load()
          } catch (o) {
            console.error('Failed to load data:', o)
          } finally {
            r.value = true
          }
        }),
        (o, b) =>
          r.value
            ? (p(),
              c('div', tl, [
                i(e(Ve), null, {
                  default: u(() => [
                    i(e(T), null, {
                      default: u(() => [
                        i(
                          e(T),
                          N(R(l.inquirySettings)),
                          { default: u(() => [i(e(Oa)), i(e(el)), i(e(Ae)), i(e(Ce))]), _: 1 },
                          16
                        ),
                        i(
                          e(T),
                          N(R(l.inquiryRights)),
                          { default: u(() => [i(e(Pt)), i(e(Xt)), i(e(pa))]), _: 1 },
                          16
                        ),
                        i(
                          e(T),
                          N(R(l.shareSettings)),
                          { default: u(() => [i(e(Ka)), i(e(za)), i(e(Ba)), i(e(Ze))]), _: 1 },
                          16
                        ),
                        i(
                          e(T),
                          N(R(l.otherSettings)),
                          { default: u(() => [i(e(qe)), i(e(Wa))]), _: 1 },
                          16
                        ),
                        i(
                          e(T),
                          N(R(l.performanceSettings)),
                          { default: u(() => [i(e(We)), i(e(Fa))]), _: 1 },
                          16
                        ),
                        i(e(T), N(R(l.emailSettings)), { default: u(() => [i(e(Pe))]), _: 1 }, 16),
                      ]),
                      _: 1,
                    }),
                    i(e(T), null, {
                      default: u(() => [
                        i(
                          e(T),
                          N(R(l.inquiryCategoryLocation)),
                          { default: u(() => [i(e(Vt))]), _: 1 },
                          16
                        ),
                        i(
                          e(T),
                          N(R(l.inquiryModerationStatus)),
                          { default: u(() => [i(e(Na))]), _: 1 },
                          16
                        ),
                      ]),
                      _: 1,
                    }),
                    i(e(T), null, {
                      default: u(() => [
                        i(e(T), N(R(l.jobSettings)), { default: u(() => [i(e(He))]), _: 1 }, 16),
                      ]),
                      _: 1,
                    }),
                  ]),
                  _: 1,
                }),
              ]))
            : k('', true)
      )
    },
  }),
  ll = _e(al).use(be)
ll.mount('#content_agora')
//# sourceMappingURL=agora-adminSettings.mjs.map
