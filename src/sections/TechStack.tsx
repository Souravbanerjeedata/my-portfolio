import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { Icon } from "@iconify/react";

const CATEGORY_ICONS: Record<string, string> = {
  All: "lucide:layers",
  Languages: "lucide:code-2",
  Frontend: "lucide:layout",
  Backend: "lucide:server",
  Databases: "lucide:database",
  "DevOps & Tools": "lucide:terminal",
};

const SKILL_ICONS: Record<string, string> = {
  TypeScript: "logos:typescript-icon",
  JavaScript: "logos:javascript",
  Python: "logos:python",
  HTML: "logos:html-5",
  CSS: "logos:css-3",
  SCSS: "logos:sass",
  React: "logos:react",
  "React Native": "logos:react",
  "Next.js": "logos:nextjs-icon",
  Redux: "logos:redux",
  "Tailwind CSS": "logos:tailwindcss-icon",
  Bootstrap: "logos:bootstrap",
  JQuery: "logos:jquery",
  Vite: "logos:vitejs",
  "Node.js": "logos:nodejs-icon",
  "Express.js": "logos:express",
  "REST APIs": "lucide:cpu",
  GraphQL: "logos:graphql",
  MongoDB: "logos:mongodb-icon",
  PostgreSQL: "logos:postgresql",
  MySQL: "logos:mysql",
  Git: "logos:git-icon",
  GitHub: "logos:github-icon",
  Deno: "logos:deno",
  Expo: "simple-icons:expo",
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

  if (!site.skills.length) return null;

  const categories = ["All", "Languages", "Frontend", "Backend", "Databases", "DevOps & Tools"];

  const filteredSkills = activeCategory === "All"
    ? site.skills
    : site.skills.filter((skill) => skillCategories[activeCategory]?.includes(skill));

  return (
    <div id="tech">
      <SectionHeader title="Tech Stack" />
      <Shell>
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-1">
          {categories.map((cat) => {
            const iconName = CATEGORY_ICONS[cat] || "lucide:layers";
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm font-semibold"
                    : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]"
                }`}
              >
                <Icon icon={iconName} width={14} height={14} className="size-3.5" />
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skill Items Grid */}
        <motion.div layout className="mt-6 flex flex-wrap gap-2.5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const iconName = SKILL_ICONS[skill] || "lucide:code-2";
              return (
                <motion.span
                  key={skill}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                  className="flex cursor-default items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 font-mono text-[12px] text-[var(--muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] shadow-xs group"
                >
                  <Icon 
                    icon={iconName} 
                    width={16}
                    height={16}
                    className="size-4 shrink-0 transition-colors group-hover:filter group-hover:brightness-110" 
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

export default TechStack;
