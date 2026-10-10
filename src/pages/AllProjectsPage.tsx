import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { ProjectCard } from "@/sections/ProjectCard";

/** A focused project archive with only project cards and a route back home. */
export function AllProjectsPage() {
  return (
    <div className="min-h-screen px-4 pb-12 pt-5 sm:px-8 sm:pt-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)]/80 px-4 py-2 font-mono text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {site.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
