const v = "agora", w = "1.0.0-rc5";
import { d as c, t as a, b as m, e as l, o as g, w as t, f as s, u as e, n as r, g as n, h as f, p as u } from "./NcEmptyContent-q-geAf0w-B0ZeCpG6.chunk.mjs";
import { N as i } from "./index-Ch7fpXjv.chunk.mjs";
import "./NcDashboardWidget-Wkx_9xKh-BuiM1L_L.chunk.mjs";
import { F as _ } from "./FlexSettings-kLXoANKb.chunk.mjs";
import { u as S, _ as d, a as y } from "./StyleSettings-qgw6mAVl.chunk.mjs";
import "./NcRichText-G8kzsdwx-BFAbDomF.chunk.mjs";
const P = c({ __name: "UserSettingsPage", setup(x) {
  const p = S(), o = { personalSettings: { name: a("agora", "Personal preferences"), description: a("agora", "Set your personal preferences for the agora app") }, styleSettings: { name: a("agora", "Experimental styles"), description: a("agora", "Some visual styling options.") } };
  return m(() => {
    p.load();
  }), (N, k) => (g(), l(e(_), null, { default: t(() => [s(e(i), r(n(o.personalSettings)), { default: t(() => [s(e(d))]), _: 1 }, 16), s(e(i), r(n(o.styleSettings)), { default: t(() => [s(e(y))]), _: 1 }, 16)]), _: 1 }));
} }), h = f(P).use(u);
h.mount("#content_agora");
//# sourceMappingURL=agora-userSettings.mjs.map
