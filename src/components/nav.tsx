import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { site } from "@/config/site";
import { Binary, Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/#about" },
  { label: "Projects", path: "/projects" },
  { label: "Timeline", path: "/experience" },
  { label: "Tech Stack", path: "/tech" },
  { label: "Contact", path: "/contact" },
];

export function Nav() {
  const location = useLocation();
  const { mode, toggleMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerBg = "bg-[var(--card)]/85 border-[var(--line)]";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
    >
      <div className={`mx-auto flex h-14 max-w-6xl items-center justify-between nav-container rounded-2xl border px-4 shadow-lg shadow-black/5 backdrop-blur-2xl transition-colors duration-300 sm:px-6 lg:rounded-full ${headerBg}`}>
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
                    : "text-[var(--fg)] hover:text-[var(--accent)]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <button type="button" onClick={toggleMode} title={`Switch to ${mode === "matrix" ? "neon" : "Matrix"} theme`} aria-label={`Switch to ${mode === "matrix" ? "neon" : "Matrix"} theme`} className="hidden items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-2 font-mono text-[10px] font-semibold tracking-wider text-[var(--accent)] transition hover:shadow-[0_0_18px_var(--accent-soft)] xl:inline-flex">
          {mode === "matrix" ? <Zap size={14} /> : <Binary size={14} />}
          {mode === "matrix" ? "NEON" : "MATRIX"}
        </button>

        <div className="flex items-center gap-2 xl:hidden">
          <button type="button" onClick={toggleMode} title={`Switch to ${mode === "matrix" ? "neon" : "Matrix"} theme`} aria-label={`Switch to ${mode === "matrix" ? "neon" : "Matrix"} theme`} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2.5 font-mono text-[9px] font-semibold tracking-wide text-[var(--accent)]">
            {mode === "matrix" ? <Zap size={13} /> : <Binary size={13} />}
            {mode === "matrix" ? "NEON" : "MATRIX"}
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
            className="nav-container absolute inset-x-3 top-[4.5rem] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg)]/95 shadow-xl backdrop-blur-xl xl:hidden sm:inset-x-6"
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
                      : "text-[var(--fg)] hover:text-[var(--accent)]"
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




