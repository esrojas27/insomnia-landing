import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GIGS } from "@/lib/data";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { format, parseISO } from "date-fns";

export function GigsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Show only first 3 gigs initially, or all if expanded
  const visibleGigs = isExpanded ? GIGS : GIGS.slice(0, 3);

  return (
    <section className="py-24 px-4 bg-zinc-950/30">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-16 text-white uppercase tracking-tighter"
        >
          Próximos Eventos
        </motion.h2>

        <div className="flex flex-col border-t border-white/10">
          <AnimatePresence initial={false} mode="wait">
            {visibleGigs.map((gig, i) => (
              <motion.div
                key={gig.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group flex flex-col md:flex-row items-start md:items-center py-6 md:py-8 border-b border-white/10 hover:bg-white/5 transition-colors px-2 md:px-4 overflow-hidden"
              >
                {/* Date */}
                <div className="flex flex-col md:w-1/5 mb-4 md:mb-0 flex-shrink-0">
                  <span className="text-2xl md:text-3xl font-bold font-mono text-white group-hover:text-stroke transition-all">
                    {format(parseISO(gig.date), "dd.MM")}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                    {format(parseISO(gig.date), "yyyy")}
                  </span>
                </div>

                {/* Venue Info */}
                <div className="flex flex-col md:w-1/4 mb-4 md:mb-0 flex-shrink-0">
                  <span className="text-xl md:text-2xl font-bold uppercase text-white tracking-wide">
                    {gig.venue}
                  </span>
                  <span className="text-sm text-gray-400 uppercase tracking-wider">
                    {gig.city}, {gig.country}
                  </span>
                </div>

                {/* Event Image (New) */}
                <div className="w-full md:w-1/3 mb-4 md:mb-0 md:px-6">
                  {/* Eliminamos 'grayscale' y 'opacity-60' para que siempre se vea a color y nítida */}
                  <div className="relative h-32 md:h-24 w-full overflow-hidden bg-zinc-900 transition-all duration-500">
                    <img
                      src={gig.image}
                      alt={gig.venue}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Overlay opcional, lo quitamos o lo hacemos muy sutil si quieres brillo máximo */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-transparent transition-colors" />
                  </div>
                </div>

                {/* Ticket Button */}
                <div className="md:ml-auto w-full md:w-auto mt-2 md:mt-0 flex-shrink-0">
                  {gig.soldOut ? (
                    <span className="block w-full md:w-auto text-center px-6 py-3 border border-white/10 text-gray-500 text-sm uppercase font-bold cursor-not-allowed">
                      Sold Out
                    </span>
                  ) : (
                    <a
                      href={gig.ticketLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center w-full md:w-auto px-8 py-3 bg-white text-black font-bold uppercase tracking-wide hover:bg-transparent hover:text-white border border-transparent hover:border-white transition-all duration-300 group-hover:scale-105"
                    >
                      Tickets <ArrowUpRight className="ml-2 w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Expand/Collapse Button */}
        {GIGS.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white uppercase tracking-widest transition-colors py-4 px-6 hover:bg-white/5 border border-transparent hover:border-white/10"
            >
              {isExpanded ? (
                <>
                  Ver Menos <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Ver Todos los Eventos <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
