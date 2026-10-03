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
        title="Selected work"
        aside={
          <div
            role="group"
            aria-label="Filter projects by category"
            className="onyx-scroll flex max-w-full gap-1 overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--chip)] p-1 sm:flex-wrap sm:overflow-visible"
          >
            {["All", "Frontend", "Backend", "Fullstack"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setProjectTab(tab)}
                aria-pressed={projectTab === tab}
                className={`flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[10px] font-medium transition-all duration-200 cursor-pointer sm:px-3 sm:text-[11px] ${
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
      <Shell className="px-4 py-5 sm:px-8 sm:py-7">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((p, i) => (
              <motion.div
                key={p.title}
                className={i === 0 ? "md:col-span-2" : ""}
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
