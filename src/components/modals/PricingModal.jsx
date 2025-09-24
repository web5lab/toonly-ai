import React from 'react'
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Star as StarIcon } from "lucide-react";
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function PricingModal({ isOpen, onClose, triggerAuthModal }) {
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelSubscription = async () => {
    if (!user?._id) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      const subject = encodeURIComponent("Subscription Cancellation Request");
      const body = encodeURIComponent(
        `User ID: ${user._id}\n` +
        `User Email: ${user.email}\n` +
        `Subscription ID: ${user.subsciptionId || 'N/A'}\n` +
        `Subscription Valid Upto: ${user.subsciptionValidUpto ? new Date(user.subsciptionValidUpto).toLocaleDateString() : 'N/A'}\n\n` +
        `I would like to cancel my subscription.`
      );
      window.location.href = `mailto:hello@toonlyai.com?subject=${subject}&body=${body}`;
      console.log("Cancelling subscription for user:", user._id);
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    } 
  };

  const {
    isAuthenticated,
    user
  } = useAppSelector((state) => state.auth);

  const initiatePayment = (productId, description) => {
    if (!user?._id) {
      console.error(`[Payment Modal] User ID missing for ${description}.`);
      toast.error("You must be signed in to make a purchase. Please sign in or refresh the page.");
      onClose();
      triggerAuthModal();
      return;
    }

    // Use PRODUCTION URL
    const paymentUrl = `${import.meta.env.VITE_DODOPAYMENT_URL}/buy/${productId}?quantity=1&redirect_url=https://toonlyai.com&metadata_user_id=${encodeURIComponent(user?._id)}`;

    // Open in new tab/window
    window.open(paymentUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-[#3a2e23] border-[#5D4037] text-[#e9e2d6] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <StarIcon className="h-7 w-7 text-yellow-400" />
            Choose Your Plan
          </DialogTitle>
          <DialogDescription className="text-center text-[#e9e2d6]/80">
            Start with our free trial, then choose a subscription that fits your needs. Each transformation costs 10 stars.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
          {/* Free Trial */}
          <div className={`border border-[#5D4037] rounded-lg p-6 text-center bg-white/10 flex flex-col hover:bg-white/20 transition-colors shadow-md relative ${user?.currentPlan === 'free' ? 'ring-2 ring-green-500' : ''}`}>
            {user?.currentPlan === 'free' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-0.5 rounded-full text-xs font-bold">Current Plan</div>
            )}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🎁</span>
              <h3 className="font-semibold text-lg text-white">Free Trial</h3>
            </div>
            <p className="text-lg font-bold text-green-400 my-3">10 Stars on Signup</p>
            <ul className="text-sm text-[#e9e2d6]/80 list-none space-y-2 my-4 text-left px-2 flex-grow">
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
                <span>{"< 1 Min Turnaround"}</span>
              </li>
            </ul>
            {user?.currentPlan === 'free' ? (
              <Button
                className="w-full mt-auto bg-green-600 text-white cursor-not-allowed opacity-70"
                disabled
              >
                Current Plan
              </Button>
            ) : (
              <Button
                className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  if (!isAuthenticated) {
                    onClose();
                    triggerAuthModal();
                  } else {
                    toast.info("You already have your free trial stars!");
                  }
                }}
              >
                Get Started Free
              </Button>
            )}
          </div>

          {/* Starter Plan */}
          <div className={`border border-[#5D4037] rounded-lg p-6 text-center bg-white/10 flex flex-col hover:bg-white/20 transition-colors shadow-md relative ${user?.currentPlan === 'starter' ? 'ring-2 ring-[#8b5e3c]' : ''}`}>
            {user?.currentPlan === 'starter' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#8b5e3c] text-white px-3 py-0.5 rounded-full text-xs font-bold">Current Plan</div>
            )}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🌟</span>
              <h3 className="font-semibold text-lg text-white">Starter Plan</h3>
            </div>
            <p className="text-2xl font-bold text-[#8b5e3c] my-3">$10 / month</p>
            <ul className="text-sm text-[#e9e2d6]/80 list-none space-y-2 my-4 text-left px-2 flex-grow">
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
                <span>{"< 1 Min Turnaround"}</span>
              </li>
            </ul>
            {user?.currentPlan === 'starter' ? (
              <Button
                className="w-full mt-auto bg-red-600 hover:bg-red-700 text-white"
                onClick={handleCancelSubscription}
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
              </Button>
            ) : user?.currentPlan === 'pro' ? (
              <Button
                className="w-full mt-auto bg-[#8b5e3c] text-white cursor-not-allowed opacity-70"
                disabled
              >
                Current Plan
              </Button>
            ) : (
              <Button
                className="w-full mt-auto bg-[#8b5e3c] hover:bg-[#6d4c30] text-white"
                onClick={() => {
                  if (user?._id) {
                    initiatePayment(import.meta.env.VITE_STARTER_PLAN_ID, "Starter Plan")
                  } else {
                    onClose();
                    triggerAuthModal();
                  }
                }}
              >
                Subscribe Now
              </Button>
            )}
          </div>

          {/* Pro Plan - Most Popular */}
          <div className={`border-2 border-yellow-500 rounded-lg p-6 text-center bg-white/20 flex flex-col ring-2 ring-yellow-500/50 shadow-lg relative ${user?.currentPlan === 'pro' ? 'ring-2 ring-yellow-500' : ''}`}>
            {user?.currentPlan === 'pro' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-[#3a2e23] px-3 py-0.5 rounded-full text-xs font-bold">Current Plan</div>
            )}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-[#3a2e23] px-3 py-0.5 rounded-full text-xs font-bold">Most Popular</div>
            <div className="flex items-center justify-center gap-2 mb-2 mt-3">
              <span className="text-2xl">🌟</span>
              <h3 className="font-semibold text-lg text-white">Pro Plan</h3>
            </div>
            <p className="text-2xl font-bold text-[#8b5e3c] my-3">$20 / month</p>
            <ul className="text-sm text-[#e9e2d6]/80 list-none space-y-2 my-4 text-left px-2 flex-grow">
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
                <span>{"< 1 Min Turnaround"}</span>
              </li>
            </ul>
            {user?.currentPlan === 'pro' ? (
              <Button
                className="w-full mt-auto bg-red-600 hover:bg-red-700 text-white"
                onClick={handleCancelSubscription}
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
              </Button>
            ) : (
              <Button
                className="w-full mt-auto bg-yellow-500 hover:bg-yellow-600 text-[#3a2e23] font-semibold"
                onClick={() => {
                  if (user?._id) {
                    initiatePayment(import.meta.env.VITE_PRO_PLAN_ID, "Pro Plan")
                  } else {
                    onClose();
                    triggerAuthModal();
                  }
                }}
              >
                {user?.currentPlan === 'starter' ? 'Upgrade Plan' : 'Subscribe Now'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PricingModal