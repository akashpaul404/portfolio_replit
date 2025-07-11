import { users, projects, contacts, type User, type InsertUser, type Project, type InsertProject, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentContactId = 1;
    
    this.seedData();
  }

  private seedData() {
    const sampleProjects: InsertProject[] = [
      {
        title: "Meetup Grouping Algorithm",
        description: "Dynamic user grouping system with priority relaxation, scoring algorithms, and automated cron execution for optimal meetup organization.",
        stack: ["Go", "PostgreSQL", "Gin"],
        category: "backend",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
        featured: true
      },
      {
        title: "Tour Module",
        description: "Interactive tour listings with live/upcoming/completed views, role-based access control, and seamless GraphQL integration.",
        stack: ["Svelte", "GraphQL", "Hasura"],
        category: "frontend",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop",
        featured: true
      },
      {
        title: "Brew Class System",
        description: "Complete learning management system with user authentication, course progression tracking, and real-time analytics dashboard.",
        stack: ["Go", "Svelte", "PostgreSQL"],
        category: "fullstack",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
        featured: true
      },
      {
        title: "Database Migration Tool",
        description: "Automated database schema migration and seeding system with rollback capabilities and version control.",
        stack: ["Go", "PostgreSQL", "CLI"],
        category: "backend",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop",
        featured: false
      },
      {
        title: "API Documentation Portal",
        description: "Interactive API documentation with live testing capabilities, authentication, and comprehensive examples.",
        stack: ["React", "Node.js", "Swagger"],
        category: "fullstack",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
        featured: false
      }
    ];

    sampleProjects.forEach(project => {
      this.createProject(project);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.category === category
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
