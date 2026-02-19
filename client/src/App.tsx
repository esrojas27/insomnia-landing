import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import MusicPage from "@/pages/music";
import MerchPage from "@/pages/merch";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Ruta raíz estándar para dominio personalizado */}
      <Route path="/" component={Home} />
      <Route path="/music" component={MusicPage} />
      <Route path="/merch" component={MerchPage} />
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
