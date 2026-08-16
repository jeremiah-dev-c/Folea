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
 *
 * De tekst wordt over precies één omtrek uitgespannen, dus elke lengte past.
 * Kort betekent ruime letters, lang betekent krappe. Ergens rond de vijftig
 * tekens wordt het te krap om nog te lezen.
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
        {/*
          textLength spant de tekst over precies één omtrek (2π × 36 = 226.19).
          Zonder dat hangt het van de tekstlengte af of hij past: "met de hand
          gemaakt" werd 273 lang op een pad van 226, waardoor het staartje over
          het begin heen viel en "gemaakt" halverwege afbrak.

          lengthAdjust="spacing" past alleen de letterafstand aan en laat de
          letters zelf ongemoeid; met de standaard "spacingAndGlyphs" worden ze
          uitgerekt. De letterafstand komt hier dus uit, niet uit een vaste
          letterSpacing.
        */}
        <text className="fill-current font-sans text-[9.5px] font-semibold uppercase">
          <textPath
            href={`#${pathId}`}
            startOffset="0%"
            textLength={226.19}
            lengthAdjust="spacing"
          >
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
