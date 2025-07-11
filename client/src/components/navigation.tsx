import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/architecture", label: "Architecture" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-cyber-secondary/90 backdrop-blur-md border-b border-cyber-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="text-white">&lt;</span>
            <span style={{ color: 'var(--cyber-accent)' }}>AkashPaul</span>
            <span className="text-white">/&gt;</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  location === item.href
                    ? 'text-cyber-accent'
                    : 'text-white hover:text-cyber-accent'
                }`}
                style={{ color: location === item.href ? 'var(--cyber-accent)' : undefined }}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ color: 'var(--cyber-accent)' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 transition-colors ${
                  location === item.href
                    ? 'text-cyber-accent'
                    : 'text-white hover:text-cyber-accent'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ color: location === item.href ? 'var(--cyber-accent)' : undefined }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
