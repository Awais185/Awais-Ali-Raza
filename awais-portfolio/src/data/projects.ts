export const projects = {
  index: "04 // WEB DEVELOPMENT & FULL STACK",
  headline: "FULL STACK & BACKEND",
  subtitle:
    "Scalable Microservice Architectures, REST APIs, WebSockets & Production Engineering.",

  roles: {
    title: "WEB DEVELOPMENT PROFESSIONAL EXPERIENCE",
    meta: "3 INDUSTRY ROLES",
    items: [
      {
        period: "2026 — PRESENT",
        badge: "CURRENT",
        title: "Full Stack Developer @ Offneo",
        body: "Designed and engineered independent microservices and RESTful APIs with FastAPI and PostgreSQL, JWT auth, and structured client-server contracts.",
        tags: ["FastAPI", "PostgreSQL", "JWT"],
      },
      {
        period: "2024 TO 2025",
        meta: "LAHORE, PK",
        title: "Web Developer (Backend) @ Tecla Enterprises",
        body: "Engineered scalable Django backends, designed relational database schemas, and authored RESTful APIs in agile sprint cycles.",
        tags: ["Django", "REST APIs", "MySQL"],
      },
      {
        period: "2023 TO 2024",
        meta: "REMOTE",
        title: "Website Manager & SEO Specialist @ Sky Furdy Tech",
        body: "Managed production web properties, analyzed tracking data and core web vitals, improving site speed and search engine visibility.",
        tags: ["Web Vitals", "SEO", "Analytics"],
      },
    ],
  },

  backend: {
    title: "FULL STACK & BACKEND PROJECTS",
    meta: "PRODUCTION MICROSERVICES & WEBSOCKETS",
    items: [
      {
        category: "MICROSERVICES",
        title: "ConnectJob",
        body: "Job connection platform built on independent FastAPI microservices with JWT security, job-matching algorithms, and automated API specifications.",
        tags: ["FastAPI", "Docker", "PostgreSQL"],
      },
      {
        category: "E-COMMERCE BACKEND",
        title: "Mega Market",
        body: "High-scale marketplace backend orchestrating FastAPI inventory management, payment gateway hooks, and order fulfillment services.",
        tags: ["Microservices", "FastAPI", "Redis", "PostgreSQL"],
      },
      {
        category: "REALTIME FULL STACK",
        title: "Great Kart & Live Chatting App",
        body: "Full-featured e-commerce ecosystem integrating React and Django REST framework with asynchronous WebSockets for sub-millisecond real-time messaging.",
        tags: ["React", "Django REST", "WebSockets", "PostgreSQL"],
      },
    ],
  },
} as const;