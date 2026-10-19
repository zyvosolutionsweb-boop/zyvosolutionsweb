import { Link } from "react-router-dom";
import { Home, Briefcase } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found — Zyvo Solutions"
        description="The page you're looking for doesn't exist. Explore Zyvo's services, work and contact pages instead."
        path="/404"
      />
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-24 bg-white text-center">
        <div className="max-w-md mx-auto">
          <p className="font-display text-8xl font-black text-[#231E53]" aria-hidden="true">
            404
          </p>
          <h1 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            Page Not Found
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            The page you are looking for does not exist or may have been relocated.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="default">
              <Link to="/">
                <Home className="h-4 w-4" /> Back to Home
              </Link>
            </Button>
            <Button asChild variant="secondary" size="default">
              <Link to="/services">
                <Briefcase className="h-4 w-4" /> Explore Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
