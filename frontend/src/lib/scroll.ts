import Lenis from "lenis";

let lenis: Lenis | null = null;

export const initLenis = () => {
  lenis = new Lenis({ lerp: 0.09 });
  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return () => {
    lenis?.destroy();
    lenis = null;
  };
};

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth" });
};
