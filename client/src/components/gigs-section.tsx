import { motion } from "framer-motion";
import { GIGS } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale"; // Import Spanish locale

export function GigsSection() {
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
          {GIGS.map((gig, i) => (
            <motion.div
              key={gig.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col md:flex-row items-start md:items-center py-6 md:py-8 border-b border-white/10 hover:bg-white/5 transition-colors px-2 md:px-4"
            >
              <div className="flex flex-col md:w-1/4 mb-2 md:mb-0">
                <span className="text-2xl md:text-3xl font-bold font-mono text-white group-hover:text-stroke transition-all">
                  {format(parseISO(gig.date), "dd.MM")}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                  {format(parseISO(gig.date), "yyyy")}
                </span>
              </div>

              <div className="flex flex-col md:w-1/3 mb-4 md:mb-0">
                <span className="text-xl md:text-2xl font-bold uppercase text-white tracking-wide">
                  {gig.venue}
                </span>
                <span className="text-sm text-gray-400 uppercase tracking-wider">
                  {gig.city}, {gig.country}
                </span>
              </div>

              <div className="md:ml-auto w-full md:w-auto mt-4 md:mt-0">
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
        </div>
      </div>
    </section>
  );
}
