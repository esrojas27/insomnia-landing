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

// Helper para manejar las rutas de imágenes en GitHub Pages
// Si estamos en producción (GitHub Pages), agregamos el prefijo del repo
const getAssetPath = (path: string) => {
  // En Vite, import.meta.env.BASE_URL contiene el valor de 'base' del config (/insomnia-landing/)
  const baseUrl = import.meta.env.BASE_URL;

  // Si el path ya tiene http, lo devolvemos tal cual
  if (path.startsWith('http')) return path;

  // Quitamos la barra inicial si la tiene para evitar dobles barras
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Si baseUrl es '/', devolvemos /path, si no, /repo/path
  return `${baseUrl}${cleanPath}`;
};

export const GIGS = [
  {
    id: 1,
    date: "2026-02-22",
    venue: "SUNSET ON SUNDAY",
    city: "FURIA, BOGOTA",
    country: "CO",
    ticketLink: "#",
    soldOut: false,
    // Usamos la función helper para asegurar la ruta correcta
    image: getAssetPath("events/sunset.jpeg")
  },
  {
    id: 2,
    date: "2024-06-22",
    venue: "BASSIANI",
    city: "TBILISI",
    country: "GEO",
    ticketLink: "#",
    soldOut: false,
    image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=800&h=400&fit=crop&q=80"
  },
  {
    id: 3,
    date: "2024-07-05",
    venue: "TRESOR",
    city: "BERLIN",
    country: "DE",
    ticketLink: "#",
    soldOut: true,
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&h=400&fit=crop&q=80"
  },
  {
    id: 4,
    date: "2024-07-12",
    venue: "EXIST",
    city: "TALLINN",
    country: "EE",
    ticketLink: "#",
    soldOut: false,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop&q=80"
  },
  {
    id: 5,
    date: "2024-08-01",
    venue: "AWAKENINGS",
    city: "AMSTERDAM",
    country: "NL",
    ticketLink: "#",
    soldOut: false,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop&q=80"
  }
];
