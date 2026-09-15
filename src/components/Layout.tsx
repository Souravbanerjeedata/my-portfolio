import React from "react";

export function Shell({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[820px] border-x border-[var(--line)] ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  aside,
  id,
}: {
  title: string;
  aside?: React.ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="relative w-full border-y border-[var(--line)]">
      <Shell className="bg-[var(--bg)]/80 backdrop-blur-sm">
        <span className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-70" />
        <span className="absolute right-0 top-0 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-70" />
        <div className="flex w-full items-center justify-between gap-4 px-6 py-4 sm:px-8">
          <h2 className="section-title text-[var(--fg)]">{title}</h2>
          {aside}
        </div>
      </Shell>
    </div>
  );
}

export function GapBand({
  h = "h-8",
  className = "",
}: {
  h?: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${h} ${className}`}>
      <Shell className="h-full bg-transparent" />
    </div>
  );
}
