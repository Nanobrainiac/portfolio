import { z } from "zod";

const emptyToNull = (value: unknown) => (value === "" ? null : value);
const csv = (value: unknown) =>
  String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const profileSchema = z.object({
  id: z.string().optional(),
  hero_headline: z.string().min(2).max(120),
  hero_subheadline: z.string().min(2).max(320),
  about: z.string().min(10).max(2000),
  resume_url: z.preprocess(emptyToNull, z.string().url().nullable().or(z.literal(null))),
  featured_video_url: z.preprocess(emptyToNull, z.string().url().nullable().or(z.literal(null))),
  location: z.preprocess(emptyToNull, z.string().max(120).nullable().or(z.literal(null))),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2).max(120),
  slug: z.string().min(2).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10).max(600),
  long_description: z.preprocess(emptyToNull, z.string().max(3000).nullable().or(z.literal(null))),
  screenshot_url: z.preprocess(emptyToNull, z.string().url().nullable().or(z.literal(null))),
  tech_stack: z.preprocess(csv, z.array(z.string()).min(1)),
  live_demo_url: z.preprocess(emptyToNull, z.string().url().nullable().or(z.literal(null))),
  github_url: z.preprocess(emptyToNull, z.string().url().nullable().or(z.literal(null))),
  video_url: z.preprocess(emptyToNull, z.string().url().nullable().or(z.literal(null))),
  featured: z.preprocess((value) => value === "on", z.boolean()),
  sort_order: z.coerce.number().int().default(0),
});

export const skillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(80),
  category: z.string().min(1).max(80),
  sort_order: z.coerce.number().int().default(0),
});

export const workItemSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1).max(120),
  role: z.string().min(1).max(120),
  start_date: z.string().min(1).max(40),
  end_date: z.preprocess(emptyToNull, z.string().max(40).nullable().or(z.literal(null))),
  summary: z.string().min(10).max(1200),
  sort_order: z.coerce.number().int().default(0),
});

export const linkSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1).max(80),
  url: z.string().url(),
  sort_order: z.coerce.number().int().default(0),
});
