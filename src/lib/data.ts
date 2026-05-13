import { unstable_noStore as noStore } from "next/cache";
import { fallbackData } from "./fallback";
import { getPublicSupabase } from "./supabase";
import type { PortfolioData, Project } from "./types";

export async function getPortfolioData(): Promise<PortfolioData> {
  noStore();
  const supabase = getPublicSupabase();
  if (!supabase) return fallbackData;

  const [profileRes, projectsRes, skillsRes, workRes, linksRes] = await Promise.all([
    supabase.from("profile").select("*").order("updated_at", { ascending: false }).limit(1).maybeSingle(),
    supabase
      .from("projects")
      .select("*")
      .order("featured", { ascending: false })
      .order("sort_order")
      .order("updated_at", { ascending: false }),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("work_history").select("*").order("sort_order"),
    supabase.from("links").select("*").order("sort_order"),
  ]);

  return {
    profile: profileRes.data ?? fallbackData.profile,
    projects: projectsRes.data?.length ? projectsRes.data : fallbackData.projects,
    skills: skillsRes.data?.length ? skillsRes.data : fallbackData.skills,
    workHistory: workRes.data?.length ? workRes.data : fallbackData.workHistory,
    links: linksRes.data?.length ? linksRes.data : fallbackData.links,
  };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = await getPortfolioData();
  return data.projects.find((project) => project.slug === slug) ?? null;
}
