// Business facts verified from wells-ogunquit.com
export const site = {
  name: "Wells-Ogunquit Resort Motel & Cottages",
  shortName: "Wells-Ogunquit Resort",
  description:
    "A family-run motel on the Southern Maine coast, three quarters of a mile from the sand. Heated saltwater pool, free breakfast, and grills out in the garden.",
  address: {
    street: "203 Post Road, US Route 1",
    city: "Wells",
    state: "ME",
    zip: "04090",
    full: "203 Post Road, US Route 1, Wells, ME 04090",
  },
  geo: { lat: 43.277636, lng: -70.59558 },
  phones: {
    tollFree: "1-800-556-4402",
    tollFreeHref: "tel:+18005564402",
    local: "207-646-8115",
    localHref: "tel:+12076468115",
  },
  email: "info@wells-ogunquit.com",
  bookingUrl: "https://hotels.cloudbeds.com/reservation/HViWyP",
  social: {
    facebook: "https://facebook.com/WellsOgunquit",
    instagram: "https://instagram.com/wellsogunquitmotel",
    instagramHandle: "@wellsogunquitmotel",
  },
  season: "We're open from spring through late October, foliage season included.",
  breakfastHours: "Breakfast runs from 7 to 9:30 every morning.",
  poolSeason:
    "The heated saltwater pool opens in mid-May. The heat stays on until the third week of September, and the pool area stays open for sunbathing until we close for the year.",
  grillHours: "The grills are open from 11am to 8pm.",
  cancellation: "Cancel or move your dates free, up to 48 hours before you arrive.",
  policies: ["Every room is non-smoking", "Sorry, no pets", "We don't have ADA rooms"],
} as const;

export const nav = [
  { label: "Rooms", href: "/rooms" },
  { label: "Amenities", href: "/amenities" },
  { label: "Breakfast", href: "/breakfast" },
  { label: "Attractions", href: "/attractions" },
  { label: "Contact", href: "/contact" },
] as const;

export const distances = [
  { place: "Moody and North Beach", value: "3/4 mile" },
  { place: "Wells Beach", value: "2 miles" },
  { place: "Perkins Cove", value: "2.8 miles" },
  { place: "Kennebunkport", value: "8 miles" },
  { place: "Portsmouth, NH", value: "30 minutes" },
  { place: "Portland Jetport", value: "36 minutes" },
  { place: "Portland waterfront", value: "40 minutes" },
  { place: "Boston and Logan Airport", value: "1.5 hours" },
  { place: "Boothbay Harbor", value: "1.75 hours" },
  { place: "Acadia and Bar Harbor", value: "3.5 hours" },
] as const;
