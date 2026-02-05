import { COLLECTIVE } from "@/lib/data";
import { Instagram, Music, Disc } from "lucide-react"; // Music as Soundcloud fallback, Disc as RA

export function Footer() {
  return (
    <footer className="pt-12 pb-32 md:pt-16 md:pb-32 px-6 bg-black border-t border-white/10 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2
            className="text-2xl font-black uppercase tracking-widest text-white mb-2"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            {COLLECTIVE.name}
          </h2>
          <p className="text-gray-500 text-sm font-mono tracking-widest">EST. 2024 // BOGOTA</p>
        </div>

        <div className="flex gap-8">
          <a href={COLLECTIVE.socials.instagram} className="text-gray-400 hover:text-white transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href={COLLECTIVE.socials.soundcloud} className="text-gray-400 hover:text-white transition-colors">
            <Music className="w-6 h-6" />
          </a>
          <a href={COLLECTIVE.socials.ra} className="text-gray-400 hover:text-white transition-colors">
            <Disc className="w-6 h-6" />
          </a>
        </div>

        <div className="text-gray-600 text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} {COLLECTIVE.name}
        </div>
      </div>
    </footer>
  );
}
