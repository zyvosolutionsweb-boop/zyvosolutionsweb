import { useEffect, useState } from "react";
import { 
  Inbox, 
  Search, 
  RefreshCw, 
  Download, 
  Eye, 
  Trash2, 
  Mail, 
  X, 
  Copy, 
  Check, 
  Filter,
  Building,
  Globe,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { ProjectInquiry, InquiryStatus } from "@/types";

export function AdminInquiries() {
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null);
  const [copied, setCopied] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    let remoteInquiries: ProjectInquiry[] = [];

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("project_inquiries")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          remoteInquiries = data as ProjectInquiry[];
        }
      } catch (err) {
        console.warn("Could not fetch remote inquiries:", err);
      }
    }

    // Also load any local inquiries from localStorage
    let localInquiries: ProjectInquiry[] = [];
    try {
      const stored = localStorage.getItem("zyvo_inquiries");
      if (stored) {
        localInquiries = JSON.parse(stored);
      }
    } catch {
      // ignore
    }

    // Merge and deduplicate by email + description snippet or ID
    const mergedMap = new Map<string, ProjectInquiry>();
    for (const item of remoteInquiries) {
      mergedMap.set(item.id, item);
    }
    for (const item of localInquiries) {
      if (!mergedMap.has(item.id)) {
        mergedMap.set(item.id, item);
      }
    }

    setInquiries(Array.from(mergedMap.values()));
    setLoading(false);
  };

  useEffect(() => {
    void fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    setActionLoading(true);

    if (isSupabaseConfigured && supabase && !id.startsWith("local_")) {
      await supabase.from("project_inquiries").update({ status: newStatus }).eq("id", id);
    }

    // Update in local state and localStorage
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      const stored = JSON.parse(localStorage.getItem("zyvo_inquiries") || "[]");
      const updated = stored.map((item: any) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      localStorage.setItem("zyvo_inquiries", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setActionLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this inquiry?")) return;

    if (isSupabaseConfigured && supabase && !id.startsWith("local_")) {
      await supabase.from("project_inquiries").delete().eq("id", id);
    }

    setInquiries((prev) => prev.filter((item) => item.id !== id));
    if (selectedInquiry?.id === id) setSelectedInquiry(null);

    try {
      const stored = JSON.parse(localStorage.getItem("zyvo_inquiries") || "[]");
      const filtered = stored.filter((item: any) => item.id !== id);
      localStorage.setItem("zyvo_inquiries", JSON.stringify(filtered));
    } catch {
      // ignore
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportCsv = () => {
    const headers = ["Full Name", "Email", "Company", "Country", "Service Category", "Service", "Budget", "Timeline", "Status", "Date", "Description"];
    const rows = filteredInquiries.map((i) => [
      `"${i.full_name}"`,
      `"${i.email}"`,
      `"${i.company_name || ""}"`,
      `"${i.country}"`,
      `"${i.service_category}"`,
      `"${i.service_type}"`,
      `"${i.budget_range || ""}"`,
      `"${i.project_timeline || ""}"`,
      `"${i.status}"`,
      `"${new Date(i.created_at).toLocaleDateString()}"`,
      `"${i.project_description.replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `zyvo_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.full_name.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(search.toLowerCase()) ||
      (inquiry.company_name && inquiry.company_name.toLowerCase().includes(search.toLowerCase())) ||
      inquiry.service_type.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case "new":
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-xs font-bold">New</span>;
      case "reviewed":
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 text-xs font-bold">Reviewed</span>;
      case "contacted":
        return <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 text-purple-800 px-2.5 py-0.5 text-xs font-bold">Contacted</span>;
      case "archived":
        return <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 px-2.5 py-0.5 text-xs font-bold">Archived</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Inbox className="h-6 w-6 text-[#231E53]" />
            <span>Client Inquiries Inbox</span>
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Real-time project inquiries received from the website discovery form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchInquiries}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={exportCsv}
            disabled={filteredInquiries.length === 0}
            className="flex items-center gap-1.5 text-xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, email, company, or service..."
            className="pl-9 w-full bg-white"
          />
        </div>

        {/* Status Pill Filters */}
        <div className="flex items-center gap-1.5 self-start md:self-auto overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 mr-1">
            <Filter className="h-3.5 w-3.5" />
          </span>
          {["all", "new", "reviewed", "contacted", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-full px-3 py-1 text-xs font-bold capitalize transition-all ${
                statusFilter === st
                  ? "bg-[#231E53] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table & List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <RefreshCw className="h-7 w-7 text-[#00A0E1] animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-600">Loading inquiries from database…</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-20 text-center">
            <Inbox className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-800">No inquiries found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {search || statusFilter !== "all"
                ? "Try clearing your search query or switching status filters."
                : "When clients submit the discovery form on your website, their submissions will appear here in real time."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 font-mono text-slate-500 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-semibold">Client</th>
                  <th className="py-3.5 px-4 font-semibold">Service Line</th>
                  <th className="py-3.5 px-4 font-semibold">Country</th>
                  <th className="py-3.5 px-4 font-semibold">Budget & Timeline</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="hover:bg-slate-50/60 transition-colors group cursor-pointer"
                    onClick={() => setSelectedInquiry(inquiry)}
                  >
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-sm group-hover:text-[#231E53]">
                        {inquiry.full_name}
                      </div>
                      <div className="text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span>{inquiry.email}</span>
                        {inquiry.company_name && (
                          <>
                            <span>·</span>
                            <span className="font-semibold text-slate-700">{inquiry.company_name}</span>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-800 block">{inquiry.service_category}</span>
                      <span className="text-slate-500 text-[11px]">{inquiry.service_type}</span>
                    </td>

                    <td className="py-4 px-4 font-medium text-slate-700">
                      {inquiry.country}
                    </td>

                    <td className="py-4 px-4">
                      <div className="text-slate-800 font-semibold">{inquiry.budget_range || "Flexible"}</div>
                      <div className="text-slate-500 text-[11px]">{inquiry.project_timeline || "Flexible"}</div>
                    </td>

                    <td className="py-4 px-4">
                      {getStatusBadge(inquiry.status)}
                    </td>

                    <td className="py-4 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {new Date(inquiry.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(inquiry.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Drawer / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-[#231E53] text-white flex items-center justify-center font-bold">
                  {selectedInquiry.full_name[0]?.toUpperCase()}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-slate-900 text-base">
                    {selectedInquiry.full_name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Received {new Date(selectedInquiry.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getStatusBadge(selectedInquiry.status)}
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
              
              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div>
                  <p className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-[#00A0E1]" /> Email Address
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-bold text-slate-900">{selectedInquiry.email}</span>
                    <button
                      type="button"
                      onClick={() => copyEmail(selectedInquiry.email)}
                      className="text-slate-400 hover:text-slate-700 p-0.5"
                      title="Copy Email"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center gap-1">
                    <Building className="h-3.5 w-3.5 text-[#00A0E1]" /> Company
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    {selectedInquiry.company_name || "Independent"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5 text-[#00A0E1]" /> Country
                  </p>
                  <p className="mt-1 font-bold text-slate-900">{selectedInquiry.country}</p>
                </div>

                <div>
                  <p className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5 text-[#00A0E1]" /> Service Category
                  </p>
                  <p className="mt-1 font-bold text-slate-900">{selectedInquiry.service_category}</p>
                </div>

                <div>
                  <p className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Specific Service</p>
                  <p className="mt-1 font-bold text-slate-900">{selectedInquiry.service_type}</p>
                </div>

                <div>
                  <p className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Budget & Timeline</p>
                  <p className="mt-1 font-bold text-slate-900">
                    {selectedInquiry.budget_range || "Flexible"} · {selectedInquiry.project_timeline || "Flexible"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
                  Project Description:
                </h4>
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-slate-800 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap">
                  {selectedInquiry.project_description}
                </div>
              </div>

              {/* Status Update Controller */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Update Status:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as InquiryStatus)}
                    disabled={actionLoading}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="contacted">Contacted</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Regarding%20your%20inquiry%20with%20Zyvo%20Solutions`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#231E53] px-4 py-2 text-xs font-bold text-white hover:bg-[#1C0C4D] transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Reply via Email</span>
                  </a>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="text-xs"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
