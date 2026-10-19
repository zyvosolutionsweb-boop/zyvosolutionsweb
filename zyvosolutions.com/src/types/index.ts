import type { z } from "zod";
import type { inquirySchema } from "@/schemas/inquiry";

export type { ProjectInquiry, PortfolioProject, Service, SiteSettings, ServiceCategory, PageSection, InquiryStatus } from "./database";

export interface Database {
  public: {
    Tables: {
      project_inquiries: {
        Row: import("./database").ProjectInquiry;
        Insert: Partial<import("./database").ProjectInquiry>;
        Update: Partial<import("./database").ProjectInquiry>;
      };
      portfolio_projects: {
        Row: import("./database").PortfolioProject;
        Insert: Partial<import("./database").PortfolioProject>;
        Update: Partial<import("./database").PortfolioProject>;
      };
      services: {
        Row: import("./database").Service;
        Insert: Partial<import("./database").Service>;
        Update: Partial<import("./database").Service>;
      };
      site_settings: {
        Row: import("./database").SiteSettings;
        Insert: Partial<import("./database").SiteSettings>;
        Update: Partial<import("./database").SiteSettings>;
      };
      page_sections: {
        Row: import("./database").PageSection;
        Insert: Partial<import("./database").PageSection>;
        Update: Partial<import("./database").PageSection>;
      };
    };
  };
}

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export interface InquirySubmitResult {
  ok: boolean;
  message: string;
}
