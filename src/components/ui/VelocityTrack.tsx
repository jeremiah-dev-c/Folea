"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils/cn";

/** Houdt een waarde binnen [min, max) en laat hem daarbinnen rondlopen. */
function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

interface VelocityTrackProps {
  children: ReactNode;
  /** Procent van de trackbreedte per seconde. Negatief loopt de andere kant op. */
  baseVelocity?: number;
  className?: string;
  /** Klassen voor de bewegende rij zelf, bijvoorbeeld de tussenruimte. */
  trackClassName?: string;
}

/**
 * Horizontaal doorlopende band die reageert op de scrollsnelheid: sneller
 * scrollen versnelt de band, en omhoog scrollen keert de looprichting om.
 * De inhoud wordt twee keer gerenderd, zodat de sprong op -50% samenvalt met
 * het beginpunt van de tweede kopie en de lus onzichtbaar is.
 */
export function VelocityTrack({
  children,
  baseVelocity = 2,
  className,
  trackClassName,
}: VelocityTrackProps) {
  const baseX = useMotionValue(0);
  const directionRef = useRef(1);
  const prefersReduced = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // clamp uit: hard doorscrollen mag de band echt laten uitschieten.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (prefersReduced) return;

    let moveBy = directionRef.current * baseVelocity * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) directionRef.current = -1;
    else if (factor > 0) directionRef.current = 1;

    moveBy += directionRef.current * moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        style={prefersReduced ? undefined : { x }}
        className={cn("flex w-max items-center", trackClassName)}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
