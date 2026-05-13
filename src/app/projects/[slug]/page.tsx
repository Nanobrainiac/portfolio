import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <p className="text-sm font-medium text-orange-300">Two Pixels Short Work</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-5 text-lg leading-8 text-zinc-300">{project.description}</p>
      {project.screenshot_url ? (
        <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.screenshot_url}
            alt={`${project.title} screenshot`}
            className="w-full object-cover"
          />
        </div>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-2">
        {project.tech_stack.map((tech) => (
          <span key={tech} className="rounded-md bg-white/10 px-3 py-2 text-sm text-zinc-300">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.03] p-6 leading-8 text-zinc-300">
        {project.long_description ?? project.description}
      </div>
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        {project.live_demo_url ? <a href={project.live_demo_url}>Live demo</a> : null}
        {project.github_url ? <a href={project.github_url}>GitHub</a> : null}
        {project.video_url ? <a href={project.video_url}>Video</a> : null}
      </div>
    </article>
  );
}
