import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ARTISTS } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ArtistsGrid() {
  // Configuración del carrusel: loop infinito y alineación al inicio
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 }
    }
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 max-w-[1400px] mx-auto relative group">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 md:-ml-8">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              className="flex-[0_0_85%] md:flex-[0_0_33.333%] pl-4 md:pl-8 min-w-0"
            >
              <div className="group/card relative cursor-pointer h-full">
                <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
                  <div className="absolute inset-0 bg-black/20 group-hover/card:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700 ease-out transform group-hover/card:scale-105"
                  />

                  {/* Overlay Content */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/90 to-transparent opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-300">
                    <p className="text-xs tracking-widest text-gray-400 mb-2 font-mono">{artist.role}</p>
                    <h3 className="text-3xl font-bold text-white uppercase tracking-tighter mb-2">{artist.name}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed opacity-80">{artist.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons (Visible on Desktop Hover or always on Mobile if preferred) */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:text-black z-30 hidden md:flex"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:text-black z-30 hidden md:flex"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}
