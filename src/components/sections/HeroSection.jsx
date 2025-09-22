import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { StyleSelector } from "@/components/StyleSelector";
import { ImageResult } from "@/components/ImageResult";
import { PricingModal } from "@/components/PricingModal";
import { toast } from "sonner";
import { Star, Sparkles } from "lucide-react";

export function HeroSection({ 
  selectedImage, 
  setSelectedImage, 
  selectedStyle, 
  setSelectedStyle, 
  resultImage, 
  isProcessing, 
  processingTime, 
  userCredits, 
  userId, 
  onTransform, 
  onDownload 
}) {
  const [showPricingModal, setShowPricingModal] = useState(false);

  const handleTransform = () => {
    if (!selectedImage) {
      toast.error("Please upload an image first");
      return;
    }
    if (!selectedStyle) {
      toast.error("Please select a style");
      return;
    }
    if (userCredits < 10) {
      setShowPricingModal(true);
      return;
    }
    onTransform();
  };

  const formatTime = (seconds) => {
    return seconds.toFixed(1);
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#5D4037] leading-tight">
            Transform Your Photos into
            <span className="block text-[#8b5e3c] mt-2">
              <Sparkles className="inline-block h-8 w-8 md:h-12 md:w-12 mr-2 mb-2" />
              Amazing Art
              <Sparkles className="inline-block h-8 w-8 md:h-12 md:w-12 ml-2 mb-2" />
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#8b5e3c] mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload any photo and watch our AI transform it into stunning cartoon styles, 
            pixel art, and more in seconds!
          </p>
          <div className="flex items-center justify-center gap-2 text-lg text-[#6d4c30] mb-8">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="font-semibold">{userCredits}</span>
            <span>stars remaining</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Upload and Style Selection */}
          <div className="space-y-6">
            <div className="bg-[#f4efe4]/80 backdrop-blur-sm p-6 rounded-xl playful-shadow playful-border">
              <h2 className="text-2xl font-bold mb-4 text-[#5D4037]">1. Upload Your Image</h2>
              <ImageUpload 
                onImageSelect={setSelectedImage}
                isUploading={isProcessing}
              />
            </div>

            <div className="bg-[#f4efe4]/80 backdrop-blur-sm p-6 rounded-xl playful-shadow playful-border">
              <h2 className="text-2xl font-bold mb-4 text-[#5D4037]">2. Choose Your Style</h2>
              <StyleSelector
                selectedStyle={selectedStyle}
                onChange={setSelectedStyle}
                disabled={isProcessing}
              />
            </div>

            <div className="bg-[#f4efe4]/80 backdrop-blur-sm p-6 rounded-xl playful-shadow playful-border">
              <h2 className="text-2xl font-bold mb-4 text-[#5D4037]">3. Transform!</h2>
              <Button
                onClick={handleTransform}
                disabled={!selectedImage || !selectedStyle || isProcessing}
                className="w-full h-14 text-lg bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#FFF8E1] border-t-transparent rounded-full animate-spin"></div>
                    <span>Transforming...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <span>Transform Image (10 ⭐)</span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Right Column - Result */}
          <div className="bg-[#f4efe4]/80 backdrop-blur-sm rounded-xl playful-shadow playful-border overflow-hidden">
            <div className="p-6 border-b border-[#a87b5d]/30">
              <h2 className="text-2xl font-bold text-[#5D4037]">Your Transformed Image</h2>
            </div>
            <div className="h-[500px]">
              <ImageResult
                imageUrl={resultImage}
                isLoading={isProcessing}
                formattedProcessingTime={formatTime(processingTime)}
                onDownload={onDownload}
                className="h-full rounded-none"
              />
            </div>
          </div>
        </div>

        <PricingModal
          isOpen={showPricingModal}
          onClose={() => setShowPricingModal(false)}
          userId={userId}
        />
      </div>
    </section>
  );
}