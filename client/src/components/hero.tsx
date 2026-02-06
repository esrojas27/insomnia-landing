import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { COLLECTIVE } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Abstract dark crowd/club texture */}
        <img 
          src="https://images.unsplash.com/photo-1574169208507-84376144848b?w=1920&h=1080&fit=crop&q=80" 
          alt="Atmosphere" 
          className="w-full h-full object-cover opacity-50 grayscale"
        />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center max-w-7xl mx-auto w-full">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs md:text-base tracking-[0.3em] md:tracking-[0.5em] mb-4 text-gray-400 uppercase font-sans"
        >
          {COLLECTIVE.tagline}
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-wider md:tracking-widest text-white mix-blend-difference w-full break-words"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          {COLLECTIVE.name}
        </motion.h1>

        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: 100 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-px bg-white/30 my-8 hidden md:block"
        />

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-gray-400 max-w-md text-[10px] md:text-sm leading-relaxed font-light px-4 font-sans uppercase tracking-[0.2em]"
        >
          {COLLECTIVE.description}
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <ArrowDown className="w-6 h-6 text-white animate-bounce opacity-50" />
      </motion.div>
    </section>
  );
}
