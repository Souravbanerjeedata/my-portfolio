/** Theme-aware Iconify ids. Dark mode uses light-on-dark friendly glyphs. */
export const SKILL_ICONS: Record<
  string,
  { light: string; dark: string; className?: string }
> = {
  TypeScript: { light: "vscode-icons:file-type-typescript-official", dark: "vscode-icons:file-type-typescript-official" },
  JavaScript: { light: "vscode-icons:file-type-js-official", dark: "vscode-icons:file-type-js-official" },
  Python: { light: "vscode-icons:file-type-python", dark: "vscode-icons:file-type-python" },
  HTML: { light: "vscode-icons:file-type-html", dark: "vscode-icons:file-type-html" },
  CSS: { light: "vscode-icons:file-type-css", dark: "vscode-icons:file-type-css" },
  SCSS: { light: "vscode-icons:file-type-scss2", dark: "vscode-icons:file-type-scss2" },
  React: { light: "vscode-icons:file-type-reactjs", dark: "vscode-icons:file-type-reactjs" },
  "React Native": { light: "vscode-icons:file-type-reactjs", dark: "vscode-icons:file-type-reactjs" },
  "Next.js": {
    light: "logos:nextjs-icon",
    dark: "ri:nextjs-fill",
    className: "text-white",
  },
  Redux: { light: "logos:redux", dark: "logos:redux" },
  "Tailwind CSS": { light: "vscode-icons:file-type-tailwind", dark: "vscode-icons:file-type-tailwind" },
  Bootstrap: { light: "logos:bootstrap", dark: "logos:bootstrap" },
  JQuery: { light: "logos:jquery", dark: "logos:jquery" },
  Vite: { light: "logos:vitejs", dark: "logos:vitejs" },
  "Node.js": { light: "logos:nodejs-icon", dark: "logos:nodejs-icon" },
  "Express.js": {
    light: "simple-icons:express",
    dark: "simple-icons:express",
    className: "text-[var(--fg)]",
  },
  "REST APIs": {
    light: "mdi:api",
    dark: "mdi:api",
    className: "text-[var(--accent)]",
  },
  GraphQL: { light: "logos:graphql", dark: "logos:graphql" },
  MongoDB: { light: "vscode-icons:file-type-mongo", dark: "vscode-icons:file-type-mongo" },
  PostgreSQL: { light: "logos:postgresql", dark: "logos:postgresql" },
  MySQL: { light: "logos:mysql", dark: "logos:mysql" },
  Git: { light: "logos:git-icon", dark: "logos:git-icon" },
  GitHub: {
    light: "mdi:github",
    dark: "mdi:github",
    className: "text-[var(--fg)]",
  },
  Deno: {
    light: "logos:deno",
    dark: "simple-icons:deno",
    className: "text-[var(--fg)]",
  },
  Expo: {
    light: "simple-icons:expo",
    dark: "simple-icons:expo",
    className: "text-[var(--fg)]",
  },
};

export function getSkillIcon(
  skill: string,
  theme: "light" | "dark"
): { icon: string; className?: string } {
  const entry = SKILL_ICONS[skill];
  if (!entry) {
    return { icon: "lucide:code-2", className: "text-[var(--accent)]" };
  }
  const icon = theme === "dark" ? entry.dark : entry.light;
  // In dark mode, monochrome icons must inherit light foreground
  const monoDark =
    theme === "dark" &&
    (entry.className?.includes("fg") ||
      skill === "Next.js" ||
      skill === "Express.js" ||
      skill === "GitHub" ||
      skill === "Deno" ||
      skill === "Expo");
  return {
    icon,
    className: monoDark
      ? "text-zinc-100"
      : entry.className || undefined,
  };
}
