export const skills = {
  index: "02 // SKILLS & ARCHITECTURE",
  headline: "TOOLKIT",
  subtitle:
    "From model training to production APIs the full stack for shipping intelligent software.",

  // Flat list — mobile fallback / SEO / chip cloud
  all: [
    "Python", "TypeScript", "JavaScript", "C++",
    "FastAPI", "Django", "Django REST Framework", "Node.js",
    "REST APIs", "GraphQL", "Microservices", "WebSockets",
    "React", "Next.js", "Flutter", "Tailwind CSS", "HTML/CSS",
    "Machine Learning", "Deep Learning", "NLP", "LLM Fine-Tuning",
    "Transformers", "RAG", "MCP",
    "PyTorch", "TensorFlow", "Scikit-learn", "OpenCV",
    "PostgreSQL", "MySQL", "Git", "GitHub", "Docker", "Linux",
    "SEO", "Website Performance",
  ],

  rings: [
    {
      size: "small",
      duration: 60,
      reverse: false,
      items: [
        "Machine Learning",
        "Deep Learning",
        "NLP",
        "LLM Fine-Tuning",
        "RAG + MCP",
      ],
    },
    {
      size: "medium",
      duration: 90,
      reverse: true,
      items: [
        "PyTorch",
        "TensorFlow",
        "Scikit-learn",
        "OpenCV",
        "Transformers",
        "PostgreSQL",
      ],
    },
    {
      size: "large",
      duration: 120,
      reverse: false,
      items: [
        "Python / FastAPI",
        "Django / DRF",
        "React / Next.js",
        "Flutter",
        "Docker / Git",
        "MySQL / WebSockets",
      ],
    },
  ],
} as const;