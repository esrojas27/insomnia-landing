// Central configuration file for the collective
// This allows for easy updates to content without touching components

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

export const COLLECTIVE = {
  name: "INSOMNIA",
  tagline: "FEEL THE HOUSE MUSIC",
  description: "El arte de mantenerte despierto. House selecto para mentes exigentes.",
  socials: {
    instagram: "https://www.instagram.com/insomnia__col?igsh=MW53YWZ0cHZwd2VzeQ==",
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
    // Actualizado a la imagen local
    image: getAssetPath("artists/clar.jpg"),
    bio: "House y tech house con bajos potentes y raíces latinas, creados para transmitir la esencia de los ritmos que me han acompañado toda la vida.",
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
    image: getAssetPath("artists/ladi.jpeg"),
    bio: "Deep, dub-influenced techno for the early hours.",
    socials: { instagram: "#", soundcloud: "#" }
  },
  {
    id: 4,
    name: "TEBI",
    role: "FOUNDER / OPERATIONS",
    image: getAssetPath("artists/tebi.png"),
    bio: "Sentando las bases. Marca, crecimiento y arquitectura digital.",
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
    // Link de WhatsApp actualizado
    ticketLink: "https://wa.me/573008841195?text=Hola,%20estoy%20interesado%20en%20la%20tardeada%20del%20domingo%2022%20de%20febrero%20en%20Furia.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.",
    soldOut: false,
    // Usamos la función helper para asegurar la ruta correcta
    image: getAssetPath("events/sunsetOn.jpeg")
  },
  {
    id: 2,
    date: "2024-06-22",
    venue: "BASSIANI",
    city: "TBILISI",
    country: "GEO",
    ticketLink: "#",
    soldOut: true,
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&h=400&fit=crop&q=80"
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
    soldOut: true,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop&q=80"
  },
  {
    id: 5,
    date: "2024-08-01",
    venue: "AWAKENINGS",
    city: "AMSTERDAM",
    country: "NL",
    ticketLink: "#",
    soldOut: true,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop&q=80"
  }
];
