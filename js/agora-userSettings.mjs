const v = "agora", w = "1.0.0rc3";
import { d as c, t as a, b as m, e as l, o as f, w as t, f as s, u as e, n as r, g as n, h as g, p as u } from "./NcEmptyContent-q-geAf0w-BTrjHyYY.chunk.mjs";
import { N as i } from "./index-DpU4NVZy.chunk.mjs";
import { u as _ } from "./NcDashboardWidget-Wkx_9xKh-BCkJxwfa.chunk.mjs";
import { F as S } from "./FlexSettings-BbM_jNOe.chunk.mjs";
import "./NcRichText-G8kzsdwx-DH9_CLsd.chunk.mjs";
import { _ as d, a as y } from "./StyleSettings-Buu05YEb.chunk.mjs";
const P = c({ __name: "UserSettingsPage", setup(x) {
  const p = _(), o = { personalSettings: { name: a("agora", "Personal preferences"), description: a("agora", "Set your personal preferences for the agora app") }, styleSettings: { name: a("agora", "Experimental styles"), description: a("agora", "Some visual styling options.") } };
  return m(() => {
    p.load();
  }), (N, k) => (f(), l(e(S), null, { default: t(() => [s(e(i), r(n(o.personalSettings)), { default: t(() => [s(e(d))]), _: 1 }, 16), s(e(i), r(n(o.styleSettings)), { default: t(() => [s(e(y))]), _: 1 }, 16)]), _: 1 }));
} }), h = g(P).use(u);
h.mount("#content_agora");
//# sourceMappingURL=agora-userSettings.mjs.map
