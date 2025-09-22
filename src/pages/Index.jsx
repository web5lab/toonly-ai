import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { StyleSelector } from "@/components/StyleSelector";
import { ImageResult } from "@/components/ImageResult";
import { imageEditService } from "@/services/imageEditService";
import { toast } from "sonner";
import { Loader2, Brush, Star, Pencil, Edit, Menu } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import { PricingModal } from "@/components/PricingModal";
import CountUp from "react-countup";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star as StarIcon } from "lucide-react";
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { stylePrompts } from '@/lib/stylePrompts';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination";
import { fetchUserData } from "../services/userService";

const WIZARD_IMAGE_URL = "https://i.imgur.com/B7ptMnm.png";

const GALLERY_ITEMS = [
  { id: 'example1', src: '/images/examples01.png', styleId: 'ghibli' },
  { id: 'example2', src: '/images/examples02.png', styleId: 'pixel_art' },
  { id: 'example3', src: '/images/examples03.png', styleId: 'cartoon' },
  { id: 'example4', src: '/images/examples04.png', styleId: 'anime' },
  { id: 'example5', src: '/images/examples05.png', styleId: 'watercolor' },
  { id: 'example6', src: '/images/examples06.png', styleId: 'oil_painting' },
  // Add more examples as needed, mapping to existing stylePrompts keys
  { id: 'example7', src: '/images/examples01.png', styleId: 'ghibli' },
  { id: 'example8', src: '/images/examples02.png', styleId: 'pixel_art' },
  { id: 'example9', src: '/images/examples03.png', styleId: 'cartoon' },
  { id: 'example10', src: '/images/examples04.png', styleId: 'anime' },
  { id: 'example11', src: '/images/examples05.png', styleId: 'watercolor' },
  { id: 'example12', src: '/images/examples06.png', styleId: 'oil_painting' },
];


const ITEMS_PER_PAGE = 6; // Number of gallery items per page

const Index = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("ghibli");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingTimeMs, setProcessingTimeMs] = useState(0);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [credits, setCredits] = useState(0);
  const prevCreditsRef = useRef(0);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoadingSubscriptionStatus, setIsLoadingSubscriptionStatus] = useState(true);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signIn');
  const [currentPage, setCurrentPage] = useState(1); // State for current pagination page
  const [sessionState, setSessionState] = useState({ data: null, isLoading: false, error: null });

  // --- Define fetchSession as useCallback ---
  const fetchSession = useCallback(async (isMountedCheck = true) => {
    console.log("[Frontend Index] Attempting to fetch session (callable)...");
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
    console.log("user token",token);    
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

  // Add useEffects for clearing state on mode change / modal close
  useEffect(() => {
    if (!isAuthModalOpen) {
      setAuthMode('signIn');
    }
  }, [isAuthModalOpen]);



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

  const totalPages = Math.ceil(GALLERY_ITEMS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGalleryItems = GALLERY_ITEMS.slice(startIndex, endIndex);

  // --- Conditional Rendering based on Mobile Detection (using isMobileView directly) ---
  /*
  if (isMobileView) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#a87b5d] text-white p-4 text-center">
        <div className="max-w-md">
          <img 
            src={WIZARD_IMAGE_URL}
            alt="ToonlyAI Wizard Logo" 
            className="h-24 w-24 object-contain mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold mb-4">Mobile Access Limited</h1>
          <p className="text-lg">
            Toonly AI is designed for desktop use. Please open Toonly AI on a desktop computer for the full experience.
          </p>
        </div>
      </div>
    );
  }
  */

  // --- Render the main application UI if not mobile --- 
  return (
    <SkeletonTheme baseColor="#e0d8c7" highlightColor="#f4efe4">
      <div className="bg-[url('https://i.ibb.co/DDcDBgws/Chat-GPT-Image-Apr-3-2025-07-56-00-PM.png')] bg-cover bg-center min-h-screen w-full backdrop-blur-sm md:bg-fixed">
        <header className="sticky top-0 bg-[#a87b5d]/80 backdrop-blur-md z-10 playful-shadow">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <div className="flex items-center gap-2 flex-shrink-0 mr-2">
              <img
                src={WIZARD_IMAGE_URL}
                alt="ToonlyAI Wizard Logo"
                className="h-12 w-12 object-contain"
                onError={(e) => {
                  console.error("Error loading logo:", e);
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h1 className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">Toonly AI</h1>
            </div>

            <div className="hidden md:flex items-center justify-end gap-2 sm:gap-4 flex-grow">

              {/* Conditional: Sign In Button OR User Dropdown (First) */}
              {!isSessionLoading && (
                isAuthenticated ? (
                  <> { /* User Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="relative h-10 w-10 rounded-full p-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0"
                        >
                          <Avatar className="h-10 w-10 border-2 border-white/50">
                            <AvatarFallback className="bg-white/30 text-white">
                              {userEmail ? userEmail[0].toUpperCase() : <UserIcon size={20} />}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-[#3a2e23] border-[#5D4037] text-[#e9e2d6]" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-xs leading-none text-[#e9e2d6]/80">
                              {userEmail || "Loading.h.."}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-[#5D4037]/50" />
                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer focus:bg-[#5D4037]/50">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <> { /* Sign In Button */}
                    <Button
                      onClick={triggerAuthModal}
                      variant="secondary"
                      className="bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow h-8 px-4 text-sm font-semibold"
                    >
                      Sign In
                    </Button>
                  </>
                )
              )}
              {/* Optional: Loader only for session loading */}
              {isSessionLoading && (
                <Loader2 className="h-5 w-5 text-white animate-spin" />
              )}

              {/* Buy Stars Button (Second) */}
              <button
                onClick={() => setIsPricingModalOpen(true)}
                className="bg-white/30 backdrop-blur-sm h-8 px-2 rounded-lg flex items-center text-white font-bold cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/40 hover:shadow-md active:scale-95"
              >
                <span className="whitespace-nowrap">Buy Stars</span>
              </button>

              {/* Credits Display (Last / Always Visible) */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="bg-white/30 backdrop-blur-sm h-8 px-2 rounded-lg flex items-center text-white font-bold cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/40 hover:shadow-md active:scale-95"
                    >
                      <img
                        src="https://i.ibb.co/Rd8VZxC/Open-AI-Playground-2025-04-25-at-15-20-53.png"
                        alt="Credit Icon"
                        className="h-4 w-4 mr-1"
                      />
                      <span className="flex items-center min-w-[20px] justify-center">
                        {(isLoadingCredits && isAuthenticated) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CountUp
                            start={prevCreditsRef.current}
                            end={credits}
                            duration={1.5}
                            separator=","
                            decimals={0}
                          />
                        )}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="bg-[#8b5e3c] text-white border-[#a87b5d] animate-bounce-in"
                  >
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>Stars</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

            </div>

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-[#3a2e23] border-[#5D4037] text-[#e9e2d6] w-[280px] sm:w-[320px]">
                  <SheetHeader className="mb-6 text-center">
                    <img
                      src={WIZARD_IMAGE_URL}
                      alt="Toonly AI Wizard"
                      className="h-16 w-16 mx-auto mb-3"
                    />
                    <SheetTitle className="text-xl font-bold text-white">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4">
                    {/* Always show Buy Stars */}
                    <SheetClose asChild>
                      <Button
                        onClick={() => setIsPricingModalOpen(true)}
                        variant="secondary"
                        className="w-full justify-start gap-2 text-white bg-[#e9e2d6]/20 hover:bg-[#e9e2d6]/30"
                      >
                        <Star className="h-4 w-4 text-yellow-400" /> Buy Stars
                      </Button>
                    </SheetClose>

                    {/* Always show Credits */}
                    <div className="flex items-center justify-between text-sm px-3 py-2 rounded-md bg-white/10">
                      <span className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" /> Stars:
                      </span>
                      <span className="font-semibold flex items-center min-w-[20px] justify-center">
                        {(isLoadingCredits && isAuthenticated) ? <Loader2 className="h-4 w-4 animate-spin" /> : <CountUp start={prevCreditsRef.current} end={credits} duration={1.5} separator="," decimals={0} />}
                      </span>
                    </div>

                    {/* Conditional: User Info/Logout OR Sign In Button */}
                    {isSessionLoading ? (
                      <div className="flex justify-center items-center py-4">
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                      </div>
                    ) : isAuthenticated ? (
                      <> { /* Mobile Authenticated View */}
                        <div className="flex items-center gap-3 border-t border-white/20 pt-4 mt-4">
                          <Avatar className="h-10 w-10 border-2 border-white/30">
                            <AvatarFallback className="bg-white/20 text-white">
                              {userEmail ? userEmail[0].toUpperCase() : <UserIcon size={20} />}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-medium text-white truncate">
                            {userEmail || "User"}
                          </p>
                        </div>
                        <SheetClose asChild>
                          <Button
                            onClick={handleSignOut}
                            variant="ghost"
                            className="w-full justify-start gap-2 hover:bg-white/10 text-white mt-2"
                          >
                            <LogOut className="h-4 w-4" /> Sign Out
                          </Button>
                        </SheetClose>
                      </>
                    ) : (
                      <> { /* Mobile Unauthenticated View */}
                        <SheetClose asChild>
                          <Button
                            onClick={triggerAuthModal}
                            variant="secondary"
                            className="w-full justify-center gap-2 text-white bg-[#8b5e3c] hover:bg-[#6d4c30] playful-shadow text-base py-3 mt-4"
                          >
                            <UserIcon className="h-5 w-5" /> Sign In / Sign Up
                          </Button>
                        </SheetClose>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Add overflow constraint to main content area */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#f4efe4] [text-shadow:1px_1px_2px_rgba(93,64,55,0.7)]">Toonly AI</h2>
            <p className="text-lg text-[#f4efe4]/95 max-w-2xl mx-auto [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)]">
              Effortlessly transform your photos into stunning cartoon styles, pixel art, and more in seconds.
              Simple upload, instant magic!
            </p>
          </div>

          <div className="sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto bg-[#e9e2d6]/70 backdrop-blur-sm rounded-xl playful-shadow playful-border p-4 sm:p-6 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:divide-x md:divide-[#8b5e3c]/30 min-h-[500px] sm:min-h-[600px]">
              <div className="space-y-6 md:pr-6">
                <ImageUpload onImageSelect={handleImageSelect} isUploading={isProcessing || isEditing} />

                {/* --- Edit Transformation Area (Subscribers Only) --- */}
                {isAuthenticated && isSubscribed && (
                  <div className={`space-y-2 p-4 bg-white/30 rounded-lg border border-[#a87b5d]/40 shadow-inner transition-opacity duration-300 ${processedImageUrl ? 'opacity-100' : 'opacity-50'}`}>
                    <Label htmlFor="custom-prompt" className="flex items-center gap-1.5 text-sm font-semibold text-[#5D4037]">
                      <Pencil className="h-4 w-4" />
                      Edit Transformation
                    </Label>
                    <Textarea
                      id="custom-prompt"
                      placeholder={processedImageUrl ? "Describe further edits (e.g., 'add glasses', 'change background to forest')..." : "Transform an image first to enable editing."}
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      disabled={!processedImageUrl || isProcessing || isEditing}
                      className="bg-white/80 border-[#a87b5d]/60 text-[#3a2e23] placeholder:text-[#5D4037]/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8b5e3c] focus-visible:ring-offset-0 min-h-[80px] resize-none disabled:cursor-not-allowed disabled:bg-opacity-60"
                    />
                  </div>
                )}
                {/* --- End Edit Transformation Area --- */}

                <StyleSelector
                  selectedStyle={selectedStyle}
                  onChange={handleStyleChange}
                  disabled={isProcessing || isEditing || (isAuthenticated && isSubscribed && !!processedImageUrl)}
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleTransformClick}
                    className="flex-1 bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow flex items-center justify-center gap-2 w-full sm:w-auto text-base"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Transforming...</span>
                      </>
                    ) : (
                      <>
                        <Brush className="h-4 w-4" />
                        <span>Transform Image</span>
                        <img
                          src="https://i.ibb.co/Rd8VZxC/Open-AI-Playground-2025-04-25-at-15-20-53.png"
                          alt="Credit Icon"
                          className="h-4 w-4"
                        />
                        <span>10</span>
                      </>
                    )}
                  </Button>

                  {/* New Edit Button (Subscribers Only, after transform) */}
                  {isAuthenticated && isSubscribed && (
                    <Button
                      onClick={handleEditImage}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white playful-shadow flex items-center justify-center gap-2 w-full sm:w-auto text-base"
                    >
                      {isEditing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Editing...</span>
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4" />
                          <span>Edit Image</span>
                          <img
                            src="https://i.ibb.co/Rd8VZxC/Open-AI-Playground-2025-04-25-at-15-20-53.png"
                            alt="Credit Icon"
                            className="h-4 w-4"
                          />
                          <span>5</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>

                <div className="md:hidden">
                  {/* Pass combined loading state */}
                  <ImageResult imageUrl={processedImageUrl} isLoading={isProcessing || isEditing} onDownload={downloadImage} formattedProcessingTime={formattedProcessingTime} />
                </div>
              </div>

              <div className="md:pl-6 flex items-center justify-center h-full">
                <div className="hidden md:block w-full h-full stitch-border rounded-xl overflow-hidden bg-[#f4efe4]">
                  {/* Pass combined loading state */}
                  <ImageResult imageUrl={processedImageUrl} isLoading={isProcessing || isEditing} onDownload={downloadImage} formattedProcessingTime={formattedProcessingTime} />
                </div>
              </div>
            </div>
          </div>

          <section className="py-16 bg-[#f4efe4]/70 backdrop-blur-sm rounded-xl playful-shadow playful-border mb-16 text-[#3a2e23]">
            <div className="container max-w-5xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#5D4037]">Create Stunning Art in 3 Simple Steps</h2>
              <div className="grid md:grid-cols-3 gap-8 mt-8 text-left">
                <div className="p-4">
                  <div className="text-4xl font-bold text-[#8b5e3c] mb-2">1.</div>
                  <h3 className="text-xl font-semibold mb-2">Upload Your Image</h3>
                  <p className="text-sm text-[#5D4037]/90">Choose any photo from your device – portraits, pets, landscapes, you name it!</p>
                </div>
                <div className="p-4">
                  <div className="text-4xl font-bold text-[#8b5e3c] mb-2">2.</div>
                  <h3 className="text-xl font-semibold mb-2">Select a Style</h3>
                  <p className="text-sm text-[#5D4037]/90">Pick from over 100 unique styles, from classic cartoons to modern fine art.</p>
                </div>
                <div className="p-4">
                  <div className="text-4xl font-bold text-[#8b5e3c] mb-2">3.</div>
                  <h3 className="text-xl font-semibold mb-2">Transform!</h3>
                  <p className="text-sm text-[#5D4037]/90">Click the button and watch Toonly AI work its magic in under a minute.</p>
                </div>
              </div>
            </div>
          </section>

          {/* TO BE ADDED AS TIME GOES ON */}

          <section id="gallery-section" className="py-16 text-center mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white"><span className="text-4xl">See the Magic!</span> <br /> Choose from over 100 different styles!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currentGalleryItems.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-[#e9e2d6]/70 backdrop-blur-sm rounded-lg playful-shadow playful-border overflow-hidden flex flex-col"
                >
                  <img
                    src={item.src}
                    alt={`Example ${item.id}`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <Button
                      variant="secondary"
                      className="w-full bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow"
                      onClick={() => setSelectedStyle(item.styleId)}
                    >
                      Use This Style
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(index + 1); }}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>


          {/* --- Testimonials Section --- */}
          {/* 
          <section className="py-16 bg-[#a87b5d]/80 backdrop-blur-md rounded-xl playful-shadow playful-border mb-16 text-white">
            <div className="container max-w-5xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[#3a2e23]/50 p-6 rounded-lg shadow-md">
                  <p className="italic mb-4">"ToonlyAI is incredibly fun and easy to use! Transformed my dog into a cartoon hero in seconds."</p>
                  <p className="font-semibold">- Sarah K.</p>
                </div>
                <div className="bg-[#3a2e23]/50 p-6 rounded-lg shadow-md">
                  <p className="italic mb-4">"The variety of styles is amazing. I keep finding new ways to reimagine my photos."</p>
                  <p className="font-semibold">- Mike P.</p>
                </div>
                <div className="bg-[#3a2e23]/50 p-6 rounded-lg shadow-md">
                  <p className="italic mb-4">"Perfect for creating unique profile pictures and gifts! Highly recommended."</p>
                  <p className="font-semibold">- Chloe T.</p>
                </div>
              </div>
            </div>
          </section>
          */}

          <section id="pricing" className="py-16 bg-[#f4efe4]/70 backdrop-blur-sm rounded-xl playful-shadow playful-border mb-16 text-[#3a2e23]">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#5D4037] mb-2 flex items-center justify-center gap-2">
                  <StarIcon className="h-7 w-7 text-yellow-400" />
                  Choose Your Plan
                </h2>
                <p className="text-center text-[#614e2e]/90">
                  Pick the perfect option to fuel your creativity. Each transformation costs 10 stars.
                </p>
              </div>

              <Tabs defaultValue="packages" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#e9e2d6]/50 h-11 mb-6 border border-[#a87b5d]/50 rounded-lg">
                  <TabsTrigger value="packages" className="text-base data-[state=active]:bg-[#8b5e3c] data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">Packages</TabsTrigger>
                  <TabsTrigger value="subscription" className="text-base data-[state=active]:bg-[#8b5e3c] data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">Subscription</TabsTrigger>
                </TabsList>

                <TabsContent value="packages">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
                    <div className="border border-[#5D4037] rounded-lg p-6 text-center bg-white/30 flex flex-col hover:bg-white/40 transition-colors shadow-md">
                      <h3 className="font-semibold text-lg mb-1 text-[#3a2e23] flex items-center justify-center gap-1"><StarIcon className="h-4 w-4 inline text-yellow-500" /> 50</h3>
                      <p className="text-2xl font-bold text-[#8b5e3c] my-3">$3.00</p>
                      <ul className="text-xs text-[#5D4037]/90 list-none space-y-1 my-4 text-left px-2 flex-grow">
                        <li>✨ Approx. 5 Image Transforms</li>
                        <li>💰 $0.06 per Star</li>
                        <li>🎨 Access to 100+ Styles</li>
                        <li>⏱️ &lt; 1 Min Turnaround</li>
                      </ul>
                      <Button
                        className="w-full mt-auto bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow"
                        onClick={() => {
                          if (userId && isAuthenticated) {
                            const amountToCredit = 50;
                            const paymentUrl = `https://checkout.dodopayments.com/buy/pdt_o2dgAidb4HRvBPRhiPIkM?quantity=1&redirect_url=https://toonlyai.com&metadata_user_id=${encodeURIComponent(userId)}&metadata_credit_amount=${amountToCredit}`;
                            console.log(`[Payment] Redirecting (50 credits) to: ${paymentUrl}`);
                            window.location.href = paymentUrl;
                          } else {
                            console.log("[Payment] User not authenticated for 50 credits purchase. Triggering auth modal.");
                            triggerAuthModal();
                          }
                        }}
                      >
                        Buy Now
                      </Button>
                    </div>
                    <div className="border-2 border-yellow-500 rounded-lg p-6 text-center bg-white/50 flex flex-col ring-2 ring-yellow-500/50 shadow-lg relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-[#3a2e23] px-3 py-0.5 rounded-full text-xs font-bold">Most Popular</div>
                      <h3 className="font-semibold text-lg mb-1 text-[#3a2e23] mt-3 flex items-center justify-center gap-1"><StarIcon className="h-4 w-4 inline text-yellow-500" /> 120</h3>
                      <p className="text-2xl font-bold text-[#8b5e3c] my-3">$6.00</p>
                      <ul className="text-xs text-[#5D4037]/90 list-none space-y-1 my-4 text-left px-2 flex-grow">
                        <li>✨ Approx. 12 Image Transforms</li>
                        <li>💰 $0.05 per Star</li>
                        <li>🎨 Access to 100+ Styles</li>
                        <li>⏱️ &lt; 1 Min Turnaround</li>
                      </ul>
                      <Button
                        className="w-full mt-auto bg-yellow-500 hover:bg-yellow-600 text-[#3a2e23] playful-shadow font-semibold"
                        onClick={() => {
                          if (userId && isAuthenticated) {
                            const amountToCredit = 120;
                            const paymentUrl = `https://checkout.dodopayments.com/buy/pdt_hVW4yq6XK4OVtdfqKEX4b?quantity=1&redirect_url=https://toonlyai.com&metadata_user_id=${encodeURIComponent(userId)}&metadata_credit_amount=${amountToCredit}`;
                            console.log(`[Payment] Redirecting (120 credits) to: ${paymentUrl}`);
                            window.location.href = paymentUrl;
                          } else {
                            console.log("[Payment] User not authenticated for 120 credits purchase. Triggering auth modal.");
                            triggerAuthModal();
                          }
                        }}
                      >
                        Buy Now
                      </Button>
                    </div>
                    <div className="border border-[#5D4037] rounded-lg p-6 text-center bg-white/30 flex flex-col hover:bg-white/40 transition-colors shadow-md">
                      <h3 className="font-semibold text-lg mb-1 text-[#3a2e23] flex items-center justify-center gap-1"><StarIcon className="h-4 w-4 inline text-yellow-500" /> 300</h3>
                      <p className="text-2xl font-bold text-[#8b5e3c] my-3">$12.00</p>
                      <ul className="text-xs text-[#5D4037]/90 list-none space-y-1 my-4 text-left px-2 flex-grow">
                        <li>✨ Approx. 30 Image Transforms</li>
                        <li>💰 $0.04 per Star</li>
                        <li>🎨 Access to 100+ Styles</li>
                        <li>⏱️ &lt; 1 Min Turnaround</li>
                      </ul>
                      <Button
                        className="w-full mt-auto bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow"
                        onClick={() => {
                          if (userId && isAuthenticated) {
                            const amountToCredit = 300;
                            const paymentUrl = `https://checkout.dodopayments.com/buy/pdt_OGKnLAgIESKQpdnWp2yCL?quantity=1&redirect_url=https://toonlyai.com&metadata_user_id=${encodeURIComponent(userId)}&metadata_credit_amount=${amountToCredit}`;
                            console.log(`[Payment] Redirecting (300 credits) to: ${paymentUrl}`);
                            window.location.href = paymentUrl;
                          } else {
                            console.log("[Payment] User not authenticated for 300 credits purchase. Triggering auth modal.");
                            triggerAuthModal();
                          }
                        }}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="subscription">
                  <div className="border-2 border-yellow-500 rounded-lg p-8 text-center bg-white/50 flex flex-col items-center shadow-lg ring-2 ring-yellow-500/50">
                    <h3 className="font-semibold text-xl mb-2 text-[#3a2e23]">Monthly Subscription</h3>
                    <p className="text-3xl font-bold text-[#8b5e3c] my-3">$21 / month</p>
                    <p className="text-lg text-[#3a2e23] mb-4">
                      Unlock premium features & enhance your creativity!
                    </p>
                    <ul className="text-sm text-[#5D4037]/90 list-disc list-outside text-left space-y-1 mb-6 max-w-md mx-auto pl-5">
                      <li>✨ Access the <span className="font-semibold">Edit feature</span> to customize specific parts of generated images.</li>
                      <li>🖼️ Use the <span className="font-semibold">Multi-Images feature</span> for batch uploads and unique styles.</li>
                      <li>⚡ <span className="font-semibold">Faster processing:</span> Get your images transformed in 40 seconds or less.</li>
                      <li>🌟 Keep and use your existing purchased stars.</li>
                      <li>🚫 Cancel your subscription at any time.</li>
                    </ul>
                    <Button
                      className="w-full max-w-xs mt-4 bg-yellow-500 hover:bg-yellow-600 text-[#3a2e23] playful-shadow font-semibold text-lg py-3"
                      onClick={() => {
                        if (userId && isAuthenticated) {
                          const amountToCredit = 0;
                          const paymentUrl = `https://checkout.dodopayments.com/buy/pdt_3NqIyERjd8icANIGDBrKJ?quantity=1&redirect_url=https://toonlyai.com&metadata_user_id=${encodeURIComponent(userId)}&metadata_credit_amount=${amountToCredit}`;
                          console.log(`[Payment] Redirecting (Subscription) to: ${paymentUrl}`);
                          window.location.href = paymentUrl;
                        } else {
                          console.log("[Payment] User not authenticated for subscription purchase. Triggering auth modal.");
                          triggerAuthModal();
                        }
                      }}
                    >
                      Subscribe Now
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          <section className="py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[#f4efe4] [text-shadow:1px_1px_2px_rgba(93,64,55,0.7)]">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto text-left">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-[#f4efe4]/20">
                  <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">How many images can I transform?</AccordionTrigger>
                  <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                    Each image transformation costs 10 stars. You can buy star packages or subscribe for a monthly allowance. Check the pricing section above for details!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-[#f4efe4]/20">
                  <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">What kind of images work best?</AccordionTrigger>
                  <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                    Clear photos of faces, pets, or objects generally produce the best results. Experiment to see what works for your chosen style!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b-0">
                  <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">How do I cancel my subscription?</AccordionTrigger>
                  <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                    You can manage or cancel your subscription at any time through your account settings (link available when logged in).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          <footer className="mt-16 pt-8 text-center text-sm text-[#f4efe4]/90 border-t border-[#f4efe4]/20 [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)]">
            <div className="flex flex-wrap items-center justify-center space-x-4 mb-4">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <span>•</span>
              <Link to="/legal" className="hover:text-white transition-colors">Legal</Link>
            </div>

            <p className="text-[#f4efe4]/80 mb-3">Built with ❤️ by Web5Lab</p>

            <div className="mb-4">
              <p className="text-[#f4efe4]/70 text-xs">
                We also built:
                <a href="https://redesignr.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors opacity-80 hover:opacity-100 ml-1">Midas</a> <span className="mx-3">•</span>
              </p>
            </div>
            <p className="mb-4">© {new Date().getFullYear()} ToonlyAI. All rights reserved.</p>
          </footer>
        </main>

        <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
          <DialogContent className="sm:max-w-5xl bg-[#3a2e23] border-[#5D4037] p-0 rounded-2xl text-[#e9e2d6] overflow-hidden">
            <div className="flex flex-col md:flex-row h-full">

              {/* Left Column: Gallery Grid */}
              <div className="md:w-1/2 p-4 hidden md:grid grid-cols-3 gap-2 bg-[#2a1f17] overflow-y-auto border-r border-[#5D4037]">
                {GALLERY_ITEMS.slice(0, 12).map((item) => (
                  <div key={item.id} className="w-full h-24 rounded-lg overflow-hidden border border-[#5D4037]">
                    <img
                      src={item.src}
                      alt={item.styleId}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              {/* Right Column: Auth Section */}
              <div className="flex-1 p-6 flex flex-col justify-center items-center">
                <DialogHeader className="mb-6 text-center">
                  <img
                    src={WIZARD_IMAGE_URL}
                    alt="Toonly AI Wizard"
                    className="h-16 w-16 mx-auto mb-3"
                  />
                  <DialogTitle className="text-2xl font-bold text-white">
                    {authMode === 'signIn' ? 'Sign In to Toonly AI' : 'Create Your Toonly AI Account'}
                  </DialogTitle>
                  <DialogDescription className="text-[#e9e2d6]/80 text-sm mt-1">
                    {authMode === 'signIn'
                      ? 'Welcome back! Sign in with Google to access your account.'
                      : 'Join Toonly AI! Sign up with Google to start transforming your images.'}
                  </DialogDescription>
                </DialogHeader>

                <Button
                  onClick={handleLoginWithGoogle}

                  variant="outline"
                  className="w-full max-w-sm bg-white hover:bg-gray-50 text-gray-900 border-gray-300 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {/* Google Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  {authMode === 'signIn' ? 'Sign in with Google' : 'Sign up with Google'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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