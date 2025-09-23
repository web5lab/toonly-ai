import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppSelector";
import { 
  fetchUserSession, 
  signOut, 
  setCredits, 
  updateCredits 
} from "@/store/slices/authSlice";
import {
  setAuthModalOpen,
  setPricingModalOpen,
  setSubmitStyleModalOpen,
  setSelectedStyle,
  setCustomPrompt,
  setProcessing,
  setEditing,
  setProcessingTime,
  resetAppState
} from "@/store/slices/appSlice";
import {
  setSelectedFile,
  setOriginalImageUrl,
  setProcessedImageUrl,
  clearImages
} from "@/store/slices/imageSlice";
import { imageEditService } from "@/services/imageEditService";
import { toast } from "sonner";
import { PricingModal } from "@/components/PricingModal";
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { stylePrompts } from '@/lib/stylePrompts';
import { useImageHistory } from "@/hooks/useImageHistory";
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
import { SubmitStyleModal } from "../components/modals/SubmitStyleModal";
import MobileApp from "../components/sections/MobileApp";


const Index = () => {
  const dispatch = useAppDispatch();
  
  // Redux state
  const { 
    isAuthenticated, 
    user, 
    userId, 
    credits, 
    isSubscribed, 
    isLoading: isSessionLoading 
  } = useAppSelector((state) => state.auth);
  
  const {
    isAuthModalOpen,
    isPricingModalOpen,
    isSubmitStyleModalOpen,
    selectedStyle,
    customPrompt,
    isProcessing,
    isEditing,
    processingTimeMs
  } = useAppSelector((state) => state.app);
  
  const {
    selectedFile,
    originalImageUrl,
    processedImageUrl
  } = useAppSelector((state) => state.image);
  
  // Local state for timer and refs
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const prevCreditsRef = useRef(0);

  // History hook
  const {
    history,
    addToHistory,
    deleteHistoryItem,
    clearAllHistory
  } = useImageHistory();

  // Fetch session on mount
  useEffect(() => {
    dispatch(fetchUserSession());
  }, [dispatch]);

  // Update previous credits ref after successful transform fetch
  useEffect(() => {
    prevCreditsRef.current = credits;
  }, [credits]);

  // Function to refresh credits (call after successful transform)
  const refreshCredits = useCallback(async () => {
    dispatch(fetchUserSession());
  }, [dispatch]);

  const handleImageSelect = useCallback((file) => {
    dispatch(setSelectedFile(file));

    // Create URL for the original image to use in comparison
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(setOriginalImageUrl(e.target.result));
      };
      reader.readAsDataURL(file);
    } else {
      dispatch(setOriginalImageUrl(null));
    }

    dispatch(setProcessedImageUrl(null));
    dispatch(setCustomPrompt(""));

    // --- Timer Reset Logic --- 
    console.log("[Image Select] New image selected, resetting timer and states.");
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    startTimeRef.current = null;
    dispatch(setProcessingTime(0));
    dispatch(setProcessing(false)); // Ensure processing flags are off
    dispatch(setEditing(false));
    // --- End Timer Reset Logic ---
  }, [dispatch]);

  const handleStyleChange = useCallback((styleId) => {
    dispatch(setSelectedStyle(styleId));
  }, [dispatch]);

  const triggerAuthModal = () => {
    dispatch(setAuthModalOpen(true));
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
    dispatch(setProcessingTime(0)); // Reset the displayed timer value
    // --- End Timer Reset Logic ---

    dispatch(setProcessing(true));
    dispatch(setProcessedImageUrl(null));
    dispatch(setCustomPrompt(""));

    try {
      console.log(`[Frontend Index] Calling imageEditService.transformImageWithPrompt with prompt: "${promptToUse}"`);
      const editedImageUrl = await imageEditService.transformImageWithPrompt(selectedFile, promptToUse);

      dispatch(setProcessedImageUrl(editedImageUrl));
      toast.success("Image transformed successfully!");
      await refreshCredits();

      // Add to history
      addToHistory({
        originalImage: originalImageUrl,
        processedImage: editedImageUrl,
        style: selectedStyle,
        customPrompt: null,
      });
    } catch (error) {
      handleApiError(error);
    } finally {
      dispatch(setProcessing(false));
    }
  }, [selectedFile, refreshCredits, dispatch]);

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
    dispatch(setProcessingTime(0)); // Reset displayed time
    // --- End Timer Reset Logic ---

    dispatch(setEditing(true)); // Now set editing state

    try {
      // Directly use processedImageUrl and the editPrompt
      console.log(`[Frontend Index] Calling imageEditService.callEditApi with prompt: "${editPrompt}"`);
      const editedImageUrl = await imageEditService.callEditApi(processedImageUrl, editPrompt);

      dispatch(setProcessedImageUrl(editedImageUrl));
      toast.success("Image edited successfully!");
      await refreshCredits();

      // Add to history
      addToHistory({
        originalImage: originalImageUrl,
        processedImage: editedImageUrl,
        style: selectedStyle,
        customPrompt: editPrompt,
      });
    } catch (error) {
      handleApiError(error);
    } finally {
      dispatch(setEditing(false));
    }
  }, [processedImageUrl, customPrompt, isAuthenticated, isSubscribed, credits, refreshCredits, isProcessing, isEditing, dispatch]);

  const handleApiError = (error) => {
    console.error("[Frontend Index] Error processing image:", error);
    if (error.status === 402) {
      dispatch(setPricingModalOpen(true));
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
  };

  // Restore the handleSignOut function
  const handleSignOut = async () => {
    try {
      console.log("[Frontend Index] Signing out...");
      await dispatch(signOut()).unwrap();
      console.log("[Frontend Index] Sign out successful, clearing session state.");
      dispatch(resetAppState());
      dispatch(clearImages());
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
        dispatch(setProcessingTime(elapsed));
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
        dispatch(setProcessingTime(0)); // Reset timer state ONLY when starting fresh
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
  }, [isProcessing, isEditing, dispatch]);

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
        <Header
          prevCreditsRef={prevCreditsRef}
          isAuthenticated={isAuthenticated}
          userEmail={user?.email}
          credits={credits}
          isLoadingCredits={false}
          isSessionLoading={isSessionLoading}
          triggerAuthModal={triggerAuthModal}
          handleSignOut={handleSignOut}
          setIsPricingModalOpen={(open) => dispatch(setPricingModalOpen(open))}
          history={history}
          onDeleteHistoryItem={deleteHistoryItem}
          onClearAllHistory={clearAllHistory}
        />

        {/* Add overflow constraint to main content area */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
          <HeroTittle />
          <div className="hero-section">
            <Hero isAuthenticated={isAuthenticated} isSubscribed={isSubscribed} isProcessing={isProcessing} isEditing={isEditing} processedImageUrl={processedImageUrl} originalImageUrl={originalImageUrl} selectedStyle={selectedStyle} customPrompt={customPrompt} formattedProcessingTime={formattedProcessingTime} handleImageSelect={handleImageSelect} handleStyleChange={handleStyleChange} setCustomPrompt={setCustomPrompt} handleTransformClick={handleTransformClick} handleEditImage={handleEditImage} downloadImage={downloadImage} />
          </div>
          <HowTo />
          <Gallery onStyleSelect={handleStyleChange} onSubmitStyle={() => dispatch(setSubmitStyleModalOpen(true))} />
          {/* <Testimonials /> */}
          <MobileApp />
          <Pricing userId={userId} isAuthenticated={isAuthenticated} triggerAuthModal={triggerAuthModal} setIsPricingModalOpen={(open) => dispatch(setPricingModalOpen(open))} />
          <Faq />
          <Footer />
        </main>
        <LoginModal isAuthModalOpen={isAuthModalOpen} setIsAuthModalOpen={(open) => dispatch(setAuthModalOpen(open))} handleLoginWithGoogle={handleLoginWithGoogle} />
        <PricingModal
          isOpen={isPricingModalOpen}
          onClose={() => dispatch(setPricingModalOpen(false))}
          userId={userId}
        />
        <SubmitStyleModal
          isOpen={isSubmitStyleModalOpen}
          onClose={() => dispatch(setSubmitStyleModalOpen(false))}
        />

      </div>
    </SkeletonTheme>
  );
};

export default Index;