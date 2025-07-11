# Akash Paul Portfolio

## Overview

This is a modern, full-stack portfolio website for Akash Paul, a developer specializing in Go backend development with frontend experience in React and Svelte. The application showcases projects, skills, and professional information through a futuristic, cyber-themed design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom cyber theme variables
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful endpoints with JSON responses
- **Data Storage**: PostgreSQL database with Neon hosting (production mode) and in-memory fallback (development mode)

### Database Schema
The application uses a simple relational schema with three main tables:
- `users`: User authentication (currently minimal)
- `projects`: Portfolio projects with categorization
- `contacts`: Contact form submissions

## Key Components

### Core Pages
- **Home**: Hero section with animated introduction
- **About**: Personal information, timeline, and skills
- **Projects**: Filterable project showcase by category
- **Architecture**: System design documentation
- **Resume**: Professional experience and downloadable CV
- **Contact**: Contact form with validation

### UI Components
- **Navigation**: Fixed header with responsive mobile menu and theme toggle
- **Project Cards**: Interactive project displays with hover effects
- **Timeline**: Career progression visualization
- **Contact Form**: Validated form with toast notifications
- **Terminal Interface**: CLI-style interactive portfolio navigator
- **3D Hero Animation**: Canvas-based particle system with perspective effects
- **Footer**: Site links and branding

### Design System
- **Theme**: Multi-mode theme system (Light/Dark/Cyber) with dynamic switching
- **Typography**: Orbitron for headings, JetBrains Mono for code
- **Colors**: Adaptive color scheme with cyber accents (cyan, purple, green)
- **Animations**: CSS transitions, hover effects, and canvas-based 3D particle system

## Data Flow

1. **Client-Side Routing**: Wouter handles navigation between pages
2. **Data Fetching**: TanStack Query manages API calls and caching
3. **API Layer**: Express.js serves REST endpoints from `/api/*`
4. **Data Storage**: PostgreSQL database with automated seeding and migrations
5. **Form Handling**: React Hook Form with Zod validation
6. **State Management**: Query client handles server state, local state for UI
7. **Theme System**: Dynamic theme switching (Light/Dark/Cyber modes)
8. **Interactive Features**: Terminal interface for portfolio navigation
9. **3D Effects**: Canvas-based particle animation system

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, Wouter for routing
- **Styling**: Tailwind CSS, Radix UI components
- **Data Fetching**: TanStack Query
- **Form Handling**: React Hook Form, Hookform Resolvers
- **Utilities**: clsx, date-fns, lucide-react icons

### Backend Dependencies
- **Server**: Express.js with TypeScript
- **Database**: Drizzle ORM with PostgreSQL
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution

### Development Tools
- **Build**: Vite with React plugin
- **Database**: Drizzle Kit for migrations
- **TypeScript**: Full type safety across frontend and backend
- **PostCSS**: Tailwind CSS processing

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild compiles TypeScript server to `dist/index.js`
3. **Static Assets**: Served from built frontend directory

### Environment Configuration
- **Development**: tsx runs server with hot reloading
- **Production**: Compiled server serves static files and API routes
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Database Management
- **Migrations**: Drizzle Kit handles schema changes
- **Seeding**: In-memory storage provides sample data
- **Schema**: Shared TypeScript types between frontend and backend

The application is designed to be easily deployable to platforms like Replit, Vercel, or similar services that support Node.js applications with PostgreSQL databases.