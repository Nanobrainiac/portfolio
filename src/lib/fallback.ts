import type { PortfolioData } from "./types";

export const fallbackData: PortfolioData = {
  profile: {
    id: "fallback-profile",
    hero_headline: "Two Pixels Short",
    hero_subheadline:
      "A small AI software studio building internal tools, rapid prototypes, automation workflows, and full-stack web apps.",
    about:
      "Two Pixels Short is led by Chris Martindale, an AI Builder and Full-Stack Developer focused on rapid prototyping, practical automation, and clean implementation. AI tools are part of the workflow, but the work stays grounded in manual code review, debugging, and production-minded engineering.",
    resume_url: "",
    featured_video_url: "",
    location: "United States",
  },
  projects: [
    {
      id: "fallback-project",
      title: "Competitive Intelligence Repository",
      slug: "competitive-intelligence-repository",
      description:
        "An internal intelligence app built for Physician Life Care Planning, LLC to track competitors, ingest articles, generate AI summaries, organize strategic insights, and support business decision-making.",
      long_description:
        "A working placeholder case study for competitor tracking, article ingestion, AI summaries, searchable insights, and strategic decision support.",
      screenshot_url: "",
      tech_stack: ["Next.js", "TypeScript", "Supabase", "OpenAI API", "Internal Tools"],
      live_demo_url: "",
      github_url: "",
      video_url: "",
      featured: true,
      sort_order: 1,
    },
  ],
  skills: [
    { id: "s1", name: "React / Next.js", category: "Frontend", sort_order: 1 },
    { id: "s2", name: "TypeScript", category: "Frontend", sort_order: 2 },
    { id: "s3", name: "Node / Express", category: "Backend", sort_order: 3 },
    { id: "s4", name: "Supabase", category: "Backend", sort_order: 4 },
    { id: "s5", name: "OpenAI API", category: "AI", sort_order: 5 },
    { id: "s6", name: "Ollama / Local AI", category: "AI", sort_order: 6 },
    { id: "s7", name: "Vercel Deployment", category: "DevOps", sort_order: 7 },
    { id: "s8", name: "GitHub Workflow", category: "DevOps", sort_order: 8 },
  ],
  workHistory: [
    {
      id: "w1",
      company: "Physician Life Care Planning, LLC",
      role: "AI-assisted internal tools builder",
      start_date: "2025",
      end_date: "Present",
      summary:
        "Building workflow tools, research systems, and AI-supported prototypes for internal business operations.",
      sort_order: 1,
    },
  ],
  links: [
    { id: "l1", label: "GitHub", url: "https://github.com/", sort_order: 1 },
    { id: "l2", label: "LinkedIn", url: "https://www.linkedin.com/", sort_order: 2 },
    { id: "l3", label: "Email", url: "mailto:hello@example.com", sort_order: 3 },
  ],
};
