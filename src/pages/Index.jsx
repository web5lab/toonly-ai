import { useState, useEffect } from "react";
import { toast } from "sonner";
import { imageEditService } from "@/services/imageEditService";
import { fetchUserData } from "@/services/userService";
import { stylePrompts } from "@/lib/stylePrompts";
import { HeaderSection } from "@/components/sections/HeaderSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExamplesSection } from "@/components/sections/ExamplesSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FooterSection } from "@/components/sections/FooterSection";

const Index = () => {
  // State management
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("ghibli");
  const [resultImage, setResultImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [userCredits, setUserCredits] = useState(10);
  const [userId, setUserId] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userData = await fetchUserData(token);
          setUserCredits(userData.credits || 10);
          setUserId(userData.id);
        } else {
          // Generate a temporary user ID for non-authenticated users
          const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          setUserId(tempId);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Generate a temporary user ID on error
        const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setUserId(tempId);
      }
    };

    fetchUser();
  }, []);

  // Transform image handler
  const handleTransform = async () => {
    if (!selectedImage || !selectedStyle) return;

    setIsProcessing(true);
    setProcessingTime(0);
    
    const startTime = Date.now();
    const timer = setInterval(() => {
      setProcessingTime((Date.now() - startTime) / 1000);
    }, 100);

    try {
      const prompt = stylePrompts[selectedStyle] || `Transform this image into ${selectedStyle} style`;
      const result = await imageEditService.transformImageWithPrompt(selectedImage, prompt);
      
      setResultImage(result);
      setUserCredits(prev => Math.max(0, prev - 10));
      toast.success("Image transformed successfully!");
    } catch (error) {
      console.error('Transform error:', error);
      
      if (error.status === 402) {
        toast.error("Insufficient credits. Please purchase more stars to continue.");
      } else if (error.status === 429) {
        toast.error("Too many requests. Please wait a moment and try again.");
      } else {
        toast.error(error.message || "Failed to transform image. Please try again.");
      }
    } finally {
      clearInterval(timer);
      setIsProcessing(false);
    }
  };

  // Download handler
  const handleDownload = () => {
    if (!resultImage) return;

    try {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `toonlyai-transformed-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to download image. Please try again.");
    }
  };

  return (
    <div className="bg-[#e9e2d6] min-h-screen text-[#3a2e23] paper-bg">
      <HeaderSection userCredits={userCredits} userId={userId} />
      
      <main>
        <HeroSection
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          resultImage={resultImage}
          isProcessing={isProcessing}
          processingTime={processingTime}
          userCredits={userCredits}
          userId={userId}
          onTransform={handleTransform}
          onDownload={handleDownload}
        />
        
        <ExamplesSection />
        <FeaturesSection />
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Index;