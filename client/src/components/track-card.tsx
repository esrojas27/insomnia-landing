import { useState, useRef, useEffect } from "react";
import { Play, Pause, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface TrackCardProps {
  id: number;
  title: string;
  artist: string;
  image: string;
  spotifyUrl: string;
  duration: string; // Formato "MM:SS"
}

export function TrackCard({ id, title, artist, image, spotifyUrl, duration }: TrackCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulación de reproducción (ya que no tenemos archivos de audio reales para cada track en este ejemplo)
  // En un caso real, aquí iría la lógica con el elemento <audio>

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      // Simular progreso
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000); // Simulación rápida
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Calcular tiempo actual basado en progreso simulado
  useEffect(() => {
    const [min, sec] = duration.split(":").map(Number);
    const totalSeconds = min * 60 + sec;
    const currentSeconds = Math.floor((progress / 100) * totalSeconds);
    const currentMin = Math.floor(currentSeconds / 60);
    const currentSec = currentSeconds % 60;
    setCurrentTime(`${currentMin}:${currentSec.toString().padStart(2, "0")}`);
  }, [progress, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: id * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all duration-300"
    >
      <div className="flex items-center p-4 gap-4">
        {/* Arte del Track con Máscara */}
        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={`${artist} - ${title}`}
            className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? "scale-110" : "scale-100"}`}
          />

          {/* Overlay de estado Stopped */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300">
              <Play className="w-8 h-8 text-white/80 fill-white/80" />
            </div>
          )}

          {/* Overlay de estado Playing */}
          {isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="flex gap-1 items-end h-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-green-500"
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={togglePlay}
            className="absolute inset-0 w-full h-full cursor-pointer z-10 opacity-0"
            aria-label={isPlaying ? "Pause" : "Play"}
          />
        </div>

        {/* Metadatos y Controles */}
        <div className="flex-grow min-w-0 flex flex-col justify-between h-20 py-1">
          <div>
            <h3 className="text-white font-bold text-lg truncate tracking-tight">{title}</h3>
            <p className="text-zinc-400 text-sm truncate font-medium">{artist}</p>
          </div>

          <div className="flex items-center justify-between mt-2">
            {/* Barra de Progreso Minimalista */}
            <div className="flex-grow mr-4 relative h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white"
                style={{ width: `${progress}%` }}
                layoutId={`progress-${id}`}
              />
            </div>

            {/* Tiempo */}
            <div className="font-mono text-xs text-zinc-500 w-20 text-right">
              <span className={isPlaying ? "text-white" : ""}>{currentTime}</span> / {duration}
            </div>
          </div>
        </div>

        {/* Botón Spotify */}
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 hover:bg-[#1DB954] hover:text-black text-white/60 flex items-center justify-center transition-all duration-300 group/spotify"
          title="Open in Spotify"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
