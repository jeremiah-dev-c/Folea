import type { SVGProps } from "react";
import Image from "next/image";

function AppleGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 16" fill="currentColor" {...props}>
      <path d="M11.4 8.5c0-1.8 1.5-2.7 1.6-2.8-.9-1.3-2.2-1.4-2.7-1.5-1.1-.1-2.2.65-2.8.65-.6 0-1.5-.6-2.5-.6-1.3 0-2.5.75-3.1 1.9-1.35 2.3-.35 5.75.95 7.6.65.9 1.4 1.9 2.4 1.85.95-.05 1.3-.6 2.45-.6s1.45.6 2.5.6c1.05-.05 1.7-.95 2.35-1.85.5-.7.85-1.5 1.05-1.85-.75-.35-1.6-1.15-1.6-2.4ZM9.3 2.7c.55-.65.9-1.55.8-2.45-.8.05-1.75.55-2.3 1.2-.5.55-.95 1.5-.85 2.35.85.1 1.75-.45 2.35-1.1Z" />
    </svg>
  );
}

/**
 * `tone="light"` is de omgekeerde variant voor donkere achtergronden. De
 * standaard zwarte pill verdwijnt volledig op de zwarte footer.
 */
export function ApplePayBadge({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span
      className={
        tone === "light"
          ? "flex h-6 items-center gap-1 rounded-md bg-white px-2.5 text-ink"
          : "flex h-6 items-center gap-1 rounded-md bg-charcoal px-2.5 text-white"
      }
    >
      <AppleGlyph className="h-3 w-3" />
      <span className="text-xs font-semibold italic">Pay</span>
    </span>
  );
}

export function IdealWeroBadge() {
  return (
    <span className="relative block h-6 w-16 overflow-hidden rounded-md">
      <Image
        src="/images/payment-ideal-wero.png"
        alt="iDEAL en Wero"
        fill
        sizes="64px"
        className="object-contain"
      />
    </span>
  );
}
