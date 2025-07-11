import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Architecture() {
  const { data: architectureData, isLoading } = useQuery({
    queryKey: ['/api/architecture'],
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
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span style={{ color: 'var(--cyber-accent)' }}>&gt;</span> System Architecture
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* System Design */}
            <div className="project-card rounded-xl p-8 cyber-glow">
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-accent)' }}>
                Backend Architecture
              </h3>
              
              <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: 'var(--cyber-secondary)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                  alt="Abstract network architecture visualization" 
                  className="w-full h-48 object-cover rounded-lg mb-4" 
                />
                
                <div className="text-sm space-y-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--cyber-green)' }}>
                  {architectureData?.layers?.map((layer: string, index: number) => (
                    <div key={index} className="mb-2">
                      {index === 0 && '┌─ '}
                      {index > 0 && index < architectureData.layers.length - 1 && '├─ '}
                      {index === architectureData.layers.length - 1 && '└─ '}
                      {layer}
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {architectureData?.description}
              </p>
            </div>
            
            {/* Code Snippets */}
            <div className="space-y-6">
              {architectureData?.codeSnippets?.map((snippet: any, index: number) => (
                <div key={index} className="project-card rounded-xl p-8 cyber-glow">
                  <h3 className="text-xl font-bold mb-4" style={{ 
                    fontFamily: 'Orbitron, sans-serif', 
                    color: index === 0 ? 'var(--cyber-purple)' : index === 1 ? 'var(--cyber-green)' : 'var(--cyber-accent)'
                  }}>
                    {snippet.title}
                  </h3>
                  <div className="rounded-lg p-4 text-sm" style={{ 
                    backgroundColor: 'var(--cyber-primary)',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}>
                    <pre className="text-gray-300 whitespace-pre-wrap">
                      {snippet.code}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
