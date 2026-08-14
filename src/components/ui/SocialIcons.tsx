import { useId, type SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Instagram-glyph in de eigen merkverloop (geel naar roze naar paars), voor
 * plekken waar het icoon juist mag opvallen. `useId` houdt de gradient-id
 * uniek als er meerdere op één pagina staan.
 */
export function InstagramIconColor(props: SVGProps<SVGSVGElement>) {
  const gradientId = `ig-gradient-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <defs>
        <linearGradient id={gradientId} x1="2" y1="22" x2="22" y2="2">
          <stop offset="0%" stopColor="#fdc468" />
          <stop offset="35%" stopColor="#e1306c" />
          <stop offset="70%" stopColor="#c13584" />
          <stop offset="100%" stopColor="#833ab4" />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke={`url(#${gradientId})`}
        strokeWidth={2}
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke={`url(#${gradientId})`}
        strokeWidth={2}
      />
      <circle cx="17.4" cy="6.6" r="1.2" fill={`url(#${gradientId})`} />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82c-.7-.77-1.09-1.77-1.09-2.82h-3.05v13.44a2.6 2.6 0 1 1-1.84-2.49v-3.13a5.7 5.7 0 0 0-.76-.05A5.75 5.75 0 1 0 15.6 16.5V9.4a7.5 7.5 0 0 0 4.4 1.4V7.75a4.85 4.85 0 0 1-3.4-1.93Z" />
    </svg>
  );
}

export function SnapchatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3c-2.9 0-4.8 2.1-4.8 4.9 0 1.1.05 1.9-.1 2.5-.7.15-1.3.1-1.8-.05-.35-.1-.7.2-.6.55.3 1 1.15 1.6 1.9 1.95-.1.35-.3.7-.6 1.05-.7.8-1.7 1.15-2.4 1.3-.35.1-.4.6-.05.75.6.25 1.5.5 2.15.55.05.25.15.6.35.9.25.4.85.35 1.55.25.6-.1 1.35-.2 2.1.15.7.35 1.35 1.2 2.3 1.2s1.6-.85 2.3-1.2c.75-.35 1.5-.25 2.1-.15.7.1 1.3.15 1.55-.25.2-.3.3-.65.35-.9.65-.05 1.55-.3 2.15-.55.35-.15.3-.65-.05-.75-.7-.15-1.7-.5-2.4-1.3-.3-.35-.5-.7-.6-1.05.75-.35 1.6-.95 1.9-1.95.1-.35-.25-.65-.6-.55-.5.15-1.1.2-1.8.05-.15-.6-.1-1.4-.1-2.5C16.8 5.1 14.9 3 12 3Z" />
    </svg>
  );
}
