import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Github } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'backend':
        return 'var(--cyber-green)';
      case 'frontend':
        return 'var(--cyber-purple)';
      case 'fullstack':
        return 'var(--cyber-accent)';
      default:
        return 'var(--cyber-accent)';
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'backend':
        return 'bg-green-900/20';
      case 'frontend':
        return 'bg-purple-900/20';
      case 'fullstack':
        return 'bg-cyan-900/20';
      default:
        return 'bg-cyan-900/20';
    }
  };

  return (
    <div className="project-card rounded-xl overflow-hidden cyber-glow hover:scale-105 transition-all duration-300">
      {project.image && (
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 
            className="text-xl font-bold" 
            style={{ fontFamily: 'Orbitron, sans-serif', color: getCategoryColor(project.category) }}
          >
            {project.title}
          </h3>
          <Badge 
            className={`${getCategoryBg(project.category)} text-xs font-mono`}
            style={{ color: getCategoryColor(project.category) }}
          >
            {project.category}
          </Badge>
        </div>
        
        <p className="text-gray-300 mb-4 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech) => (
            <Badge 
              key={tech}
              variant="secondary"
              className="text-xs font-mono"
              style={{ 
                backgroundColor: 'var(--cyber-secondary)', 
                color: 'var(--cyber-accent)' 
              }}
            >
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-3">
          <Button 
            className="flex-1 font-semibold transition-all"
            style={{ backgroundColor: getCategoryColor(project.category) }}
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          {project.githubUrl && (
            <Button 
              variant="secondary"
              className="hover:bg-gray-600 transition-all"
              style={{ backgroundColor: 'var(--cyber-secondary)' }}
            >
              <Github className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
