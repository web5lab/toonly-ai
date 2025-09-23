import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";


// Define product IDs (Update with new IDs)
const PACKAGE_50_ID = "pdt_o2dgAidb4HRvBPRhiPIkM"; 
const PACKAGE_120_ID = "pdt_hVW4yq6XK4OVtdfqKEX4b";
const PACKAGE_300_ID = "pdt_OGKnLAgIESKQpdnWp2yCL";
const SUBSCRIPTION_ID = "pdt_3NqIyERjd8icANIGDBrKJ";

export function PricingModal({ isOpen, onClose, userId }) {

  // Reusable payment initiation logic
  const initiatePayment = (productId, amountToCredit, description) => {
      if (!userId) {
          console.error(`[Payment Modal] User ID missing for ${description}.`);
          toast.error("You must be signed in to make a purchase. Please sign in or refresh the page.");
          // Optionally trigger sign-in modal if available: onClose(); /* then open auth modal */ 
          return;
      }
      
      // Use PRODUCTION URL
      const paymentUrl = `https://checkout.dodopayments.com/buy/${productId}?quantity=1&redirect_url=https://toonlyai.com&metadata_user_id=${encodeURIComponent(userId)}&metadata_credit_amount=${amountToCredit}`;
      window.location.href = paymentUrl;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[85vh] overflow-y-auto bg-[#3a2e23] border-[#5D4037] text-[#e9e2d6] p-6 sm:p-8 rounded-lg shadow-xl flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white mb-2 flex items-center justify-center gap-2">
            <Star className="h-6 w-6 text-yellow-400" />
            Choose Your Plan
          </DialogTitle>
          <DialogDescription className="text-center text-[#f4efe4]/80 mb-4">
            Start with our free trial, then choose a subscription that fits your needs. Each transformation costs 10 stars.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-grow overflow-y-auto min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 py-2">
            {/* Free Trial */}
            <div className="border border-[#5D4037] rounded-lg p-4 sm:p-6 text-center bg-[#e9e2d6]/5 flex flex-col hover:bg-[#e9e2d6]/10 transition-colors shadow-md">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🎁</span>
                <h3 className="font-semibold text-lg text-white">Free Trial</h3>
              </div>
              <p className="text-lg font-bold text-green-400 my-3">10 Stars on Signup</p>
              <ul className="text-xs text-[#f4efe4]/70 list-none space-y-1 my-4 text-left px-2 flex-grow">
                <li>✨ Try before you subscribe</li>
                <li>🎨 Access to 100+ Styles</li>
                <li>⏱️ &lt; 1 Min Turnaround</li>
              </ul>
              <Button 
                className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white playful-shadow"
                onClick={() => {
                  onClose();
                  toast.success("Sign up to get your 10 free stars!");
                }}
              >
                Get Started Free
              </Button>
            </div>
            
            {/* Starter Plan */}
            <div className="border border-[#5D4037] rounded-lg p-4 sm:p-6 text-center bg-[#e9e2d6]/5 flex flex-col hover:bg-[#e9e2d6]/10 transition-colors shadow-md">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🌟</span>
                <h3 className="font-semibold text-lg text-white">Starter Plan</h3>
              </div>
              <p className="text-2xl font-bold text-yellow-400 my-3">$10 / month</p>
              <ul className="text-xs text-[#f4efe4]/70 list-none space-y-1 my-4 text-left px-2 flex-grow">
                <li>✨ 250 Stars / month</li>
                <li>💰 $0.04 per Star</li>
                <li>🎨 Access to 100+ Styles</li>
                <li>⏱️ &lt; 1 Min Turnaround</li>
              </ul>
              <Button 
                className="w-full mt-auto bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow"
                onClick={() => initiatePayment("STARTER_PLAN_ID", 0, "Starter Plan")}
              >
                Subscribe Now
              </Button>
            </div>

            {/* Pro Plan - Most Popular */}
            <div className="border-2 border-yellow-400 rounded-lg p-4 sm:p-6 text-center bg-[#e9e2d6]/10 flex flex-col ring-2 ring-yellow-400/50 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-[#3a2e23] px-3 py-0.5 rounded-full text-xs font-bold">Most Popular</div>
              <div className="flex items-center justify-center gap-2 mb-2 mt-3">
                <span className="text-2xl">🌟</span>
                <h3 className="font-semibold text-lg text-white">Pro Plan</h3>
              </div>
              <p className="text-2xl font-bold text-yellow-400 my-3">$20 / month</p>
              <ul className="text-xs text-[#f4efe4]/70 list-none space-y-1 my-4 text-left px-2 flex-grow">
                <li>✨ 600 Stars / month</li>
                <li>💰 $0.033 per Star</li>
                <li>🎨 Access to 100+ Styles</li>
                <li>⏱️ &lt; 1 Min Turnaround</li>
              </ul>
              <Button 
                className="w-full mt-auto bg-yellow-500 hover:bg-yellow-600 text-[#3a2e23] playful-shadow font-semibold"
                onClick={() => initiatePayment("PRO_PLAN_ID", 0, "Pro Plan")}
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-4 sm:mt-6 flex-shrink-0">
          <Button 
            type="button" 
            onClick={onClose} 
            className="bg-[#e9e2d6]/10 text-[#e9e2d6]/80 hover:bg-[#e9e2d6]/20 hover:text-[#e9e2d6] transition-colors px-4 py-2 rounded-md text-sm sm:text-base"
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}