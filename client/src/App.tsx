import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Hook para manejar la base path en GitHub Pages
const useHashLocation = () => {
  const [loc, setLoc] = useLocation();

  // Si estamos en producción (GitHub Pages), ajustamos la ruta
  // Esto es un fix simple: si la ruta empieza con /insomnia-landing, lo quitamos para que wouter funcione
  const base = "/insomnia-landing";

  if (loc.startsWith(base)) {
    const newLoc = loc.replace(base, "") || "/";
    // Solo si es diferente para evitar loops infinitos
    if (newLoc !== loc) {
       // Esto es un hack visual, wouter necesita la ruta limpia
       // Pero para una SPA estática en GH Pages, lo ideal es usar HashRouter o configurar base
       return [newLoc, setLoc];
    }
  }

  return [loc, setLoc];
};

function Router() {
  // En GitHub Pages es mejor usar rutas relativas o un base path explícito.
  // Como wouter es minimalista, la forma más robusta en GH Pages es usar un componente base
  // O simplemente definir la ruta completa.

  return (
    <Switch>
      {/* Opción A: Definir la ruta con el prefijo del repo */}
      <Route path="/insomnia-landing/" component={Home} />
      <Route path="/insomnia-landing" component={Home} />

      {/* Opción B: Ruta raíz para desarrollo local */}
      <Route path="/" component={Home} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
