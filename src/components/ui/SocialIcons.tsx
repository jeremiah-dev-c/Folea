import type { SVGProps } from "react";

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

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82c-.7-.77-1.09-1.77-1.09-2.82h-3.05v13.44a2.6 2.6 0 1 1-1.84-2.49v-3.13a5.7 5.7 0 0 0-.76-.05A5.75 5.75 0 1 0 15.6 16.5V9.4a7.5 7.5 0 0 0 4.4 1.4V7.75a4.85 4.85 0 0 1-3.4-1.93Z" />
    </svg>
  );
}

export function PinterestIcon(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 17c1-3.5 1.8-6.5 2.2-8.2a2.3 2.3 0 0 1 4.5.8c0 2-1.2 4.4-3 4.4-.7 0-1.2-.4-1.4-.9" />
      <path d="M11 12c-.3 1-1 3-1 4" />
    </svg>
  );
}
