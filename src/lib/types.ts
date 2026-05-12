export type Profile = {
  id: string;
  hero_headline: string;
  hero_subheadline: string;
  about: string;
  resume_url: string | null;
  featured_video_url: string | null;
  location: string | null;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  screenshot_url: string | null;
  tech_stack: string[];
  live_demo_url: string | null;
  github_url: string | null;
  video_url: string | null;
  featured: boolean;
  sort_order: number;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  sort_order: number;
};

export type WorkItem = {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  summary: string;
  sort_order: number;
};

export type LinkItem = {
  id: string;
  label: string;
  url: string;
  sort_order: number;
};

export type PortfolioData = {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  workHistory: WorkItem[];
  links: LinkItem[];
};
