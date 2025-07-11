import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import type { Project } from "@shared/schema";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const filteredProjects = projects?.filter(project => 
    activeFilter === "all" || project.category === activeFilter
  ) || [];

  const filterButtons = [
    { value: "all", label: "All Projects", color: "var(--cyber-accent)" },
    { value: "backend", label: "Backend", color: "var(--cyber-green)" },
    { value: "frontend", label: "Frontend", color: "var(--cyber-purple)" },
    { value: "fullstack", label: "Fullstack", color: "var(--cyber-accent)" },
  ];

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--cyber-accent)' }}></div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section id="projects" className="py-20 px-4" style={{ backgroundColor: 'rgba(26, 26, 46, 0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span style={{ color: 'var(--cyber-accent)' }}>&gt;</span> Featured Projects
          </h2>
          
          {/* Project Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filterButtons.map((button) => (
              <Button
                key={button.value}
                onClick={() => setActiveFilter(button.value)}
                variant={activeFilter === button.value ? "default" : "outline"}
                className={`px-6 py-2 font-semibold transition-all ${
                  activeFilter === button.value 
                    ? 'text-black' 
                    : 'hover:bg-opacity-100 hover:text-black'
                }`}
                style={{
                  backgroundColor: activeFilter === button.value ? button.color : 'transparent',
                  borderColor: button.color,
                  color: activeFilter === button.value ? 'black' : button.color,
                }}
              >
                {button.label}
              </Button>
            ))}
          </div>
          
          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No projects found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
