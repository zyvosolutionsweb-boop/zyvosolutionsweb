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

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="Terms governing the use of the Zyvo website and engagement of our services."
        path="/terms"
      />
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
        <Reveal className="mb-10">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#0F172A] md:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: {updated}</p>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            These terms cover your use of this website and the general conditions under which we
            engage with clients. Individual project contracts may add project-specific terms agreed
            in writing.
          </p>
        </Reveal>

        <Section title="1. The website">
          <p>
            The content, design and code of this website are the property of Zyvo. You
            may view and share content freely; you may not copy site content wholesale, misrepresent
            authorship of our work, or use the site to conduct unlawful activity.
          </p>
        </Section>

        <Section title="2. Portfolio content">
          <p>
            Items labeled as concepts or demonstration projects in our portfolio are illustrative
            showcases of our capabilities and design standards. They are not presented as client
            engagements. Client projects will be shown only where the client has approved display.
          </p>
        </Section>

        <Section title="3. Inquiries and proposals">
          <p>
            Submitting a project inquiry is not a contract and creates no obligation on either side.
            Projects begin only after a written agreement defining scope, timeline, price and
            payment terms is signed by both parties.
          </p>
        </Section>

        <Section title="4. Intellectual property">
          <p>
            Unless a project agreement states otherwise, Zyvo retains ownership of
            pre-existing tooling, internal libraries and design systems. On final payment,
            deliverables created specifically for your project transfer to you as described in your
            project agreement.
          </p>
        </Section>

        <Section title="5. Warranties and liability">
          <p>
            We warrant that services will be performed with professional skill and care. Beyond
            that, the website is provided "as is"; we are not liable for indirect or consequential
            damages arising from its use. Specific warranties and liability limits for deliverables
            are defined in each project agreement.
          </p>
        </Section>

        <Section title="6. Changes to these terms">
          <p>
            We may update these terms occasionally. The "last updated" date above shows the current
            version. Continued use of the website after an update means you accept the revised
            terms.
          </p>
        </Section>
      </article>
    </>
  );
}
