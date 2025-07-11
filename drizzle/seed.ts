import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { projects } from "@shared/schema";

const seedData = async () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is required");
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql);

  console.log("Seeding database...");

  const sampleProjects = [
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

  await db.insert(projects).values(sampleProjects);
  console.log("Database seeded successfully!");
};

seedData().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});