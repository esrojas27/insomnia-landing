// Central configuration file for the collective
// This allows for easy updates to content without touching components

export const COLLECTIVE = {
  name: "INSOMNIA",
  tagline: "ELECTRONIC MUSIC COLLECTIVE",
  description: "El arte de mantenerte despierto. House selecto para mentes exigentes.",
  socials: {
    instagram: "https://instagram.com",
    soundcloud: "https://soundcloud.com",
    spotify: "https://spotify.com",
    ra: "https://residentadvisor.net"
  }
};

export const ARTISTS = [
  {
    id: 1,
    name: "CLAR",
    role: "RESIDENT / FOUNDER",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&h=1200&fit=crop&q=80", // Male portrait, dark
    bio: "Minimalist structures meeting raw industrial percussion.",
    socials: { instagram: "#", soundcloud: "#" }
  },
  {
    id: 2,
    name: "JUANDI",
    role: "RESIDENT / FOUNDER",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop&q=80", // Female portrait, moody
    bio: "Hypnotic grooves that warp time and space.",
    socials: { instagram: "#", soundcloud: "#" }
  },
  {
    id: 3,
    name: "LADI",
    role: "RESIDENT / FOUNDER",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1200&fit=crop&q=80", // Male portrait, intense
    bio: "Deep, dub-influenced techno for the early hours.",
    socials: { instagram: "#", soundcloud: "#" }
  }
];

export const GIGS = [
  {
    id: 1,
    date: "2026-02-22",
    venue: "SUNSET ON SUNDAY",
    city: "FURIA, BOGOTA",
    country: "CO",
    ticketLink: "#",
    soldOut: false
  },
  {
    id: 2,
    date: "2024-06-22",
    venue: "BASSIANI",
    city: "TBILISI",
    country: "GEO",
    ticketLink: "#",
    soldOut: false
  },
  {
    id: 3,
    date: "2024-07-05",
    venue: "TRESOR",
    city: "BERLIN",
    country: "DE",
    ticketLink: "#",
    soldOut: true
  },
  {
    id: 4,
    date: "2024-07-12",
    venue: "EXIST",
    city: "TALLINN",
    country: "EE",
    ticketLink: "#",
    soldOut: false
  },
  {
    id: 5,
    date: "2024-08-01",
    venue: "AWAKENINGS",
    city: "AMSTERDAM",
    country: "NL",
    ticketLink: "#",
    soldOut: false
  }
];
