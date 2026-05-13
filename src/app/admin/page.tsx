import { auth } from "@clerk/nextjs/server";
import { getPortfolioData } from "@/lib/data";
import {
  deleteLink,
  deleteProject,
  deleteSkill,
  deleteWorkItem,
  saveLink,
  saveProject,
  saveSkill,
  saveWorkItem,
  updateProfile,
} from "./actions";

function inputClass() {
  return "w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-orange-400";
}

function label(text: string) {
  return <span className="mb-1 block text-xs font-medium text-zinc-400">{text}</span>;
}

function Button({ children, danger = false }: { children: React.ReactNode; danger?: boolean }) {
  return (
    <button className={`rounded-md px-3 py-2 text-sm font-medium ${danger ? "border border-red-400/30 text-red-300" : "bg-white text-zinc-950"}`}>
      {children}
    </button>
  );
}

function isUuid(id: string | undefined) {
  return Boolean(id?.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i));
}

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "links", label: "Links" },
];

function AdminTabNav({ activeTab }: { activeTab: string }) {
  return (
    <div className="sticky top-[73px] z-40 mb-6 border-b border-white/10 bg-zinc-950/95 py-3 backdrop-blur">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`/admin?tab=${tab.id}`}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? "bg-orange-500 text-zinc-950"
                : "border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  await auth.protect();
  const { tab } = await searchParams;
  const activeTab = tabs.some((item) => item.id === tab) && tab ? tab : "profile";
  const { profile, projects, skills, workHistory, links } = await getPortfolioData();
  const missingSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY;
  const persistedProjects = projects.filter((project) => isUuid(project.id));
  const persistedSkills = skills.filter((skill) => isUuid(skill.id));
  const persistedWorkHistory = workHistory.filter((item) => isUuid(item.id));
  const persistedLinks = links.filter((linkItem) => isUuid(linkItem.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-orange-300">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold">Studio content editor</h1>
        {missingSupabase ? (
          <p className="mt-3 rounded-md border border-yellow-400/30 bg-yellow-400/10 p-3 text-sm text-yellow-100">
            Add Supabase env vars and run `supabase/schema.sql` before saving changes.
          </p>
        ) : null}
      </div>

      <AdminTabNav activeTab={activeTab} />

      {activeTab === "profile" ? (
      <section id="profile" className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-xl font-semibold">Profile</h2>
        <form action={updateProfile} className="mt-5 grid gap-4">
          <input type="hidden" name="id" defaultValue={isUuid(profile.id) ? profile.id : ""} />
          <label>{label("Hero headline")}<input name="hero_headline" defaultValue={profile.hero_headline} className={inputClass()} /></label>
          <label>{label("Hero subheadline")}<textarea name="hero_subheadline" defaultValue={profile.hero_subheadline} rows={3} className={inputClass()} /></label>
          <label>{label("About")}<textarea name="about" defaultValue={profile.about} rows={6} className={inputClass()} /></label>
          <div className="grid gap-4 md:grid-cols-3">
            <label>{label("Resume URL")}<input name="resume_url" defaultValue={profile.resume_url ?? ""} className={inputClass()} /></label>
            <label>{label("Featured video URL")}<input name="featured_video_url" defaultValue={profile.featured_video_url ?? ""} className={inputClass()} /></label>
            <label>{label("Location")}<input name="location" defaultValue={profile.location ?? ""} className={inputClass()} /></label>
          </div>
          <div><Button>Save profile</Button></div>
        </form>
      </section>
      ) : null}

      {activeTab === "projects" ? (
      <section id="projects" className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-xl font-semibold">Projects</h2>
        <div className="mt-5 grid gap-5">
          {[...projects, null].map((project, index) => (
            <form key={project?.id ?? "new-project"} action={saveProject} className="grid gap-3 rounded-md border border-white/10 p-4">
              <input type="hidden" name="id" defaultValue={isUuid(project?.id) ? project?.id : ""} />
              <div className="grid gap-3 md:grid-cols-3">
                <label>{label("Title")}<input name="title" defaultValue={project?.title ?? ""} placeholder="New project" className={inputClass()} /></label>
                <label>{label("Slug")}<input name="slug" defaultValue={project?.slug ?? ""} placeholder="new-project" className={inputClass()} /></label>
                <label>{label("Sort")}<input name="sort_order" type="number" defaultValue={project?.sort_order ?? index + 1} className={inputClass()} /></label>
              </div>
              <label>{label("Description")}<textarea name="description" defaultValue={project?.description ?? ""} rows={3} className={inputClass()} /></label>
              <label>{label("Long description")}<textarea name="long_description" defaultValue={project?.long_description ?? ""} rows={4} className={inputClass()} /></label>
              <div className="grid gap-3 md:grid-cols-2">
                <label>{label("Tech stack, comma-separated")}<input name="tech_stack" defaultValue={project?.tech_stack.join(", ") ?? ""} className={inputClass()} /></label>
                <label>{label("Screenshot URL")}<input name="screenshot_url" defaultValue={project?.screenshot_url ?? ""} className={inputClass()} /></label>
                <label>{label("Live site URL")}<input name="live_demo_url" defaultValue={project?.live_demo_url ?? ""} className={inputClass()} /></label>
                <label>{label("GitHub URL")}<input name="github_url" defaultValue={project?.github_url ?? ""} className={inputClass()} /></label>
                <label>{label("Video URL")}<input name="video_url" defaultValue={project?.video_url ?? ""} className={inputClass()} /></label>
                <label className="flex items-end gap-2 text-sm text-zinc-300"><input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} /> Featured</label>
              </div>
              <div className="flex gap-3">
                <Button>{isUuid(project?.id) ? "Save project" : "Add project"}</Button>
              </div>
            </form>
          ))}
          {persistedProjects.map((project) => (
            <form key={`delete-${project.id}`} action={deleteProject}>
              <input type="hidden" name="id" value={project.id} />
              <Button danger>Delete {project.title}</Button>
            </form>
          ))}
        </div>
      </section>
      ) : null}

      {activeTab === "experience" ? (
      <section id="experience" className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-xl font-semibold">Experience</h2>
        <div className="mt-5 grid gap-5">
          {[...workHistory, null].map((item, index) => (
            <form key={item?.id ?? "new-work-item"} action={saveWorkItem} className="grid gap-3 rounded-md border border-white/10 p-4">
              <input type="hidden" name="id" defaultValue={isUuid(item?.id) ? item?.id : ""} />
              <div className="grid gap-3 md:grid-cols-4">
                <label>{label("Company")}<input name="company" defaultValue={item?.company ?? ""} placeholder="Company" className={inputClass()} /></label>
                <label>{label("Role")}<input name="role" defaultValue={item?.role ?? ""} placeholder="Role" className={inputClass()} /></label>
                <label>{label("Start")}<input name="start_date" defaultValue={item?.start_date ?? ""} placeholder="2025" className={inputClass()} /></label>
                <label>{label("End")}<input name="end_date" defaultValue={item?.end_date ?? ""} placeholder="Present" className={inputClass()} /></label>
              </div>
              <label>{label("Summary")}<textarea name="summary" defaultValue={item?.summary ?? ""} rows={4} className={inputClass()} /></label>
              <label>{label("Sort")}<input name="sort_order" type="number" defaultValue={item?.sort_order ?? index + 1} className={inputClass()} /></label>
              <div><Button>{isUuid(item?.id) ? "Save experience" : "Add experience"}</Button></div>
            </form>
          ))}
          {persistedWorkHistory.map((item) => (
            <form key={`delete-work-${item.id}`} action={deleteWorkItem}>
              <input type="hidden" name="id" value={item.id} />
              <Button danger>Delete {item.role}</Button>
            </form>
          ))}
        </div>
      </section>
      ) : null}

      {activeTab === "skills" ? (
      <section id="skills" className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-semibold">Skills</h2>
          <div className="mt-5 grid gap-3">
            {[...skills, null].map((skill, index) => (
              <form key={skill?.id ?? "new-skill"} action={saveSkill} className="grid gap-3 rounded-md border border-white/10 p-3">
                <input type="hidden" name="id" defaultValue={isUuid(skill?.id) ? skill?.id : ""} />
                <input name="name" defaultValue={skill?.name ?? ""} placeholder="Skill" className={inputClass()} />
                <input name="category" defaultValue={skill?.category ?? ""} placeholder="Category" className={inputClass()} />
                <input name="sort_order" type="number" defaultValue={skill?.sort_order ?? index + 1} className={inputClass()} />
                <Button>{isUuid(skill?.id) ? "Save skill" : "Add skill"}</Button>
              </form>
            ))}
            {persistedSkills.map((skill) => (
              <form key={`delete-skill-${skill.id}`} action={deleteSkill}>
                <input type="hidden" name="id" value={skill.id} />
                <Button danger>Delete {skill.name}</Button>
              </form>
            ))}
          </div>
      </section>
      ) : null}

      {activeTab === "links" ? (
      <section id="links" className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-semibold">Links</h2>
          <div className="mt-5 grid gap-3">
            {[...links, null].map((linkItem, index) => (
              <form key={linkItem?.id ?? "new-link"} action={saveLink} className="grid gap-3 rounded-md border border-white/10 p-3">
                <input type="hidden" name="id" defaultValue={isUuid(linkItem?.id) ? linkItem?.id : ""} />
                <input name="label" defaultValue={linkItem?.label ?? ""} placeholder="Label" className={inputClass()} />
                <input name="url" defaultValue={linkItem?.url ?? ""} placeholder="https://..." className={inputClass()} />
                <input name="sort_order" type="number" defaultValue={linkItem?.sort_order ?? index + 1} className={inputClass()} />
                <Button>{isUuid(linkItem?.id) ? "Save link" : "Add link"}</Button>
              </form>
            ))}
            {persistedLinks.map((linkItem) => (
              <form key={`delete-link-${linkItem.id}`} action={deleteLink}>
                <input type="hidden" name="id" value={linkItem.id} />
                <Button danger>Delete {linkItem.label}</Button>
              </form>
            ))}
          </div>
      </section>
      ) : null}
    </div>
  );
}
