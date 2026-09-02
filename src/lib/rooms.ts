export type Room = {
  slug: string;
  name: string;
  beds: string;
  sleeps: string;
  side: string;
  stairs: string;
  blurb: string;
  images: { src: string; alt: string }[];
  featured?: boolean;
  // Cloudbeds room type id, from the property's dashboard. Set this to let the
  // room be booked through the direct Pay-by-Link form at /booking.
  cloudbedsRoomTypeID?: string;
};

export const inRoomAmenities = [
  "Serta Presidential Suite bed",
  "Free Wi-Fi",
  "Flat-screen TV and DVD",
  "Heat and air conditioning",
  "Refrigerator",
  "Microwave",
  "Coffee maker with coffee",
  "Toaster",
  "Private entrance",
  "Patio furniture",
];

export const rooms: Room[] = [
  {
    slug: "two-bedroom-family-suite",
    name: "Two-Bedroom Family Suite",
    beds: "2 queen and 1 double, in 2 bedrooms",
    sleeps: "Base 3 adults and 1 child, up to 6",
    side: "Sunny north side",
    stairs: "No stairs",
    blurb:
      "Our roomiest layout: two separate bedrooms, a shared bath and a TV in each one. Good when the kids want their own space, and there are no steps between the car and the door.",
    
    images: [
      { src: "/images/room-suite-main.jpg", alt: "Main bedroom of the two-bedroom family suite" },
      { src: "/images/room-suite-second.jpg", alt: "Second bedroom of the family suite" },
      { src: "/images/room-suite-toward.jpg", alt: "The family suite looking back toward the door" },
    ],
    featured: true,
  },
  {
    slug: "king-bed-studio",
    name: "King Bed Studio",
    beds: "1 king",
    sleeps: "Base 1 to 2, up to 3 with an extra bed",
    side: "Sunny north side",
    stairs: "No stairs",
    blurb:
      "A bright studio with a king bed, an iron and board, and everything freshly furnished. It sits on the sunny north side, and there are no steps.",
    
    images: [
      { src: "/images/room-king.jpg", alt: "The king bed studio with new furniture" },
      { src: "/images/room-king-corner.jpg", alt: "Corner of the king bed studio" },
      { src: "/images/room-vanity.jpg", alt: "Vanity area in the king bed studio" },
    ],
    featured: true,
  },
  {
    slug: "queen-studio-sleeper-sofa",
    name: "Queen Studio with Sleeper Sofa",
    beds: "1 queen and a queen sleeper sofa",
    sleeps: "Base 1 to 2, up to 3 with the sofa bed",
    side: "Garden side",
    stairs: "Some units have 3 to 6 stairs",
    blurb:
      "A queen bed, plus a sofa that opens out into a second queen. Works well for a small family, or two couples sharing.",
    
    images: [
      { src: "/images/room-queen.jpg", alt: "Queen studio with a sleeper sofa" },
      { src: "/images/room-queen-corner.jpg", alt: "Corner of the queen studio" },
    ],
    featured: true,
  },
  {
    slug: "queen-bed-studio",
    name: "Queen Bed Studio",
    beds: "1 queen",
    sleeps: "Up to 2",
    side: "Road side",
    stairs: "Has stairs",
    blurb:
      "A compact studio with one queen bed, recently done up. About right for a couple of nights on the coast.",
    
    images: [
      { src: "/images/room-305.jpg", alt: "The queen bed studio seen from the door" },
      { src: "/images/room-bath.jpg", alt: "Bathroom in the queen bed studio" },
    ],
  },
  {
    slug: "queen-double-studio",
    name: "Queen and Double Studio",
    beds: "1 queen and 1 double",
    sleeps: "Base 1 to 2, up to 5 with an extra bed",
    side: "Various buildings",
    stairs: "Some units have stairs",
    blurb:
      "A queen and a double in one bright studio, with a kitchenette counter. The most adaptable room we have when the group doesn't split neatly into pairs.",
    
    images: [
      { src: "/images/room-queen-double.jpg", alt: "Queen and double studio seen from the door" },
      { src: "/images/room-queen-double-2.jpg", alt: "Queen and double studio looking toward the door" },
      { src: "/images/room-kitchenette.jpg", alt: "Kitchenette counter and vanity in the studio" },
    ],
  },
  {
    slug: "queen-double-studio-poolside",
    name: "Poolside Queen and Double Studio",
    beds: "2 queen and 1 double, in 2 bedrooms",
    sleeps: "Base 3 adults and 1 child, up to 6",
    side: "South side, by the pool",
    stairs: "3 to 6 stairs up to the porch",
    blurb:
      "A two-bedroom layout on the pool side. A few steps up to your own porch, with the pool and the barbecue garden right outside it.",
    
    images: [
      { src: "/images/room-poolside.jpg", alt: "Poolside studio looking toward the door" },
      { src: "/images/room-poolside-2.jpg", alt: "Poolside studio seen from the door" },
    ],
  },
];

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);
