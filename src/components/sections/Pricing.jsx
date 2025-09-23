import React from 'react'
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star as StarIcon } from "lucide-react";

function Pricing({ userId, isAuthenticated, triggerAuthModal }) {
  return (
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
                  if (userId) {
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
                  if (userId) {
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
                if (userId) {
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
  )
}

export default Pricing