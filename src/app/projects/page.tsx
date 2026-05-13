import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { getPortfolioData } from "@/lib/data";

export default async function ProjectsPage() {
  const { projects } = await getPortfolioData();

  return (
    <Section title="Selected Work" eyebrow="Two Pixels Short portfolio">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
