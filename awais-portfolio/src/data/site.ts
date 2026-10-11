// site.js
import portraitImg from "./Awais.jpg";        // fallback / about photo
import smallImg from "./awais-ali.png";       // renamed — no space

export const site = {
  // ── Identity ────────────────────────────────────────────
  name: "Awais Ali Raza",
  shortName: "AWAIS",
  initials: "AR",
  role: "AI Engineer | Full Stack",
  tagline: "I build AI that ships.",
  description:
    "AI Engineer & Full Stack Developer building real-world AI systems, LLM applications, and scalable backend products.",

  // ── Contact ─────────────────────────────────────────────
  email: "awaisalirazaa@gmail.com",
  phone: "+92 304 4810928",
  location: "Lahore, Pakistan",
  locationShort: "Lahore, PK",
  availability: "Open to AI & Full Stack roles",

  // ── Assets ──────────────────────────────────────────────
  portrait: portraitImg,          // Hero  → Awais Ali.png  (second image)
  portraitAbout: smallImg,  // About → Awais.jpg      (first image)
  resume: "/Awais-AI-ML-Resume.pdf",

  // ── Socials ─────────────────────────────────────────────
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/awais-ali-raza-full-stack-developer264b9285",
      handle: "awais-ali-raza",
      index: "01",
    },
    {
      label: "GitHub",
      href: "https://github.com/Awais185",
      handle: "@Awais185",
      index: "02",
    },
    {
      label: "HuggingFace",
      href: "https://huggingface.co/awais61",
      handle: "@awais61",
      index: "03",
    },
    {
      label: "Email",
      href: "mailto:awaisalirazaa@gmail.com",
      handle: "awaisalirazaa",
      index: "04",
    },
  ],

  // ── Stats ───────────────────────────────────────────────
  stats: [
    { value: "70+", label: "ML / DL / NLP models shipped" },
    { value: "2",   label: "Production FastAPI microservices" },
    { value: "3",   label: "Fine-tuned Mistral LLM" },
    { value: "2027", label: "BSc expected, Superior University" },
  ],

  // ── SEO ─────────────────────────────────────────────────
  seo: {
    title: "Awais Ali Raza — AI Engineer & Full Stack Developer",
    description:
      "AI Engineer building RAG assistants, fine-tuned LLMs, and scalable FastAPI/Django backends. 70+ ML/DL/NLP models shipped.",
    url: "https://awaisaliraza.dev",
    ogImage: "/og-image.png",
  },
} as const;