import { useState } from "react";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema } from "@shared/schema";
import { type InsertSubscriber } from "@shared/schema";
import { Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Newsletter() {
  const { mutate, isPending } = useCreateSubscriber();
  const [success, setSuccess] = useState(false);

  const form = useForm<InsertSubscriber>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: InsertSubscriber) => {
    mutate(data, {
      onSuccess: () => {
        setSuccess(true);
        form.reset();
      },
    });
  };

  return (
    <section className="py-32 px-4 border-t border-white/10 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-zinc-900/20 to-black pointer-events-none" />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4 text-white">
          Join The Void
        </h3>
        <p className="text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
          Exclusive access to secret locations, pre-sale tickets, and unreleased tracks.
        </p>

        {success ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 border border-white/20 bg-white/5"
          >
            <p className="text-xl font-mono text-white">WELCOME TO THE INNER CIRCLE</p>
          </motion.div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                {...form.register("email")}
                placeholder="EMAIL ADDRESS"
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
              type="button" // Change to button to prevent default submit if needed, but onClick works too
              onClick={form.handleSubmit(onSubmit)}
              disabled={isPending}
              className="mt-4 md:mt-0 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Subscribe <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
