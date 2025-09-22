import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { imageEditService } from "@/services/imageEditService";
import { toast } from "sonner";
import { PricingModal } from "@/components/PricingModal";
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { stylePrompts } from '@/lib/stylePrompts';
import { fetchUserData } from "../services/userService";
import Testimonials from "../components/sections/Testimonials";
import Pricing from "../components/sections/Pricing";
import Footer from "../components/sections/Footer";
import Faq from "../components/sections/Faq";
import Header from "../components/sections/Header";
import HowTo from "../components/sections/HowTo";
import Gallery from "../components/sections/Gallery";
import LoginModal from "../components/modals/LoginModal";
import HeroTittle from "../components/sections/HeroTittle";
import Hero from "../components/sections/Hero";


const Index = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("ghibli");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingTimeMs, setProcessingTimeMs] = useState(0);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [credits, setCredits] = useState(0);
  const prevCreditsRef = useRef(0);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [sessionState, setSessionState] = useState({ data: null, isLoading: false, error: null });

  // --- Define fetchSession as useCallback ---
  const fetchSession = useCallback(async (isMountedCheck = true) => {
    console.log("[Frontend Index] Attempting to fetch session (callable)...");
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        console.log("user token", token);
        setSessionState(prevState => ({ ...prevState, isLoading: true, error: null }));
        const userData = await fetchUserData(token);
        prevCreditsRef.current = credits;
        setCredits(userData?.user?.credits || 0);
        setIsSubscribed(userData?.user?.subscription_active || false);
        setSessionState({ data: { session: { userId: userData._id }, user: userData.user }, isLoading: false, error: null });
        console.log("userData:", userData.user);
      }
    } catch (catchError) {
      console.error("[Frontend Index] Exception fetching session (callable):", catchError);
      setSessionState({ data: null, isLoading: false, error });
    }
  }, []); // Empty dependency array, as it doesn't depend on component state/props

  // Fetch session manually on mount using the callable function
  useEffect(() => {
    let isMounted = true;
    fetchSession(isMounted); // Pass mount status
    return () => { isMounted = false; }; // Cleanup remains important
  }, [fetchSession]); // Depend on fetchSession

  // Derive authentication status and user data
  const session = sessionState.data?.session;
  const user = sessionState.data?.user;
  const userId = session?.userId;
  const isAuthenticated = !!session;
  const userEmail = user?.email;
  const isSessionLoading = sessionState.isLoading;



  // Update previous credits ref after successful transform fetch
  useEffect(() => {
    prevCreditsRef.current = credits;
  }, [credits]);

  // Function to refresh credits (call after successful transform)
  const refreshCredits = useCallback(async () => {
    fetchSession();
  }, [isAuthenticated]);

  const handleImageSelect = useCallback((file) => {
    setSelectedFile(file);
    setProcessedImageUrl(null);
    setCustomPrompt("");

    // --- Timer Reset Logic --- 
    console.log("[Image Select] New image selected, resetting timer and states.");
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    startTimeRef.current = null;
    setProcessingTimeMs(0);
    setIsProcessing(false); // Ensure processing flags are off
    setIsEditing(false);
    // --- End Timer Reset Logic ---
  }, []);

  const handleStyleChange = useCallback((styleId) => {
    setSelectedStyle(styleId);
  }, []);

  const triggerAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const processImage = useCallback(async (promptToUse) => {
    if (!selectedFile) {
      toast.error("Please upload an image first");
      return;
    }
    if (!promptToUse) {
      toast.error("Cannot transform without a style or prompt.");
      return;
    }

    // --- Timer Reset Logic (Explicitly reset before processing starts) ---
    console.log("[Process Image] Starting transformation, resetting timer.");
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    startTimeRef.current = null; // Reset start time reference
    setProcessingTimeMs(0); // Reset the displayed timer value
    // --- End Timer Reset Logic ---

    setIsProcessing(true);
    setProcessedImageUrl(null);
    setCustomPrompt("");

    try {
      console.log(`[Frontend Index] Calling imageEditService.transformImageWithPrompt with prompt: "${promptToUse}"`);
      const editedImageUrl = await imageEditService.transformImageWithPrompt(selectedFile, promptToUse);

      setProcessedImageUrl(editedImageUrl);
      toast.success("Image transformed successfully!");
      await refreshCredits();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, refreshCredits]);

  const handleEditImage = useCallback(async () => {
    if (!isAuthenticated || !isSubscribed) {
      toast.error("Editing is available for subscribers only.");
      return;
    }
    if (!processedImageUrl) {
      toast.info("Please transform an image first before editing.");
      return;
    }
    const editPrompt = customPrompt.trim();
    if (!editPrompt) {
      toast.info("Please enter your desired edits in the text box.");
      return;
    }
    if (credits < 5) {
      toast.error("Not enough credits to edit.");
      setIsPricingModalOpen(true);
      return;
    }
    if (isProcessing || isEditing) {
      toast.info("Please wait for the current process to finish.");
      return;
    }

    // --- Timer Reset Logic (Explicitly reset before editing starts) ---
    console.log("[Edit Image] Starting edit, resetting timer.");
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    startTimeRef.current = null; // Clear start time ref
    setProcessingTimeMs(0); // Reset displayed time
    // --- End Timer Reset Logic ---

    setIsEditing(true); // Now set editing state

    try {
      // Directly use processedImageUrl and the editPrompt
      console.log(`[Frontend Index] Calling imageEditService.callEditApi with prompt: "${editPrompt}"`);
      const editedImageUrl = await imageEditService.callEditApi(processedImageUrl, editPrompt);

      setProcessedImageUrl(editedImageUrl);
      toast.success("Image edited successfully!");
      await refreshCredits();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsEditing(false);
    }
  }, [processedImageUrl, customPrompt, isAuthenticated, isSubscribed, credits, refreshCredits, isProcessing, isEditing]);

  const handleApiError = (error) => {
    console.error("[Frontend Index] Error processing image:", error);
    if (error.status === 402) {
      setIsPricingModalOpen(true);
    } else if (error.status === 401) {
      toast.error("Authentication error. Please sign in again.");
    } else {
      toast.error(error.message || "Failed to process image. Please try again later.");
    }
  };

  const handleTransformClick = () => {
    if (!selectedFile) {
      toast.info("Please upload an image first.");
      return;
    }
    if (!isAuthenticated) {
      toast.info("Please sign in to transform images.");
      triggerAuthModal();
      return;
    }
    if (credits < 10) {
      toast.error("Not enough credits to transform.");
      setIsPricingModalOpen(true);
      return;
    }
    if (isProcessing || isEditing) {
      toast.info("Please wait for the current process to finish.");
      return;
    }

    // Call processImage. The timer reset logic is now handled explicitly *inside* processImage.
    console.log("[Transform Click] Triggering image processing...");
    processImage(stylePrompts[selectedStyle]);
  };

  const downloadImage = useCallback(() => {
    if (!processedImageUrl) return;

    const link = document.createElement("a");
    link.href = processedImageUrl;
    link.download = `toonly-${selectedStyle}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImageUrl, selectedStyle]);

  const handleLoginWithGoogle = async () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
    toast.success("Redirecting to Google...");
  }

  // Restore the handleSignOut function
  const handleSignOut = async () => {
    try {
      console.log("[Frontend Index] Signing out...");
      localStorage.clear();
      console.log("[Frontend Index] Sign out successful, clearing session state.");
      setSessionState({ data: null, isLoading: false, error: null });
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("[Frontend Index] Sign out error:", error);
      toast.error("Failed to sign out.");
    }
  };

  // --- Timer Logic using requestAnimationFrame ---
  useEffect(() => {
    let isActive = isProcessing || isEditing; // Timer runs if processing OR editing

    const updateTimer = () => {
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        setProcessingTimeMs(elapsed);
        // Continue the loop only if still active
        if (isActive) {
          animationFrameRef.current = requestAnimationFrame(updateTimer);
        }
      }
    };

    if (isActive) {
      // Start timer or ensure it continues
      if (!startTimeRef.current) {
        // Only reset/set start time if timer wasn't already running
        setProcessingTimeMs(0); // Reset timer state ONLY when starting fresh
        startTimeRef.current = Date.now(); // Record start time
        console.log("[Timer] Starting new timer.");
      } else {
        console.log("[Timer] Already running, continuing...");
      }
      // Start/continue the animation frame loop if not already running
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateTimer);
      }
    } else {
      // Stop timer if neither processing nor editing
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
        // Keep start time ref and timer value when just stopping 
        // (don't reset so user can see final time)
        console.log("[Timer] Stopping timer.");
      }
    }

    // Cleanup function to cancel animation frame if component unmounts while active
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
    // Depend on both flags
  }, [isProcessing, isEditing]);

  // Format the time for display (e.g., 1m 15.7s or 12.3s)
  const formattedProcessingTime = useMemo(() => {
    const totalSeconds = processingTimeMs / 1000;
    if (totalSeconds >= 60) {
      const minutes = Math.floor(totalSeconds / 60);
      const remainingSeconds = totalSeconds % 60;
      return `${minutes}m ${remainingSeconds.toFixed(1)}`;
    } else {
      return `${totalSeconds.toFixed(1)}`;
    }
  }, [processingTimeMs]); // Use useMemo for efficiency


  return (
    <SkeletonTheme baseColor="#e0d8c7" highlightColor="#f4efe4">
      <div className="bg-[url('https://i.ibb.co/DDcDBgws/Chat-GPT-Image-Apr-3-2025-07-56-00-PM.png')] bg-cover bg-center min-h-screen w-full backdrop-blur-sm md:bg-fixed">
        <Header prevCreditsRef={prevCreditsRef} isAuthenticated={isAuthenticated} userEmail={userEmail} credits={credits} isLoadingCredits={isLoadingCredits} isSessionLoading={isSessionLoading} triggerAuthModal={triggerAuthModal} handleSignOut={handleSignOut} setIsPricingModalOpen={setIsPricingModalOpen} />

        {/* Add overflow constraint to main content area */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
          <HeroTittle />
          <div className="hero-section">
            <Hero isAuthenticated={isAuthenticated} isSubscribed={isSubscribed} isProcessing={isProcessing} isEditing={isEditing} processedImageUrl={processedImageUrl} selectedStyle={selectedStyle} customPrompt={customPrompt} formattedProcessingTime={formattedProcessingTime} handleImageSelect={handleImageSelect} handleStyleChange={handleStyleChange} setCustomPrompt={setCustomPrompt} handleTransformClick={handleTransformClick} handleEditImage={handleEditImage} downloadImage={downloadImage} />
          </div>
          <HowTo />
          <Gallery onStyleSelect={handleStyleChange} />
          <Testimonials />
          <Pricing />
          <Faq />
          <Footer />
        </main>
        <LoginModal isAuthModalOpen={isAuthModalOpen} setIsAuthModalOpen={setIsAuthModalOpen} handleLoginWithGoogle={handleLoginWithGoogle} />
        <PricingModal
          isOpen={isPricingModalOpen}
          onClose={() => setIsPricingModalOpen(false)}
          userId={userId}
        />

      </div>
    </SkeletonTheme>
  );
};

export default Index;