import { externalLinks } from "./site";

/**
 * Hope Commoners Foundation page content.
 * Everything here is neutral copy supplied by the company. Nothing has been verified against the official website
 * (it was unreachable while building). Do NOT add beneficiary numbers, meal counts, donation figures, locations,
 * registration details or contact details until the foundation supplies them.
 */
export const foundationUrl = externalLinks.foundation;

/**
 * PROPOSED public-facing tagline. It is website copy, not a verified official motto.
 * Replace with the foundation's formally approved motto when available.
 */
export const proposedMotto = "NO ONE SHOULD GO HUNGRY. EVERYONE DESERVES HOPE.";

export const missionStatement =
  "To support people facing hardship through food assistance, community support, and initiatives that help build a more empowered and resilient society.";

export const focusAreas = [
  { id: "food", no: "01", title: "Food & Nourishment", body: "Supporting access to meals and essential food assistance." },
  { id: "education", no: "02", title: "Education & Opportunity", body: "Supporting initiatives that help underprivileged people access learning and opportunities." },
  { id: "community", no: "03", title: "Community Empowerment", body: "Encouraging collaboration, compassion, and practical support for communities in need." },
] as const;

/**
 * Genuine, authorised photography only (food preparation, meal distribution, volunteers, community support).
 * Leave empty until real images are supplied with permission; the page then shows an illustration instead.
 * Each entry needs alt text and, where required, a credit. Never use generated or stock images of beneficiaries.
 */
export const foundationPhotos: readonly { src: string; width: number; height: number; alt: string; credit?: string }[] = [];

/**
 * Specific volunteer or donation page URLs. Keep null until the exact pages have been verified on the official
 * website; the buttons then point to the verified homepage. The site never collects donations itself.
 */
export const verifiedVolunteerUrl: string | null = null;
