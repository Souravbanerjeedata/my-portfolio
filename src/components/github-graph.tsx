import { motion } from "framer-motion";
import { site } from "@/config/site";
import { GitHubIcon, ArrowUpRight } from "./icons";
import { useEffect, useState } from "react";

const DAYS = 7;

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total: Record<string, number | string>;
  contributions: ContributionDay[];
}

const SHADES = [
  "bg-slate-800/70",
  "bg-sky-950",
  "bg-sky-800",
  "bg-sky-600",
  "bg-cyan-400",
];

export function GitHubGraph() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!site.github.username) return;

    fetch(`https://github-contributions-api.jogruber.de/v4/${site.github.username}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contribution data");
        return res.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching GitHub graph data:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (!site.github.username) return null;
  const profile = `https://github.com/${site.github.username}`;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const weeks: ContributionDay[][] = [];
  if (data?.contributions && data.contributions.length > 0) {
    for (let i = 0; i < data.contributions.length; i += 7) {
      weeks.push(data.contributions.slice(i, i + 7));
    }
  }

  const contributionsCount = data?.contributions
    ? data.contributions.reduce((sum, d) => sum + d.count, 0).toLocaleString()
    : null;

  return (
        <div className="folio-activity-card folio-github-map rounded-2xl p-6 backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between">
            <a
              href={profile}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-200 transition-colors hover:text-white"
            >
              <GitHubIcon className="h-4 w-4" />
              @{site.github.username}
              <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <span className="font-mono text-xs text-neutral-400 flex items-center gap-2">
              {loading && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
                </span>
              )}
              {error ? (
                <span>Live GitHub data is unavailable</span>
              ) : loading ? (
                <span>Loading GitHub data…</span>
              ) : contributionsCount !== null ? (
                <span>{contributionsCount} contributions in the last year</span>
              ) : (
                <span>No public contribution data returned</span>
              )}
            </span>
          </div>

          {weeks.length > 0 && <div className={`overflow-x-auto pb-1 transition-opacity duration-300 ${loading ? "opacity-60" : "opacity-100"}`}>
            <div className="flex gap-[3px]">
              {weeks.map((week, w) => (
                <div key={w} className="flex flex-col gap-[3px]">
                  {week.map((day, d) => (
                    <motion.span
                      key={day.date}
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (w * DAYS + d) * 0.001, duration: 0.15 }}
                      className={`h-[11px] w-[11px] flex-none rounded-[2px] transition-colors duration-300 ${SHADES[day.level]}`}
                      title={
                        `${day.count === 0 ? "No" : day.count} contribution${
                              day.count === 1 ? "" : "s"
                            } on ${formatDate(day.date)}`
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>}

          {weeks.length > 0 && <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-neutral-500">
            Less
            {SHADES.map((s, i) => (
              <span key={i} className={`h-[10px] w-[10px] rounded-[2px] ${s}`} />
            ))}
            More
          </div>}
        </div>
  );
}
