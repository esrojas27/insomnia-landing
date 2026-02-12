import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.subscribers.create.path, async (req, res) => {
    try {
      const input = api.subscribers.create.input.parse(req.body);
      
      const existing = await storage.getSubscriberByEmail(input.email);
      if (existing) {
        return res.status(409).json({ message: "Email already subscribed" });
      }

      const subscriber = await storage.createSubscriber(input);

      // Send to Make.com Webhook
      const webhookUrl = "https://hook.us2.make.com/ydw46r5ihm96uuwxrggnkup9itrbl0ya";

      // Fire and forget - we don't await this to keep the response fast
      fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: subscriber.email,
          createdAt: subscriber.createdAt,
        }),
      }).catch(err => console.error("Failed to send to Make webhook:", err));

      res.status(201).json(subscriber);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email address" });
      }
      throw err;
    }
  });

  return httpServer;
}
