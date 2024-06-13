import intersect from "@alpinejs/intersect";
import bindTimer from "@components/Timer.alpine";
import collapse from "@alpinejs/collapse";
import type { Alpine } from "alpinejs";

export default (Alpine: Alpine) => {
  Alpine.plugin(intersect);
  Alpine.plugin(collapse);
  bindTimer(Alpine);
};
