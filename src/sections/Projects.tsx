import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ProjectCard } from "./ProjectCard";

export function Projects({ isSearchable = false }: { isSearchable?: boolean }) {
  const [projectTab, setProjectTab] = useState<string>("All");

  const displayedProjects = useMemo(() => {
    return site.projects.filter((p) => {
      if (projectTab === "Frontend" && !p.categories?.includes("Frontend")) return false;
      if (projectTab === "Backend" && !p.categories?.includes("Backend")) return false;
      if (projectTab === "Fullstack" && !p.categories?.includes("Fullstack")) return false;
      return true;
    });
  }, [projectTab]);

  return (
    <div id="projects" className="scroll-mt-28">
      <SectionHeader
        title="Projects"
        aside={
          <div className="flex gap-1 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-0.5">
            {["All", "Frontend", "Backend", "Fullstack"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setProjectTab(tab)}
                className={`flex items-center justify-center text-center rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                  projectTab === tab
                    ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        }
      />
      <Shell className="px-4 py-6 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {displayedProjects.length === 0 && (
          <p className="py-12 text-center font-mono text-[13px] text-[var(--muted)]">
            No projects in this category.
          </p>
        )}
      </Shell>
    </div>
  );
}
