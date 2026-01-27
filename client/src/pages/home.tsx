import { Hero } from "@/components/hero";
import { GigsSection } from "@/components/gigs-section";
import { ArtistsGrid } from "@/components/artists-grid";
import { Newsletter } from "@/components/newsletter";
import { MusicPlayer } from "@/components/music-player";
import { GrainOverlay } from "@/components/grain-overlay";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <GrainOverlay />
      
      <main className="relative z-10">
        <Hero />
        <ArtistsGrid />
        <GigsSection />
        <Newsletter />
        <Footer />
      </main>

      <MusicPlayer />
    </div>
  );
}
