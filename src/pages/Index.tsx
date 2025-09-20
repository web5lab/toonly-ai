import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { StyleSelector } from "@/components/StyleSelector";
import { ImageResult } from "@/components/ImageResult";
import { PricingModal } from "@/components/PricingModal";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ExampleGallery } from "@/components/ExampleGallery";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { imageEditService } from "@/services/imageEditService";
import { stylePrompts } from "@/lib/stylePrompts";
import { toast } from "sonner";
import { Sparkles, Wand2, Star, Menu, X } from "lucide-react";
import ReactGA from 'react-ga4';
import { authClient } from "@/lib/auth-client";

const Index = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("ghibli");
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showMainApp, setShowMainApp] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Auth state
  const [user, setUser] = useState<any>(null);
  const [userCredits, setUserCredits] = useState<number>(0);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        if (session.data?.user) {
          setUser(session.data.user);
          // Fetch user credits from your backend
          // This would be an API call to get the user's current credit balance
          // For now, we'll set a default value
          setUserCredits(10); // Default free credits
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Timer effect for processing time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isProcessing) {
      interval = setInterval(() => {
        setProcessingTime(prev => prev + 0.1);
      }, 100);
    } else {
      setProcessingTime(0);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleGetStarted = () => {
    setShowMainApp(true);
    // Scroll to the main app section
    setTimeout(() => {
      const appSection = document.getElementById('main-app');
      if (appSection) {
        appSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setProcessedImageUrl(null);
  };

  const handleTransform = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    if (!user) {
      toast.error("Please sign in to transform images");
      return;
    }

    if (userCredits < 10) {
      toast.error("Insufficient credits. You need 10 stars to transform an image.");
      setShowPricingModal(true);
      return;
    }

    const prompt = stylePrompts[selectedStyle];
    if (!prompt) {
      toast.error("Please select a valid style");
      return;
    }

    setIsProcessing(true);
    setProcessedImageUrl(null);

    try {
      ReactGA.event({
        action: 'image_transform_started',
        category: 'User Interaction',
        label: selectedStyle,
      });

      const result = await imageEditService.transformImageWithPrompt(selectedFile, prompt);
      setProcessedImageUrl(result);
      
      // Deduct credits
      setUserCredits(prev => prev - 10);
      
      toast.success("Image transformed successfully!");
      
      ReactGA.event({
        action: 'image_transform_completed',
        category: 'User Interaction',
        label: selectedStyle,
      });

    } catch (error: any) {
      console.error("Transform error:", error);
      
      if (error.status === 402) {
        toast.error("Insufficient credits. Please purchase more stars to continue.");
        setShowPricingModal(true);
      } else if (error.status === 401) {
        toast.error("Please sign in to transform images");
      } else {
        toast.error(error.message || "Failed to transform image. Please try again.");
      }
      
      ReactGA.event({
        action: 'image_transform_failed',
        category: 'User Interaction',
        label: error.message || 'Unknown error',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImageUrl) {
      const link = document.createElement('a');
      link.href = processedImageUrl;
      link.download = `toonlyai-transformed-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      ReactGA.event({
        action: 'image_downloaded',
        category: 'User Interaction',
      });
    }
  };

  const formattedProcessingTime = processingTime.toFixed(1);

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e9e2d6]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#a87b5d] border-t-transparent rounded-full mx-auto animate-spin mb-4"></div>
          <p className="text-lg font-medium text-[#5D4037]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e9e2d6]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#3a2e23]/95 backdrop-blur-md border-b border-[#5D4037]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img
                src="https://i.imgur.com/B7ptMnm.png"
                alt="ToonlyAI Logo"
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  console.error("Error loading logo:", e);
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h1 className="text-xl font-bold text-white">ToonlyAI</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {user && (
                <div className="flex items-center gap-2 bg-[#e9e2d6]/10 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-white font-medium">{userCredits}</span>
                </div>
              )}
              
              {!showMainApp && (
                <Button 
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold"
                >
                  Get Started
                </Button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#5D4037]">
              {user && (
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-white font-medium">{userCredits} stars</span>
                </div>
              )}
              
              {!showMainApp && (
                <Button 
                  onClick={() => {
                    handleGetStarted();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold"
                >
                  Get Started
                </Button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {!showMainApp ? (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <Features />
            <ExampleGallery />
            <PricingSection onGetStarted={handleGetStarted} />
          </>
        ) : (
          <section id="main-app" className="min-h-screen py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#5D4037] mb-4">
                    Transform Your Images
                  </h2>
                  <p className="text-lg text-[#8b5e3c]">
                    Upload an image, choose a style, and watch the magic happen!
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Panel - Upload and Controls */}
                  <div className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl playful-shadow playful-border">
                      <h3 className="text-xl font-semibold text-[#5D4037] mb-4">Upload Image</h3>
                      <ImageUpload onImageSelect={handleImageSelect} />
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl playful-shadow playful-border">
                      <h3 className="text-xl font-semibold text-[#5D4037] mb-4">Choose Style</h3>
                      <StyleSelector
                        selectedStyle={selectedStyle}
                        onChange={setSelectedStyle}
                        disabled={isProcessing}
                      />
                    </div>

                    <Button
                      onClick={handleTransform}
                      disabled={!selectedFile || isProcessing}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Transforming...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-5 w-5" />
                          Transform Image (10 <Star className="h-4 w-4 inline" />)
                          <Sparkles className="h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Right Panel - Result */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl playful-shadow playful-border overflow-hidden">
                    <div className="p-6 border-b border-[#a87b5d]/30">
                      <h3 className="text-xl font-semibold text-[#5D4037]">Result</h3>
                    </div>
                    <ImageResult
                      imageUrl={processedImageUrl}
                      isLoading={isProcessing}
                      formattedProcessingTime={formattedProcessingTime}
                      onDownload={handleDownload}
                      className="h-[400px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Pricing Modal */}
      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        userId={user?.id}
      />
    </div>
  );
};

export default Index;