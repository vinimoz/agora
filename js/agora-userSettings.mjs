const v = "agora", w = "1.0.0rc1";
import { d as c, t as a, f as m, g as l, o as f, w as t, h as s, u as e, n as r, i as n, j as g, p as u } from "./NcEmptyContent-q-geAf0w-C5KNLRzH.chunk.mjs";
import { N as i } from "./index-DIidhKUT.chunk.mjs";
import { u as _ } from "./NcDashboardWidget-Wkx_9xKh-lkMdwGn7.chunk.mjs";
import { F as S } from "./FlexSettings-_g8tK2Ug.chunk.mjs";
import "./NcRichText-G8kzsdwx-8HncRjZ1.chunk.mjs";
import { _ as d, a as y } from "./StyleSettings-BAAx48Ay.chunk.mjs";
const P = c({ __name: "UserSettingsPage", setup(x) {
  const p = _(), o = { personalSettings: { name: a("agora", "Personal preferences"), description: a("agora", "Set your personal preferences for the agora app") }, styleSettings: { name: a("agora", "Experimental styles"), description: a("agora", "Some visual styling options.") } };
  return m(() => {
    p.load();
  }), (N, k) => (f(), l(e(S), null, { default: t(() => [s(e(i), r(n(o.personalSettings)), { default: t(() => [s(e(d))]), _: 1 }, 16), s(e(i), r(n(o.styleSettings)), { default: t(() => [s(e(y))]), _: 1 }, 16)]), _: 1 }));
} }), h = g(P).use(u);
h.mount("#content_agora");
//# sourceMappingURL=agora-userSettings.mjs.map
