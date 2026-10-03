import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { Icon } from "@iconify/react";
import { useTheme } from "@/components/theme-provider";
import { getSkillIcon } from "@/lib/skill-icons";

const CATEGORY_ICONS: Record<string, string> = {
  All: "lucide:layers",
  Languages: "lucide:code-2",
  Frontend: "lucide:layout",
  Backend: "lucide:server",
  Databases: "lucide:database",
  "DevOps & Tools": "lucide:terminal",
};

const skillCategories: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "HTML", "CSS", "SCSS"],
  Frontend: [
    "React",
    "React Native",
    "Next.js",
    "Redux",
    "Tailwind CSS",
    "Bootstrap",
    "JQuery",
    "Vite",
  ],
  Backend: ["Node.js", "Express.js", "REST APIs", "GraphQL"],
  Databases: ["MongoDB", "PostgreSQL", "MySQL"],
  "DevOps & Tools": ["Git", "GitHub", "Deno", "Expo"],
};

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { theme } = useTheme();
  const mode = theme === "light" ? "light" : "dark";

  if (!site.skills.length) return null;

  const categories = [
    "All",
    "Languages",
    "Frontend",
    "Backend",
    "Databases",
    "DevOps & Tools",
  ];

  const filteredSkills =
    activeCategory === "All"
      ? site.skills
      : site.skills.filter((skill) =>
          skillCategories[activeCategory]?.includes(skill)
        );

  return (
    <div id="tech" className="scroll-mt-28">
      <SectionHeader title="Tech Stack" />
      <Shell className="px-5 sm:px-8">
        <div className="flex flex-wrap gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--chip)] p-1.5">
          {categories.map((cat) => {
            const iconName = CATEGORY_ICONS[cat] || "lucide:layers";
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all duration-200 sm:px-3 sm:text-[12px] ${
                  activeCategory === cat
                    ? "bg-[var(--fg)] font-semibold text-[var(--bg)] shadow-sm"
                    : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]"
                }`}
              >
                <Icon icon={iconName} width={14} height={14} />
                <span className="whitespace-nowrap">{cat}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-6 flex flex-wrap gap-2.5 pb-8">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const { icon, className } = getSkillIcon(skill, mode);
              return (
                <motion.span
                  key={skill}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                  className="flex cursor-default items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--card)] px-3 py-2 font-mono text-[12px] text-[var(--muted)] transition-colors hover:border-[var(--accent-border)] hover:text-[var(--fg)]"
                >
                  <Icon
                    icon={icon}
                    width={18}
                    height={18}
                    className={`size-[18px] shrink-0 ${className || ""}`}
                  />
                  {skill}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Shell>
    </div>
  );
}
