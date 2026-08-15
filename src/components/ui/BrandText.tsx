import { Fragment } from "react";

/**
 * Zet elke "FOLÉA" in een tekst in het displaylettertype van het etiket.
 *
 * Horizon staat naast Plus Jakarta Sans optisch te groot en te breed, vandaar
 * de correctie op grootte en letterafstand. Het font is in de praktijk
 * hoofdletters-only, dus de merknaam wordt sowieso in kapitalen weergegeven.
 */
export function BrandText({ children }: { children: string }) {
  const delen = children.split(/(FOLÉA)/g);

  return (
    <>
      {delen.map((deel, i) =>
        deel === "FOLÉA" ? (
          <span
            key={i}
            className="font-display text-[0.86em] tracking-[0.01em]"
          >
            {deel}
          </span>
        ) : (
          <Fragment key={i}>{deel}</Fragment>
        ),
      )}
    </>
  );
}
