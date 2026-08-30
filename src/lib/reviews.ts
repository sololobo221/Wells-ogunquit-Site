/**
 * Guest review data.
 *
 * The ratings below are the figures the property published on its own previous
 * site ("Rated #1 on TripAdvisor since 2017! 8.9/10 on Booking.com and 4.5/5 on
 * Expedia!"). Ratings drift, so check them against each listing before launch
 * and update the numbers here. Nothing on this site is invented.
 */

export type Rating = {
  platform: string;
  score: string;
  detail: string;
  href?: string;
};

export const ratings: Rating[] = [
  {
    platform: "TripAdvisor",
    score: "No. 1",
    detail: "in Wells, every year since 2017",
    href: "https://www.tripadvisor.com/Hotel_Review-g40951-d517702-Reviews-Wells_Ogunquit_Resort_Motel_Cottages-Wells_Maine.html",
  },
  {
    platform: "Booking.com",
    score: "8.9",
    detail: "out of 10",
  },
  {
    platform: "Expedia",
    score: "4.5",
    detail: "out of 5",
  },
];

export const googleReviewsUrl = "https://maps.google.com/?cid=4631318297808812164";

/**
 * Real guest quotes go here. Leave the array empty and the quote block simply
 * does not render, so the site never shows a testimonial nobody wrote.
 *
 * To add one: copy the guest's own words from your TripAdvisor, Google or
 * Booking.com listing, keep it short, and credit them the way the platform
 * does (first name and last initial is normal).
 *
 *   { text: "...", name: "Sarah M.", source: "TripAdvisor", stay: "August 2025" }
 */
export type Quote = {
  text: string;
  name: string;
  source: string;
  stay?: string;
};

export const quotes: Quote[] = [];
