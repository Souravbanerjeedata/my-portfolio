export type Project = {
  title: string;
  blurb: string;
  story?: string;
  stack: string[];
  year: string;
  links: { live?: string; source?: string };
  featured?: boolean;
  status?: string;
  image?: string;
  categories?: ("Frontend" | "Backend" | "Fullstack")[];
};

export type Job = {
  company: string;
  role: string;
  period: string;
  blurb: string;
  url?: string;
};

export type Post = {
  title: string;
  summary: string;
  date: string;
  url: string;
  readingTime?: string;
};

export const site = {
  name: "Sourav Banerjee",
  firstName: "Sourav",
  url: "https://souravbanerjee.dev",
  quote: {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  profileImages: [
    "/profile.jpg",
    "/profile2.png",
  ],
  bannerImage: "/images/cover.jpg",
  socialBannerImage: "/social-banner.png",
  initials: "SB",
  role: "Full Stack Developer",
  location: "Kolkata, India",
  timezone: "Asia/Kolkata",
  email: "sourav.banerjeejobs@gmail.com",
  greeting: "Hey, I'm Sourav",
  tagline:
    "Self-taught full-stack developer building scalable web and mobile applications. Open to internships and junior roles.",
  about: [
    "Hey, I'm Sourav — a self-taught Full Stack developer based in Kolkata. After working in analytical and process roles at TCS, I made the deliberate switch into software development and have been building real projects for the last 3.5+ years.",
    "I focus on clean, practical applications with MERN / PERN stack and modern frontend architecture.",
    "Currently deepening DSA knowledge and solving problems on LeetCode while looking for an internship or junior developer role where I can contribute and grow.",
  ],
  tldr: [
    "Career switcher from TCS → developer",
    "Self-taught for 3.5+ years",
    "Building web & mobile apps",
    "Open to internships & junior roles",
  ],
  status: {
    available: true,
    availableText: "open to opportunities",
    nowLearning: "DSA • System Design • MERN / PERN • React Native",
    nowBuilding: "Full-stack projects",
    nowListening: "focus playlists",
  },
  socials: {
    github: "https://github.com/Souravbanerjeedata",
    twitter: "https://x.com/souravdotcode",
    linkedin: "https://www.linkedin.com/in/sourav-banerjee-code",
    email: "mailto:sourav.banerjeejobs@gmail.com",
    resume: "https://drive.google.com/file/d/1_lJHna9_EGCsCR4g7tU8n7F2irpO5GNl/view",
    discord: "",
    medium: "",
  },
  experience: [
    {
      company: "Independent / Self-taught",
      role: "Full Stack Developer",
      period: "2023 – Present",
      blurb:
        "Transitioned into software development through consistent self-learning and project building. Developed multiple frontend and full-stack applications using MERN/PERN stack, JavaScript/TypeScript, CSS/SCSS and modern tooling. Currently focused on production-ready patterns & DSA.",
      url: "https://github.com/Souravbanerjeedata",
    },
    {
      company: "Tata Consultancy Services (TCS)",
      role: "HR / PMO & Analytical Roles",
      period: "Earlier career",
      blurb:
        "Worked in HR and Project Management Office functions, gaining strong analytical, process and stakeholder management experience. This foundation in structured thinking and problem-solving now supports my work as a developer.",
      url: "https://www.tcs.com",
    },
  ] as Job[],
  projects: [
    {
      title: "To-Do App",
      blurb:
        "A modern cross-platform to-do app with real-time sync, dark/light themes, and clean task management — built with React Native, Expo, and Convex.",
      story:
        "Backend lives entirely on Convex: typed mutations and queries power add, edit, complete, and delete flows with live updates across devices. Expo Router drives tab navigation (Home + Settings). Theme state is managed through a custom hook so light and dark modes stay consistent. UI uses linear gradients and polished micro-interactions while keeping the component tree simple and readable.",
      stack: ["React Native", "Expo", "TypeScript", "Convex", "Expo Router"],
      year: "2026",
      links: {
        source: "https://github.com/Souravbanerjeedata/to-do-app",
      },
      featured: true,
      image: "/project-images/todo-app.png",
      categories: ["Frontend", "Fullstack"],
    },
    {
      title: "Movie Search App",
      blurb:
        "Netflix-style movie & TV discovery app with auth, search, detail pages, continue-watching, and live TMDB data — built in React Native + Expo + TypeScript.",
      story:
        "File-based routing via Expo Router organizes Home, Movies, Series, Search, and Profile screens. TMDB is integrated through Axios with a custom useFetch hook for loading and error states. Reanimated smooths poster loads and transitions. Auth screens (login/signup) sit in front of the main experience. Detail views surface overview, genres, and similar titles for a full streaming-app feel.",
      stack: ["React Native", "Expo", "TypeScript", "TMDB API", "Axios", "Reanimated"],
      year: "2026",
      links: {
        source: "https://github.com/Souravbanerjeedata/movie-app-rn",
      },
      featured: true,
      image: "/project-images/movie-app-rn.png",
      categories: ["Frontend"],
    },
    {
      title: "Apple Invites Carousel Animation",
      blurb:
        "High-fidelity recreation of Apple Invites card animations — gesture-driven reveal, drag-to-dismiss, spring physics, and blur — in React Native.",
      story:
        "Built with Reanimated 3 and Gesture Handler for buttery 60fps interactions. Invitation cards scale, rotate, and dismiss with spring physics that mirror Apple's design language. Background blur and micro-interactions keep the experience premium. NativeWind (Tailwind) handles styling while Expo Router scaffolds the screen structure. Focus was on matching timing curves and gesture thresholds as closely as possible.",
      stack: ["React Native", "Expo", "TypeScript", "Reanimated 3", "Gesture Handler", "NativeWind"],
      year: "2026",
      links: {
        source: "https://github.com/Souravbanerjeedata/apple-invites-animation-rn",
      },
      featured: true,
      image: "/project-images/apple-invites.png",
      categories: ["Frontend"],
    },
    {
      title: "Cocktail Website",
      blurb:
        "Scroll-driven GSAP cocktail landing page with SplitText reveals, parallax, pinned sections, scroll-synced video, and a custom animated carousel.",
      story:
        "GSAP ScrollTrigger orchestrates multi-section timelines: pinned hero sequences, SplitText intro reveals, parallax layers, and image-mask transitions. Video playback is locked to scroll progress for a cinematic feel. A custom carousel and responsive Tailwind layout keep the experience polished on every viewport. Vite powers a fast React + Tailwind toolchain optimized for animation-heavy pages.",
      stack: ["React", "GSAP", "ScrollTrigger", "Tailwind CSS", "Vite"],
      year: "2025",
      links: {
        live: "https://cocktail-website-ivory.vercel.app/",
        source: "https://github.com/Souravbanerjeedata/cocktail-website",
      },
      featured: true,
      image: "/project-images/cocktail-website.png",
      categories: ["Frontend"],
    },
    {
      title: "Food Recipe App",
      blurb:
        "React Native recipe browser with searchable collections, detail screens for ingredients & steps, and favorites powered by Context.",
      story:
        "React Navigation (stack) moves between browse, collection, and recipe detail screens. Recipe data is structured in local models; favorites persist via React Context. Screens emphasize photography-first cards and clear ingredient/step layouts. Built as a focused mobile cooking companion with clean StyleSheet UI and reusable list components.",
      stack: ["React Native", "Expo", "React Navigation", "React Context", "JavaScript"],
      year: "2026",
      links: {
        source: "https://github.com/Souravbanerjeedata/food-recipe-app-reactnative",
      },
      featured: false,
      image: "/project-images/food-recipe-rn.png",
      categories: ["Frontend"],
    },
    {
      title: "Food Order App",
      blurb:
        "Food ordering UI with delivery/pickup modes, restaurant listings, product detail, customizations, and cart-style order flow — React + Vite.",
      story:
        "Home screen supports delivery, pickup, and dine-in modes with filterable restaurant cards. Product pages show image carousels, ratings, tags, and add-ons (extra toppings, special requests). Cart and order summary close the loop. Frontend is component-driven React with Vite; a companion backend folder supports API-shaped data for a full order experience.",
      stack: ["React", "JavaScript", "Vite", "CSS"],
      year: "2025",
      links: {
        source: "https://github.com/Souravbanerjeedata/food-order-app",
      },
      featured: false,
      image: "/project-images/food-order-app.png",
      categories: ["Frontend"],
    },
  ] as Project[],
  skills: [
    "TypeScript",
    "JavaScript",
    "Python",
    "HTML",
    "CSS",
    "SCSS",
    "React",
    "React Native",
    "Next.js",
    "Redux",
    "Tailwind CSS",
    "Bootstrap",
    "JQuery",
    "Vite",
    "Node.js",
    "Express.js",
    "REST APIs",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Git",
    "GitHub",
    "Deno",
    "Expo",
  ],
  writing: [] as Post[],
  github: {
    username: "Souravbanerjeedata",
    contributionsLastYear: "100+",
  },
  footerNote: "Built with ❤️ while learning and shipping",
} as const;

export type Site = typeof site;
