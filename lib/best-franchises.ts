/**
 * "Our Best Franchises" page data.
 *
 * Logo files are the authentic assets supplied by the company and are served untouched from /public/images/brands.
 * Do not recolor, crop or redraw them. `relationship` is only shown where it has been supplied; Domino's and Subway are
 * displayed for industry exploration and NO partnership or franchise rights are implied until verified in writing.
 */
export type BestFranchiseTheme = "playplate" | "dominos" | "subway";

export type BestFranchise = {
  id: BestFranchiseTheme;
  rank: string;
  name: string;
  logo: { src: string; width: number; height: number; alt: string };
  tagline?: string;
  description: string;
  categories: readonly string[];
  ctaLabel: string;
  url: string;
  /** Small label shown on the card. Only PLAYPLATE has a company-supplied relationship. */
  relationship?: string;
  /** Shown on brands whose partnership status is unconfirmed. */
  caption?: string;
};

export const unverifiedCaption =
  "Brand shown for industry exploration. Franchise availability and partnership status require independent confirmation.";

export const bestFranchises: readonly BestFranchise[] = [
  {
    id: "playplate",
    rank: "01",
    name: "PLAYPLATE",
    logo: { src: "/images/brands/playplate-logo.png", width: 1400, height: 900, alt: "PLAYPLATE logo: EAT. PLAY. REPEAT." },
    tagline: "EAT • PLAY • REPEAT",
    description:
      "A food, gaming, and entertainment concept bringing people together through interactive experiences and community.",
    categories: ["Food", "Gaming", "Entertainment", "Community"],
    ctaLabel: "Visit PLAYPLATE",
    url: "https://playplate.in",
    relationship: "Master franchise provider",
  },
  {
    id: "dominos",
    rank: "02",
    name: "Domino’s",
    logo: { src: "/images/brands/dominos-logo.webp", width: 1280, height: 1280, alt: "Domino’s Pizza logo" },
    description: "A global pizza brand in the quick-service restaurant category, known for delivery and carryout.",
    categories: ["Pizza", "Quick-Service Restaurant"],
    ctaLabel: "Explore Domino’s",
    url: "https://www.dominos.com/",
    caption: unverifiedCaption,
  },
  {
    id: "subway",
    rank: "03",
    name: "Subway",
    logo: { src: "/images/brands/subway-logo.jpg", width: 1200, height: 800, alt: "Subway logo" },
    description: "A global sandwich brand in the quick-service restaurant category, built around made-to-order subs.",
    categories: ["Sandwiches", "Quick-Service Restaurant"],
    ctaLabel: "Explore Subway",
    url: "https://www.subway.com/",
    caption: unverifiedCaption,
  },
];
