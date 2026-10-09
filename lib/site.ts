/**
 * Central site configuration. Everything here is meant to be edited as the
 * company supplies verified details. Nothing in this file is invented:
 * contact details are intentionally left empty until confirmed.
 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || undefined;

export const company = {
  name: "Kalpavriksha Private Limited",
  shortName: "Kalpavriksha",
  tagline: "Building Businesses. Growing Brands. Creating Impact.",
  headline: "Where Ambition Becomes an Empire.",
  description:
    "Connecting ambitious brands, franchise opportunities, and meaningful social impact through a vision built for growth.",
  /** Verified contact details only. Leave `null` until the company supplies them. */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
  },
} as const;

export const externalLinks = {
  playplate: "https://playplate.in",
  foundation: "https://hopecommonersfoundation.com",
} as const;

export const portfolioPath = "/franchise-portfolio";

/** `route: true` entries are real pages; the rest are sections of the home page. */
export const navLinks: readonly { label: string; href: string; id: string; route?: boolean }[] = [
  { label: "About", href: "#about", id: "about" },
  { label: "Ecosystem", href: "#ecosystem", id: "ecosystem" },
  { label: "Franchise Portfolio", href: portfolioPath, id: "portfolio", route: true },
  { label: "Our Approach", href: "#approach", id: "approach" },
  { label: "Social Impact", href: "#impact", id: "impact" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Franchise Ecosystem", href: "/#ecosystem" },
  { label: "Franchise Portfolio", href: portfolioPath },
  { label: "Our Approach", href: "/#approach" },
  { label: "Social Impact", href: "/#impact" },
  { label: "Contact", href: "/#contact" },
] as const;

export const pillars = [
  { no: "01", title: "Discover Opportunities", body: "Looking across markets and brands for openings worth building on." },
  { no: "02", title: "Build Strong Partnerships", body: "Bringing the right people and businesses to the same table." },
  { no: "03", title: "Create Lasting Impact", body: "Measuring growth by what it leaves behind, for customers and communities." },
] as const;

export const approachStages = [
  { no: "01", title: "Identify", body: "Understand opportunities, markets, and business objectives." },
  { no: "02", title: "Connect", body: "Bring together suitable businesses, partners, and stakeholders." },
  { no: "03", title: "Develop", body: "Support planning, brand development, and expansion initiatives." },
  { no: "04", title: "Grow", body: "Focus on sustainable progress, customer experience, and long-term value." },
] as const;

export const interestOptions = [
  "Franchise Opportunities",
  "Brand Partnerships",
  "Business Development",
  "Social Impact",
  "Other",
] as const;
