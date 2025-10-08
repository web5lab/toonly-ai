import React from 'react';
import { Edit, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EditImageSection = () => {
  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#e9e2d6]/90 to-[#f4efe4]/90 backdrop-blur-sm rounded-2xl playful-shadow playful-border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
            <div className="space-y-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 px-4 py-2 rounded-full w-fit">
                <Edit className="h-4 w-4" />
                <span className="text-sm font-semibold">Premium Feature</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-[#5D4037] leading-tight">
                Edit Your Images with AI Precision
              </h2>

              <p className="text-lg text-[#6d4c30] leading-relaxed">
                Transform your images and then fine-tune them with natural language commands.
                Add details, change backgrounds, adjust colors, and more - all with simple text prompts.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <Sparkles className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#5D4037] mb-1">Smart Edits</h3>
                    <p className="text-sm text-[#8b5e3c]">
                      Describe your changes in plain English and watch AI make them happen
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#5D4037] mb-1">Lightning Fast</h3>
                    <p className="text-sm text-[#8b5e3c]">
                      Get professional-quality edits in seconds, not hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={scrollToHero}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg playful-shadow"
                >
                  Try Image Editing
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-xl overflow-hidden playful-shadow">
                <img
                  src="https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="AI Image Editing Example"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5D4037]/60 to-transparent flex items-end p-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 max-w-md">
                    <p className="text-sm text-[#5D4037] font-medium mb-2">Example Edit:</p>
                    <p className="text-xs text-[#8b5e3c] italic">
                      "Add golden hour lighting and make the background more vibrant"
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-6 py-3 rounded-full playful-shadow font-semibold">
                5 Credits
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditImageSection;
