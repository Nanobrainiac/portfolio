import { Section } from "@/components/section";
import { getPortfolioData } from "@/lib/data";

export default async function AboutPage() {
  const { profile, workHistory, skills } = await getPortfolioData();

  return (
    <>
      <Section title="About" eyebrow="Background">
        <p className="max-w-3xl leading-8 text-zinc-300">{profile.about}</p>
      </Section>
      <Section title="Experience">
        <div className="grid gap-4">
          {workHistory.map((item) => (
            <article key={item.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-semibold">{item.role}</h3>
                <p className="text-sm text-zinc-500">
                  {item.start_date} - {item.end_date ?? "Present"}
                </p>
              </div>
              <p className="mt-1 text-sm text-zinc-400">{item.company}</p>
              <p className="mt-4 leading-7 text-zinc-300">{item.summary}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Skills">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <div key={skill.id} className="rounded-md border border-white/10 px-3 py-2">
              <p className="text-sm font-medium">{skill.name}</p>
              <p className="text-xs text-zinc-500">{skill.category}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
