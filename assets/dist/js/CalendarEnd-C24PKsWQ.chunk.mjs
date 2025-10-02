const ee = 'agora',
  ae = '1.0.0rc4'
import {
  i as h,
  d as U,
  m as b,
  j as I,
  k as t,
  l as S,
  R as L,
  q as R,
  e as g,
  o as r,
  w as m,
  r as p,
  s as y,
  v as _,
  f as M,
  a as N,
  c as o,
  x as V,
  u as w,
  N as A,
  y as E,
  z as C,
  A as D,
  _ as P,
} from './NcEmptyContent-q-geAf0w-DsDiM4c8.chunk.mjs'
const j = {}
function q(s, l) {
  return (r(), o('div', null, [p(s.$slots, 'trigger')]))
}
const O = h(j, [['render', q]]),
  W = { class: 'user-bubble__name' },
  Z = { key: 0, class: 'user-bubble__secondary' },
  F = U({
    __name: 'NcUserBubble',
    props: b(
      {
        avatarImage: { default: void 0 },
        user: { default: void 0 },
        displayName: { default: void 0 },
        showUserStatus: { type: Boolean },
        url: { default: void 0 },
        to: { default: void 0 },
        primary: { type: Boolean },
        size: { default: 20 },
        margin: { default: 2 },
      },
      { open: { type: Boolean }, openModifiers: {} }
    ),
    emits: b(['click'], ['update:open']),
    setup(s, { emit: l }) {
      const e = s,
        v = l,
        u = I(s, 'open'),
        d = t(() => {
          if (!e.avatarImage) return false
          try {
            return !!new URL(e.avatarImage)
          } catch {
            return false
          }
        }),
        n = t(() => !!e.avatarImage),
        $ = t(() => ({ marginInlineStart: `${e.margin}px` })),
        f = t(() => {
          if (!e.url || e.url.trim() === '') return false
          try {
            return !!new URL(e.url, e.url?.startsWith?.('/') ? window.location.href : void 0)
          } catch {
            return (S('[NcUserBubble] Invalid URL passed', { url: e.url }), false)
          }
        }),
        k = t(() => (f.value ? e.url : void 0)),
        z = t(() => (f.value ? 'a' : e.to ? L : 'div')),
        B = t(() => ({
          height: `${e.size}px`,
          lineHeight: `${e.size}px`,
          borderRadius: `${e.size / 2}px`,
        }))
      return (
        R([() => e.displayName, () => e.user], () => {
          !e.displayName && e.user
        }),
        (a, i) => (
          r(),
          g(
            y(a.$slots.default ? w(D) : O),
            {
              shown: u.value,
              'onUpdate:shown': i[1] || (i[1] = (c) => (u.value = c)),
              class: 'user-bubble__wrapper',
              trigger: 'hover focus',
            },
            {
              trigger: m(({ attrs: c }) => [
                (r(),
                g(
                  y(z.value),
                  _(
                    {
                      class: [
                        'user-bubble__content',
                        { 'user-bubble__content--primary': a.primary },
                      ],
                      style: B.value,
                      to: a.to,
                      href: k.value,
                    },
                    c,
                    { onClick: i[0] || (i[0] = (H) => v('click', H)) }
                  ),
                  {
                    default: m(() => [
                      M(
                        w(A),
                        {
                          url: n.value && d.value ? a.avatarImage : void 0,
                          'icon-class': n.value && !d.value ? a.avatarImage : void 0,
                          user: a.user,
                          'display-name': a.displayName,
                          size: a.size - a.margin * 2,
                          style: E($.value),
                          'disable-tooltip': true,
                          'disable-menu': true,
                          'hide-status': !a.showUserStatus,
                          class: 'user-bubble__avatar',
                        },
                        null,
                        8,
                        [
                          'url',
                          'icon-class',
                          'user',
                          'display-name',
                          'size',
                          'style',
                          'hide-status',
                        ]
                      ),
                      N('span', W, C(a.displayName || a.user), 1),
                      a.$slots.name
                        ? (r(), o('span', Z, [p(a.$slots, 'name', {}, void 0, true)]))
                        : V('', true),
                    ]),
                    _: 2,
                  },
                  1040,
                  ['class', 'style', 'to', 'href']
                )),
              ]),
              default: m(() => [p(a.$slots, 'default', {}, void 0, true)]),
              _: 3,
            },
            40,
            ['shown']
          )
        )
      )
    },
  }),
  G = h(F, [['__scopeId', 'data-v-a7e3a34c']]),
  J = {
    name: 'CalendarEndIcon',
    emits: ['click'],
    props: {
      title: { type: String },
      fillColor: { type: String, default: 'currentColor' },
      size: { type: Number, default: 24 },
    },
  },
  K = ['aria-hidden', 'aria-label'],
  Q = ['fill', 'width', 'height'],
  T = {
    d: 'M22 14V22H20V18L16 22V19H11V17H16V14L20 18V14H22M5 19L9 19V21L5 21C3.9 21 3 20.1 3 19V5C3 3.89 3.9 3 5 3H6V.998H8V3H16V.998H18V3H19C20.11 3 21 3.89 21 5L21 12H19V8H5V19Z',
  },
  X = { key: 0 }
function Y(s, l, e, v, u, d) {
  return (
    r(),
    o(
      'span',
      _(s.$attrs, {
        'aria-hidden': e.title ? null : 'true',
        'aria-label': e.title,
        class: 'material-design-icon calendar-end-icon',
        role: 'img',
        onClick: l[0] || (l[0] = (n) => s.$emit('click', n)),
      }),
      [
        (r(),
        o(
          'svg',
          {
            fill: e.fillColor,
            class: 'material-design-icon__svg',
            width: e.size,
            height: e.size,
            viewBox: '0 0 24 24',
          },
          [N('path', T, [e.title ? (r(), o('title', X, C(e.title), 1)) : V('', true)])],
          8,
          Q
        )),
      ],
      16,
      K
    )
  )
}
const x = P(J, [['render', Y]])
export { x as E, G as N }
//# sourceMappingURL=CalendarEnd-C24PKsWQ.chunk.mjs.map
