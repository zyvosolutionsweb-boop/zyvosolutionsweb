import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";

const updated = "October 2026";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <Reveal className="border-t border-slate-200 py-8 first:border-0 first:pt-0">
      <h2 className="font-display text-xl font-bold text-[#0F172A]">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">{children}</div>
    </Reveal>
  );
}

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How Zyvo collects, uses and protects your personal data when you contact us or use our website."
        path="/privacy"
      />
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
        <Reveal className="mb-10">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#0F172A] md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: {updated}</p>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            This policy explains what data we collect through this website, why we collect it and
            how it's protected. We keep this policy deliberately plain-language.
          </p>
        </Reveal>

        <Section title="1. What we collect">
          <p>
            When you submit a project inquiry, we collect the information you provide: your name,
            email address, company name, country, selected service, budget range, timeline and your
            project description. We do not collect payment information through this website, and we
            do not use third-party advertising trackers.
          </p>
          <p>
            Basic technical logs (such as IP address and request metadata) may be processed by our
            hosting and backend providers solely for security, rate limiting and fraud prevention.
          </p>
        </Section>

        <Section title="2. Why we process it">
          <p>
            Your inquiry data is used only to respond to your request, prepare a proposal and
            communicate with you about your potential project. Submitting an inquiry creates a
            legitimate expectation of a reply — that is the legal basis under which we process it.
          </p>
          <p>
            We never sell your data, never share it with unrelated third parties for marketing, and
            never add you to a mailing list without separate, explicit consent.
          </p>
        </Section>

        <Section title="3. How it's stored and protected">
          <p>
            Inquiry data is stored in a secured PostgreSQL database (Supabase) protected by
            row-level security, least-privilege access rules and transport encryption. Access is
            restricted to authorized team members on a need-to-know basis.
          </p>
        </Section>

        <Section title="4. Retention">
          <p>
            We keep inquiry records for as long as needed to evaluate and — where relevant — deliver
            your project, after which they are deleted or anonymized. You can request earlier
            deletion at any time.
          </p>
        </Section>

        <Section title="5. Your rights">
          <p>
            You may request access to, correction of, or deletion of your personal data, and you may
            withdraw consent for further contact at any time. Write to us and we will respond
            within 30 days.
          </p>
        </Section>

        <Section title="6. Contact">
          <p>
            Questions about this policy or your data can be sent to the contact email listed on our{" "}
            <a href="/contact" className="text-cyan-glow hover:underline">
              contact page
            </a>
            .
          </p>
        </Section>
      </article>
    </>
  );
}
