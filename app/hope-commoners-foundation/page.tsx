import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { AboutFoundation, FocusAreas, FoodSupport, FoundationHero, GetInvolved, MottoBand } from "@/components/foundation/FoundationSections";
import { Navbar } from "@/components/Navbar";
import { company, foundationPath, siteUrl } from "@/lib/site";

const title = "Hope Commoners Foundation";
const description =
  "Hope Commoners Foundation is a nonprofit organization working towards a hunger-free, empowered, and resilient society.";

export const metadata: Metadata = {
  title,
  description,
  ...(siteUrl ? { alternates: { canonical: foundationPath } } : {}),
  openGraph: { type: "website", siteName: company.name, title: `${title} | ${company.shortName}`, description, locale: "en_IN" },
  twitter: { card: "summary_large_image", title: `${title} | ${company.shortName}`, description },
};

export default function HopeCommonersFoundationPage() {
  return (
    <>
      <a href="#main" className="sr-only z-[100] bg-lime px-4 py-2 text-forest focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Navbar />
      <main id="main" className="on-light text-ink">
        <FoundationHero />
        <AboutFoundation />
        <MottoBand />
        <FoodSupport />
        <FocusAreas />
        <GetInvolved />
      </main>
      <Footer />
    </>
  );
}
