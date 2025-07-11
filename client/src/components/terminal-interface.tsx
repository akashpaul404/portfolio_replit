import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Terminal, X } from "lucide-react";

interface TerminalCommand {
  command: string;
  output: string[];
  timestamp: string;
}

export default function TerminalInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState("~/akash-portfolio");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: {
      description: "Show available commands",
      action: () => [
        "Available commands:",
        "  help         - Show this help message",
        "  about        - Display personal information",
        "  projects     - List all projects",
        "  skills       - Show technical skills",
        "  contact      - Display contact information",
        "  clear        - Clear terminal",
        "  theme [mode] - Change theme (light|dark|cyber)",
        "  exit         - Close terminal"
      ]
    },
    about: {
      description: "Show personal information",
      action: () => [
        "Name: Akash Paul",
        "Location: Bangalore, India",
        "Role: Full Stack Developer",
        "Experience: 6+ months",
        "Specialization: Go backend, React/Svelte frontend",
        "Email: akash.paul8080@gmail.com"
      ]
    },
    projects: {
      description: "List projects",
      action: () => [
        "Featured Projects:",
        "  1. Meetup Grouping Algorithm (Go, PostgreSQL)",
        "  2. Tour Module (Svelte, GraphQL, Hasura)",
        "  3. Brew Class System (Go, Svelte, PostgreSQL)",
        "  4. Database Migration Tool (Go, PostgreSQL)",
        "  5. API Documentation Portal (React, Node.js)"
      ]
    },
    skills: {
      description: "Show technical skills",
      action: () => [
        "Backend: Go, Node.js, PostgreSQL, REST APIs",
        "Frontend: React, Svelte, TypeScript, Tailwind CSS",
        "Tools: Docker, Git, Hasura, GraphQL",
        "Architecture: Microservices, Clean Architecture"
      ]
    },
    contact: {
      description: "Show contact information",
      action: () => [
        "Email: akash.paul8080@gmail.com",
        "Phone: +91 8327320609",
        "Location: Bangalore, India",
        "Portfolio: akash-paul.dev"
      ]
    },
    clear: {
      description: "Clear terminal",
      action: () => {
        setHistory([]);
        return [];
      }
    },
    exit: {
      description: "Close terminal",
      action: () => {
        setIsOpen(false);
        return ["Terminal closed."];
      }
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const [baseCmd, ...args] = trimmedCmd.split(' ');
    
    let output: string[] = [];
    
    if (baseCmd === "") {
      output = [];
    } else if (commands[baseCmd as keyof typeof commands]) {
      output = commands[baseCmd as keyof typeof commands].action();
    } else if (baseCmd === "theme") {
      const theme = args[0];
      if (["light", "dark", "cyber"].includes(theme)) {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
        output = [`Theme changed to ${theme}`];
      } else {
        output = ["Usage: theme [light|dark|cyber]"];
      }
    } else {
      output = [`Command not found: ${baseCmd}`, "Type 'help' for available commands"];
    }

    const newCommand: TerminalCommand = {
      command: cmd,
      output,
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory(prev => [...prev, newCommand]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0"
        style={{ backgroundColor: 'var(--cyber-accent)' }}
        title="Open Terminal"
      >
        <Terminal size={20} />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className="w-full max-w-4xl h-96 rounded-lg border-2 overflow-hidden"
        style={{ 
          backgroundColor: 'var(--cyber-primary)',
          borderColor: 'var(--cyber-accent)'
        }}
      >
        {/* Terminal Header */}
        <div 
          className="flex items-center justify-between px-4 py-2 border-b"
          style={{ 
            backgroundColor: 'var(--cyber-secondary)',
            borderColor: 'var(--cyber-accent)'
          }}
        >
          <div className="flex items-center space-x-2">
            <Terminal size={16} style={{ color: 'var(--cyber-accent)' }} />
            <span 
              className="text-sm font-mono"
              style={{ color: 'var(--cyber-text)' }}
            >
              akash@terminal:~$
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 p-0"
            style={{ color: 'var(--cyber-accent)' }}
          >
            <X size={14} />
          </Button>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="h-80 overflow-y-auto p-4 font-mono text-sm"
          style={{ color: 'var(--cyber-text)' }}
        >
          {/* Welcome Message */}
          {history.length === 0 && (
            <div className="mb-4">
              <div style={{ color: 'var(--cyber-accent)' }}>
                Welcome to Akash Paul's Portfolio Terminal
              </div>
              <div className="text-gray-400">
                Type 'help' for available commands
              </div>
            </div>
          )}

          {/* Command History */}
          {history.map((cmd, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center">
                <span style={{ color: 'var(--cyber-green)' }}>{currentDirectory}</span>
                <span className="mx-2" style={{ color: 'var(--cyber-accent)' }}>$</span>
                <span>{cmd.command}</span>
              </div>
              {cmd.output.map((line, lineIndex) => (
                <div key={lineIndex} className="ml-4 text-gray-300">
                  {line}
                </div>
              ))}
            </div>
          ))}

          {/* Current Input */}
          <div className="flex items-center">
            <span style={{ color: 'var(--cyber-green)' }}>{currentDirectory}</span>
            <span className="mx-2" style={{ color: 'var(--cyber-accent)' }}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-transparent outline-none flex-1 text-white"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="animate-pulse">|</span>
          </div>
        </div>
      </div>
    </div>
  );
}