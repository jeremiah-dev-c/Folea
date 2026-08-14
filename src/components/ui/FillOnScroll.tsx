"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface FillOnScrollProps {
  text: string;
  className?: string;
  /** Rendert als h2 tenzij anders gevraagd. */
  as?: "h2" | "h3" | "p";
}

/**
 * Kop in Horizon Outlined die zich van links naar rechts vult met de gevulde
 * variant, gestuurd door de scrollpositie. De omtrekversie draagt de echte
 * tekst; de vulling ligt eroverheen en is aria-hidden, zodat de zin niet twee
 * keer wordt voorgelezen.
 */
export function FillOnScroll({
  text,
  className,
  as: Tag = "h2",
}: FillOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  return (
    <Tag
      className={cn(
        "uppercase leading-[1.15] tracking-[0.02em]",
        className,
      )}
    >
      <span ref={ref} className="relative inline-block">
        <span className="font-outline">{text}</span>
        <motion.span
          aria-hidden="true"
          style={prefersReduced ? undefined : { clipPath }}
          className="absolute inset-0 font-display"
        >
          {text}
        </motion.span>
      </span>
    </Tag>
  );
}
