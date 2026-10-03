import { useEffect, useState } from "react";
import { Shell } from "@/components/Layout";
import { site } from "@/config/site";

export function Footer() {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const tick = () => {
      try {
        setLocalTime(
          new Date().toLocaleTimeString("en-IN", {
            timeZone: site.timezone || "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } catch {
        setLocalTime("");
      }
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="mt-auto border-t border-[var(--line)]">
      <Shell className="flex flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-9">
        <div>
          <p className="text-[13px] text-[var(--muted)]">
            Designed &amp; developed by <span className="font-semibold text-[var(--fg)]">{site.name}</span>
          </p>
          <p className="mt-1 font-mono text-[10px] text-[var(--soft)]">© {new Date().getFullYear()} · Made with curiosity.</p>
        </div>
        <p className="flex items-center gap-2 font-mono text-[11px] text-[var(--soft)]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-[var(--accent)]" />
          </span>
          {site.location} <span className="text-[var(--line)]">/</span> {localTime || "IST"}
        </p>
      </Shell>
    </footer>
  );
}
