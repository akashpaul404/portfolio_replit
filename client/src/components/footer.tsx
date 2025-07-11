import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="py-12 px-4" style={{ backgroundColor: 'var(--cyber-secondary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-accent)' }}>
            <span className="text-white">&lt;</span>AkashPaul<span className="text-white">/&gt;</span>
          </div>
          <div className="text-gray-400 mb-6">
            Building the future, one line of code at a time.
          </div>
          <div className="flex justify-center space-x-8 mb-6">
            <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">
              About
            </Link>
            <Link href="/projects" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Contact
            </Link>
          </div>
          <div className="text-gray-500 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            © 2025 Akash Paul. Crafted with Go + React + PostgreSQL
          </div>
        </div>
      </div>
    </footer>
  );
}
