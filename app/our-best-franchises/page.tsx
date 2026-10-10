import type { Metadata } from "next";
import Link from "next/link";
import { BestFranchiseCard } from "@/components/best/BestFranchiseCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion";
import { bestFranchises } from "@/lib/best-franchises";
import { bestFranchisesPath, company, portfolioPath, siteUrl } from "@/lib/site";

const title = "Our Best Franchises";
const description = "Explore distinctive concepts across food, entertainment, and quick-service dining.";

export const metadata: Metadata = {
  title,
  description,
  ...(siteUrl ? { alternates: { canonical: bestFranchisesPath } } : {}),
  openGraph: { type: "website", siteName: company.name, title: `${title} | ${company.shortName}`, description, locale: "en_IN" },
  twitter: { card: "summary_large_image", title: `${title} | ${company.shortName}`, description },
};

export default function OurBestFranchisesPage() {
  return (
    <>
      <a href="#main" className="sr-only z-[100] bg-lime px-4 py-2 text-forest focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Navbar />
      <main id="main">
        <PageHero
          id="best-title"
          eyebrow="Kalpavriksha Collective Pvt Ltd / Our Best Franchises"
          lines={["Three Brands.", <span key="b" className="italic text-lime">Three Distinct Experiences.</span>]}
          body="Explore distinctive concepts across food, entertainment, and quick-service dining."
          crumb={<><Link href="/" className="hover:text-ivory">Home</Link> <span aria-hidden className="mx-2 text-gold">/</span><span aria-current="page" className="text-ivory">Our Best Franchises</span></>}
        />
        <section aria-label="Our best franchises" className="bg-forest-2 py-20 sm:py-28">
          <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
            <ol className="mx-auto grid max-w-xl gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-6 xl:gap-8">
              {bestFranchises.map((b, i) => (
                <li key={b.id} className="h-full">
                  <Reveal delay={i * 0.12} y={36} className="h-full"><BestFranchiseCard brand={b} /></Reveal>
                </li>
              ))}
            </ol>
            <Reveal delay={0.1} className="mx-auto mt-14 max-w-3xl text-center text-sm leading-relaxed text-soft">
              <p>Brand names and logos belong to their respective owners and appear for identification only. Only PLAYPLATE is presented as a Kalpavriksha franchise relationship; Domino&apos;s and Subway are shown for industry exploration and no partnership is implied.</p>
              <p className="mt-6"><Link href={portfolioPath} className="inline-flex min-h-11 items-center border-b border-gold/60 pb-0.5 uppercase tracking-[0.16em] text-ivory transition-colors hover:border-lime hover:text-lime">See the full Franchise Portfolio</Link></p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
