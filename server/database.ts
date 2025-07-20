import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { users, projects, contacts, type User, type InsertUser, type Project, type InsertProject, type Contact, type InsertContact } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  private db;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    
    const sql = neon(databaseUrl);
    this.db = drizzle(sql);
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getProjects(): Promise<Project[]> {
    return await this.db.select().from(projects);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return await this.db.select().from(projects).where(eq(projects.category, category));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const result = await this.db.insert(projects).values(insertProject).returning();
    return result[0];
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await this.db.insert(contacts).values(insertContact).returning();
    return result[0];
  }

  async getContacts(): Promise<Contact[]> {
    return await this.db.select().from(contacts);
  }
}

// Create storage instance based on environment
import { MemStorage } from "./storage";
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage()
  : new MemStorage();