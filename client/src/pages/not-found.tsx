import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";
import { GrainOverlay } from "@/components/grain-overlay";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <GrainOverlay />
      
      <div className="z-10 flex flex-col items-center p-4 text-center">
        <AlertTriangle className="h-16 w-16 text-white mb-8 opacity-80" />
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 glitch-effect">404</h1>
        <p className="text-xl md:text-2xl text-gray-400 font-mono mb-12 tracking-widest uppercase">
          Signal Lost
        </p>

        <Link href="/" className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-sm">
          Return to Base
        </Link>
      </div>
    </div>
  );
}
