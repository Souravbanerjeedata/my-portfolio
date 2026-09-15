import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shell } from "@/components/Layout";
import { site } from "@/config/site";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Nav({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Timeline", path: "/experience" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/75 backdrop-blur-xl">
      <Shell className="flex items-center justify-between px-6 py-3.5 sm:px-8">
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="text-display text-[1.15rem] tracking-tight text-[var(--fg)] transition-opacity hover:opacity-80"
        >
          {site.firstName}
          <span className="text-[var(--accent)]">.</span>
        </Link>

        <nav className="hidden items-center gap-1 text-[13px] sm:flex">
          {navLinks.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`relative rounded-full px-3.5 py-1.5 transition-colors ${
                  isActive
                    ? "bg-[var(--accent-soft)] font-semibold text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {label}
              </Link>
            );
          })}

          {onOpenPalette && (
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Search Command Palette"
              className="ml-1 grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all hover:border-[var(--accent-border)] hover:text-[var(--fg)]"
            >
              <Search size={14} />
            </button>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all hover:border-[var(--accent-border)] hover:text-[var(--fg)]"
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </nav>

        <button
          type="button"
          className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] sm:hidden"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </Shell>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[var(--line)] sm:hidden"
          >
            <Shell className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-[14px] ${
                    location.pathname === path
                      ? "bg-[var(--accent-soft)] font-semibold text-[var(--accent)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2">
                {onOpenPalette && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenPalette();
                    }}
                    className="flex-1 rounded-xl border border-[var(--line)] py-2 text-[13px] text-[var(--muted)]"
                  >
                    Search ⌘K
                  </button>
                )}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="rounded-xl border border-[var(--line)] px-4 py-2 text-[var(--muted)]"
                >
                  {dark ? <Sun size={14} /> : <Moon size={14} />}
                </button>
              </div>
            </Shell>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
