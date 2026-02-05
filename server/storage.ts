import { subscribers, type InsertSubscriber, type Subscriber } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const [subscriber] = await db
      .insert(subscribers)
      .values(insertSubscriber)
      .returning();
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const [subscriber] = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email));
    return subscriber;
  }
}

export class MemStorage implements IStorage {
  private subscribers: Map<number, Subscriber>;
  private currentId: number;

  constructor() {
    this.subscribers = new Map();
    this.currentId = 1;
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentId++;
    const subscriber: Subscriber = {
      ...insertSubscriber,
      id,
      createdAt: new Date(),
      active: true,
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
