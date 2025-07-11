import { useQuery } from "@tanstack/react-query";
import ContactForm from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, QrCode } from "lucide-react";

export default function Contact() {
  const { data: aboutData } = useQuery({
    queryKey: ['/api/about'],
  });

  return (
    <div className="pt-16">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span style={{ color: 'var(--cyber-accent)' }}>&gt;</span> Get In Touch
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />
            
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Details */}
              <div className="project-card rounded-xl p-8 cyber-glow">
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-purple)' }}>
                  Contact Info
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="text-xl mr-4" style={{ color: 'var(--cyber-accent)' }} />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-400 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {aboutData?.contact?.email}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="text-xl mr-4" style={{ color: 'var(--cyber-green)' }} />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-gray-400 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {aboutData?.contact?.phone}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="text-xl mr-4" style={{ color: 'var(--cyber-purple)' }} />
                    <div>
                      <div className="font-semibold">Location</div>
                      <div className="text-gray-400">{aboutData?.location}, India</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="project-card rounded-xl p-8 cyber-glow">
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-green)' }}>
                  Connect
                </h3>
                
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:text-black"
                    style={{ backgroundColor: 'var(--cyber-secondary)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--cyber-accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--cyber-secondary)';
                    }}
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:text-white"
                    style={{ backgroundColor: 'var(--cyber-secondary)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--cyber-purple)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--cyber-secondary)';
                    }}
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:text-black"
                    style={{ backgroundColor: 'var(--cyber-secondary)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--cyber-green)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--cyber-secondary)';
                    }}
                  >
                    <Twitter size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:text-white"
                    style={{ backgroundColor: 'var(--cyber-secondary)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ef4444';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--cyber-secondary)';
                    }}
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
              
              {/* QR Code for Mobile */}
              <div className="project-card rounded-xl p-8 cyber-glow text-center">
                <h4 className="text-lg font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Quick Contact
                </h4>
                <div className="w-32 h-32 rounded-lg mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--cyber-secondary)' }}>
                  <QrCode size={64} style={{ color: 'var(--cyber-accent)' }} />
                </div>
                <div className="text-sm text-gray-400">Scan to get contact info</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
