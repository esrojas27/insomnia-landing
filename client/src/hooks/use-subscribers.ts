import { useMutation } from "@tanstack/react-query";
import { api, type InsertSubscriber } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

export function useCreateSubscriber() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertSubscriber) => {
      // Validate client-side before sending
      const validated = api.subscribers.create.input.parse(data);
      
      const res = await fetch(api.subscribers.create.path, {
        method: api.subscribers.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        // Handle specific error codes if needed, or generic
        if (res.status === 409) {
          throw new Error("You are already subscribed.");
        }
        if (res.status === 400) {
           const errorData = await res.json();
           throw new Error(errorData.message || "Invalid email address.");
        }
        throw new Error("Failed to subscribe. Please try again.");
      }

      // Parse success response
      return api.subscribers.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "WELCOME TO THE VOID",
        description: "You have been added to the list.",
        className: "bg-black border border-white text-white rounded-none",
      });
    },
    onError: (error) => {
      toast({
        title: "ERROR",
        description: error.message,
        variant: "destructive",
        className: "rounded-none",
      });
    },
  });
}
