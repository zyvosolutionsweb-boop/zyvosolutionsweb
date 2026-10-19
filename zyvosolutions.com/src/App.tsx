import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout";
import Home from "@/pages/Home";

// Route-level pages are lazy-loaded for a fast initial render.
const ServicesPage = lazy(() => import("@/pages/Services"));
const WorkPage = lazy(() => import("@/pages/Work"));
const AboutPage = lazy(() => import("@/pages/About"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const PrivacyPage = lazy(() => import("@/pages/Privacy"));
const TermsPage = lazy(() => import("@/pages/Terms"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));
const AdminPage = lazy(() => import("@/pages/admin"));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-bordersoft border-t-cyan-glow" />
        <span className="sr-only">Loading page…</span>
      </div>
    </div>
  );
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "services",
          element: (
            <Suspense fallback={<PageFallback />}>
              <ServicesPage />
            </Suspense>
          ),
        },
        {
          path: "work",
          element: (
            <Suspense fallback={<PageFallback />}>
              <WorkPage />
            </Suspense>
          ),
        },
        {
          path: "about",
          element: (
            <Suspense fallback={<PageFallback />}>
              <AboutPage />
            </Suspense>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense fallback={<PageFallback />}>
              <ContactPage />
            </Suspense>
          ),
        },
        {
          path: "privacy",
          element: (
            <Suspense fallback={<PageFallback />}>
              <PrivacyPage />
            </Suspense>
          ),
        },
        {
          path: "terms",
          element: (
            <Suspense fallback={<PageFallback />}>
              <TermsPage />
            </Suspense>
          ),
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <Suspense fallback={<PageFallback />}>
          <AdminPage />
        </Suspense>
      ),
    },
  ],
  { basename: undefined },
);

export default function App() {
  return <RouterProvider router={router} />;
}
