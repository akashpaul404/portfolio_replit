import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="project-card rounded-xl p-8 cyber-glow">
      <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-accent)' }}>
        Send Message
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-2" style={{ color: 'var(--cyber-green)' }}>
            Name *
          </Label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Your Name"
            className="bg-cyber-secondary border-cyber-accent/30 text-white focus:border-cyber-accent"
            required
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-2" style={{ color: 'var(--cyber-purple)' }}>
            Email *
          </Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className="bg-cyber-secondary border-cyber-accent/30 text-white focus:border-cyber-accent"
            required
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-2" style={{ color: 'var(--cyber-accent)' }}>
            Subject
          </Label>
          <Select value={formData.subject} onValueChange={(value) => handleChange('subject', value)}>
            <SelectTrigger className="bg-cyber-secondary border-cyber-accent/30 text-white focus:border-cyber-accent">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project">Project Collaboration</SelectItem>
              <SelectItem value="job">Job Opportunity</SelectItem>
              <SelectItem value="freelance">Freelance Work</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-2" style={{ color: 'var(--cyber-green)' }}>
            Message *
          </Label>
          <Textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Your message..."
            rows={5}
            className="bg-cyber-secondary border-cyber-accent/30 text-white focus:border-cyber-accent resize-none"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-3 px-6 font-semibold transition-all animate-glow"
          style={{ backgroundColor: 'var(--cyber-accent)' }}
          disabled={contactMutation.isPending}
        >
          <Send className="mr-2 h-4 w-4" />
          {contactMutation.isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
