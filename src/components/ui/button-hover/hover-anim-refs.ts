import type { MutableRefObject } from "react";
import type gsap from "gsap";

export type HoverAnimRefs = {
  main: MutableRefObject<gsap.core.Tween | gsap.core.Timeline | null>;
  icon: MutableRefObject<gsap.core.Tween | null>;
};

export function killHoverTweens(refs: HoverAnimRefs): void {
  refs.main.current?.kill();
  refs.main.current = null;
  refs.icon.current?.kill();
  refs.icon.current = null;
}
