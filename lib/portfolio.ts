/**
 * Data for the Franchise Portfolio page.
 *
 * `status` drives the labels and the caption shown on each card:
 *  - "confirmed": a franchise relationship supplied by the company (confirm exact wording with legal before launch).
 *  - "featured":  a brand highlighted on the page. NO partnership is implied or confirmed.
 *  - "industry":  a well-known food brand shown for industry exploration only.
 *
 * To promote a brand to "confirmed", verify the arrangement in writing first.
 * Never add fees, investment figures, store counts, ratings or availability claims here.
 * Websites below were checked as the brands' official domains via search results; global/US
 * sites are used, so consider a market-specific URL (e.g. India) before launch.
 */
export type BrandStatus = "confirmed" | "featured" | "industry";

export type PortfolioBrand = {
  id: string;
  name: string;
  status: BrandStatus;
  category: string;
  description: string;
  url: string;
};

export const unconfirmedCaption =
  "Brand shown for industry exploration. Franchise availability and partnership status require independent confirmation.";

export const statusLegend: readonly { status: BrandStatus; label: string; body: string }[] = [
  { status: "confirmed", label: "Confirmed relationship", body: "A franchise arrangement supplied by Kalpavriksha." },
  { status: "featured", label: "Featured brand", body: "Highlighted for exploration. No partnership is implied." },
  { status: "industry", label: "Industry example", body: "A well-known food brand shown for context only." },
];

export const featuredFoodBrands: readonly PortfolioBrand[] = [
  {
    id: "dominos",
    name: "Domino’s",
    status: "featured",
    category: "Pizza / Quick-Service Restaurant",
    description: "A global pizza brand in the quick-service restaurant category, known for delivery and carryout.",
    url: "https://www.dominos.com/",
  },
  {
    id: "subway",
    name: "Subway",
    status: "featured",
    category: "Sandwiches / Quick-Service Restaurant",
    description: "A global sandwich brand in the quick-service restaurant category, built around made-to-order subs.",
    url: "https://www.subway.com/",
  },
];

export const moreFoodBrands: readonly PortfolioBrand[] = [
  { id: "mcdonalds", name: "McDonald’s", status: "industry", category: "Burgers / Quick-Service Restaurant", description: "A global burger brand in the quick-service restaurant category.", url: "https://www.mcdonalds.com/" },
  { id: "kfc", name: "KFC", status: "industry", category: "Chicken / Quick-Service Restaurant", description: "A global quick-service brand best known for fried chicken.", url: "https://global.kfc.com/" },
  { id: "burger-king", name: "Burger King", status: "industry", category: "Burgers / Quick-Service Restaurant", description: "A global burger brand in the quick-service restaurant category.", url: "https://www.bk.com/" },
  { id: "pizza-hut", name: "Pizza Hut", status: "industry", category: "Pizza / Restaurant", description: "A global pizza brand spanning dine-in, delivery and carryout.", url: "https://www.pizzahut.com/" },
  { id: "taco-bell", name: "Taco Bell", status: "industry", category: "Mexican-inspired / Quick-Service Restaurant", description: "A global quick-service brand focused on Mexican-inspired food.", url: "https://www.tacobell.com/" },
  { id: "baskin-robbins", name: "Baskin-Robbins", status: "industry", category: "Ice Cream / Desserts", description: "A global ice cream and frozen-dessert brand.", url: "https://www.baskinrobbins.com/" },
];
