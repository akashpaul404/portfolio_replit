
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message must be less than 500 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/send-email", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly at akash.paul8080@gmail.com",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="project-card rounded-xl p-8 cyber-glow">
      <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-accent)' }}>
        Send Message
      </h3>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-2 block" style={{ color: 'var(--cyber-green)' }}>
            Name *
          </Label>
          <Input
            {...form.register("name")}
            placeholder="Your Name"
            className="bg-white dark:bg-zinc-900 cyber:bg-cyber-secondary 
                       text-gray-900 dark:text-white cyber:text-white 
                       placeholder-gray-400 dark:placeholder-gray-500 cyber:placeholder-gray-400
                       border border-gray-300 dark:border-zinc-700 cyber:border-cyber-accent/30 
                       focus:border-blue-500 dark:focus:border-blue-400 cyber:focus:border-cyber-accent
                       focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 cyber:focus:ring-cyber-accent/20
                       transition-all duration-200"
          />
          {form.formState.errors.name && (
            <span className="text-red-400 text-sm mt-1 block">{form.formState.errors.name.message}</span>
          )}
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-2 block" style={{ color: 'var(--cyber-purple)' }}>
            Email *
          </Label>
          <Input
            type="email"
            {...form.register("email")}
            placeholder="your.email@example.com"
            className="bg-white dark:bg-zinc-900 cyber:bg-cyber-secondary 
                       text-gray-900 dark:text-white cyber:text-white 
                       placeholder-gray-400 dark:placeholder-gray-500 cyber:placeholder-gray-400
                       border border-gray-300 dark:border-zinc-700 cyber:border-cyber-accent/30 
                       focus:border-blue-500 dark:focus:border-blue-400 cyber:focus:border-cyber-accent
                       focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 cyber:focus:ring-cyber-accent/20
                       transition-all duration-200"
          />
          {form.formState.errors.email && (
            <span className="text-red-400 text-sm mt-1 block">{form.formState.errors.email.message}</span>
          )}
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-2 block" style={{ color: 'var(--cyber-accent)' }}>
            Subject *
          </Label>
          <Select onValueChange={(value) => form.setValue("subject", value)}>
            <SelectTrigger className="bg-white dark:bg-zinc-900 cyber:bg-cyber-secondary 
                                     text-gray-900 dark:text-white cyber:text-white 
                                     border border-gray-300 dark:border-zinc-700 cyber:border-cyber-accent/30 
                                     focus:border-blue-500 dark:focus:border-blue-400 cyber:focus:border-cyber-accent">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project">Project Collaboration</SelectItem>
              <SelectItem value="job">Job Opportunity</SelectItem>
              <SelectItem value="freelance">Freelance Work</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.subject && (
            <span className="text-red-400 text-sm mt-1 block">{form.formState.errors.subject.message}</span>
          )}
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-2 block" style={{ color: 'var(--cyber-green)' }}>
            Message *
          </Label>
          <Textarea
            {...form.register("message")}
            placeholder="Tell me about your project, idea, or opportunity..."
            rows={5}
            className="bg-white dark:bg-zinc-900 cyber:bg-cyber-secondary 
                       text-gray-900 dark:text-white cyber:text-white 
                       placeholder-gray-400 dark:placeholder-gray-500 cyber:placeholder-gray-400
                       border border-gray-300 dark:border-zinc-700 cyber:border-cyber-accent/30 
                       focus:border-blue-500 dark:focus:border-blue-400 cyber:focus:border-cyber-accent
                       focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 cyber:focus:ring-cyber-accent/20
                       transition-all duration-200 resize-none"
          />
          {form.formState.errors.message && (
            <span className="text-red-400 text-sm mt-1 block">{form.formState.errors.message.message}</span>
          )}
          <div className="text-xs text-gray-500 mt-1">
            {form.watch("message")?.length || 0}/500 characters
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-3 px-6 font-semibold transition-all animate-glow hover:scale-105 active:scale-95"
          style={{ backgroundColor: 'var(--cyber-accent)', color: '#000' }}
          disabled={contactMutation.isPending}
        >
          {contactMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
