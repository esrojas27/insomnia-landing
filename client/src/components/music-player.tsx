import { useState } from "react";
import { Play, Pause, SkipForward, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Minimal placeholder player - in a real app, this would connect to Spotify/SoundCloud SDK
  
  return (
    <div className="fixed bottom-0 left-0 w-full z-40 px-4 pb-4 md:pb-6 pointer-events-none flex justify-center">
      <div className="pointer-events-auto w-full max-w-md bg-black/80 backdrop-blur-xl border border-white/10 p-4 flex items-center gap-4 shadow-2xl shadow-black">
        {/* Album Art Placeholder */}
        <div className="w-12 h-12 bg-zinc-800 flex-shrink-0 relative overflow-hidden group cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className={`absolute inset-0 bg-white/10 ${isPlaying ? 'animate-pulse' : ''}`} />
          <img 
            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&h=100&fit=crop&q=80" 
            alt="Track Cover" 
            className="w-full h-full object-cover opacity-60" 
          />
        </div>

        {/* Track Info */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">Now Playing</p>
          </div>
          <h4 className="text-white font-bold truncate text-sm mt-0.5">LATE NIGHT TRANSMISSION 004</h4>
          <p className="text-gray-500 text-xs truncate">ONYX RADIO</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
