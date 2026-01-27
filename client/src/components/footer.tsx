import { COLLECTIVE } from "@/lib/data";
import { Instagram, Music, Disc } from "lucide-react"; // Music as Soundcloud fallback, Disc as RA

export function Footer() {
  return (
    <footer className="py-12 md:py-16 px-6 bg-black border-t border-white/10 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">{COLLECTIVE.name}</h2>
          <p className="text-gray-500 text-sm font-mono tracking-widest">EST. 2024 // BERLIN</p>
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
          &copy; {new Date().getFullYear()} Onyx Collective
        </div>
      </div>
    </footer>
  );
}
