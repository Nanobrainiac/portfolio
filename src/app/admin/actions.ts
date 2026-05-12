"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSupabase } from "@/lib/supabase";
import { linkSchema, profileSchema, projectSchema, skillSchema, workItemSchema } from "@/lib/validation";

function value(formData: FormData, key: string) {
  return formData.get(key) ?? "";
}

function isUuid(id: string | undefined) {
  return Boolean(id?.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i));
}

async function requireAdmin() {
  await auth.protect();
  return getAdminSupabase();
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/projects");
  revalidatePath("/admin");
}

export async function updateProfile(formData: FormData) {
  const supabase = await requireAdmin();
  const parsed = profileSchema.parse({
    id: value(formData, "id"),
    hero_headline: value(formData, "hero_headline"),
    hero_subheadline: value(formData, "hero_subheadline"),
    about: value(formData, "about"),
    resume_url: value(formData, "resume_url"),
    featured_video_url: value(formData, "featured_video_url"),
    location: value(formData, "location"),
  });

  const { id, ...updates } = parsed;
  const result = isUuid(id)
    ? await supabase.from("profile").update(updates).eq("id", id)
    : await supabase.from("profile").insert(updates);
  if (result.error) throw new Error(result.error.message);
  refresh();
  redirect("/admin");
}

export async function saveProject(formData: FormData) {
  const supabase = await requireAdmin();
  const parsed = projectSchema.parse({
    id: value(formData, "id"),
    title: value(formData, "title"),
    slug: value(formData, "slug"),
    description: value(formData, "description"),
    long_description: value(formData, "long_description"),
    screenshot_url: value(formData, "screenshot_url"),
    tech_stack: value(formData, "tech_stack"),
    live_demo_url: value(formData, "live_demo_url"),
    github_url: value(formData, "github_url"),
    video_url: value(formData, "video_url"),
    featured: formData.get("featured"),
    sort_order: value(formData, "sort_order"),
  });

  const { id, ...payload } = parsed;
  const result = id
    ? await supabase.from("projects").update(payload).eq("id", id)
    : await supabase.from("projects").insert(payload);
  if (result.error) throw new Error(result.error.message);
  refresh();
  redirect("/admin#projects");
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(value(formData, "id"));
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirect("/admin#projects");
}

export async function saveSkill(formData: FormData) {
  const supabase = await requireAdmin();
  const parsed = skillSchema.parse({
    id: value(formData, "id"),
    name: value(formData, "name"),
    category: value(formData, "category"),
    sort_order: value(formData, "sort_order"),
  });
  const { id, ...payload } = parsed;
  const result = id
    ? await supabase.from("skills").update(payload).eq("id", id)
    : await supabase.from("skills").insert(payload);
  if (result.error) throw new Error(result.error.message);
  refresh();
  redirect("/admin#skills");
}

export async function deleteSkill(formData: FormData) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("skills").delete().eq("id", String(value(formData, "id")));
  if (error) throw new Error(error.message);
  refresh();
  redirect("/admin#skills");
}

export async function saveWorkItem(formData: FormData) {
  const supabase = await requireAdmin();
  const parsed = workItemSchema.parse({
    id: value(formData, "id"),
    company: value(formData, "company"),
    role: value(formData, "role"),
    start_date: value(formData, "start_date"),
    end_date: value(formData, "end_date"),
    summary: value(formData, "summary"),
    sort_order: value(formData, "sort_order"),
  });
  const { id, ...payload } = parsed;
  const result = id
    ? await supabase.from("work_history").update(payload).eq("id", id)
    : await supabase.from("work_history").insert(payload);
  if (result.error) throw new Error(result.error.message);
  refresh();
  redirect("/admin#experience");
}

export async function deleteWorkItem(formData: FormData) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("work_history").delete().eq("id", String(value(formData, "id")));
  if (error) throw new Error(error.message);
  refresh();
  redirect("/admin#experience");
}

export async function saveLink(formData: FormData) {
  const supabase = await requireAdmin();
  const parsed = linkSchema.parse({
    id: value(formData, "id"),
    label: value(formData, "label"),
    url: value(formData, "url"),
    sort_order: value(formData, "sort_order"),
  });
  const { id, ...payload } = parsed;
  const result = id
    ? await supabase.from("links").update(payload).eq("id", id)
    : await supabase.from("links").insert(payload);
  if (result.error) throw new Error(result.error.message);
  refresh();
  redirect("/admin#links");
}

export async function deleteLink(formData: FormData) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("links").delete().eq("id", String(value(formData, "id")));
  if (error) throw new Error(error.message);
  refresh();
  redirect("/admin#links");
}
