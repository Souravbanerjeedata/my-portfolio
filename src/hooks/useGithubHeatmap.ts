import { useEffect, useState } from "react";

export interface HeatmapDay {
  date: string;
  count: number;
  level: number;
}

interface HeatmapData {
  cells: (HeatmapDay | null)[];
  total: number;
  status: "loading" | "live" | "error";
}

/** Fetch public contribution data for the configured GitHub username. */
export function useGithubHeatmap(user: string): HeatmapData {
  const [heatmap, setHeatmap] = useState<HeatmapData>({
    cells: [],
    total: 0,
    status: "loading",
  });

  useEffect(() => {
    const controller = new AbortController();
    setHeatmap({ cells: [], total: 0, status: "loading" });

    fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub activity request failed");
        return response.json();
      })
      .then((data) => {
        const contributions = Array.isArray(data?.contributions) ? data.contributions : [];
        if (contributions.length === 0) throw new Error("No contribution data returned");

        const firstDayOffset = new Date(`${contributions[0].date}T00:00:00`).getDay();
        const cells: (HeatmapDay | null)[] = Array(firstDayOffset).fill(null);
        for (const contribution of contributions) {
          const level = Number(contribution.level);
          const count = Number(contribution.count);
          if (!contribution.date || !Number.isFinite(count)) continue;
          cells.push({
            date: contribution.date,
            count,
            level: Math.max(0, Math.min(4, Number.isFinite(level) ? level : 0)),
          });
        }
        if (!cells.some(Boolean)) throw new Error("No valid contribution data returned");

        const totalFromApi = Number(data?.total?.lastYear);
        const total = Number.isFinite(totalFromApi)
          ? totalFromApi
          : contributions.reduce((sum: number, day: { count: number }) => sum + Number(day.count || 0), 0);
        setHeatmap({ cells, total, status: "live" });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setHeatmap({ cells: [], total: 0, status: "error" });
      });

    return () => controller.abort();
  }, [user]);

  return heatmap;
}
