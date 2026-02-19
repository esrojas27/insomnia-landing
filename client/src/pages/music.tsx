import { useState, useRef, useEffect } from "react";
import { GrainOverlay } from "@/components/grain-overlay";
import { FloatingMenu } from "@/components/floating-menu";
import { Footer } from "@/components/footer";
import { CURATED_TRACKS, CURATED_VIDEOS } from "@/lib/data";
import { Play, Pause, ExternalLink, Disc, MonitorPlay, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Tipos ---
type Track = typeof CURATED_TRACKS[0];
type Video = typeof CURATED_VIDEOS[0];

// --- Helper para formatear tiempo ---
const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export default function MusicPage() {
  // Estado Global de la Página
  const [activeTrack, setActiveTrack] = useState<Track>(CURATED_TRACKS[0]);
  const [activeVideo, setActiveVideo] = useState<Video>(CURATED_VIDEOS[0]);

  // Estado del Reproductor de Audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const isSeeking = useRef(false);

  // Referencia para controlar la carga inicial y evitar autoplay al entrar
  const isFirstLoad = useRef(true);

  // --- Lógica de Audio ---
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track: Track) => {
    if (activeTrack.id !== track.id) {
      setActiveTrack(track);
      // Al cambiar de track manualmente, el useEffect se encargará de reproducirlo.
      setProgress(0);
      setCurrentTime("0:00");
    } else {
      // Si es el mismo track, alternamos pausa/play
      togglePlay();
    }
  };

  // Efecto para manejar el cambio de track
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = activeTrack.audioFile;
      audioRef.current.load();

      // Si es la primera vez que se carga la página, NO reproducimos
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
        return;
      }

      // Si no es la primera vez (el usuario cambió de track), reproducimos
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.log("Autoplay prevented by browser policy:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [activeTrack]);

  // Efecto para actualizar la barra de progreso y tiempos
  const onTimeUpdate = () => {
    if (audioRef.current && !isSeeking.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      setCurrentTime(formatTime(audioRef.current.currentTime));
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  // --- Lógica de Arrastre (Seek) ---
  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.min(Math.max(0, x / width), 1);

    const newTime = percentage * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(percentage * 100);
    setCurrentTime(formatTime(newTime));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isSeeking.current = true;
    handleSeek(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isSeeking.current) {
      handleSeek(e as any);
    }
  };

  const handleMouseUp = () => {
    isSeeking.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);


  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black font-sans flex flex-col">
      <GrainOverlay />
      <FloatingMenu />

      {/* Elemento Audio Global */}
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <main className="relative z-10 p-4 md:p-8 lg:p-12 pt-24 md:pt-32 flex-grow">
        <div className="max-w-7xl mx-auto h-full">

          <header className="mb-16 text-center">
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white mb-4 font-display">
              Curaduría Musical
            </h1>
            <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">
              Sonidos Selectos y Experiencias Visuales
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* --- SECCIÓN DE AUDIO (IZQUIERDA) --- */}
            <section className="flex flex-col gap-8">
              <div className="flex items-center gap-3 mb-4">
                <Disc className="w-5 h-5 text-white animate-spin-slow" />
                <h2 className="text-xl font-bold uppercase tracking-widest text-white/80 font-display">
                  Tracks
                </h2>
              </div>

              {/* Reproductor Principal (Hero) */}
              <div className="relative group">
                {/* Carátula con Máscara Orgánica */}
                <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl transition-all duration-700">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeTrack.id}
                      src={activeTrack.image}
                      alt={activeTrack.title}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: isPlaying ? 1.05 : 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Overlay de Estado */}
                  <div className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={togglePlay}
                        className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 group/btn"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 fill-current" />
                        ) : (
                          <Play className="w-8 h-8 fill-current ml-1" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Visualizador de Audio (Simulado) */}
                  {isPlaying && (
                    <div className="absolute bottom-8 left-0 w-full px-8 flex justify-center gap-1 h-8 items-end opacity-80">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-white rounded-full"
                          animate={{ height: ["10%", "100%", "10%"] }}
                          transition={{
                            duration: 0.5 + Math.random() * 0.5,
                            repeat: Infinity,
                            delay: i * 0.05,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Info del Track Activo */}
                <div className="mt-8 text-center space-y-2">
                  <motion.h3
                    key={activeTrack.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight font-display"
                  >
                    {activeTrack.title}
                  </motion.h3>
                  <motion.p
                    key={activeTrack.artist}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400 text-lg font-medium tracking-wide"
                  >
                    {activeTrack.artist}
                  </motion.p>

                  {/* Barra de Progreso */}
                  <div
                    ref={progressBarRef}
                    onMouseDown={handleMouseDown}
                    className="w-full max-w-md mx-auto mt-6 flex items-center gap-4 cursor-pointer"
                  >
                    <span className="text-xs font-mono text-zinc-500 w-10 text-left">{currentTime}</span>
                    <div className="flex-grow h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-white w-10 text-right">{duration}</span>
                  </div>

                  {/* Botón Spotify */}
                  <div className="mt-6 flex justify-center">
                    <a
                      href={activeTrack.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 text-xs font-mono uppercase tracking-widest group"
                    >
                      <span>Playlist on Spotify</span>
                      <ExternalLink className="w-3 h-3 group-hover:rotate-45 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Lista de Tracks (Playlist) */}
              <div className="mt-8 space-y-2 max-w-md mx-auto w-full">
                {CURATED_TRACKS.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => handleTrackSelect(track)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                      activeTrack.id === track.id
                        ? "bg-white text-black"
                        : "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="font-mono text-xs opacity-50">
                        {String(track.id).padStart(2, '0')}
                      </div>
                      <div className="text-left">
                        <p className={`font-bold uppercase tracking-tight ${activeTrack.id === track.id ? "text-black" : "text-white"}`}>
                          {track.title}
                        </p>
                        <p className="text-xs opacity-70">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs opacity-50">
                        {activeTrack.id === track.id ? currentTime : track.duration}
                      </span>
                      {activeTrack.id === track.id && isPlaying && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>


            {/* --- SECCIÓN DE VIDEO (DERECHA) --- */}
            <section className="flex flex-col gap-8">
              <div className="flex items-center gap-3 mb-4">
                <MonitorPlay className="w-5 h-5 text-white" />
                <h2 className="text-xl font-bold uppercase tracking-widest text-white/80 font-display">
                  Video Sets
                </h2>
              </div>

              {/* Reproductor de Video Principal */}
              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                {activeVideo.isBlocked ? (
                  /* Vista Alternativa para Videos Bloqueados */
                  <div className="w-full h-full relative">
                    <img
                      src={`https://img.youtube.com/vi/${activeVideo.youtubeId}/maxresdefault.jpg`}
                      alt={activeVideo.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <a
                        href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg group/play"
                      >
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </a>
                    </div>
                    <div className="absolute bottom-4 left-0 w-full text-center">
                      <p className="text-white/80 text-sm font-mono uppercase tracking-widest">
                        Watch on YouTube
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Reproductor Normal */
                  <iframe
                    key={activeVideo.id}
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0&showinfo=0&modestbranding=1`}
                    title={activeVideo.title}
                    className="w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}

                {/* Marco Decorativo */}
                <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none z-10" />
              </div>

              {/* Info del Video Activo */}
              <div className="flex justify-between items-start border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display">
                    {activeVideo.title}
                  </h3>
                  <p className="text-zinc-400 font-medium mt-1">
                    {activeVideo.artist}
                  </p>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Lista de Videos */}
              <div className="grid grid-cols-1 gap-4">
                {CURATED_VIDEOS.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`flex gap-4 p-3 rounded-xl transition-all duration-300 text-left group ${
                      activeVideo.id === video.id
                        ? "bg-white/10 border border-white/20"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {/* Thumbnail Preview */}
                    <div className="relative w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      {activeVideo.id === video.id && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center">
                      <h4 className={`font-bold uppercase text-sm tracking-tight ${activeVideo.id === video.id ? "text-white" : "text-zinc-400 group-hover:text-white"}`}>
                        {video.title}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1">{video.artist}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
