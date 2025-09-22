import { Link } from "react-router-dom";

export function FooterSection() {
  return (
    <footer className="mt-16 pt-8 text-center text-sm text-[#5D4037] border-t border-[#a87b5d]/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center space-x-4 mb-4">
          <Link to="/privacy-policy" className="hover:text-[#3a2e23] transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link to="/terms-of-service" className="hover:text-[#3a2e23] transition-colors">
            Terms of Service
          </Link>
          <span>•</span>
          <Link to="/legal" className="hover:text-[#3a2e23] transition-colors">
            Legal
          </Link>
        </div>
        
        <p className="text-[#5D4037]/80 mb-3">Built with ❤️ by Bhyte Labs</p>
        
        <div className="mb-4">
          <p className="text-[#5D4037]/70 text-xs">
            We also built: 
            <a href="https://usemidas.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a2e23] transition-colors opacity-80 hover:opacity-100 ml-1">
              Midas
            </a> 
            <span className="mx-3">•</span> 
            <a href="https://astrae.design" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a2e23] transition-colors opacity-80 hover:opacity-100">
              Astrae
            </a> 
            <span className="mx-3">•</span> 
            <a href="https://usepapermind.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a2e23] transition-colors opacity-80 hover:opacity-100">
              Papermind AI
            </a> 
            <span className="mx-3">•</span> 
            <a href="https://builtwithatlas.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a2e23] transition-colors opacity-80 hover:opacity-100">
              Atlas Labs
            </a> 
            <span className="mx-3">•</span> 
            <a href="https://studioix.agency" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a2e23] transition-colors opacity-80 hover:opacity-100">
              Studio IX
            </a>
          </p>
        </div>
        <p className="mb-4">© {new Date().getFullYear()} ToonlyAI. All rights reserved.</p>
      </div>
    </footer>
  );
}