export const BUTTON_HOVER_TYPES = [
  "breathing",
  "softGlowEnergy",
  "waveFill",
  "floatingLift",
  "petalRipple",
  "energyLineSweep",
  "zenBlurFocus",
  "textFloat",
  "gradientShift",
  "organicBorderDraw",
] as const;

export type ButtonHoverType = (typeof BUTTON_HOVER_TYPES)[number];

export function motionOk(): boolean {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getHoverTypeClasses(hoverType: ButtonHoverType): string {
  switch (hoverType) {
    case "waveFill":
      return "button-hover-surface button-hover-wave";
    case "petalRipple":
      return "button-hover-surface button-hover-ripple";
    case "energyLineSweep":
      return "button-hover-surface button-hover-sweep";
    case "gradientShift":
      return "button-hover-surface button-hover-gradient";
    case "organicBorderDraw":
      return "button-hover-surface button-hover-border";
    default:
      return "";
  }
}
