import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PartnershipCTA } from "@/components/PartnershipCTA";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { FeaturedBrandSection, FeaturedFoodBrandsSection, Legend, MoreFoodBrandsSection } from "@/components/portfolio/PortfolioSections";
import { company, portfolioPath, siteUrl } from "@/lib/site";

const title = "Our Franchise Portfolio";
const description =
  "Explore established food brands and emerging concepts shaping the future of food, hospitality, and customer experiences.";

export const metadata: Metadata = {
  title,
  description,
  ...(siteUrl ? { alternates: { canonical: portfolioPath } } : {}),
  openGraph: { type: "website", siteName: company.name, title: `${title} | ${company.shortName}`, description, locale: "en_IN" },
  twitter: { card: "summary_large_image", title: `${title} | ${company.shortName}`, description },
};

export default function FranchisePortfolioPage() {
  return (
    <>
      <a href="#main" className="sr-only z-[100] bg-lime px-4 py-2 text-forest focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Navbar />
      <main id="main">
        <PortfolioHero />
        <Legend />
        <FeaturedBrandSection />
        <FeaturedFoodBrandsSection />
        <MoreFoodBrandsSection />
        <PartnershipCTA
          lines={["Looking to Explore", <span key="b" className="italic text-lime">Franchise Opportunities?</span>]}
          body="Connect with our team to discuss brand relationships, expansion opportunities, and potential collaborations."
          primary={{ label: "Start a Conversation", href: "/#contact" }}
          secondary={null}
        />
      </main>
      <Footer />
    </>
  );
}
