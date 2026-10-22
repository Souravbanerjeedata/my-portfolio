export type Project = {
  title: string;
  blurb: string;
  story?: string;
  stack: string[];
  year: string;
  links: { live?: string; video?: string; source?: string };
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
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  profileImages: ["/profile.jpg", "/profile2.jpg"],
  matrixProfileImages: ["/profile-matrix.jpg", "/profile-halftone.jpg"],
  bannerImage: "/images/cover-dark.jpg",
  bannerImageLight: "/images/cover-light.jpg",
  socialBannerImage: "/social-banner.png",
  initials: "SB",
  role: "Full Stack Developer",
  location: "Kolkata, India",
  timezone: "Asia/Kolkata",
  email: "sourav.banerjeejobs@gmail.com",
  greeting: "Hey, I'm Sourav",
  tagline:
    "Full-stack web developer focused on MERN Stack. Open to junior and internship roles, onsite in Kolkata or remote.",
  about: [
    "Hey, I'm Sourav — a self-taught Full Stack developer based in Kolkata. After working in analytical and process roles at TCS, I made the deliberate switch into software development and have been building real projects for the last 3.5+ years.",
    "I focus on clean, practical applications with MERN / PERN stack and modern frontend architecture.",
    "Currently deepening DSA knowledge and solving problems on LeetCode while looking for an internship or junior developer role where I can contribute and grow.",
  ],
  tldr: [
    "Career switcher from HR → developer",
    "Self-taught for 3.5+ years",
    "Building web & mobile apps",
    "Open to internships & junior roles",
  ],
  status: {
    available: true,
    availableText: "Junior / intern roles · Kolkata onsite or remote",
    nowLearning: "DSA • System Design",
    nowBuilding: "Full-stack projects",
  },
  socials: {
    github: "https://github.com/Souravbanerjeedata",
    twitter: "https://x.com/souravdotcode",
    linkedin: "https://www.linkedin.com/in/sourav-banerjee-code",
    email: "mailto:sourav.banerjeejobs@gmail.com",
    resume:
      "https://drive.google.com/file/d/1A_MGLn5fEII3NWAIq8PI6qkHO6Q4_FrA/view?usp=sharing",
    discord: "",
    medium: "",
  },
  experience: [
    {
      company: "Independent / Self-taught",
      role: "Full Stack Developer",
      period: "2023 – Present",
      blurb:
        "Transitioned into software development through consistent self-learning and project building. Developed multiple frontend and full-stack applications using MERN/PERN stack and modern tooling. Currently focused on production-ready patterns, DSA.",
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
      title: "Food Order App",
      blurb:
        "QuickBite is a responsive food ordering app with searchable, filterable dishes, a shopping cart, and an order summary.",
      story:
        "Order flow: The menu narrows as the visitor searches or chooses a category. Adding a dish or changing its quantity updates the cart, and the order summary recalculates the subtotal, delivery fee, taxes, and total. Confirming an order opens a confirmation modal and clears the cart.\n\nState and interface: Redux Toolkit owns cart state and its add, remove, and quantity actions. React Context shares search text, filtered dishes, and modal visibility across the interface. Keyboard support, ARIA labels, and visible focus states make the same flow usable without a mouse.",
      stack: [
        "React 19",
        "Vite 8",
        "Redux Toolkit",
        "React Context",
        "Custom CSS",
      ],
      year: "2026",
      links: {
        live: "https://food-order-app-react-wheat.vercel.app/",
        source: "https://github.com/Souravbanerjeedata/food-order-app-react",
      },
      featured: true,
      image: "/project-images/food-order-app-react.jpg",
      categories: ["Frontend"],
    },
    {
      title: "Electronics Store",
      blurb:
        "Responsive electronics storefront with a product catalog, product details, cart management, checkout flow, and client-side authentication.",
      story:
        "Shopping flow: React Router takes the visitor from the product catalog to a product detail page, cart, and checkout. Cart contents remain available as they move between screens. At checkout, the item list, subtotal, and tax are summarized before the order confirmation is shown.\n\nState and forms: React Context shares cart and authentication state across routes. React Hook Form manages form values and validation for sign-in, sign-up, and checkout screens. The experience runs client-side and reflows for desktop, tablet, and mobile layouts.",
      stack: [
        "React 19",
        "Vite",
        "React Router",
        "React Hook Form",
        "Context API",
        "CSS",
      ],
      year: "2026",
      links: {
        live: "https://electronics-ecommerce-react.vercel.app/",
        source:
          "https://github.com/Souravbanerjeedata/electronics-ecommerce-react",
      },
      featured: true,
      image:
        "https://raw.githubusercontent.com/Souravbanerjeedata/electronics-ecommerce-react/main/public/preview.jpg",
      categories: ["Frontend"],
    },
    {
      title: "AI Bot",
      blurb:
        "A responsive AI companion for multi-turn chat, image understanding, and AI image generation, powered by the Google Gemini API.",
      story:
        "Request flow: Each chat request sends the current conversation history to Gemini so replies can use earlier turns. In image-understanding mode, an uploaded image and the visitor’s question are sent together. Create mode sends a text prompt for image generation; the returned image can then be downloaded.\n\nClient behavior: React Context holds shared chat and feature state. Separate Gemini helpers handle chat, image understanding, and image generation from the React + Vite client. The interface reports missing API keys, oversized uploads, and failed requests instead of leaving those actions ambiguous.",
      stack: [
        "React 19",
        "Vite 8",
        "Google Gemini API",
        "React Context API",
        "Custom CSS",
      ],
      year: "2026",
      links: {
        live: "https://ai-bot-react.vercel.app/",
        source: "https://github.com/Souravbanerjeedata/ai-bot-react",
      },
      featured: true,
      image: "/project-images/ai-bot-react.png",
      categories: ["Frontend"],
    },
    {
      title: "Gaming Hub",
      blurb:
        "Responsive browser gaming hub with a multi-game library, CRUD-managed cards, real-time community chat, and a dark neon UI — pure HTML, CSS, JS.",
      story:
        "Library flow: The hub presents nine browser games as a single library. Its game cards support create, read, update, and delete actions, while the community chat displays messages in real time.\n\nPlaying a game: Choosing a title opens it in an embedded, full-screen play layer. Escape or the Back-to-Hub control closes that layer and returns to the library; a separate option opens the game in a new tab. The hub is built with HTML, CSS, and JavaScript.",
      stack: ["HTML", "CSS", "JavaScript"],
      year: "2026",
      links: {
        live: "https://souravbanerjeedata.github.io/Arcade-Nexus-Gaming-Hub/",
        source: "https://github.com/Souravbanerjeedata/Arcade-Nexus-Gaming-Hub",
      },
      featured: true,
      image: "/project-images/arcade-nexus.jpg",
      categories: ["Frontend"],
    },
    {
      title: "Cocktail Website",
      blurb:
        "Scroll-driven GSAP cocktail landing page with SplitText reveals, parallax, pinned sections, scroll-synced video, and a custom animated carousel.",
      story:
        "Scroll flow: GSAP ScrollTrigger maps scroll position to animation timelines. As the visitor moves down the page, it pins the hero, reveals SplitText headings, shifts parallax layers, and runs image-mask transitions. The video is synchronized to scroll progress, so its playback follows the visitor’s position.\n\nPage structure: React components organize the sections, while a custom carousel handles its own navigation. Tailwind CSS styles the responsive layouts, and Vite bundles the React app and animation code.",
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
      title: "To-Do App",
      blurb:
        "A modern cross-platform to-do app with real-time sync, dark/light themes, and clean task management — built with React Native, Expo, and Convex.",
      story:
        "Task flow: Creating, editing, completing, or deleting a task calls a typed Convex mutation. Convex queries provide the task data to the app and keep the list updated across devices as changes arrive.\n\nApp structure: Expo Router separates the Home and Settings tabs. A custom hook manages the light/dark theme state so the chosen theme stays consistent across screens. React Native renders the interface, with gradients and small interaction feedback around task actions.",
      stack: ["React Native", "Expo", "TypeScript", "Convex", "Expo Router"],
      year: "2026",
      links: {
        video: "https://lnkd.in/p/dH69fnpY",
        source: "https://github.com/Souravbanerjeedata/to-do-app",
      },
      featured: true,
      image: "/project-images/todo-app.png",
      categories: ["Frontend", "Fullstack"],
    },
    {
      title: "Movie Surfing App",
      blurb:
        "Netflix-style movie & TV discovery app with auth, search, detail pages, continue-watching, and live TMDB data — built in React Native + Expo + TypeScript.",
      story:
        "Browse flow: Expo Router maps the Home, Movies, Series, Search, Profile, and detail screens to file-based routes. Axios requests live movie and TV data from TMDB through a custom useFetch hook, which provides loading and error states while results are fetched.\n\nFrom result to detail: Selecting a title opens its detail screen with an overview, genres, and similar titles. Login and signup screens are included in the app flow, alongside search and continue-watching views. Reanimated handles poster loading transitions and screen motion.",
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "TMDB API",
        "Axios",
        "Reanimated",
      ],
      year: "2026",
      links: {
        video: "https://lnkd.in/p/d97vZWVj",
        source: "https://github.com/Souravbanerjeedata/movie-app-rn",
      },
      featured: true,
      image: "/project-images/movie-app-rn.png",
      categories: ["Frontend"],
    },
    {
      title: "Apple Invites Animation",
      blurb:
        "High-fidelity recreation of Apple Invites card animations — gesture-driven reveal, drag-to-dismiss, spring physics, and blur — in React Native.",
      story:
        "Gesture flow: Gesture Handler tracks touches on the invitation card. Those gesture values drive Reanimated 3 transitions: revealing the invitation scales and rotates the card, while dragging it away triggers a dismissal. Spring-based motion makes the card settle or exit based on the gesture.\n\nScreen and styling: Expo Router supplies the screen structure; NativeWind styles the React Native components. Background blur and small interaction details support the reveal, and the gesture thresholds and timing curves are tuned to reproduce the reference behavior.",
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "Reanimated 3",
        "Gesture Handler",
        "NativeWind",
      ],
      year: "2026",
      links: {
        video: "https://lnkd.in/p/diA-XybZ",
        source:
          "https://github.com/Souravbanerjeedata/apple-invites-animation-rn",
      },
      featured: true,
      image: "/project-images/apple-invites.png",
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
  coreSkills: [
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST APIs",
  ],
  writing: [] as Post[],
  github: {
    username: "Souravbanerjeedata",
    contributionsLastYear: "100+",
  },
  footerNote: "Built with ❤️ while learning and shipping",
} as const;

export type Site = typeof site;


