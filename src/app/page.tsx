import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { getPortfolioData } from "@/lib/data";

export default async function Home() {
  const { profile, projects, skills, links } = await getPortfolioData();
  const featured = projects.find((project) => project.featured) ?? projects[0];

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-300">AI-assisted software delivery</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            {profile.hero_headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">{profile.hero_subheadline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-950">
              View projects
            </Link>
            <Link href="/contact" className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium">
              Contact
            </Link>
            {profile.resume_url ? (
              <Link href="/resume" className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium">
                Resume
              </Link>
            ) : null}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-zinc-400">Focus areas</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {[
              "Full-stack apps",
              "Internal tools",
              "Rapid prototyping",
              "OpenAI API",
              "Supabase",
              "Vercel",
              "GitHub workflow",
              "Local AI",
            ].map((item) => (
              <div key={item} className="rounded-md border border-white/10 px-3 py-2 text-zinc-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {featured ? (
        <Section title="Featured Project" eyebrow="Selected work">
          <ProjectCard project={featured} />
        </Section>
      ) : null}

      <Section title="Technical Range">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill.id} className="rounded-md bg-white/10 px-3 py-2 text-sm text-zinc-300">
              {skill.name}
            </span>
          ))}
        </div>
      </Section>

      <Section title="About">
        <p className="max-w-3xl leading-8 text-zinc-300">{profile.about}</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {links.map((link) => (
            <a key={link.id} href={link.url} className="text-zinc-300 underline-offset-4 hover:text-white hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
