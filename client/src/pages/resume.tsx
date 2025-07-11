import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Rocket } from "lucide-react";

export default function Resume() {
  const { data: resumeData, isLoading } = useQuery({
    queryKey: ['/api/resume'],
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
      <section className="py-20 px-4" style={{ backgroundColor: 'rgba(26, 26, 46, 0.2)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span style={{ color: 'var(--cyber-accent)' }}>&gt;</span> Professional Resume
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resume Preview */}
            <div className="lg:col-span-2">
              <div className="project-card rounded-xl p-8 cyber-glow">
                {/* Header */}
                <div className="flex items-center mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                    alt="Professional developer portrait" 
                    className="w-24 h-24 rounded-full border-2 mr-6" 
                    style={{ borderColor: 'var(--cyber-accent)' }}
                  />
                  <div>
                    <h3 className="text-2xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-accent)' }}>
                      {resumeData?.name}
                    </h3>
                    <div className="font-mono" style={{ color: 'var(--cyber-green)' }}>
                      {resumeData?.title}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {resumeData?.contact?.email} | {resumeData?.contact?.phone}
                    </div>
                  </div>
                </div>
                
                {/* Key Achievements */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-purple)' }}>
                    Key Achievements
                  </h4>
                  <div className="space-y-3">
                    {resumeData?.achievements?.map((achievement: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <Rocket className="mr-3 mt-1 flex-shrink-0" size={16} style={{ color: 'var(--cyber-accent)' }} />
                        <span className="text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Experience */}
                <div>
                  <h4 className="text-lg font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-green)' }}>
                    Experience
                  </h4>
                  <div className="border-l-2 pl-6 space-y-6" style={{ borderColor: 'var(--cyber-accent)' }}>
                    {resumeData?.experience?.map((exp: any, index: number) => (
                      <div key={index}>
                        <div className="font-semibold" style={{ color: 'var(--cyber-accent)' }}>
                          {exp.title}
                        </div>
                        <div className="text-gray-400 text-sm">{exp.period}</div>
                        <div className="text-gray-300 mt-2">{exp.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Download & Skills */}
            <div className="space-y-6">
              {/* Download Button */}
              <div className="project-card rounded-xl p-6 cyber-glow text-center">
                <FileText size={48} className="mx-auto mb-4" style={{ color: 'var(--cyber-accent)' }} />
                <h4 className="text-lg font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Download Resume
                </h4>
                <Button 
                  className="w-full py-3 px-6 font-semibold transition-all"
                  style={{ backgroundColor: 'var(--cyber-accent)' }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  PDF Version
                </Button>
              </div>
              
              {/* Skills Breakdown */}
              <div className="project-card rounded-xl p-6 cyber-glow">
                <h4 className="text-lg font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-purple)' }}>
                  Skill Metrics
                </h4>
                <div className="space-y-4">
                  {resumeData?.skillMetrics?.map((skillData: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skillData.skill}</span>
                        <span className="text-sm" style={{ color: 'var(--cyber-accent)' }}>
                          {skillData.level}%
                        </span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--cyber-secondary)' }}>
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${skillData.level}%`,
                            backgroundColor: 'var(--cyber-accent)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
