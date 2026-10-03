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
      <Shell className="px-5 py-10 text-center sm:px-8">
        <p className="text-[14px] text-[var(--muted)]">
          Designed &amp; Developed by{" "}
          <span className="font-semibold text-[var(--fg)]">{site.name}</span>
        </p>
        <p className="mt-1.5 font-mono text-[12px] text-[var(--soft)]">
          © {new Date().getFullYear()} All rights reserved.
        </p>
        <p className="mt-3 flex items-center justify-center gap-2 font-mono text-[12px] text-[var(--soft)]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-[var(--accent)]" />
          </span>
          {site.location} · {localTime || "IST"}
        </p>
      </Shell>
    </footer>
  );
}
