const A = "agora", k = "1.1.0-rc1";
import { d as c, s as a, v as m, f as l, o as g, g as t, j as s, n as e, x as r, y as n, z as f, A as _ } from "./NcEmptyContent-q-geAf0w-DQ9Y4Vwi.chunk.mjs";
import { N as i } from "./index-C6lxCI53.chunk.mjs";
import "./NcDashboardWidget-BEUtfCxs-KrdgBHVB.chunk.mjs";
import { F as u } from "./FlexSettings-BjxNI0T0.chunk.mjs";
import { u as S, _ as d, a as y } from "./StyleSettings-DCPV1oQf.chunk.mjs";
import "./NcRichText-Dht_wH3t-BiQsfP7D.chunk.mjs";
const x = c({ __name: "UserSettingsPage", setup(N) {
  const p = S(), o = { personalSettings: { name: a("agora", "Personal preferences"), description: a("agora", "Set your personal preferences for the agora app") }, styleSettings: { name: a("agora", "Experimental styles"), description: a("agora", "Some visual styling options.") } };
  return m(() => {
    p.load();
  }), (h, v) => (g(), l(e(u), null, { default: t(() => [s(e(i), r(n(o.personalSettings)), { default: t(() => [s(e(d))]), _: 1 }, 16), s(e(i), r(n(o.styleSettings)), { default: t(() => [s(e(y))]), _: 1 }, 16)]), _: 1 }));
} }), P = f(x).use(_);
P.mount("#content_agora");
//# sourceMappingURL=agora-userSettings.mjs.map
