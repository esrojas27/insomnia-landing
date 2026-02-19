import { GrainOverlay } from "@/components/grain-overlay";
import { FloatingMenu } from "@/components/floating-menu";
import { Newsletter } from "@/components/newsletter";
// Importamos Footer pero lo usaremos condicionalmente o lo quitamos si prefieres limpieza total
// import { Footer } from "@/components/footer";

export default function MerchPage() {
  return (
    <div className="h-screen w-full bg-background text-foreground selection:bg-white selection:text-black flex flex-col overflow-hidden relative">
      <GrainOverlay />
      <FloatingMenu />

      {/*
        Contenedor principal centrado absolutamente.
        Usamos h-full para ocupar toda la pantalla y flex para centrar.
        El padding horizontal (px-4) asegura que no toque los bordes en móviles.
      */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 relative z-10">

        <div className="w-full max-w-4xl text-center">
          {/* Título "PRÓXIMAMENTE" */}
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white mb-8 font-display">
            Próximamente
          </h1>

          {/* Componente de Suscripción reutilizado */}
          <Newsletter
            title="ÚNETE A LA LISTA DE ESPERA"
            description="Acceso exclusivo a la primera colección del colectivo."
            className="py-0 bg-transparent border-none"
            hideBackground={true}
          />
        </div>

      </main>

      {/*
        Footer eliminado para esta vista específica de "Coming Soon"
        para mantener el foco total en el mensaje y el registro.
      */}
    </div>
  );
}
