import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./database";
import { insertContactSchema, insertProjectSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Get projects by category
  app.get("/api/projects/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const projects = await storage.getProjectsByCategory(category);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects by category" });
    }
  });

  // Create contact
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid contact data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create contact" });
      }
    }
  });

  // Create project (admin endpoint)
  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid project data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create project" });
      }
    }
  });

  // Get about data
  app.get("/api/about", (req, res) => {
    const aboutData = {
      name: "Akash Paul",
      location: "Bangalore",
      contact: {
        email: "akash.paul8080@gmail.com",
        phone: "+91 8327320609"
      },
      bio: "I'm Akash Paul, a passionate Full Stack Developer based in Bangalore. Started my journey as a MERN developer in November 2024, but quickly discovered my love for backend development with Go and system architecture.",
      timeline: [
        { date: "2024-11", event: "Started as MERN Stack Developer", description: "Diving into full-stack development" },
        { date: "2025-01", event: "Transitioned to Go Backend Development", description: "Discovered passion for systems programming" },
        { date: "2025-03", event: "Built Tour Module & Meetup Grouping System", description: "Advanced backend architecture" },
        { date: "2025-07", event: "Time Slot Fix & Migration Automation", description: "Database optimization and automation" }
      ],
      skills: ["Go", "PostgreSQL", "Svelte", "Docker", "Hasura", "GraphQL", "React", "Node.js", "Gin", "REST APIs"]
    };
    res.json(aboutData);
  });

  // Get resume data
  app.get("/api/resume", (req, res) => {
    const resumeData = {
      name: "Akash Paul",
      title: "Full Stack Developer",
      contact: {
        email: "akash.paul8080@gmail.com",
        phone: "+91 8327320609",
        location: "Bangalore, India"
      },
      achievements: [
        "Reduced query response time by 40% via efficient Go services",
        "Delivered full meetup registration + grouping automation backend",
        "Implemented robust database migration and seeding system",
        "Built scalable microservices architecture with Go",
        "Created interactive frontend applications with modern frameworks"
      ],
      experience: [
        {
          title: "Full Stack Developer",
          period: "November 2024 - Present",
          description: "Building scalable web applications with Go, PostgreSQL, and modern frontend frameworks. Specialized in backend architecture and API development."
        }
      ],
      skillMetrics: [
        { skill: "Go/Golang", level: 85 },
        { skill: "PostgreSQL", level: 80 },
        { skill: "Svelte", level: 75 },
        { skill: "React", level: 70 },
        { skill: "Docker", level: 65 },
        { skill: "GraphQL", level: 70 }
      ]
    };
    res.json(resumeData);
  });

  // Get architecture data
  app.get("/api/architecture", (req, res) => {
    const architectureData = {
      title: "System Architecture",
      description: "Implementing clean architecture principles with Go, featuring layered separation of concerns, dependency injection, and robust error handling patterns.",
      layers: [
        "Controllers (HTTP Layer)",
        "Services (Business Logic)",
        "Repository (Data Access)",
        "Models (Entity Definitions)",
        "Database (PostgreSQL)"
      ],
      codeSnippets: [
        {
          title: "API Routes",
          language: "go",
          code: `// Route definitions
r.GET("/api/projects", controllers.GetProjects)
r.POST("/api/groups", controllers.CreateGroup)
r.PUT("/api/users/:id", controllers.UpdateUser)
// JSON responses with proper error handling`
        },
        {
          title: "Database Schema",
          language: "sql",
          code: `-- Users table structure
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);`
        },
        {
          title: "Service Layer",
          language: "go",
          code: `func (s *UserService) CreateUser(ctx context.Context, req CreateUserRequest) (*User, error) {
    // Validate input
    if err := s.validator.Validate(req); err != nil {
        return nil, err
    }
    
    // Business logic
    user := &User{
        Email: req.Email,
        CreatedAt: time.Now(),
    }
    
    // Persist to database
    return s.repository.Create(ctx, user)
}`
        }
      ]
    };
    res.json(architectureData);
  });

  const httpServer = createServer(app);
  return httpServer;
}
