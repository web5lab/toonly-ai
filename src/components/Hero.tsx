import { Button } from "@/components/ui/button";
import { Sparkles, Wand2 } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://i.ibb.co/DDcDBgws/Chat-GPT-Image-Apr-3-2025-07-56-00-PM.png')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <img
            src="https://i.imgur.com/B7ptMnm.png"
            alt="ToonlyAI Wizard Logo"
            className="h-24 w-24 object-contain animate-bounce-in"
            onError={(e) => {
              console.error("Error loading logo:", e);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Transform Your Images into
          <span className="block text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text">
            Magical Art
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Effortlessly transform your photos into stunning cartoon styles, pixel art, and more with ToonlyAI. 
          Simple upload, instant magic!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Wand2 className="h-5 w-5" />
            Start Creating Magic
            <Sparkles className="h-5 w-5" />
          </Button>
          
          <p className="text-white/80 text-sm">
            ✨ Start with 10 free stars • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}