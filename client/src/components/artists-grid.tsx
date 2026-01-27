import { motion } from "framer-motion";
import { ARTISTS } from "@/lib/data";

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export function ArtistsGrid() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        transition={{ staggerChildren: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8"
      >
        {ARTISTS.map((artist) => (
          <motion.div 
            key={artist.id} 
            variants={itemVariants}
            className="group relative cursor-pointer"
          >
            <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={artist.image} 
                alt={artist.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/90 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs tracking-widest text-gray-400 mb-2 font-mono">{artist.role}</p>
                <h3 className="text-3xl font-bold text-white uppercase tracking-tighter mb-2">{artist.name}</h3>
                <p className="text-sm text-gray-300 leading-relaxed opacity-80">{artist.bio}</p>
              </div>
            </div>
            
            {/* Mobile/Default Name below image if desired, currently purely overlay for minimalist look */}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
