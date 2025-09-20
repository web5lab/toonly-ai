import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#3a2e23] text-[#e9e2d6] py-12 border-t border-[#5D4037]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://i.imgur.com/B7ptMnm.png"
                alt="ToonlyAI Logo"
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  console.error("Error loading logo:", e);
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h3 className="text-2xl font-bold text-white">ToonlyAI</h3>
            </div>
            <p className="text-[#f4efe4]/80 mb-4 max-w-md">
              Transform your images into magical art with AI. From photos to cartoons, 
              pixel art, and beyond - unleash your creativity with ToonlyAI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-[#f4efe4]/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-[#f4efe4]/70 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-[#f4efe4]/70 hover:text-white transition-colors">
                  Legal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <p className="text-[#f4efe4]/70">
              <a href="mailto:bhyte.llc@gmail.com" className="hover:text-white transition-colors">
                bhyte.llc@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-[#5D4037] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#f4efe4]/60 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} ToonlyAI. All rights reserved.
            </p>
            
            <div className="text-center">
              <p className="text-[#f4efe4]/60 text-sm mb-2">Built with ❤️ by Bhyte Labs</p>
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <a href="https://usemidas.app" target="_blank" rel="noopener noreferrer" className="text-[#f4efe4]/50 hover:text-white transition-colors">
                  Midas
                </a>
                <a href="https://astrae.design" target="_blank" rel="noopener noreferrer" className="text-[#f4efe4]/50 hover:text-white transition-colors">
                  Astrae
                </a>
                <a href="https://usepapermind.com" target="_blank" rel="noopener noreferrer" className="text-[#f4efe4]/50 hover:text-white transition-colors">
                  Papermind AI
                </a>
                <a href="https://builtwithatlas.com" target="_blank" rel="noopener noreferrer" className="text-[#f4efe4]/50 hover:text-white transition-colors">
                  Atlas Labs
                </a>
                <a href="https://studioix.agency" target="_blank" rel="noopener noreferrer" className="text-[#f4efe4]/50 hover:text-white transition-colors">
                  Studio IX
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}