import Lenis from "../vendor/lenis.mjs";

let lenis = null;

export function initSmoothScroll() {
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.1,
    anchors: true,
    prevent: (node) => node.closest?.(".fslightbox-container") !== null,
  });
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
