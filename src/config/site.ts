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
  role: "Full Stack & React Native Developer",
  location: "Kolkata, India",
  timezone: "Asia/Kolkata",
  email: "sourav.banerjeejobs@gmail.com",
  greeting: "Hey, I'm Sourav",
  tagline:
    "Self-taught full-stack & React Native developer building scalable web and mobile applications. Open to internships and junior roles.",
  about: [
    "Hey, I'm Sourav — a self-taught Full Stack and React Native developer based in Kolkata. After working in analytical and process roles at TCS, I made the deliberate switch into software development and have been building real projects for the last 3.5+ years.",
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
    nowBuilding: "Full-stack & React Native projects",
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
      role: "Full Stack & React Native Developer",
      period: "2022 – Present",
      blurb:
        "Transitioned into software development through consistent self-learning and project building. Developed multiple frontend and full-stack applications using MERN/PERN stack, JavaScript/TypeScript, CSS/SCSS and modern tooling. Currently focused on production-ready patterns, DSA.",
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
      title: "Bankist Payment App",
      blurb:
        "A modern banking UI demo featuring transfers, loan requests, account closing and real-time balance updates. Built with vanilla JavaScript and a focus on clean DOM manipulation and user flows.",
      stack: ["JavaScript", "HTML", "CSS"],
      year: "2024",
      links: {
        source: "https://github.com/Souravbanerjeedata/Bankist-payment-app",
      },
      featured: true,
      categories: ["Frontend"],
    },
    {
      title: "Food Order App",
      blurb:
        "Interactive food ordering interface with cart management, quantity controls and order summary. Demonstrates component thinking and state handling in a practical e-commerce style flow.",
      stack: ["JavaScript", "React", "CSS"],
      year: "2024",
      links: {
        source: "https://github.com/Souravbanerjeedata/food-order-app",
      },
      featured: true,
      categories: ["Frontend"],
    },
    {
      title: "MovieLand — React Movie App",
      blurb:
        "Movie discovery app that fetches and displays films with search functionality. Clean UI focused on browsing and finding titles quickly.",
      stack: ["React", "CSS", "JavaScript"],
      year: "2024",
      links: {
        source: "https://github.com/Souravbanerjeedata/movieland--react-movie-app",
      },
      featured: false,
      categories: ["Frontend"],
    },
    {
      title: "Natours — Touring Landing Page",
      blurb:
        "Responsive, high-fidelity landing page for a fictional touring company. Built with advanced SCSS architecture, animations and modern layout techniques.",
      stack: ["HTML", "SCSS", "CSS"],
      year: "2023",
      links: {
        source: "https://github.com/Souravbanerjeedata/Natour--Touring-Landing-Page",
      },
      featured: false,
      categories: ["Frontend"],
    },
    {
      title: "Project Management App",
      blurb:
        "Simple project management tool built with React. Supports task organization and basic project tracking workflows.",
      stack: ["React", "JavaScript"],
      year: "2024",
      links: {
        source: "https://github.com/Souravbanerjeedata/simple-project-management-app-with-react",
      },
      featured: false,
      categories: ["Frontend"],
    },
    {
      title: "Tic-Tac-Toe with React",
      blurb:
        "Classic Tic-Tac-Toe game implemented in React with clean component structure and win/draw logic.",
      stack: ["React", "JavaScript"],
      year: "2023",
      links: {
        source: "https://github.com/Souravbanerjeedata/tic-tac-toe-with-react",
      },
      featured: false,
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
