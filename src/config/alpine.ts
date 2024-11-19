import intersect from "@alpinejs/intersect";
import bindTimer from "@components/Timer.alpine";
import collapse from "@alpinejs/collapse";
import type { Alpine } from "alpinejs";

export default (Alpine: Alpine) => {
  Alpine.plugin(intersect);
  Alpine.plugin(collapse);
  bindTimer(Alpine);
  Alpine.magic("clipboard", () => (subject: string) => {
    navigator.clipboard.writeText(subject);
    showTmpMsg(`Copiado al portapapeles: ${subject}`);
  });
};

function showTmpMsg(msg: string, duration = 5000) {
  const msgElement = document.createElement("div");
  const container = document.createElement("div");

  container.setAttribute(
    "class",
    "fixed z-40 bottom-0 w-full flex justify-center items-center p-4"
  );
  msgElement.setAttribute(
    "class",
    "transition-opacity duration-500 opacity-0 bg-green-700 text-white px-6 py-3 rounded-full shadow-lg"
  );

  msgElement.textContent = msg;
  container.appendChild(msgElement);
  document.body.appendChild(container);

  setTimeout(() => {
    msgElement.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    msgElement.style.opacity = "0";
  }, duration);

  setTimeout(() => {
    document.body.removeChild(container);
  }, duration + 500);
}
