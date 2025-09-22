import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PricingModal } from "@/components/PricingModal";
import { Star, Menu, X } from "lucide-react";

export function HeaderSection({ userCredits, userId }) {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="border-b sticky top-0 bg-[#a87b5d]/80 backdrop-blur-md z-10 playful-shadow">
        <div className="container flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <img
              src="https://i.imgur.com/B7ptMnm.png"
              alt="ToonlyAI Wizard Logo"
              className="h-12 w-12 object-contain"
              onError={(e) => {
                console.error("Error loading logo:", e);
                e.currentTarget.style.display = 'none';
              }}
            />
            <h1 className="text-2xl font-bold text-white">ToonlyAI</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-white font-medium">{userCredits}</span>
            </div>
            <Button
              onClick={() => setShowPricingModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-[#3a2e23] font-semibold playful-shadow"
            >
              Get More Stars
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#a87b5d] border-t border-[#8b5e3c]/30 p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center gap-2 bg-white/20 px-3 py-2 rounded-full">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white font-medium">{userCredits} stars</span>
              </div>
              <Button
                onClick={() => {
                  setShowPricingModal(true);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-[#3a2e23] font-semibold playful-shadow"
              >
                Get More Stars
              </Button>
            </div>
          </div>
        )}
      </header>

      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        userId={userId}
      />
    </>
  );
}