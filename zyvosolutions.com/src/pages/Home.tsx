import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhyZyvo } from "@/components/home/WhyZyvo";
import { WorkTogether } from "@/components/home/WorkTogether";
import { Process } from "@/components/home/Process";
import { Faq } from "@/components/home/Faq";
import { CtaSection } from "@/components/home/CtaSection";
import { Seo } from "@/components/Seo";

/** Organization structured data for search engines. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Zyvo",
  description:
    "Digital agency offering web development (business websites, e-commerce, custom web applications) and digital marketing (SEO, social media, paid advertising, content).",
  slogan: "Your Vision. Our Code.",
  areaServed: ["LK", "GB", "US", "CA", "AU", "AE"],
  url: "https://zyvo.example.com",
  makesOffer: [
    {
      "@type": "Offer",
      name: "Web Development",
      description:
        "Business websites, e-commerce stores, custom web applications, landing pages, UI/UX design and maintenance.",
    },
    {
      "@type": "Offer",
      name: "Digital Marketing",
      description:
        "SEO, social media marketing, paid advertising, content marketing, creative content and analytics.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <Seo
        title="Zyvo — Web Development & Digital Marketing. Your Vision. Our Code."
        description="Zyvo is a design-led digital agency building high-performance websites, stores and web applications, and growing businesses with SEO, social media, paid advertising and content marketing — for Sri Lankan and international clients."
        path="/"
      />
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <Hero />
      <ServicesSection />
      <FeaturedWork />
      <WhyZyvo />
      <WorkTogether />
      <Process />
      <Faq />
      <CtaSection />
    </>
  );
}
