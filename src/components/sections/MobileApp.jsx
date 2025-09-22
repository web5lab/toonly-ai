import React from 'react'
import { Button } from "@/components/ui/button";
import { Smartphone, Download, Bell, Star, Zap, Camera } from "lucide-react";

function MobileApp() {
    return (
        <section className="py-16 bg-gradient-to-br from-[#8b5e3c]/20 to-[#a87b5d]/30 backdrop-blur-sm rounded-xl playful-shadow playful-border mb-16 text-[#3a2e23] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f4efe4]/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#f4efe4]/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="container max-w-6xl mx-auto text-center relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - Content */}
                    <div className="flex-1 text-left lg:text-left">
                        <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                            <Smartphone className="h-8 w-8 text-[#8b5e3c]" />
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#5D4037]">
                                Mobile App
                            </h2>
                            <span className="bg-yellow-400 text-[#3a2e23] px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                                Coming Soon
                            </span>
                        </div>
                        
                        <p className="text-lg text-[#614e2e]/90 mb-8 max-w-2xl mx-auto lg:mx-0">
                            Transform your photos on the go! Our mobile app will bring all the power of Toonly AI 
                            directly to your smartphone with exclusive mobile features.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 bg-white/30 p-4 rounded-lg">
                                <Camera className="h-6 w-6 text-[#8b5e3c] flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-[#5D4037]">Camera Integration</h4>
                                    <p className="text-sm text-[#614e2e]/80">Take & transform instantly</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 bg-white/30 p-4 rounded-lg">
                                <Zap className="h-6 w-6 text-[#8b5e3c] flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-[#5D4037]">Faster Processing</h4>
                                    <p className="text-sm text-[#614e2e]/80">Optimized for mobile</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 bg-white/30 p-4 rounded-lg">
                                <Star className="h-6 w-6 text-[#8b5e3c] flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-[#5D4037]">Exclusive Styles</h4>
                                    <p className="text-sm text-[#614e2e]/80">Mobile-only transformations</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 bg-white/30 p-4 rounded-lg">
                                <Bell className="h-6 w-6 text-[#8b5e3c] flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-[#5D4037]">Push Notifications</h4>
                                    <p className="text-sm text-[#614e2e]/80">Never miss updates</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button
                                disabled
                                className="bg-[#8b5e3c]/50 text-[#FFF8E1]/70 cursor-not-allowed flex items-center gap-2 px-6 py-3"
                            >
                                <Download className="h-5 w-5" />
                                <span>Get on App Store</span>
                            </Button>
                            
                            <Button
                                disabled
                                className="bg-[#8b5e3c]/50 text-[#FFF8E1]/70 cursor-not-allowed flex items-center gap-2 px-6 py-3"
                            >
                                <Download className="h-5 w-5" />
                                <span>Get on Google Play</span>
                            </Button>
                        </div>

                        <p className="text-sm text-[#614e2e]/70 mt-4 text-center lg:text-left">
                            📧 Want early access? Sign up to be notified when we launch!
                        </p>
                    </div>

                    {/* Right side - Phone Mockup */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* Phone Frame */}
                            <div className="w-64 h-[500px] bg-gradient-to-b from-[#3a2e23] to-[#2a1f17] rounded-[3rem] p-4 shadow-2xl relative">
                                {/* Screen */}
                                <div className="w-full h-full bg-gradient-to-b from-[#e9e2d6] to-[#f4efe4] rounded-[2.5rem] relative overflow-hidden">
                                    {/* Status Bar */}
                                    <div className="h-8 bg-[#8b5e3c] flex items-center justify-between px-6 text-white text-xs">
                                        <span>9:41</span>
                                        <span>100%</span>
                                    </div>
                                    
                                    {/* App Content Preview */}
                                    <div className="p-4 h-full">
                                        <div className="text-center mb-4">
                                            <img
                                                src="https://i.imgur.com/B7ptMnm.png"
                                                alt="Toonly AI"
                                                className="h-12 w-12 mx-auto mb-2"
                                            />
                                            <h3 className="text-lg font-bold text-[#5D4037]">Toonly AI</h3>
                                        </div>
                                        
                                        {/* Mock interface */}
                                        <div className="space-y-3">
                                            <div className="h-32 bg-[#a87b5d]/20 rounded-lg flex items-center justify-center">
                                                <Camera className="h-8 w-8 text-[#8b5e3c]" />
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="h-8 bg-[#8b5e3c]/30 rounded"></div>
                                                <div className="h-8 bg-[#8b5e3c]/50 rounded"></div>
                                                <div className="h-8 bg-[#8b5e3c]/30 rounded"></div>
                                            </div>
                                            <div className="h-10 bg-[#8b5e3c] rounded-lg flex items-center justify-center">
                                                <span className="text-white text-sm font-semibold">Transform</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Home Indicator */}
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
                            </div>
                            
                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                                <Star className="h-4 w-4 text-[#3a2e23]" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MobileApp