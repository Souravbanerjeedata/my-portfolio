import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import {
  GitHubIcon,
  TwitterIcon,
  LinkedInIcon,
  MailIcon,
  FileIcon,
} from "./icons";

const items = [
  { key: "github", href: site.socials.github, label: "GitHub", Icon: GitHubIcon },
  { key: "twitter", href: site.socials.twitter, label: "X", Icon: TwitterIcon },
  { key: "linkedin", href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { key: "email", href: site.socials.email, label: "Mail", Icon: MailIcon },
  { key: "resume", href: site.socials.resume, label: "Resume", Icon: FileIcon },
];

const hoverCardsData: Record<string, {
  pronouns?: string;
  handle: string;
  bio: string;
  stats?: string[];
  bannerText: string;
}> = {
  github: {
    handle: "@Souravbanerjeedata",
    bio: "Self-taught Full Stack & React Native Developer. Building web & mobile apps. Open to internships and junior roles.",
    stats: ["6+ Projects", "Active Learning"],
    bannerText: "learn • build • ship",
  },
  twitter: {
    handle: "@souravdotcode",
    bio: "Building scalable web and mobile applications. Career switcher turning ideas into code.",
    stats: ["Tech Thoughts", "Dev on X"],
    bannerText: "connect • share • grow",
  },
  linkedin: {
    pronouns: "He/Him",
    handle: "in/sourav-banerjee-code",
    bio: "Full Stack & React Native Developer. Transitioning from TCS analytical roles into software development.",
    stats: ["Open to Work", "Kolkata, India"],
    bannerText: "network • build • impact",
  },
  email: {
    handle: "sourav.banerjeejobs@gmail.com",
    bio: "Available for internships, junior developer roles, and collaborative projects. Feel free to reach out.",
    stats: ["Fast Response", "Direct Email"],
    bannerText: "collab • contact • direct",
  },
  resume: {
    handle: "Curriculum Vitae",
    bio: "One-page ATS-friendly resume highlighting skills, projects and career transition story.",
    stats: ["PDF Resume", "1-Page CV"],
    bannerText: "skills • experience • growth",
  }};

export function Socials({ className = "" }: { className?: string }) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <div className={`flex flex-wrap items-center gap-3.5 ${className}`}>
      {items
        .filter((i) => i.href)
        .map(({ key, href, label, Icon }) => {
          const card = hoverCardsData[key];

          return (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-2 font-mono text-xs text-neutral-300 hover:border-neutral-600 hover:text-white hover:bg-neutral-800/80 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm"
              >
                <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110 text-neutral-400 group-hover:text-white" />
                <span>{label}</span>
                <span className="text-[10px] text-neutral-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white">↗</span>
              </a>

              <AnimatePresence>
                {hoveredKey === key && card && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 12 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 z-50 w-72 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/95 shadow-2xl backdrop-blur-xl pointer-events-none select-none"
                  >
                    {/* Banner header */}
                    <div className="relative h-20 w-full overflow-hidden flex items-center justify-center bg-neutral-950">
                      <img
                        src={(site as any).socialBannerImage || "/banner.png"}
                        alt="Banner"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      <span className="relative z-10 font-mono text-[9px] uppercase tracking-widest text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/20 shadow-sm">
                        {card.bannerText}
                      </span>
                    </div>

                    {/* Profile body details */}
                    <div className="relative px-4 pb-4 pt-1">
                      <div className="absolute -top-6 left-4 h-12 w-12 rounded-full border-2 border-neutral-900 bg-neutral-950 overflow-hidden shadow-md">
                        <img
                          src={site.profileImages[0]}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="mt-7">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">
                            {site.name}
                          </span>
                          <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          {card.pronouns && (
                            <span className="text-[9px] font-mono text-neutral-400 bg-neutral-800 border border-neutral-700 rounded-md px-1.5 py-0.2">
                              {card.pronouns}
                            </span>
                          )}
                        </div>

                        <p className="text-[10px] font-mono text-neutral-400 mt-0.5">
                          {card.handle}
                        </p>

                        <p className="text-[10px] text-neutral-300 leading-relaxed mt-2.5">
                          {card.bio}
                        </p>

                        {card.stats && (
                          <div className="mt-3 flex gap-3 border-t border-neutral-800 pt-2 text-[9px] font-mono text-neutral-400">
                            {card.stats.map((s, idx) => (
                              <span key={idx} className="flex items-center gap-1">
                                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
    </div>
  );
}
