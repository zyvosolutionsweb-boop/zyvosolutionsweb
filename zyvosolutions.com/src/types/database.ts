export type InquiryStatus = "new" | "reviewed" | "contacted" | "archived";

export interface ProjectInquiry {
  id: string;
  full_name: string;
  email: string;
  company_name: string | null;
  country: string;
  service_category: string;
  service_type: string;
  budget_range: string | null;
  project_timeline: string | null;
  project_description: string;
  status: InquiryStatus;
  admin_notes?: string | null;
  created_at: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  technologies: string[];
  cover_image_url: string | null;
  project_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order?: number;
  created_at: string;
}

export type ServiceCategory = "web-development" | "digital-marketing";

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  icon_name: string | null;
  category: ServiceCategory | string;
  deliverables?: string[];
  is_published: boolean;
  display_order: number;
}

export interface SiteSettings {
  id?: string;
  business_name: string;
  tagline: string;
  contact_email: string | null;
  contact_phone?: string | null;
  location: string | null;
  timezone?: string | null;
  social_links: Record<string, string> | null;
  footer_note: string | null;
  admin_password_hash?: string | null;
  is_public: boolean;
}

export interface PageSection {
  section_key: string;
  title: string | null;
  subtitle: string | null;
  content: Record<string, any>;
  updated_at?: string;
}
