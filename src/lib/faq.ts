import { site } from "./site";

/**
 * The questions guests ask most before booking, answered from facts already
 * published on this site. Nothing here is new information: if a policy
 * changes, change it in site.ts and it updates here too.
 *
 * Also emitted as FAQPage structured data on the home page.
 */
export const faq: { q: string; a: string }[] = [
  {
    q: "Is breakfast included?",
    a: "Yes, for every guest, every morning. Coffee, muffins baked that morning, bagels, fresh fruit and yogurt, set out in the breakfast room from 7 to 9:30.",
  },
  {
    q: "How far is the beach?",
    a: "Moody and North Beach are three quarters of a mile away, an easy walk. Wells Beach is two miles, and the trolley runs to Ogunquit and Perkins Cove.",
  },
  {
    q: "When is the pool heated?",
    a: site.poolSeason,
  },
  {
    q: "Can I change or cancel?",
    a: `${site.cancellation} Booking direct on our own page always gets the best rate.`,
  },
  {
    q: "Do you take pets?",
    a: "Sorry, we can't take pets. Every room is non-smoking, and there's a gazebo outside set aside for smoking.",
  },
  {
    q: "Are any rooms step free?",
    a: "We're all on one floor, but a few buildings have three to six steps up to the door. We don't have ADA rooms. Ask for a step-free room when you book and we'll sort it.",
  },
  {
    q: "Can we cook our own dinner?",
    a: `Yes. There are gas grills, smokers and a full outdoor kitchen, and we lend the lobster pots, plates and utensils. ${site.grillHours}`,
  },
  {
    q: "When are you open?",
    a: `${site.season} The exact dates move a little each year, so call if you're coming early or late in the season.`,
  },
];
