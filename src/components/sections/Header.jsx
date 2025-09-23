import React from 'react'
import { Button } from "@/components/ui/button";
import { Loader2, Star, Menu, Clock, Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { LogOut, User as UserIcon } from "lucide-react";
import CountUp from "react-countup";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { HistoryModal } from "@/components/HistoryModal";

const WIZARD_IMAGE_URL = "https://i.imgur.com/B7ptMnm.png";



function Header({
  isAuthenticated,
  prevCreditsRef, 
  userEmail,  
  credits, 
  isLoadingCredits, 
  isSessionLoading, 
  triggerAuthModal, 
  handleSignOut, 
  setIsPricingModalOpen,
  history,
  onDeleteHistoryItem,
  onClearAllHistory
}) {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = React.useState(false);

  return (
    <>
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

        {/* History Button */}
        <Button
          onClick={() => setIsHistoryModalOpen(true)}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 transition-colors"
        >
          <Clock className="h-5 w-5" />
          <span className="sr-only">View History</span>
        </Button>

        {/* Privacy Policy Link */}
        <a
          href="/privacy-policy"
          className="text-white hover:text-white/80 transition-colors text-sm font-medium"
        >
          Privacy
        </a>
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

              {/* History Button */}
              <SheetClose asChild>
                <Button
                  onClick={() => setIsHistoryModalOpen(true)}
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-white/10 text-white"
                >
                  <Clock className="h-4 w-4" /> History
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

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={history}
        onDeleteItem={onDeleteHistoryItem}
        onClearAll={onClearAllHistory}
      />
    </>
  )
}

export default Header