import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="mt-16 pt-8 text-center text-sm text-[#f4efe4]/90 border-t border-[#f4efe4]/20 [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)]">
            <div className="flex flex-wrap items-center justify-center space-x-4 mb-4">
                <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                <span>•</span>
                <Link to="/legal" className="hover:text-white transition-colors">Legal</Link>
            </div>

            <p className="text-[#f4efe4]/80 mb-3">Built with ❤️ by Web5Lab</p>

            <div className="mb-4">
                <p className="text-[#f4efe4]/70 text-xs">
                    We also built:
                    <a href="https://redesignr.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors opacity-80 hover:opacity-100 ml-1">Midas</a> <span className="mx-3">•</span>
                </p>
            </div>
            <p className="mb-4">© {new Date().getFullYear()} ToonlyAI. All rights reserved.</p>
        </footer>
    )
}

export default Footer