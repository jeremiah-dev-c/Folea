import { useId } from "react";
import { cn } from "@/lib/utils/cn";

interface RotatingBadgeProps {
  /** Wordt rond de cirkel gezet; herhaal het scheidingsteken zelf mee. */
  text: string;
  className?: string;
}

/**
 * Ronddraaiend zegel met de tekst langs een cirkelpad. Puur decoratief, dus
 * aria-hidden. Stilstaand onder prefers-reduced-motion via `animate-spin-slow`.
 */
export function RotatingBadge({ text, className }: RotatingBadgeProps) {
  // Het pad-id moet uniek zijn, anders pakken meerdere badges hetzelfde pad.
  const pathId = `badge-path-${useId().replace(/:/g, "")}`;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
    >
      <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full">
        <defs>
          <path
            id={pathId}
            fill="none"
            d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>
        <text
          className="fill-current font-sans text-[9.5px] font-semibold uppercase"
          style={{ letterSpacing: "0.18em" }}
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
