import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Timeline from "@/components/timeline";
import { Mail, Phone, MapPin } from "lucide-react";

export default function About() {
  const { data: aboutData, isLoading } = useQuery({
    queryKey: ['/api/about'],
  });

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--cyber-accent)' }}></div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span style={{ color: 'var(--cyber-accent)' }}>&gt;</span> About Me
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Personal Info */}
            <div className="space-y-6">
              <div className="project-card rounded-xl p-8 cyber-glow">
                <img 
                  src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Modern coding workstation with multiple monitors" 
                  className="w-full h-48 object-cover rounded-lg mb-6" 
                />
                
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-accent)' }}>
                  Hello, World!
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {aboutData?.bio}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} style={{ color: 'var(--cyber-green)' }} />
                    <div>
                      <div className="font-semibold" style={{ color: 'var(--cyber-green)' }}>Email</div>
                      <div className="text-gray-400 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {aboutData?.contact?.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} style={{ color: 'var(--cyber-purple)' }} />
                    <div>
                      <div className="font-semibold" style={{ color: 'var(--cyber-purple)' }}>Phone</div>
                      <div className="text-gray-400 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {aboutData?.contact?.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tech Stack */}
              <div className="project-card rounded-xl p-8 cyber-glow">
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-purple)' }}>
                  Tech Arsenal
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {aboutData?.skills?.map((skill: string) => (
                    <Badge
                      key={skill}
                      className="p-3 text-center hover:bg-cyan-400 hover:text-black transition-all cursor-pointer"
                      style={{ 
                        backgroundColor: 'var(--cyber-secondary)',
                        color: 'white',
                        fontFamily: 'JetBrains Mono, monospace'
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Professional Timeline */}
            <div>
              {aboutData?.timeline && <Timeline events={aboutData.timeline} />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
