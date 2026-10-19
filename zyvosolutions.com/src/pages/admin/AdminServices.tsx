import { useState, useEffect } from "react";
import { 
  Layers, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  X, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { demoServices } from "@/data/site";
import type { Service } from "@/types";

export function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    let items: Service[] = [];

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("display_order", { ascending: true });
        if (!error && data && data.length > 0) {
          items = data as Service[];
        }
      } catch {
        // ignore
      }
    }

    if (items.length === 0) {
      // Check local storage or demo
      const local = localStorage.getItem("zyvo_admin_services");
      items = local ? JSON.parse(local) : demoServices;
    }

    setServices(items);
    setLoading(false);
  };

  useEffect(() => {
    void fetchServices();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title) return;

    setSaveLoading(true);
    const slug = editingService.slug || editingService.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const record: Service = {
      id: editingService.id || "srv_" + Date.now(),
      title: editingService.title,
      slug,
      category: editingService.category || "web-development",
      short_description: editingService.short_description || "",
      full_description: editingService.full_description || "",
      icon_name: editingService.icon_name || "Code2",
      display_order: editingService.display_order || services.length + 1,
      is_published: editingService.is_published ?? true,
    };

    let updated: Service[] = [];
    if (editingService.id) {
      updated = services.map((s) => (s.id === editingService.id ? record : s));
    } else {
      updated = [...services, record];
    }

    setServices(updated);
    localStorage.setItem("zyvo_admin_services", JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("services").upsert(record);
      } catch {
        // ignore
      }
    }

    setSaveLoading(false);
    setEditingService(null);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service offering?")) return;

    const filtered = services.filter((s) => s.id !== id);
    setServices(filtered);
    localStorage.setItem("zyvo_admin_services", JSON.stringify(filtered));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("services").delete().eq("id", id);
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
            <Layers className="h-6 w-6 text-[#231E53]" />
            <span>Services & Verticals Studio</span>
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Add, update, and manage your Software and Marketing solutions catalog.
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
            onClick={() => setEditingService({
              title: "",
              slug: "",
              category: "web-development",
              short_description: "",
              full_description: "",
              icon_name: "Code2",
              is_published: true,
              display_order: services.length + 1,
            })}
            className="bg-[#231E53] hover:bg-[#1C0C4D] text-white font-bold flex items-center gap-1.5 text-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Service</span>
          </Button>
        </div>
      </div>

      {/* Grid of Services */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-[#231E53] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    service.category === "web-development"
                      ? "bg-[#E8EBFF] text-[#231E53]"
                      : "bg-[#E0F2FE] text-[#0284C7]"
                  }`}
                >
                  {service.category === "web-development" ? "Software" : "Marketing"}
                </span>

                <div className="flex items-center gap-1">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      service.is_published ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  />
                  <span className="text-[10px] font-mono text-slate-500">
                    {service.is_published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-base font-extrabold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {service.short_description || service.full_description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono text-[11px] text-slate-400">Order #{service.display_order}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingService(service)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  title="Edit Service"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(service.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                  title="Delete Service"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <h3 className="font-display font-extrabold text-slate-900 text-base">
                {editingService.id ? "Edit Service Offering" : "Add New Service Offering"}
              </h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1">
                  Service Title *
                </label>
                <Input
                  value={editingService.title || ""}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="e.g. Custom Web Applications"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1">
                    Category *
                  </label>
                  <select
                    value={editingService.category || "web-development"}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800"
                  >
                    <option value="web-development">Software & Web Development</option>
                    <option value="digital-marketing">Digital Marketing & Growth</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1">
                    Display Order
                  </label>
                  <Input
                    type="number"
                    value={editingService.display_order || 1}
                    onChange={(e) => setEditingService({ ...editingService, display_order: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1">
                  Short Description
                </label>
                <Textarea
                  value={editingService.short_description || ""}
                  onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })}
                  rows={2}
                  placeholder="Brief summary shown on service cards."
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1">
                  Full Detailed Description
                </label>
                <Textarea
                  value={editingService.full_description || ""}
                  onChange={(e) => setEditingService({ ...editingService, full_description: e.target.value })}
                  rows={4}
                  placeholder="Comprehensive explanation shown on the dedicated service catalog page."
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="srv_published"
                  checked={editingService.is_published ?? true}
                  onChange={(e) => setEditingService({ ...editingService, is_published: e.target.checked })}
                  className="rounded border-slate-300 text-[#231E53]"
                />
                <label htmlFor="srv_published" className="text-xs font-bold text-slate-700">
                  Published on public website
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <Button variant="secondary" size="sm" type="button" onClick={() => setEditingService(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saveLoading} size="sm" className="bg-[#231E53] text-white font-bold">
                  {saveLoading ? "Saving…" : "Save Service"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
