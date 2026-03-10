export const PROMPT = "sathishk-dev@portfolio:~$";

export const profile = {
  avatar: "SK",
  name: "Sathishkumar S",
  title: "Senior Software Developer",
  email: "sathish31102004@gmail.com",
  github: "github.com/sathishk-dev",
  linkedin: "linkedin.com/in/sathishk-dev",
  location: "Chennai, Tamil Nadu, IN",
  bio: "Full-stack engineer with 5+ years crafting performant, scalable web applications. Passionate about developer tooling, open-source, and clean architecture.",
  resume: "/resume.pdf",
};

export interface Project {
  id: string;
  name: string;
  tech: string;
  desc: string;
  details: string;
  features: string[];
  link: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: "cloudsync",
    name: "CloudSync Dashboard",
    tech: "React · TypeScript · D3.js · TailwindCSS",
    desc: "Real-time cloud infrastructure monitoring dashboard with interactive visualizations.",
    details: "A comprehensive monitoring solution designed for DevOps teams to track cloud resource utilization, costs, and performance metrics in real-time.",
    features: ["Live resource utilization graphs", "Cost anomaly detection", "Multi-cloud support (AWS, GCP, Azure)", "Custom alert rules engine"],
    link: "github.com/yourusername/cloudsync",
    category: "web",
  },
  {
    id: "devflow",
    name: "DevFlow CLI",
    tech: "Rust · Tokio · SQLite",
    desc: "A blazing-fast developer workflow automation tool for CI/CD pipelines.",
    details: "CLI tool that automates repetitive developer tasks like branch management, PR creation, and deployment workflows with intelligent defaults.",
    features: ["Parallel task execution", "Plugin architecture", "Git integration", "Template-based project scaffolding"],
    link: "github.com/yourusername/devflow",
    category: "cli",
  },
  {
    id: "pixelforge",
    name: "PixelForge",
    tech: "Next.js · Prisma · PostgreSQL · Stripe",
    desc: "SaaS platform for AI-powered image generation and editing.",
    details: "Full-featured SaaS application with subscription billing, team collaboration, and an AI pipeline for generating and editing images from text prompts.",
    features: ["Text-to-image generation", "Inpainting & outpainting", "Team workspaces", "Usage-based billing via Stripe"],
    link: "github.com/yourusername/pixelforge",
    category: "web",
  },
  {
    id: "netpulse",
    name: "NetPulse",
    tech: "Go · gRPC · Kubernetes · Prometheus",
    desc: "Distributed network health monitoring system with alerting.",
    details: "Enterprise-grade network monitoring solution that uses distributed agents to collect metrics and detect anomalies across large-scale infrastructure.",
    features: ["Distributed agent architecture", "Custom Prometheus exporters", "PagerDuty & Slack integrations", "Auto-scaling on Kubernetes"],
    link: "github.com/yourusername/netpulse",
    category: "infra",
  },
];

export const skills = [
  { name: "JavaScript/TypeScript", percent: 95 },
  { name: "React/Next.js", percent: 90 },
  { name: "Node.js/Express", percent: 85 },
  { name: "Python", percent: 75 },
  { name: "Go", percent: 70 },
  { name: "Docker/Kubernetes", percent: 65 },
  { name: "AWS/GCP", percent: 80 },
  { name: "CI/CD & DevOps", percent: 75 },
];

export const education = [
  { degree: "M.S. Computer Science", school: "Stanford University", year: "2019 — 2021", focus: "Distributed Systems & Machine Learning" },
  { degree: "B.S. Software Engineering", school: "UC Berkeley", year: "2015 — 2019", focus: "Dean's List · Summa Cum Laude" },
];

export const certifications = [
  "AWS Solutions Architect — Professional",
  "Google Cloud Professional Developer",
  "Kubernetes Application Developer (CKAD)",
];

export const experience = [
  { role: "Senior Software Engineer", company: "Vercel", period: "2022 — Present", highlights: ["Led migration of core deployment engine to Edge Runtime", "Reduced build times by 40% through intelligent caching", "Mentored 4 junior engineers across 2 teams"] },
  { role: "Software Engineer II", company: "Stripe", period: "2021 — 2022", highlights: ["Built real-time fraud detection pipeline processing 10M+ events/day", "Designed API for new payment method integrations", "Improved dashboard load time by 60%"] },
  { role: "Software Engineer", company: "GitHub", period: "2019 — 2021", highlights: ["Developed Actions workflow visualization", "Contributed to Codespaces early-access features", "Open-source contributor to Octokit ecosystem"] },
];
