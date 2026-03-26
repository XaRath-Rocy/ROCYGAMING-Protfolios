// ═══════════════════════════════════════════════════════════════
//  RocyGaming Portfolio — Central Site Config (Dynamic Content)
// ═══════════════════════════════════════════════════════════════

export const siteData = {
  brand: {
    name: "RocyGaming",
    tagline: "Developer — 2 Years Experience",
  },

  navLinks: [
    { label: "About", id: "about" },
    { label: "Works", id: "works" },
    { label: "Process", id: "process" },
    { label: "Skills", id: "skills" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ],

  hero: {
    subtitle: "Developer — 2 Years Experience",
    title: "Designing",
    titleHighlight: "Playable Web Experiences",
    body: [
      "I build fast and aesthetic web apps for modern brands.",
      "From concept to deployment, I craft smooth user journeys",
      "that feel premium on every screen.",
    ],
    ctaPrimary: { label: "Explore Projects", href: "#works" },
    ctaSecondary: { label: "Hire Me", href: "#contact" },
    ghostLetter: "R",
    scrollLabel: "Scroll Down",
  },

  ticker: [
    "React",
    "JavaScript",
    "Frontend Development",
    "Web Design",
    "Creative Coding",
    "Responsive UI",
    "Three.js",
    "Clean Code",
  ],

  about: {
    label: "About Me",
    heading: ["I make the", "invisible", "visible."],
    bio: "A 19-year-old developer with 2+ years of experience. I work at the intersection of code, design, and creativity — building web experiences that are both functional and beautiful. From Surat to the internet, I bring ideas to life with clean code and pixel-perfect execution.",
    stats: [
      ["02+", "Years coding"],
      ["5+", "Projects"],
      ["20+", "Clients"],
      ["∞", "Ideas"],
    ],
    frame: {
      initials: "RG",
      role: "Developer",
      location: "Surat · India",
    },
  },

  works: {
    label: "Featured",
    labelHighlight: "Works",
    projectsCount: "04 Case Studies",
    projects: [
      {
        num: "01",
        title: "E-Commerce Platform",
        tags: ["React", "Full Stack"],
        desc: "Full-featured online store with cart, payments, and admin dashboard — built from scratch with modern stack.",
        color: "#1a0f08",
        accent: "#c8a050",
        large: true,
      },
      {
        num: "02",
        title: "Portfolio Generator",
        tags: ["Frontend", "Tools"],
        desc: "Dynamic portfolio builder with customizable themes and real-time preview.",
        color: "#080d14",
        accent: "#6eb4d4",
      },
      {
        num: "03",
        title: "Dashboard UI Kit",
        tags: ["Design System", "Components"],
        desc: "Reusable dashboard components and data visualization charts for SaaS apps.",
        color: "#0c100a",
        accent: "#8ac870",
      },
      {
        num: "04",
        title: "Game Showcase Site",
        tags: ["Three.js", "Creative"],
        desc: "Interactive 3D portfolio with WebGL background and immersive scroll experience.",
        color: "#12080e",
        accent: "#c86eb4",
      },
    ],
  },

  process: {
    label: "How I Work",
    heading: ["The art of", "making things", "matter."],
    steps: [
      {
        n: "01",
        t: "Understand",
        b: "Every project starts with understanding the problem, user needs, and the goal we're aiming for.",
      },
      {
        n: "02",
        t: "Plan & Design",
        b: "From wireframes to architecture — structuring the solution before writing a single line of code.",
      },
      {
        n: "03",
        t: "Build & Iterate",
        b: "Where code meets craft. Clean, maintainable, and scalable — built with modern tools and best practices.",
      },
      {
        n: "04",
        t: "Ship & Support",
        b: "Deploying with confidence. Monitoring, optimization, and continuous improvement.",
      },
    ],
  },

  skills: {
    label: "Expertise",
    heading: ["Tools of", "the trade"],
    subtext: "Built over 2 years of real projects, real clients, real deadlines.",
    groups: [
      {
        cat: "Frontend",
        skills: [
          ["React", 92],
          ["JavaScript", 90],
          ["HTML / CSS", 88],
        ],
      },
      {
        cat: "Tools & Build",
        skills: [
          ["Vite", 88],
          ["Git", 85],
          ["Tailwind CSS", 82],
        ],
      },
      {
        cat: "Creative",
        skills: [
          ["Three.js", 78],
          ["Responsive Design", 85],
          ["UI / UX", 80],
        ],
      },
    ],
  },

  testimonials: [
    {
      quote:
        "RocyGaming delivered a clean, fast, and beautiful website. The code was well-structured and easy to maintain.",
      name: "Client A",
      role: "Startup Founder",
    },
    {
      quote:
        "Working with a developer who understands both code and design is rare. Highly recommended.",
      name: "Client B",
      role: "Project Manager",
    },
    {
      quote:
        "On-time delivery, clear communication, and quality work. Will hire again.",
      name: "Client C",
      role: "Creative Director",
    },
  ],

  contact: {
    label: "Open for Projects",
    heading: ["Let's make", "something", "beautiful."],
    subtext: ["Currently available for freelance projects.", "Reach out and let's start a conversation."],
    email: "RocyGaming4445@gmail.com",
    socials: [
      { name: "GitHub", href: "https://github.com/XaRath-Rocy", icon: null },
      { name: "Instagram", href: "https://instagram.com/cryptexdev.v1", icon: null },
      { name: "Twitter", href: "https://twitter.com/XaRathRocy", icon: null },
      { name: "Discord", href: "https://discord.com/users/759629021326737408", icon: null },
    ],
  },

  footer: {
    copyright: "© 2025 RocyGaming. All rights reserved.",
    tagline: "Made with code & passion",
  },
};
