import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Ejemplo de track
  const trackUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      if (total) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = Math.min(Math.max(0, x / width), 1);

      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  // Generate fake waveform bars
  const waveformBars = Array.from({ length: 40 }, (_, i) => {
    // Random height between 30% and 100%
    return Math.max(30, Math.random() * 100);
  });

  return (
    <div className="fixed bottom-6 left-0 w-full z-50 px-4 pointer-events-none flex justify-center">
      <audio
        ref={audioRef}
        src={trackUrl}
        loop
        onTimeUpdate={handleTimeUpdate}
      />

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        className="pointer-events-auto w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/10 p-3 pr-6 flex items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full ring-1 ring-white/5 relative overflow-visible"
      >
        {/* Rotating Disc / Album Art */}
        <div className="relative w-14 h-14 flex-shrink-0 z-10">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }}
            className="w-full h-full rounded-full overflow-hidden border-2 border-zinc-800 shadow-inner bg-black flex items-center justify-center"
          >
             <img
              src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&h=100&fit=crop&q=80"
              alt="Vinyl"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute w-4 h-4 bg-black rounded-full border border-zinc-700" />
          </motion.div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/20 rounded-full blur-[1px]" />
        </div>

        {/* Track Info & Interactive Waveform */}
        <div
          className="flex-grow min-w-0 flex flex-col justify-center relative z-10 group h-14"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Top Label */}
          <div className="flex items-center gap-2 mb-0.5 absolute top-0 w-full transition-opacity duration-300" style={{ opacity: isHovering ? 0 : 1 }}>
            <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-mono">
              INSOMNIA SELECTION
            </p>
          </div>

          {/* Title (Fades out on hover to show waveform better, or moves up) */}
          <div className={`overflow-hidden relative w-full transition-all duration-300 ${isHovering ? '-translate-y-2 opacity-50 scale-90 origin-left' : 'translate-y-2'}`}>
             <motion.h4
               className="text-white font-bold text-sm whitespace-nowrap"
               animate={{ x: isPlaying && !isHovering ? ["0%", "-100%"] : "0%" }}
               transition={{
                 repeat: Infinity,
                 repeatType: "loop",
                 duration: 10,
                 ease: "linear",
                 repeatDelay: 1
               }}
             >
               LATE NIGHT TRANSMISSION 004 — TECHNO BUNKER
             </motion.h4>
          </div>

          {/* Waveform / Progress Area */}
          <div
            ref={progressBarRef}
            className={`absolute bottom-0 left-0 w-full cursor-pointer transition-all duration-300 flex items-end gap-[2px] ${isHovering ? 'h-8 opacity-100' : 'h-1 opacity-60'}`}
            onClick={handleSeek}
          >
            {/* Background Track Line (Visible when not hovering) */}
            <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-white/10 rounded-full transition-opacity ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
               <div className="h-full bg-white/50 rounded-full" style={{ width: `${progress}%` }} />
            </div>

            {/* Waveform Bars (Visible on Hover) */}
            {waveformBars.map((height, i) => {
              const barProgress = (i / waveformBars.length) * 100;
              const isPlayed = barProgress <= progress;

              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm transition-all duration-200 ${isHovering ? '' : 'h-0'}`}
                  style={{
                    height: isHovering ? `${height}%` : '0%',
                    backgroundColor: isPlayed ? '#fff' : 'rgba(255,255,255,0.2)'
                  }}
                />
              );
            })}

            {/* Scrubber Knob (The "Bolita") */}
            <div
              className={`absolute bottom-1/2 translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 pl-2 border-l border-white/10 z-10">
          <button 
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform active:scale-95"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
