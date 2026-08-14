import { cn } from "@/lib/utils/cn";
import { VelocityTrack } from "@/components/ui/VelocityTrack";

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Negatief laat de band de andere kant op lopen. */
  baseVelocity?: number;
  /** Een dunne scheidingsband vraagt om een heel andere maat dan een
   *  wordmark-overlay over foto's. */
  textClassName?: string;
  /** Horizon Outlined in plaats van de gevulde variant. */
  outlined?: boolean;
}

export function Marquee({
  items,
  className,
  baseVelocity = 2,
  textClassName = "text-xl sm:text-2xl md:text-3xl",
  outlined = false,
}: MarqueeProps) {
  return (
    <VelocityTrack
      baseVelocity={baseVelocity}
      className={className}
      trackClassName="gap-10 sm:gap-16"
    >
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          aria-hidden="true"
          className={cn(
            "whitespace-nowrap uppercase leading-none tracking-[0.04em]",
            outlined ? "font-outline" : "font-display",
            textClassName,
          )}
        >
          {item}
        </span>
      ))}
    </VelocityTrack>
  );
}
