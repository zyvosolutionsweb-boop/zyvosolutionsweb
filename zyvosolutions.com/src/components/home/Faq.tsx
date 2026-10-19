import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/site";
import { useCmsContent } from "@/hooks/useCmsContent";

export function Faq() {
  const cms = useCmsContent("faq");
  const items = cms.content?.items && cms.content.items.length > 0
    ? cms.content.items.map((it: any) => ({ question: it.q, answer: it.a }))
    : faqs;

  return (
    <section className="py-20 lg:py-28 bg-slate-50/60 border-b border-slate-200/80" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title={<span id="faq-heading">Questions, Answered Honestly.</span>}
          description="Pricing models, production sprint timelines, code ownership, and warranties — standard commercial questions answered transparently."
        />

        <Reveal>
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {items.map((faq: any, i: number) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
