"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Honour the OS "reduce motion" setting: transform animations resolve instantly, opacity fades remain. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
