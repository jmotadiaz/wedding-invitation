import type { Alpine } from "alpinejs";
import intersect from "@alpinejs/intersect";
import bindTimer from "@components/Timer.alpine";

export default (Alpine: Alpine) => {
  Alpine.plugin(intersect);
  bindTimer(Alpine);
};
