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
    spotify: "https://open.spotify.com/playlist/3Gjw9FDvhNvCa8pZYTgwvH?si=YIyvOrOHThailPRrKNgNow&pi=yw0bSPEJRxSjw",
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
    bio: "House and tech house driven by powerful bass and Latin influences.",
    socials: { instagram: "#", soundcloud: "#" }
  },
  {
    id: 2,
    name: "JUANDI",
    role: "RESIDENT / FOUNDER",
    image: getAssetPath("artists/juandi.jpeg"),
    bio: "Strictly Rhythm for the dance floor",
    socials: { instagram: "#", soundcloud: "#" }
  },
  {
    id: 3,
    name: "LADINO",
    role: "RESIDENT / FOUNDER",
    image: getAssetPath("artists/ladi.jpeg"),
    bio: "Heavy bass, intense percussion, and a groove driven by pure house rhythms.",
    socials: { instagram: "#", soundcloud: "#" }
  },
  {
    id: 4,
    name: "TEBI",
    role: "FOUNDER / OPERATIONS",
    image: getAssetPath("artists/tebi.png"),
    bio: "Building the foundations. Brand, growth, and digital architecture.",
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
];

export const CURATED_TRACKS = [
  {
    id: 1,
    title: "Speranza - Lorenzo De Blanck",
    artist: "Week 2",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=1000&auto=format&fit=crop",
    spotifyUrl: "https://open.spotify.com/playlist/3Gjw9FDvhNvCa8pZYTgwvH?si=YIyvOrOHThailPRrKNgNow&pi=yw0bSPEJRxSjw",
    duration: "0:00", // Se actualizará dinámicamente
    audioFile: getAssetPath("music/track02.wav")
  },
  {
    id: 2,
    title: "Asi Asi (David San Remix)",
    artist: "Week 3 - Jean Pierre, Mausa, David San",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=1000&auto=format&fit=crop",
    spotifyUrl: "https://open.spotify.com/playlist/3Gjw9FDvhNvCa8pZYTgwvH?si=YIyvOrOHThailPRrKNgNow&pi=yw0bSPEJRxSjw",
    duration: "0:00", // Se actualizará dinámicamente
    audioFile: getAssetPath("music/track03.mp4")
  },
];

export const CURATED_VIDEOS = [
  {
    id: 1,
    title: "ILARIO ALICANTE at MUSIC ON FESTIVAL 2023 - AMSTERDAM",
    artist: "Week 1",
    youtubeId: "BjPnc6afhso",
    isBlocked: true,
  },
  {
    id: 2,
    title: "Franky Rizardo | Live at FLOW PERÚ | 2025",
    artist: "Week 2",
    youtubeId: "7wciCSVOJ-U",
    isBlocked: true,
  },
  {
    id: 3,
    title: "The Martinez Brothers | Ultra Miami 2019",
    artist: "Week 3",
    youtubeId: "g5rIV36WRVk",
    isBlocked: true,
  },
];
