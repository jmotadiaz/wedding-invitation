import intersect from "@alpinejs/intersect";
import bindTimer from "@components/Timer.alpine";
import type { Alpine } from "alpinejs";

export default (Alpine: Alpine) => {
	Alpine.plugin(intersect);
	bindTimer(Alpine);
};
