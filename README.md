# Sourav Banerjee — Portfolio

My personal portfolio — self-taught Full Stack & React Native developer based in Kolkata.

**Live:** [sourav-dev-portfolio.vercel.app](https://sourav-dev-portfolio.vercel.app/)

---

## Tech stack

| Layer     | Tools                                      |
| --------- | ------------------------------------------ |
| UI        | React 18, TypeScript                       |
| Build     | Vite 6                                     |
| Styling   | Tailwind CSS, CSS variables (dark / light) |
| Motion    | Framer Motion                              |
| Routing   | React Router                               |
| Icons     | Lucide React, Iconify                      |
| Analytics | Vercel Analytics                           |

---

## Features

- **Dark / light theme** with system-friendly toggle
- **Command palette** (`⌘K` / `Ctrl+K`) for quick navigation and actions
- **Switchable profile images** (click the avatar)
- **Projects grid** with filters, live demos, GitHub links, and expandable engineering details
- **Timeline** (career switch from TCS → developer)
- **Tech stack** section with category filters
- **GitHub contribution heatmap** (live data)
- **Custom cursor** (desktop) — dual ring/dot, theme-aware
- Fully responsive layout

---

## Getting started

```bash
# clone
git clone https://github.com/Souravbanerjeedata/my-portfolio.git
cd my-portfolio

# install
npm install

# develop
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# production build
npm run build

# preview build
npm run preview
```

---

## Customize content

Almost all personal content lives in one file:

```
src/config/site.ts
```

Edit there to update:

- Name, role, location, tagline
- About paragraphs & TL;DR snapshot
- Experience / timeline
- Projects (title, blurb, story, stack, links, images)
- Skills
- Social links & resume URL

Project preview images go in:

```
public/project-images/
```

Profile images:

```
public/profile.jpg
public/profile2.png
```

---

## Project structure

```
src/
  components/     # Nav, footer, command palette, cursor, etc.
  sections/       # Hero, About, Projects, Timeline, TechStack, …
  config/site.ts  # All site content
  pages/          # Route-level pages
  hooks/          # GitHub heatmap, etc.
  index.css       # Design tokens & global styles
public/
  project-images/ # Project banners
  profile*.jpg    # Avatars
```

---

## Deploy

Configured for **Vercel** (`vercel.json` included).

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Deploy (build command: `npm run build`, output: `dist`)

---

## License

Personal portfolio — feel free to fork the structure for your own site.  
Please don’t copy personal content, photos, or project write-ups as your own.

---

Built by [Sourav Banerjee](https://github.com/Souravbanerjeedata) · Kolkata, India
