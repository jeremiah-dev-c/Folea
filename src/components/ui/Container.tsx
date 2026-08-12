import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-page)] px-6 md:px-10 lg:px-16",
        className,
      )}
      {...props}
    />
  );
}
