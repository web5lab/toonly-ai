import React from 'react'
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star as StarIcon } from "lucide-react";

function Pricing({ userId, isAuthenticated, triggerAuthModal }) {
  return (
    <section id="pricing" className="py-16 bg-[#f4efe4]/70 backdrop-blur-sm rounded-xl playful-shadow playful-border mb-16 text-[#3a2e23]">
    <div className="container max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#5D4037] mb-2 flex items-center justify-center gap-2">
          <StarIcon className="h-7 w-7 text-yellow-400" />
          Choose Your Plan
        </h2>
        <p className="text-center text-[#614e2e]/90">
          Start with our free trial, then choose a subscription that fits your needs. Each transformation costs 10 stars.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
        {/* Free Trial */}
        <div className="border border-[#5D4037] rounded-lg p-6 text-center bg-white/30 flex flex-col hover:bg-white/40 transition-colors shadow-md">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">🎁</span>
            <h3 className="font-semibold text-lg text-[#3a2e23]">Free Trial</h3>
          </div>
          <p className="text-lg font-bold text-green-600 my-3">10 Stars on Signup</p>
          <ul className="text-sm text-[#5D4037]/90 list-none space-y-2 my-4 text-left px-2 flex-grow">
            <li className="flex items-center gap-2">
              <span>✨</span>
              <span>Try before you subscribe</span>
            </li>
            <li className="flex items-center gap-2">
              <span>🎨</span>
              <span>Access to 100+ Styles</span>
            </li>
            <li className="flex items-center gap-2">
              <span>⏱️</span>
              <span>&lt; 1 Min Turnaround</span>
            </li>
          </ul>
          <Button
            className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white playful-shadow"
            onClick={() => {
              if (!isAuthenticated) {
                triggerAuthModal();
              } else {
                // User is already signed up, they should have free stars
                alert("You already have your free trial stars!");
              }
            }}
          >
            Get Started Free
          </Button>
        </div>

        {/* Starter Plan */}
        <div className="border border-[#5D4037] rounded-lg p-6 text-center bg-white/30 flex flex-col hover:bg-white/40 transition-colors shadow-md">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">🌟</span>
            <h3 className="font-semibold text-lg text-[#3a2e23]">Starter Plan</h3>
          </div>
          <p className="text-2xl font-bold text-[#8b5e3c] my-3">$10 / month</p>
          <ul className="text-sm text-[#5D4037]/90 list-none space-y-2 my-4 text-left px-2 flex-grow">
            <li className="flex items-center gap-2">
              <span>✨</span>
              <span>250 Stars / month</span>
            </li>
            <li className="flex items-center gap-2">
              <span>💰</span>
              <span>$0.04 per Star</span>
            </li>
            <li className="flex items-center gap-2">
              <span>🎨</span>
              <span>Access to 100+ Styles</span>
            </li>
            <li className="flex items-center gap-2">
              <span>⏱️</span>
              <span>&lt; 1 Min Turnaround</span>
            </li>
          </ul>
          <Button
            className="w-full mt-auto bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow"
            onClick={() => {
              if (userId) {
                // Update with new starter plan product ID when available
                const paymentUrl = `https://checkout.dodopayments.com/buy/STARTER_PLAN_ID?quantity=1&redirect_url=https://toonlyai.com&metadata_user_id=${encodeURIComponent(userId)}`;
                console.log(`[Payment] Redirecting (Starter Plan) to: ${paymentUrl}`);
                window.location.href = paymentUrl;
              } else {
                console.log("[Payment] User not authenticated for Starter Plan. Triggering auth modal.");
                triggerAuthModal();
              }
            }}
          >
            Subscribe Now
          </Button>
        </div>

        {/* Pro Plan - Most Popular */}
        <div className="border-2 border-yellow-500 rounded-lg p-6 text-center bg-white/50 flex flex-col ring-2 ring-yellow-500/50 shadow-lg relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-[#3a2e23] px-3 py-0.5 rounded-full text-xs font-bold">Most Popular</div>
          <div className="flex items-center justify-center gap-2 mb-2 mt-3">
            <span className="text-2xl">🌟</span>
            <h3 className="font-semibold text-lg text-[#3a2e23]">Pro Plan</h3>
          </div>
          <p className="text-2xl font-bold text-[#8b5e3c] my-3">$20 / month</p>
          <ul className="text-sm text-[#5D4037]/90 list-none space-y-2 my-4 text-left px-2 flex-grow">
            <li className="flex items-center gap-2">
              <span>✨</span>
              <span>600 Stars / month</span>
            </li>
            <li className="flex items-center gap-2">
              <span>💰</span>
              <span>$0.033 per Star</span>
            </li>
            <li className="flex items-center gap-2">
              <span>🎨</span>
              <span>Access to 100+ Styles</span>
            </li>
            <li className="flex items-center gap-2">
              <span>⏱️</span>
              <span>&lt; 1 Min Turnaround</span>
            </li>
          </ul>
          <Button
            className="w-full mt-auto bg-yellow-500 hover:bg-yellow-600 text-[#3a2e23] playful-shadow font-semibold"
            onClick={() => {
              if (userId) {
                // Update with new pro plan product ID when available
                const paymentUrl = `https://checkout.dodopayments.com/buy/PRO_PLAN_ID?quantity=1&redirect_url=https://toonlyai.com&metadata_user_id=${encodeURIComponent(userId)}`;
                console.log(`[Payment] Redirecting (Pro Plan) to: ${paymentUrl}`);
                window.location.href = paymentUrl;
              } else {
                console.log("[Payment] User not authenticated for Pro Plan. Triggering auth modal.");
                triggerAuthModal();
              }
            }}
          >
            Subscribe Now
          </Button>
        </div>
      </div>
    </div>
  </section>
  );
}

export default Pricing