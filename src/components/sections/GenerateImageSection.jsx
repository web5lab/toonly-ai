import React from 'react';
import { Wand2, ImagePlus, Stars, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GenerateImageSection = () => {
  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#f4efe4]/90 to-[#e9e2d6]/90 backdrop-blur-sm rounded-2xl playful-shadow playful-border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-xl overflow-hidden playful-shadow">
                <img
                  src="https://images.pexels.com/photos/1784578/pexels-photo-1784578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="AI Image Generation Example"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5D4037]/60 to-transparent flex items-end p-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 max-w-md">
                    <p className="text-sm text-[#5D4037] font-medium mb-2">Example Prompt:</p>
                    <p className="text-xs text-[#8b5e3c] italic">
                      "A magical forest with glowing mushrooms and fireflies at twilight"
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-[#8b5e3c] to-[#6d4c30] text-white px-6 py-3 rounded-full playful-shadow font-semibold">
                15 Credits
              </div>
            </div>

            <div className="space-y-6 flex flex-col justify-center order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-[#8b5e3c]/10 text-[#6d4c30] px-4 py-2 rounded-full w-fit">
                <Wand2 className="h-4 w-4" />
                <span className="text-sm font-semibold">Create from Imagination</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-[#5D4037] leading-tight">
                Generate Stunning Images from Text
              </h2>

              <p className="text-lg text-[#6d4c30] leading-relaxed">
                Bring your ideas to life without any starting image. Just describe what you want,
                and our AI will create unique, high-quality images in seconds.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#8b5e3c]/20 p-2 rounded-lg">
                    <ImagePlus className="h-5 w-5 text-[#6d4c30]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#5D4037] mb-1">No Image Required</h3>
                    <p className="text-sm text-[#8b5e3c]">
                      Create original artwork from scratch using only text descriptions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#8b5e3c]/20 p-2 rounded-lg">
                    <Stars className="h-5 w-5 text-[#6d4c30]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#5D4037] mb-1">Unlimited Creativity</h3>
                    <p className="text-sm text-[#8b5e3c]">
                      From fantasy scenes to realistic portraits - anything you can imagine
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#8b5e3c]/20 p-2 rounded-lg">
                    <Palette className="h-5 w-5 text-[#6d4c30]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#5D4037] mb-1">Professional Quality</h3>
                    <p className="text-sm text-[#8b5e3c]">
                      High-resolution images perfect for any project or purpose
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={scrollToHero}
                  className="bg-gradient-to-r from-[#8b5e3c] to-[#6d4c30] hover:from-[#6d4c30] hover:to-[#5a3e25] text-white px-8 py-6 text-lg playful-shadow"
                >
                  Start Generating
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenerateImageSection;
