import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { ProjectCard } from "@/sections/ProjectCard";

/** A focused project archive with category filters and a route back home. */
export function AllProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Frontend", "Backend", "Fullstack"];
  const filteredProjects = useMemo(
    () => selectedCategory === "All"
      ? site.projects
      : site.projects.filter((project) => project.categories?.includes(selectedCategory as "Frontend" | "Backend" | "Fullstack")),
    [selectedCategory],
  );

  return (
    <div className="min-h-screen px-4 pb-12 pt-5 sm:px-8 sm:pt-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)]/80 px-4 py-2 font-mono text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
          <div role="group" aria-label="Filter projects by category" className="onyx-scroll flex max-w-full gap-1 overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--chip)] p-1">
            {categories.map((category) => (
              <button key={category} type="button" onClick={() => setSelectedCategory(category)} aria-pressed={selectedCategory === category}
                className={`shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-medium transition-all duration-200 sm:px-3 sm:text-[11px] ${selectedCategory === category ? "bg-[var(--fg)] font-semibold text-[var(--bg)] shadow-sm" : "text-[var(--muted)] hover:text-[var(--fg)]"}`}>
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {filteredProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index + 1} />)}
        </div>
        {filteredProjects.length === 0 && <p className="py-12 text-center font-mono text-[13px] text-[var(--muted)]">No projects in this category.</p>}
      </div>
    </div>
  );
}
