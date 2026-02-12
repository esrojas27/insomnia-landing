import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema } from "@shared/schema";
import { type InsertSubscriber } from "@shared/schema";
import { Loader2, ArrowRight, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function Newsletter() {
  const [isPending, setIsPending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<InsertSubscriber>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: InsertSubscriber) => {
    setIsPending(true);
    try {
      // Direct call to Make.com webhook since we are on a static host (GitHub Pages)
      // and cannot run a backend server.
      await fetch("https://hook.us2.make.com/ydw46r5ihm96uuwxrggnkup9itrbl0ya", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          createdAt: new Date().toISOString(),
        }),
      });

      // We assume success if the fetch doesn't throw (Make usually returns 200 OK)
      setShowSuccessModal(true);
      form.reset();
    } catch (error) {
      console.error("Failed to subscribe:", error);
      // Optional: Show error toast here
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="py-32 px-4 border-t border-white/10 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-zinc-900/20 to-black pointer-events-none" />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4 text-white">
          ÚNETE A INSOMNIA
        </h3>
        <p className="text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
          Acceso exclusivo a ubicaciones secretas, preventa de entradas y unreleased tracks.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              {...form.register("email")}
              placeholder="CORREO ELECTRÓNICO"
              type="email"
              disabled={isPending}
              className="w-full bg-transparent border-b border-white/30 py-4 px-2 text-white placeholder:text-gray-600 focus:outline-none focus:border-white transition-all font-mono rounded-none"
            />
            {form.formState.errors.email && (
              <p className="absolute -bottom-6 left-0 text-xs text-red-500 font-mono">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
            className="mt-4 md:mt-0 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Suscribirse <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-black border border-white/20 text-white sm:max-w-md">
          <DialogHeader className="items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
              <Check className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold uppercase tracking-tighter font-display">
              Bienvenido a Insomnia
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-base font-mono">
              Te has suscrito satisfactoriamente. Pronto recibirás más información sobre nuestros eventos exclusivos y lanzamientos.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
