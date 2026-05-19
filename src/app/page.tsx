import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { getPortfolioData } from "@/lib/data";

const services = [
  {
    title: "Web App MVPs",
    text: "Functional web applications with real user flows, dashboards, authentication, databases, admin panels, and deployment-ready foundations.",
  },
  {
    title: "Android App Prototypes",
    text: "Fast Android prototypes for testing app ideas, workflows, interfaces, and mobile-first product concepts before committing to a full build.",
  },
  {
    title: "Internal Tools & Automation",
    text: "Custom tools that replace spreadsheets, manual workflows, repeated tasks, and scattered business processes with usable software.",
  },
  {
    title: "AI-Assisted Product Builds",
    text: "Rapidly developed software using modern AI-assisted development workflows, while still applying hands-on debugging, product thinking, and clean implementation.",
  },
  {
    title: "Proof-of-Concept Builds",
    text: "Clickable, working software to validate an idea, pitch a concept, demonstrate a workflow, or prove that something can be built.",
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
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/2ps logo.png" alt="Two Pixels Short" className="w-72 max-w-full sm:w-96" />
                <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
                  I build working prototypes, MVPs, internal tools, and automation systems fast — often in hours to a few days instead of weeks. Not mockups. Not vague strategy. Usable software you can test, demo, refine, and launch.
                </p>
              </div>
              <div className="max-w-sm border-l border-orange-400/40 pl-5">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-300">
                  Studio focus
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Rapid MVP Development for Web & Android Apps
                </h1>
              </div>
            </div>

            <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.slice(0, 8).map((item) => (
                <div key={item} className="bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
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
        </div>
      </section>

      <Section title="What I Build Fast" eyebrow="My Services">
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
