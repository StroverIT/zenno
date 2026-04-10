"use client";

import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef, type MutableRefObject } from "react";

import { killHoverTweens, type HoverAnimRefs } from "./hover-anim-refs";
import { runHoverPreset } from "./hover-presets";
import {
  animateIdle,
  animatePress,
  applyZenBlurRestingState,
  setInitialCssVars,
  setRippleOrigin,
} from "./hover-tweens";
import type { ButtonHoverType } from "./types";
import { motionOk } from "./types";

type UseButtonHoverOptions = {
  disabled?: boolean;
  hoverType: ButtonHoverType;
};

export function useButtonHover({ disabled, hoverType }: UseButtonHoverOptions): {
  elementRef: MutableRefObject<HTMLElement | null>;
} {
  const elementRef = useRef<HTMLElement | null>(null);
  const mainTweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const iconTweenRef = useRef<gsap.core.Tween | null>(null);

  const refs = useMemo<HoverAnimRefs>(
    () => ({ main: mainTweenRef, icon: iconTweenRef }),
    []
  );

  useLayoutEffect(() => {
    const el = elementRef.current;
    if (!el || disabled || !motionOk()) return;

    const icon = el.querySelector("svg");
    setInitialCssVars(el);

    const onEnter = () => runHoverPreset(el, icon, hoverType, refs);
    const onLeave = () => animateIdle(el, icon, refs);
    const onDown = () => animatePress(el, refs);
    const onUp = () => {
      if (el.matches(":hover")) onEnter();
      else onLeave();
    };
    const onMove = (event: PointerEvent) => {
      if (hoverType === "petalRipple") setRippleOrigin(el, event);
    };

    if (hoverType === "zenBlurFocus") {
      applyZenBlurRestingState(el);
    }

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onLeave);
    el.addEventListener("pointermove", onMove);

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onLeave);
      el.removeEventListener("pointermove", onMove);
      killHoverTweens(refs);
      gsap.killTweensOf(el);
      if (icon) gsap.killTweensOf(icon);
    };
  }, [disabled, hoverType, refs]);

  return { elementRef };
}
