import { Button } from "@/components/ui/button";
import { Download, Code, Database, Zap } from "lucide-react";

export default function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden tech-grid">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary via-cyber-secondary to-cyber-primary opacity-80"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-black mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span style={{ color: 'var(--cyber-accent)' }}>AKASH</span>{' '}
            <span className="text-white">PAUL</span>
          </h1>
          <div className="text-lg md:text-xl mb-6" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--cyber-green)' }}>
            <span className="terminal-cursor">Full Stack Developer</span>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Building the future with{' '}
            <span style={{ color: 'var(--cyber-purple)' }}>Go</span>,{' '}
            <span style={{ color: 'var(--cyber-accent)' }}>Svelte</span>, and{' '}
            <span style={{ color: 'var(--cyber-green)' }}>PostgreSQL</span>
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="project-card rounded-lg p-6 cyber-glow">
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--cyber-accent)' }}>
              📍 Bangalore
            </div>
            <div className="text-gray-400">Based in</div>
          </div>
          <div className="project-card rounded-lg p-6 cyber-glow">
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--cyber-purple)' }}>
              🛠️ 6+ Months
            </div>
            <div className="text-gray-400">Experience</div>
          </div>
          <div className="project-card rounded-lg p-6 cyber-glow">
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--cyber-green)' }}>
              🔄 5+ Projects
            </div>
            <div className="text-gray-400">Delivered</div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button 
            onClick={scrollToProjects}
            className="animate-glow px-8 py-3 text-black font-semibold hover:bg-cyan-400 transition-all"
            style={{ backgroundColor: 'var(--cyber-accent)' }}
          >
            View My Work
          </Button>
          <Button 
            variant="outline"
            className="px-8 py-3 font-semibold transition-all"
            style={{ 
              borderColor: 'var(--cyber-accent)', 
              color: 'var(--cyber-accent)',
              '&:hover': {
                backgroundColor: 'var(--cyber-accent)',
                color: 'black'
              }
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </div>
      </div>
      
      {/* Floating Tech Icons */}
      <div className="absolute top-20 left-10 animate-float opacity-60" style={{ animationDelay: '0s' }}>
        <Code size={48} style={{ color: 'var(--cyber-accent)' }} />
      </div>
      <div className="absolute top-40 right-20 animate-float opacity-60" style={{ animationDelay: '1s' }}>
        <Database size={48} style={{ color: 'var(--cyber-purple)' }} />
      </div>
      <div className="absolute bottom-20 left-20 animate-float opacity-60" style={{ animationDelay: '2s' }}>
        <Zap size={48} style={{ color: 'var(--cyber-green)' }} />
      </div>
    </section>
  );
}
