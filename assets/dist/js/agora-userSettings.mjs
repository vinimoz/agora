const v = 'agora',
  w = '1.0.0rc4'
import {
  d as c,
  t as a,
  b as m,
  e as l,
  o as f,
  w as t,
  f as s,
  u as e,
  n as r,
  g as n,
  h as g,
  p as u,
} from './NcEmptyContent-q-geAf0w-DsDiM4c8.chunk.mjs'
import { N as i } from './index-CnGEXeag.chunk.mjs'
import { u as _ } from './NcDashboardWidget-Wkx_9xKh-DfVZeYPI.chunk.mjs'
import { F as S } from './FlexSettings-Dk7Etco1.chunk.mjs'
import './NcRichText-G8kzsdwx-DWCeYxXp.chunk.mjs'
import { _ as d, a as y } from './StyleSettings-samdGq2C.chunk.mjs'
const P = c({
    __name: 'UserSettingsPage',
    setup(x) {
      const p = _(),
        o = {
          personalSettings: {
            name: a('agora', 'Personal preferences'),
            description: a('agora', 'Set your personal preferences for the agora app'),
          },
          styleSettings: {
            name: a('agora', 'Experimental styles'),
            description: a('agora', 'Some visual styling options.'),
          },
        }
      return (
        m(() => {
          p.load()
        }),
        (N, k) => (
          f(),
          l(e(S), null, {
            default: t(() => [
              s(e(i), r(n(o.personalSettings)), { default: t(() => [s(e(d))]), _: 1 }, 16),
              s(e(i), r(n(o.styleSettings)), { default: t(() => [s(e(y))]), _: 1 }, 16),
            ]),
            _: 1,
          })
        )
      )
    },
  }),
  h = g(P).use(u)
h.mount('#content_agora')
//# sourceMappingURL=agora-userSettings.mjs.map
