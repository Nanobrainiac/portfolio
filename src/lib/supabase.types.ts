export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: {
          id: string;
          singleton: boolean;
          hero_headline: string;
          hero_subheadline: string;
          about: string;
          resume_url: string | null;
          featured_video_url: string | null;
          location: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profile"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["profile"]["Row"]>;
      };
      projects: {
        Row: {
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
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
      };
      skills: {
        Row: { id: string; name: string; category: string; sort_order: number; created_at: string };
        Insert: Partial<Database["public"]["Tables"]["skills"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["skills"]["Row"]>;
      };
      work_history: {
        Row: {
          id: string;
          company: string;
          role: string;
          start_date: string;
          end_date: string | null;
          summary: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["work_history"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["work_history"]["Row"]>;
      };
      links: {
        Row: { id: string; label: string; url: string; sort_order: number; created_at: string };
        Insert: Partial<Database["public"]["Tables"]["links"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["links"]["Row"]>;
      };
      site_settings: {
        Row: { id: string; key: string; value: Json; created_at: string; updated_at: string };
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
