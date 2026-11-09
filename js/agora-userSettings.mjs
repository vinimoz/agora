const A = "agora", k = "1.8.0";
import { d as c, q as a, s as m, o as l, b as g, e as t, g as s, v as e, x as r, y as n, z as f, A as _ } from "./NcEmptyContent-CfFbGoRR.chunk.mjs";
import { N as i } from "./be-tarask-lRaX7m2J.chunk.mjs";
import "./NcDashboardWidget-B0G9t_8Q.chunk.mjs";
import { F as u } from "./FlexSettings-B6vX7rKj.chunk.mjs";
import "./NcRichText-BeH8ReOb.chunk.mjs";
import "./referencePickerModal-DrIYqUVO.chunk.mjs";
import "./NcProfileHoverCard-CjkGwu1n.chunk.mjs";
import { u as S, _ as d, a as y } from "./StyleSettings-BCaLXs0d.chunk.mjs";
const x = c({ __name: "UserSettingsPage", setup(N) {
  const p = S(), o = { personalSettings: { name: a("agora", "Personal preferences"), description: a("agora", "Set your personal preferences for the agora app") }, styleSettings: { name: a("agora", "Experimental styles"), description: a("agora", "Some visual styling options") } };
  return m(() => {
    p.load();
  }), (h, v) => (l(), g(e(u), null, { default: t(() => [s(e(i), r(n(o.personalSettings)), { default: t(() => [s(e(d))]), _: 1 }, 16), s(e(i), r(n(o.styleSettings)), { default: t(() => [s(e(y))]), _: 1 }, 16)]), _: 1 }));
} }), P = f(x).use(_);
P.mount("#content_agora");
//# sourceMappingURL=agora-userSettings.mjs.map
