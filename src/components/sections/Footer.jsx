import React from 'react'
import { Link } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';

function Footer() {
    return (
        <footer className="mt-16 pt-8 text-center text-sm text-slate-600 border-t border-slate-200">
            {/* Privacy Notice */}
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 max-w-2xl mx-auto shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-slate-800 text-base">Your Privacy is Protected</h3>
                </div>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                        <Lock className="h-3 w-3 text-green-600" />
                        <span>Images stored locally only</span>
                    </div>
                    <span>•</span>
                    <span>Never uploaded to our servers</span>
                    <span>•</span>
                    <span>Complete data control</span>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center space-x-4 mb-4">
                <Link to="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link to="/terms-of-service" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
                <span>•</span>
                <Link to="/legal" className="hover:text-indigo-600 transition-colors">Legal</Link>
            </div>

            <p className="text-slate-500 mb-3">Built with ❤️ by Web5Lab</p>

            <div className="mb-4">
                <p className="text-slate-400 text-xs">
                    We also built:
                    <a href="https://redesignr.ai" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors ml-1">Midas</a> <span className="mx-3">•</span>
                </p>
            </div>
            <p className="mb-4 text-slate-500">© {new Date().getFullYear()} ToonlyAI. All rights reserved.</p>
        </footer>
    )
}

export default Footer