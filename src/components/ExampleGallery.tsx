import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExampleGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const examples = [
    {
      before: "/images/examples01.png",
      after: "/images/examples02.png",
      style: "Anime Style"
    },
    {
      before: "/images/examples03.png", 
      after: "/images/examples04.png",
      style: "Cartoon Style"
    },
    {
      before: "/images/examples05.png",
      after: "/images/examples06.png", 
      style: "Pixel Art"
    }
  ];

  const nextExample = () => {
    setCurrentIndex((prev) => (prev + 1) % examples.length);
  };

  const prevExample = () => {
    setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#f4efe4] to-[#e9e2d6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5D4037] mb-4">
            See the Magic in Action
          </h2>
          <p className="text-xl text-[#8b5e3c] max-w-2xl mx-auto">
            Watch ordinary photos transform into extraordinary art with just one click
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 playful-shadow playful-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Before Image */}
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-[#5D4037] mb-4">Before</h3>
                <div className="relative overflow-hidden rounded-xl playful-shadow">
                  <img
                    src={examples[currentIndex].before}
                    alt="Original image"
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      console.error("Error loading before image:", e);
                      e.currentTarget.src = "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg";
                    }}
                  />
                </div>
              </div>

              {/* After Image */}
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-[#5D4037] mb-4">After - {examples[currentIndex].style}</h3>
                <div className="relative overflow-hidden rounded-xl playful-shadow">
                  <img
                    src={examples[currentIndex].after}
                    alt="Transformed image"
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      console.error("Error loading after image:", e);
                      e.currentTarget.src = "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevExample}
                className="rounded-full border-[#a87b5d] text-[#8b5e3c] hover:bg-[#a87b5d] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2">
                {examples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-[#8b5e3c]' : 'bg-[#a87b5d]/30'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextExample}
                className="rounded-full border-[#a87b5d] text-[#8b5e3c] hover:bg-[#a87b5d] hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}