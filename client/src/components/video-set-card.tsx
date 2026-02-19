import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface VideoSetCardProps {
  id: number;
  title: string;
  artist: string;
  youtubeId: string;
}

export function VideoSetCard({ id, title, artist, youtubeId }: VideoSetCardProps) {
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: id * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all duration-300"
    >
      {/* Reproductor Embebido */}
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Metadatos y Botón */}
      <div className="p-4 flex justify-between items-center">
        <div>
          <h3 className="text-white font-bold text-lg truncate tracking-tight">{title}</h3>
          <p className="text-zinc-400 text-sm truncate font-medium">{artist}</p>
        </div>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 hover:bg-[#FF0000] hover:text-white text-white/60 flex items-center justify-center transition-all duration-300"
          title="Watch on YouTube"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
