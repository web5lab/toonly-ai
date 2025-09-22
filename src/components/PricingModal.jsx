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
            Need More Stars?
          </DialogTitle>
          <DialogDescription className="text-center text-[#f4efe4]/80 mb-4">
            Choose how you want to fuel your creativity!
            Each transformation costs 10 stars.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="packages" className="w-full flex flex-col flex-grow min-h-0">
          <TabsList className="grid w-full grid-cols-2 bg-[#e9e2d6]/10 h-11 mb-4 sm:mb-6 flex-shrink-0">
            <TabsTrigger value="packages" className="text-sm sm:text-base data-[state=active]:bg-[#8b5e3c] data-[state=active]:text-white data-[state=active]:shadow-md">Packages</TabsTrigger>
            <TabsTrigger value="subscription" className="text-sm sm:text-base data-[state=active]:bg-[#8b5e3c] data-[state=active]:text-white data-[state=active]:shadow-md">Subscription</TabsTrigger>
          </TabsList>

          <div className="flex-grow overflow-y-auto min-h-0">
            <TabsContent value="packages" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 py-2">
                {/* Free Plan */}
                <div className="border border-[#5D4037] rounded-lg p-4 sm:p-6 text-center bg-[#e9e2d6]/5 flex flex-col hover:bg-[#e9e2d6]/10 transition-colors shadow-md">
                  <h3 className="font-semibold text-lg mb-1 text-white flex items-center justify-center gap-1"><Star className="h-4 w-4 inline text-yellow-400"/> 10</h3>
                  <p className="text-2xl font-bold text-green-400 my-3">FREE</p>
                  <ul className="text-xs text-[#f4efe4]/70 list-none space-y-1 my-4 text-left px-2 flex-grow">
                    <li>✨ 1 Image Transform</li>
                    <li>💰 One-time only</li>
                    <li>🎨 Access to 100+ Styles</li>
                    <li>⏱️ &lt; 1 Min Turnaround</li>
                  </ul>
                  <Button 
                    className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white playful-shadow"
                    onClick={() => {
                      // Close modal and let user start using the free credits
                      onClose();
                      toast.success("You have 10 free stars to get started!");
                    }}
                  >
                      Get Started Free
                  </Button>
                </div>
                
                {/* 50 Stars Package */}
                <div className="border border-[#5D4037] rounded-lg p-4 sm:p-6 text-center bg-[#e9e2d6]/5 flex flex-col hover:bg-[#e9e2d6]/10 transition-colors shadow-md">
                  <h3 className="font-semibold text-lg mb-1 text-white flex items-center justify-center gap-1"><Star className="h-4 w-4 inline text-yellow-400"/> 200</h3>
                  <p className="text-2xl font-bold text-yellow-400 my-3">$10.00</p>
                  <ul className="text-xs text-[#f4efe4]/70 list-none space-y-1 my-4 text-left px-2 flex-grow">
                    <li>✨ Approx. 20 Image Transforms</li>
                    <li>💰 $0.5 per Star</li>
                    <li>🎨 Access to 100+ Styles</li>
                    <li>⏱️ &lt; 1 Min Turnaround</li>
                  </ul>
                  <Button 
                    className="w-full mt-auto bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow"
                    onClick={() => initiatePayment(PACKAGE_50_ID, 50, "50 stars")}
                  >
                      Buy Now
                  </Button>
                </div>

                {/* 120 Stars Package - Most Popular */}
                <div className="border-2 border-yellow-400 rounded-lg p-4 sm:p-6 text-center bg-[#e9e2d6]/10 flex flex-col ring-2 ring-yellow-400/50 shadow-lg relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-[#3a2e23] px-3 py-0.5 rounded-full text-xs font-bold">Most Popular</div>
                  <h3 className="font-semibold text-lg mb-1 text-white mt-3 flex items-center justify-center gap-1"><Star className="h-4 w-4 inline text-yellow-400"/> 120</h3>
                  <p className="text-2xl font-bold text-yellow-400 my-3">$20.00</p>
                  <ul className="text-xs text-[#f4efe4]/70 list-none space-y-1 my-4 text-left px-2 flex-grow">
                    <li>✨ Approx. 50 Image Transforms</li>
                    <li>💰 $0.17 per Star</li>
                    <li>🎨 Access to 100+ Styles</li>
                    <li>⏱️ &lt; 1 Min Turnaround</li>
                  </ul>
                  <Button 
                    className="w-full mt-auto bg-yellow-500 hover:bg-yellow-600 text-[#3a2e23] playful-shadow font-semibold"
                    onClick={() => initiatePayment(PACKAGE_120_ID, 120, "120 stars")}
                  >
                      Buy Now
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="subscription" className="mt-0">
              <div className="border-2 border-yellow-400 rounded-lg p-6 sm:p-8 text-center bg-[#e9e2d6]/10 flex flex-col items-center shadow-lg ring-2 ring-yellow-400/50">
                <h3 className="font-semibold text-xl mb-2 text-white">Monthly Subscription</h3>
                <p className="text-3xl font-bold text-yellow-400 my-3">$30 / month</p>
                <p className="text-lg text-white mb-4">
                  Unlock premium features & enhance your creativity!
                </p>
                <ul className="text-sm text-[#f4efe4]/80 list-disc list-outside text-left space-y-1 mb-6 max-w-md mx-auto pl-5">
                  <li>✨ Access the <span className="font-semibold">Edit feature</span> to customize specific parts of generated images.</li>
                  <li>🖼️ Use the <span className="font-semibold">Multi-Images feature</span> for batch uploads and unique styles.</li>
                  <li>⚡ <span className="font-semibold">Faster processing:</span> Get your images transformed in 40 seconds or less.</li>
                  <li>🌟 Keep and use your existing purchased stars.</li>
                  <li>🚫 Cancel your subscription at any time.</li>
                </ul>
                <Button 
                  className="w-full max-w-xs mt-4 bg-yellow-500 hover:bg-yellow-600 text-[#3a2e23] playful-shadow font-semibold text-base sm:text-lg py-3"
                  onClick={() => initiatePayment(SUBSCRIPTION_ID, 0, "Subscription")}
                >
                  Subscribe Now
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
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