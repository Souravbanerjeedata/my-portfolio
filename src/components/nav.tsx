import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { site } from "@/config/site";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/#about" },
  { label: "Projects", path: "/projects" },
  { label: "Timeline", path: "/experience" },
  { label: "Tech Stack", path: "/tech" },
  { label: "Contact", path: "/contact" },
];

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerBg = "bg-[var(--card)]/85 border-[var(--line)]";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
    >
      <div className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border px-4 shadow-lg shadow-black/5 backdrop-blur-2xl transition-colors duration-300 sm:px-6 lg:rounded-full ${headerBg}`}>
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="text-display text-[1.05rem] font-bold tracking-tight text-[var(--fg)] transition-opacity hover:opacity-80 sm:text-[1.1rem]"
        >
          {site.firstName}
          <span className="text-[var(--accent)]">.</span>
        </Link>

        <nav className="hidden items-center gap-0.5 text-[12px] xl:flex">
          {navLinks.map(({ label, path }) => {
            const active =
              path === "/#about"
                ? location.pathname === "/about" || location.hash === "#about"
                : path === "/"
                  ? location.pathname === "/" && location.hash !== "#about"
                  : location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`relative rounded-full px-2.5 py-2 transition-all xl:px-3 ${
                  active
                    ? "bg-[var(--accent-soft)] font-semibold text-[var(--accent)] shadow-[0_0_20px_var(--accent-soft)]"
                    : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-1 grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all hover:border-[var(--accent-border)] hover:text-[var(--fg)]"
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </nav>

        <div className="flex items-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)]"
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)]"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute inset-x-3 top-[4.5rem] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg)]/95 shadow-xl backdrop-blur-xl xl:hidden sm:inset-x-6"
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-4">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
