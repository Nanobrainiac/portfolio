import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-md border border-white/10 bg-zinc-900 text-sm text-zinc-500">
        {project.screenshot_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.screenshot_url}
            alt={`${project.title} screenshot`}
            className="h-full w-full object-cover"
          />
        ) : (
          "Project screenshot"
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        {project.featured ? (
          <span className="rounded-full border border-orange-400/30 px-2 py-1 text-xs text-orange-200">
            Featured
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech_stack.map((tech) => (
          <span key={tech} className="rounded-md bg-white/10 px-2 py-1 text-xs text-zinc-300">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        <Link href={`/projects/${project.slug}`} className="text-white underline-offset-4 hover:underline">
          Case study
        </Link>
        {project.live_demo_url ? <a href={project.live_demo_url}>Live site</a> : null}
        {project.github_url ? <a href={project.github_url}>GitHub</a> : null}
        {project.video_url ? <a href={project.video_url}>Video</a> : null}
      </div>
    </article>
  );
}
