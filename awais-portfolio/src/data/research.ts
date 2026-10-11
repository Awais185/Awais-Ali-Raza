export const research = {
  index: "05.5 // ACADEMIC & TECHNICAL RESEARCH",
  headline: "RESEARCH",
  badge: "02 Applied Studies",
  subtitle:
    "Exploring Artificial Intelligence, Computer Vision, and Machine Learning through applied clinical and behavioral investigations.",
  status: "PEER-REVIEWED & APPLIED WORK",
  studies: [
    {
      index: "Research 01",
      domain: "Computer Vision & Medical Imaging",
      subdomain: "Chest Radiography",
      title: "Medical X-Ray Image Classification Using Deep Learning Architectures",

      // ── NEW: paper link ──
      paper: {
        label: "Read Paper",
        url: "/Medical-X-Ray-Classification-Research.pdf",
      },

      highlights: [
        { label: "Core Problem Solved", body: "Diagnostic ambiguity & high false-positive rates in early pulmonary disease detection." },
        { label: "Architectural Strategy", body: "Comparative benchmark of deep residual networks vs edge-deployable CNN pipelines." },
        { label: "Validated Result", body: "94.8% accuracy achieved on 5,863 CXR studies with ~18ms CUDA inference latency.", highlight: true },
      ],
      challenge:
        "Chest radiography interpretation requires expert radiological bandwidth often scarce in emergency workflows. Subtle focal opacities and lung consolidations are prone to high inter-observer variability, necessitating explainable, high-accuracy neural classifiers that retain edge-level inference speed.",
      methodology:
        "Trained and evaluated ResNet-50, VGG16, a Custom 5-Layer CNN, and AlexNet across standardized public CXR cohorts. Integrated Grad-CAM (Gradient-weighted Class Activation Mapping) to visually verify that deep feature activations accurately align with anatomical pathology rather than imaging artifacts.",
      benchmarks: [
        { name: "ResNet-50", value: "94.8%", note: "Top Accuracy", primary: true },
        { name: "VGG16", value: "92.1%", note: "Deep Stacks" },
        { name: "Custom CNN", value: "89.6%", note: "Edge-Ready" },
        { name: "AlexNet", value: "86.2%", note: "Baseline" },
      ],
      visual: {
        headerLeft: "GRAD-CAM VISUAL VALIDATION",
        headerRight: "FOV: AP-CHEST",
        footerLeft: "Localization Precision:",
        footerRight: "98.4% Focal Confidence",
      },
    },
    {
      index: "Research 02",
      domain: "Behavioral AI & Multimodal Systems",
      subdomain: "Preventative Health Tech",
      title: "MindSync — AI-Based Mental Health & Digital Behaviour Analysis",

      // ── NEW: paper link ──
      paper: {
        label: "Read Paper",
        url: null,
      },

      highlights: [
        { label: "Core Problem Solved", body: "Lack of non-invasive, continuous digital biomarkers for early mental health risk detection." },
        { label: "Multimodal Technique", body: "Coupling 468-point facial Action Units (MediaPipe) with passive smartphone app dynamics." },
        { label: "Core Impact", body: "Sub-50ms on-device inference preserving complete user data privacy and local security.", highlight: true },
      ],
      challenge:
        "Conventional wellbeing assessments rely heavily on delayed retrospective self-reporting. MindSync pioneers non-intrusive early identification by synthesizing subtle behavioral telemetry (typing cadence, app-switch frequencies) with real-time micro-facial affective cues.",
      disclaimer:
        "Early risk identification & digital behavioural biomarkers — non-diagnostic and privacy-first.",
      pipeline: [
        { step: "Step 01", label: "App Dynamics", sub: "Passive Telemetry" },
        { step: "Step 02", label: "Facial AUs", sub: "468-pt Mesh" },
        { step: "Step 03", label: "CNN + ViT", sub: "Temporal Fusion" },
        { step: "Output", label: "Insights Engine", sub: "Adaptive Prompts", primary: true },
      ],
      visual: {
        headerLeft: "FACIAL AU HARMONIZATION",
        headerRight: "MEDIAPIPE VISION",
        footerLeft: "On-Device Latency:",
        footerRight: "42ms · Local Privacy Kept",
      },
    },
  ],
};