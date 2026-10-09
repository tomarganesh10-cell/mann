/**
 * Franchise ecosystem data.
 *
 * Add a new entry only after the relationship has been verified in writing.
 * Do NOT add third-party brands (e.g. Domino's, Subway) until Kalpavriksha
 * confirms the precise legal and commercial arrangement; naming them can imply
 * an unverified relationship.
 */
export type FranchiseBrand = {
  id: string;
  name: string;
  /** Plain-language relationship label. Confirm wording with legal before launch. */
  relationship: string;
  tagline?: string;
  description: string;
  tags: readonly string[];
  url: string;
  ctaLabel: string;
  featured: boolean;
  /** Path under /public of an approved logo. Leave undefined to use the text wordmark. */
  logoSrc?: string;
};

export const franchiseBrands: readonly FranchiseBrand[] = [
  {
    id: "playplate",
    name: "PLAYPLATE",
    relationship: "Master franchise provider",
    tagline: "EAT • PLAY • REPEAT",
    description:
      "A brand where food, gaming, entertainment, and community meet, shaped by technology-driven experiences.",
    tags: ["Food", "Gaming", "Entertainment", "Community", "Technology-driven experiences"],
    url: "https://playplate.in",
    ctaLabel: "Visit playplate.in",
    featured: true,
  },
];
