import { useState, useEffect } from "react";
import { 
  FolderGit2, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  X, 
  Star, 
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { demoProjects } from "@/data/site";
import type { PortfolioProject } from "@/types";

export function AdminPortfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject> | null>(null);
  const [techInput, setTechInput] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    let items: PortfolioProject[] = [];

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("portfolio_projects")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          items = data as PortfolioProject[];
        }
      } catch {
        // ignore
      }
    }

    if (items.length === 0) {
      const local = localStorage.getItem("zyvo_admin_portfolio");
      items = local ? JSON.parse(local) : demoProjects;
    }

    setProjects(items);
    setLoading(false);
  };

  useEffect(() => {
    void fetchProjects();
  }, []);

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setTechInput(project.technologies.join(", "));
  };

  const handleAddNew = () => {
    setEditingProject({
      title: "",
      slug: "",
      category: "Corporate Website",
      description: "",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      is_featured: false,
      is_published: true,
    });
    setTechInput("React, TypeScript, Tailwind CSS");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    setSaveLoading(true);
    const slug = editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const technologies = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const record: PortfolioProject = {
      id: editingProject.id || "proj_" + Date.now(),
      title: editingProject.title,
      slug,
      category: editingProject.category || "Corporate Website",
      description: editingProject.description || "",
      technologies,
      cover_image_url: editingProject.cover_image_url || null,
      project_url: editingProject.project_url || null,
      is_featured: editingProject.is_featured ?? false,
      is_published: editingProject.is_published ?? true,
      created_at: editingProject.created_at || new Date().toISOString(),
    };

    let updated: PortfolioProject[] = [];
    if (editingProject.id) {
      updated = projects.map((p) => (p.id === editingProject.id ? record : p));
    } else {
      updated = [record, ...projects];
    }

    setProjects(updated);
    localStorage.setItem("zyvo_admin_portfolio", JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("portfolio_projects").upsert(record);
      } catch {
        // ignore
      }
    }

    setSaveLoading(false);
    setEditingProject(null);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this case study?")) return;

    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);
    localStorage.setItem("zyvo_admin_portfolio", JSON.stringify(filtered));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("portfolio_projects").delete().eq("id", id);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <FolderGit2 className="h-6 w-6 text-[#231E53]" />
            <span>Case Studies & Demonstration Portfolio</span>
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Showcase your agency's engineering demonstrations, e-commerce builds, and SaaS work.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {success && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              <span>Saved!</span>
            </span>
          )}

          <Button
            onClick={handleAddNew}
            className="bg-[#231E53] hover:bg-[#1C0C4D] text-white font-bold flex items-center gap-1.5 text-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Case Study</span>
          </Button>
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-[#231E53] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="rounded-full bg-[#E8EBFF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#231E53]">
                  {project.category}
                </span>

                <div className="flex items-center gap-2">
                  {project.is_featured && (
                    <span className="inline-flex items-center gap-1 text-amber-600 font-bold text-[10px]">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span>Featured</span>
                    </span>
                  )}
                  <span
                    className={`h-2 w-2 rounded-full ${
                      project.is_published ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  />
                </div>
              </div>

              <h3 className="font-display text-base font-extrabold text-slate-900">
                {project.title}
              </h3>

              <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mt-3 flex flex-wrap gap-1">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-slate-400">/{project.slug}</span>
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-[#00A0E1] hover:underline"
                    title="Open Live Website"
                  >
                    <span>Live Site</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEdit(project)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  title="Edit Project"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                  title="Delete Project"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <h3 className="font-display font-extrabold text-slate-900 text-base">
                {editingProject.id ? "Edit Case Study" : "Add New Case Study"}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1">
                  Project Title *
                </label>
                <Input
                  value={editingProject.title || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="e.g. Aura Capital — Corporate Website"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1">
                    Category Tag
                  </label>
                  <Input
                    value={editingProject.category || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="e.g. E-commerce / SaaS Dashboard"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1">
                    Custom Slug
                  </label>
                  <Input
                    value={editingProject.slug || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    placeholder="e.g. aura-capital"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1">
                  Case Study Description
                </label>
                <Textarea
                  value={editingProject.description || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  rows={3}
                  placeholder="Detailed architectural summary and design decisions."
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1">
                  Technologies (comma-separated)
                </label>
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="React, TypeScript, Tailwind CSS, Supabase"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                  <ExternalLink className="h-3.5 w-3.5 text-[#00A0E1]" />
                  <span>Live Website / Client Demo URL</span>
                </label>
                <Input
                  type="url"
                  value={editingProject.project_url || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, project_url: e.target.value })}
                  placeholder="https://example.com or https://clientdomain.com"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  When added, visitors can click &quot;Visit Live Website&quot; on the case study card.
                </p>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.is_featured ?? false}
                    onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                    className="rounded border-slate-300 text-[#231E53]"
                  />
                  <span className="text-xs font-bold text-slate-700">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.is_published ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, is_published: e.target.checked })}
                    className="rounded border-slate-300 text-[#231E53]"
                  />
                  <span className="text-xs font-bold text-slate-700">Published</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <Button variant="secondary" size="sm" type="button" onClick={() => setEditingProject(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saveLoading} size="sm" className="bg-[#231E53] text-white font-bold">
                  {saveLoading ? "Saving…" : "Save Case Study"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
