import gsap from "gsap";

import type { HoverAnimRefs } from "./hover-anim-refs";
import { killHoverTweens } from "./hover-anim-refs";

const CSS_VAR_RESET = {
  "--button-wave-scale": 0,
  "--button-wave-opacity": 0,
  "--button-ripple-scale": 0,
  "--button-ripple-opacity": 0,
  "--button-sweep-x": "-140%",
  "--button-sweep-opacity": 0,
  "--button-gradient-x": "0%",
  "--button-gradient-opacity": 0,
  "--button-border-top": "0%",
  "--button-border-right": "0%",
  "--button-border-bottom": "0%",
  "--button-border-left": "0%",
  "--button-border-opacity": 0.2,
} as const;

export function setInitialCssVars(el: HTMLElement): void {
  gsap.set(el, { ...CSS_VAR_RESET });
}

export function animateIdle(el: HTMLElement, icon: Element | null, refs: HoverAnimRefs): void {
  killHoverTweens(refs);

  refs.main.current = gsap.to(el, {
    y: 0,
    scale: 1,
    rotate: 0,
    letterSpacing: "0em",
    filter: "blur(0px) brightness(1)",
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    duration: 0.24,
    ease: "power2.out",
    overwrite: "auto",
  });

  if (icon) {
    refs.icon.current = gsap.to(icon, {
      x: 0,
      y: 0,
      duration: 0.24,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  gsap.to(el, {
    ...CSS_VAR_RESET,
    duration: 0.24,
    ease: "power2.out",
    overwrite: "auto",
  });
}

export function animatePress(el: HTMLElement, refs: HoverAnimRefs): void {
  killHoverTweens(refs);
  refs.main.current = gsap.to(el, {
    y: 0,
    scale: 0.98,
    duration: 0.14,
    ease: "power2.out",
    overwrite: "auto",
  });
}

export function setRippleOrigin(el: HTMLElement, event: PointerEvent): void {
  const rect = el.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  gsap.set(el, { "--button-ripple-x": x, "--button-ripple-y": y });
}

export function applyZenBlurRestingState(el: HTMLElement): void {
  gsap.set(el, { filter: "blur(0.45px) brightness(0.985)" });
}
