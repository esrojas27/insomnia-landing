import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    // Prevent default to stop scrolling while seeking on mobile
    // e.preventDefault();

    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      let clientX;

      if ('touches' in e) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = (e as React.MouseEvent).clientX;
      }

      const x = clientX - rect.left;
      const width = rect.width;
      const percentage = Math.min(Math.max(0, x / width), 1);

      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);

      // Reset auto-hide timer on interaction
      activateHover();
    }
  };

  // Logic to handle auto-hide on mobile/touch
  const activateHover = () => {
    setIsHovering(true);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Auto-hide after 2.5 seconds of inactivity
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 2500);
  };

  const handleMouseEnter = () => {
    // On desktop, we just keep it open while hovering
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    // On desktop, close immediately when leaving
    setIsHovering(false);
  };

  const handleTouchStart = () => {
    activateHover();
  };

  // Generate fake waveform bars
  const waveformBars = Array.from({ length: 40 }, (_, i) => {
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
        transition={{ delay: 1, type: "spring", stiffness: 100, damping: 20 }}
        className="pointer-events-auto w-full max-w-md p-3 pr-6 flex items-center gap-4 rounded-full relative overflow-visible transition-all duration-300"
        style={{
          backgroundColor: "rgba(20, 20, 20, 0.6)",
          backdropFilter: "blur(25px) saturate(180%)",
          WebkitBackdropFilter: "blur(25px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: `
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `
        }}
        // Desktop Hover Events
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // Mobile Touch Events
        onTouchStart={handleTouchStart}
      >
        {/* Rotating Disc / Album Art */}
        <div className="relative w-14 h-14 flex-shrink-0 z-10">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }}
            className="w-full h-full rounded-full overflow-hidden shadow-lg bg-black flex items-center justify-center"
            style={{
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
             <img
              src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&h=100&fit=crop&q=80"
              alt="Vinyl"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute w-3 h-3 bg-black rounded-full border border-zinc-800" />
          </motion.div>
        </div>

        {/* Track Info & Interactive Waveform */}
        <div
          className="flex-grow min-w-0 flex flex-col justify-center relative z-10 group h-14"
        >
          {/* Top Label */}
          <div className="flex items-center gap-2 mb-0.5 absolute top-1 w-full transition-opacity duration-300" style={{ opacity: isHovering ? 0 : 1 }}>
            <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
            <p className="text-[10px] text-white/60 uppercase tracking-[0.2em] font-mono font-medium">
              INSOMNIA SELECTION
            </p>
          </div>

          {/* Title */}
          <div className={`overflow-hidden relative w-full transition-all duration-300 ${isHovering ? '-translate-y-2 opacity-50 scale-95 origin-left' : 'translate-y-2'}`}>
             <motion.h4
               className="text-white font-bold text-sm whitespace-nowrap drop-shadow-sm"
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
            onTouchStart={(e) => {
                // Allow seeking on touch
                handleSeek(e);
            }}
            onTouchMove={(e) => {
                // Allow dragging on touch
                handleSeek(e);
            }}
          >
            {/* Background Track Line */}
            <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-white/10 rounded-full transition-opacity ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
               <div className="h-full bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ width: `${progress}%` }} />
            </div>

            {/* Waveform Bars */}
            {waveformBars.map((height, i) => {
              const barProgress = (i / waveformBars.length) * 100;
              const isPlayed = barProgress <= progress;

              return (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-200 ${isHovering ? '' : 'h-0'}`}
                  style={{
                    height: isHovering ? `${height}%` : '0%',
                    backgroundColor: isPlayed ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.2)',
                    boxShadow: isPlayed ? '0 0 4px rgba(255, 255, 255, 0.4)' : 'none'
                  }}
                />
              );
            })}

            {/* Scrubber Knob (iOS style) */}
            <div
              className={`absolute bottom-1/2 translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.3)] pointer-events-none transition-all duration-200 ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
              style={{ left: `calc(${progress}% - 8px)` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10 z-10">
          <button 
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
