import React from 'react';
import { Sparkles, Palette, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ImageTransformSection = () => {
  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const styles = [
    {
      name: 'Cartoon',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      name: 'Anime',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-pink-500/20 to-purple-500/20'
    },
    {
      name: 'Pixel Art',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      name: 'Watercolor',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-teal-500/20 to-green-500/20'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#8b5e3c]/10 text-[#6d4c30] px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Transform Any Image</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#5D4037] mb-4">
            AI Image Transformation
          </h2>

          <p className="text-lg text-[#6d4c30] max-w-2xl mx-auto">
            Transform your photos into stunning artistic styles with AI. Choose from 100+ styles including cartoon, anime, pixel art, watercolor, and more.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Features */}
          <div className="bg-gradient-to-br from-[#e9e2d6]/90 to-[#f4efe4]/90 backdrop-blur-sm rounded-2xl playful-shadow playful-border p-8">
            <h3 className="text-2xl font-bold text-[#5D4037] mb-6">
              Powerful Transformation Features
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#8b5e3c]/20 p-3 rounded-xl flex-shrink-0">
                  <Palette className="h-6 w-6 text-[#6d4c30]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#5D4037] mb-2">100+ Artistic Styles</h4>
                  <p className="text-sm text-[#8b5e3c]">
                    Choose from a vast library of artistic styles including cartoon, anime, pixel art, oil painting, watercolor, sketch, and many more. Each style is powered by advanced AI models.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#8b5e3c]/20 p-3 rounded-xl flex-shrink-0">
                  <Zap className="h-6 w-6 text-[#6d4c30]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#5D4037] mb-2">Instant Results</h4>
                  <p className="text-sm text-[#8b5e3c]">
                    Get professional-quality transformations in seconds. Our AI processes your images quickly while maintaining exceptional quality and detail.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#8b5e3c]/20 p-3 rounded-xl flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-[#6d4c30]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#5D4037] mb-2">High Quality Output</h4>
                  <p className="text-sm text-[#8b5e3c]">
                    Receive high-resolution transformed images perfect for social media, printing, or professional use. No quality loss or pixelation.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                onClick={scrollToHero}
                className="w-full bg-gradient-to-r from-[#8b5e3c] to-[#6d4c30] hover:from-[#6d4c30] hover:to-[#5a3e25] text-white playful-shadow flex items-center justify-center gap-2"
              >
                <span>Start Transforming</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right: Style Examples Grid */}
          <div className="grid grid-cols-2 gap-4">
            {styles.map((style, index) => (
              <div
                key={index}
                className="relative group cursor-pointer rounded-xl overflow-hidden playful-shadow hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={style.image}
                  alt={`${style.name} style example`}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${style.gradient} to-transparent`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div>
                    <h4 className="text-white font-bold text-lg">{style.name}</h4>
                    <p className="text-white/80 text-xs">AI Style</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <span className="text-xs font-semibold text-[#5D4037]">10 Credits</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="bg-gradient-to-r from-[#e9e2d6]/90 to-[#f4efe4]/90 backdrop-blur-sm rounded-2xl playful-shadow playful-border p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#5D4037] mb-2">100+</div>
              <div className="text-sm text-[#8b5e3c]">Artistic Styles Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#5D4037] mb-2">&lt;60s</div>
              <div className="text-sm text-[#8b5e3c]">Average Processing Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#5D4037] mb-2">4K</div>
              <div className="text-sm text-[#8b5e3c]">High Resolution Output</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageTransformSection;
