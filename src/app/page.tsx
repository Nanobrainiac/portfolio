import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { getPortfolioData } from "@/lib/data";

const services = [
  {
    title: "AI workflow tools",
    text: "Custom interfaces for research, summarization, document workflows, internal knowledge, and decision support.",
  },
  {
    title: "Full-stack prototypes",
    text: "Fast, usable Next.js and TypeScript builds that can prove an idea, support a team, or grow into production.",
  },
  {
    title: "Internal applications",
    text: "Dashboards, repositories, admin tools, and automation systems built around how your work actually gets done.",
  },
];

const capabilities = [
  "AI-assisted development",
  "Manual code repair",
  "React / Next.js",
  "TypeScript",
  "Node / Express",
  "Supabase",
  "OpenAI API",
  "Ollama / local AI",
  "Vercel deployment",
  "GitHub workflow",
];

export default async function Home() {
  const { profile, projects, skills, links } = await getPortfolioData();
  const featured = projects.find((project) => project.featured) ?? projects[0];

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <p className="text-sm font-medium text-orange-300">Two Pixels Short</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Practical AI-powered software for teams that need useful tools quickly.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Two Pixels Short is a small AI software studio building internal tools, rapid prototypes,
            automation workflows, and full-stack web apps. Led by Chris Martindale, AI Builder and
            Full-Stack Developer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-orange-400">
              Start a project
            </Link>
            <Link href="/projects" className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium hover:bg-white/10">
              View work
            </Link>
            {profile.resume_url ? (
              <Link href="/resume" className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium hover:bg-white/10">
                Builder resume
              </Link>
            ) : null}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/2ps logo.png" alt="Two Pixels Short" className="mb-8 w-full max-w-md" />
          <div className="grid grid-cols-2 gap-3 text-sm">
            {capabilities.slice(0, 8).map((item) => (
              <div key={item} className="rounded-md border border-white/10 px-3 py-2 text-zinc-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="Studio Services" eyebrow="What we build">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-semibold text-orange-200">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{service.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {featured ? (
        <Section title="Selected Work" eyebrow="Portfolio">
          <ProjectCard project={featured} />
        </Section>
      ) : null}

      <Section title="Technical Range">
        <div className="flex flex-wrap gap-2">
          {[...new Set([...capabilities, ...skills.map((skill) => skill.name)])].map((skill) => (
            <span key={skill} className="rounded-md bg-white/10 px-3 py-2 text-sm text-zinc-300">
              {skill}
            </span>
          ))}
        </div>
      </Section>

      <Section title="About the Builder">
        <p className="max-w-3xl leading-8 text-zinc-300">{profile.about}</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {links.map((link) => (
            <a key={link.id} href={link.url} className="text-zinc-300 underline-offset-4 hover:text-orange-200 hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
