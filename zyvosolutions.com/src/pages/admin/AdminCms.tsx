import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Compass, 
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface FaqItem {
  q: string;
  a: string;
}

export function AdminCms() {
  const [activeTab, setActiveTab] = useState<"hero" | "why_zyvo" | "faq">("hero");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hero state
  const [heroTitle, setHeroTitle] = useState("Minds That Build Solutions. Defined by Impact.");
  const [heroSubtitle, setHeroSubtitle] = useState("Digital Engineering & Growth Agency · Colombo & Global");
  const [heroLead, setHeroLead] = useState(
    "Zyvo Solutions is a full-service digital agency. We engineer bespoke web applications, enterprise commerce platforms, and data-backed performance marketing systems that drive measurable commercial growth."
  );
  const [heroPrimaryCtaText, setHeroPrimaryCtaText] = useState("Let's Build Together");
  const [heroPrimaryCtaLink, setHeroPrimaryCtaLink] = useState("/contact");
  const [heroSecondaryCtaText, setHeroSecondaryCtaText] = useState("Explore Verticals");
  const [heroSecondaryCtaLink, setHeroSecondaryCtaLink] = useState("/services");

  // Why Zyvo state
  const [whyTitle, setWhyTitle] = useState("Redefine What a Digital Partner Can Be.");
  const [whySubtitle, setWhySubtitle] = useState("Our Philosophy");
  const [whyLead, setWhyLead] = useState(
    "Most businesses do not need another agency pushing generic themes or selling buzzwords. They need a disciplined partner that understands commercial goals, builds dependable software, and communicates with straight answers."
  );
  const [whyCommitment, setWhyCommitment] = useState(
    "If a proposed feature will not measurably advance your revenue, user experience, or operational efficiency, we will tell you directly — even if it means less billable scope for us."
  );

  // FAQ state
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      q: "How does pricing and milestone invoicing work?",
      a: "We use a transparent 40 / 30 / 30 model: 40% upon scope approval, 30% upon staging milestone approval, and 30% upon launch and complete code handover. Zero hidden line items.",
    },
    {
      q: "Do I own 100% of the code and repository?",
      a: "Yes, absolutely. Upon final payment, you receive complete administrative ownership of your GitHub repository, database, DNS records, and design source files.",
    },
    {
      q: "Do you provide a warranty after launch?",
      a: "Every project includes 30 calendar days of post-launch technical warranty covering bug fixes, browser adjustments, and performance tweaks at no additional cost.",
    },
  ]);

  // Load existing content from Supabase / localStorage on mount
  useEffect(() => {
    // 1. Try local cache
    try {
      const heroCached = localStorage.getItem("zyvo_cms_hero");
      if (heroCached) {
        const d = JSON.parse(heroCached);
        if (d.title) setHeroTitle(d.title);
        if (d.subtitle) setHeroSubtitle(d.subtitle);
        if (d.content?.lead) setHeroLead(d.content.lead);
        if (d.content?.cta_primary_text) setHeroPrimaryCtaText(d.content.cta_primary_text);
        if (d.content?.cta_primary_link) setHeroPrimaryCtaLink(d.content.cta_primary_link);
        if (d.content?.cta_secondary_text) setHeroSecondaryCtaText(d.content.cta_secondary_text);
        if (d.content?.cta_secondary_link) setHeroSecondaryCtaLink(d.content.cta_secondary_link);
      }

      const whyCached = localStorage.getItem("zyvo_cms_why_zyvo");
      if (whyCached) {
        const d = JSON.parse(whyCached);
        if (d.title) setWhyTitle(d.title);
        if (d.subtitle) setWhySubtitle(d.subtitle);
        if (d.content?.lead) setWhyLead(d.content.lead);
        if (d.content?.commitment) setWhyCommitment(d.content.commitment);
      }

      const faqCached = localStorage.getItem("zyvo_cms_faq");
      if (faqCached) {
        const d = JSON.parse(faqCached);
        if (d.content?.items) setFaqs(d.content.items);
      }
    } catch {
      // ignore
    }

    // 2. Fetch from Supabase
    if (isSupabaseConfigured && supabase) {
      supabase
        .from("page_sections")
        .select("*")
        .then(({ data }) => {
          if (data && data.length > 0) {
            for (const item of data) {
              if (item.section_key === "hero") {
                if (item.title) setHeroTitle(item.title);
                if (item.subtitle) setHeroSubtitle(item.subtitle);
                if (item.content?.lead) setHeroLead(item.content.lead);
                if (item.content?.cta_primary_text) setHeroPrimaryCtaText(item.content.cta_primary_text);
                if (item.content?.cta_secondary_text) setHeroSecondaryCtaText(item.content.cta_secondary_text);
              } else if (item.section_key === "why_zyvo") {
                if (item.title) setWhyTitle(item.title);
                if (item.subtitle) setWhySubtitle(item.subtitle);
                if (item.content?.lead) setWhyLead(item.content.lead);
                if (item.content?.commitment) setWhyCommitment(item.content.commitment);
              } else if (item.section_key === "faq") {
                if (item.content?.items) setFaqs(item.content.items);
              }
            }
          }
        });
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      if (activeTab === "hero") {
        const payload = {
          section_key: "hero",
          title: heroTitle,
          subtitle: heroSubtitle,
          content: {
            lead: heroLead,
            cta_primary_text: heroPrimaryCtaText,
            cta_primary_link: heroPrimaryCtaLink,
            cta_secondary_text: heroSecondaryCtaText,
            cta_secondary_link: heroSecondaryCtaLink,
          },
          updated_at: new Date().toISOString(),
        };

        localStorage.setItem("zyvo_cms_hero", JSON.stringify(payload));
        if (isSupabaseConfigured && supabase) {
          await supabase.from("page_sections").upsert(payload);
        }
      } else if (activeTab === "why_zyvo") {
        const payload = {
          section_key: "why_zyvo",
          title: whyTitle,
          subtitle: whySubtitle,
          content: {
            lead: whyLead,
            commitment: whyCommitment,
          },
          updated_at: new Date().toISOString(),
        };

        localStorage.setItem("zyvo_cms_why_zyvo", JSON.stringify(payload));
        if (isSupabaseConfigured && supabase) {
          await supabase.from("page_sections").upsert(payload);
        }
      } else if (activeTab === "faq") {
        const payload = {
          section_key: "faq",
          title: "Questions, Answered Honestly.",
          subtitle: "Frequently Asked Questions",
          content: {
            items: faqs,
          },
          updated_at: new Date().toISOString(),
        };

        localStorage.setItem("zyvo_cms_faq", JSON.stringify(payload));
        if (isSupabaseConfigured && supabase) {
          await supabase.from("page_sections").upsert(payload);
        }
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.message || "Failed to save content updates.");
    } finally {
      setSaving(false);
    }
  };

  const addFaq = () => {
    setFaqs([...faqs, { q: "New Question Title", a: "Provide an informative, clear answer here." }]);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, field: "q" | "a", value: string) => {
    setFaqs(faqs.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Sparkles className="h-6 w-6 text-[#231E53]" />
            <span>Content Management Studio (CMS)</span>
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Customize copy, headlines, and sections across the public website in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4" />
              <span>Live on Website!</span>
            </span>
          )}

          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#231E53] hover:bg-[#1C0C4D] text-white font-bold flex items-center gap-2 text-xs"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Publishing…" : "Save & Publish"}</span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "hero"
              ? "bg-[#231E53] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Hero Section</span>
        </button>

        <button
          onClick={() => setActiveTab("why_zyvo")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "why_zyvo"
              ? "bg-[#231E53] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>Why Zyvo & Philosophy</span>
        </button>

        <button
          onClick={() => setActiveTab("faq")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "faq"
              ? "bg-[#231E53] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>FAQ Questions ({faqs.length})</span>
        </button>
      </div>

      {/* Hero Tab Form */}
      {activeTab === "hero" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-display font-extrabold text-slate-900 text-base">
              Homepage Hero Section
            </h3>
            <p className="text-xs text-slate-500">
              The primary above-the-fold impression on your homepage.
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mb-1.5">
              Eyebrow / Subtitle Badge
            </label>
            <Input
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              placeholder="e.g. Digital Engineering & Growth Agency · Colombo & Global"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mb-1.5">
              Main Headline
            </label>
            <Input
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="e.g. Minds That Build Solutions. Defined by Impact."
              className="w-full font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mb-1.5">
              Hero Lead Description
            </label>
            <Textarea
              value={heroLead}
              onChange={(e) => setHeroLead(e.target.value)}
              rows={3}
              placeholder="Brief paragraph describing the agency's primary mission and approach."
              className="w-full text-xs sm:text-sm"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mb-1.5">
                Primary Button Text
              </label>
              <Input
                value={heroPrimaryCtaText}
                onChange={(e) => setHeroPrimaryCtaText(e.target.value)}
                placeholder="Let's Build Together"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mb-1.5">
                Primary Button Link
              </label>
              <Input
                value={heroPrimaryCtaLink}
                onChange={(e) => setHeroPrimaryCtaLink(e.target.value)}
                placeholder="/contact"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mb-1.5">
                Secondary Button Text
              </label>
              <Input
                value={heroSecondaryCtaText}
                onChange={(e) => setHeroSecondaryCtaText(e.target.value)}
                placeholder="Explore Verticals"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mb-1.5">
                Secondary Button Link
              </label>
              <Input
                value={heroSecondaryCtaLink}
                onChange={(e) => setHeroSecondaryCtaLink(e.target.value)}
                placeholder="/services"
              />
            </div>
          </div>
        </div>
      )}

      {/* Why Zyvo Tab Form */}
      {activeTab === "why_zyvo" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-display font-extrabold text-slate-900 text-base">
              Philosophy & Why Zyvo Section
            </h3>
            <p className="text-xs text-slate-500">
              Communicate what makes your studio different from generic agencies.
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mb-1.5">
              Section Eyebrow
            </label>
            <Input
              value={whySubtitle}
              onChange={(e) => setWhySubtitle(e.target.value)}
              placeholder="Our Philosophy"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mb-1.5">
              Philosophy Headline
            </label>
            <Input
              value={whyTitle}
              onChange={(e) => setWhyTitle(e.target.value)}
              placeholder="Redefine What a Digital Partner Can Be."
              className="w-full font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mb-1.5">
              Agency Lead Narrative
            </label>
            <Textarea
              value={whyLead}
              onChange={(e) => setWhyLead(e.target.value)}
              rows={3}
              placeholder="Describe your agency's working philosophy and direct approach."
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mb-1.5">
              The Zyvo Commercial Commitment Statement
            </label>
            <Textarea
              value={whyCommitment}
              onChange={(e) => setWhyCommitment(e.target.value)}
              rows={3}
              placeholder="The honest pledge given to prospective clients."
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* FAQ Tab Form */}
      {activeTab === "faq" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-display font-extrabold text-slate-900 text-base">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500">
                Transparent answers to commercial, pricing, and process questions.
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={addFaq}
              className="flex items-center gap-1.5 text-xs font-bold"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Question</span>
            </Button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#00A0E1]">
                    Question 0{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="p-1 rounded text-slate-400 hover:text-red-600 transition-colors"
                    title="Remove Question"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-500 font-semibold mb-1">
                    Question Title
                  </label>
                  <Input
                    value={faq.q}
                    onChange={(e) => updateFaq(index, "q", e.target.value)}
                    placeholder="Enter question"
                    className="bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-500 font-semibold mb-1">
                    Answer Content
                  </label>
                  <Textarea
                    value={faq.a}
                    onChange={(e) => updateFaq(index, "a", e.target.value)}
                    rows={2}
                    placeholder="Enter answer"
                    className="bg-white text-xs sm:text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
