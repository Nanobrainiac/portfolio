import { Section } from "@/components/section";
import { getPortfolioData } from "@/lib/data";

export default async function ContactPage() {
  const { links } = await getPortfolioData();

  return (
    <Section title="Start a Project" eyebrow="Contact Two Pixels Short">
      <p className="max-w-2xl leading-8 text-zinc-300">
        Reach out for AI-assisted development, internal tooling, automation workflows, full-stack builds,
        and rapid prototypes. A focused first conversation is enough to map the problem and decide what
        should be built.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <a key={link.id} href={link.url} className="rounded-lg border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06]">
            {link.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
