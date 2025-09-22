import React from 'react'
import { Button } from "@/components/ui/button";
import { Smartphone, Download, Bell, Star, Zap, Camera, Sparkles, Heart, Palette } from "lucide-react";

function MobileApp() {
    return (
        <section className="py-16 bg-[#f4efe4]/70 backdrop-blur-sm rounded-xl playful-shadow playful-border mb-16 text-[#3a2e23] relative overflow-hidden paper-bg">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a87b5d]/20 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#8b5e3c]/20 rounded-full translate-y-12 -translate-x-12 animate-bounce"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 bg-[#a87b5d]/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/4 right-20 w-8 h-8 bg-[#8b5e3c]/30 rounded-full animate-bounce delay-500"></div>
            
            <div className="container max-w-6xl mx-auto text-center relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - Content */}
                    <div className="flex-1 text-left lg:text-left">
                        <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                            <Smartphone className="h-8 w-8 text-[#8b5e3c]" />
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#5D4037]">
                                Mobile App
                            </h2>
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-[#3a2e23] px-4 py-1.5 rounded-full text-sm font-bold animate-pulse shadow-lg playful-shadow">
                                <Sparkles className="h-3 w-3 inline mr-1" />
                                Coming Soon
                            </span>
                        </div>
                        
                        <p className="text-lg text-[#614e2e]/90 mb-8 max-w-2xl mx-auto lg:mx-0">
                            Transform your photos on the go! Our mobile app will bring all the power of Toonly AI 
                            directly to your smartphone with exclusive mobile features.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 bg-white/50 p-4 rounded-lg playful-border stitch-border hover:bg-white/60 transition-colors">
                                <Camera className="h-6 w-6 text-[#8b5e3c] flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-[#5D4037]">Camera Integration</h4>
                                    <p className="text-sm text-[#614e2e]/80">Take & transform instantly</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 bg-white/50 p-4 rounded-lg playful-border stitch-border hover:bg-white/60 transition-colors">
                                <Zap className="h-6 w-6 text-[#8b5e3c] flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-[#5D4037]">Faster Processing</h4>
                                    <p className="text-sm text-[#614e2e]/80">Optimized for mobile</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 bg-white/50 p-4 rounded-lg playful-border stitch-border hover:bg-white/60 transition-colors">
                                <Star className="h-6 w-6 text-[#8b5e3c] flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-[#5D4037]">Exclusive Styles</h4>
                                    <p className="text-sm text-[#614e2e]/80">Mobile-only transformations</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 bg-white/50 p-4 rounded-lg playful-border stitch-border hover:bg-white/60 transition-colors">
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
                                className="bg-[#8b5e3c]/50 text-[#FFF8E1]/70 cursor-not-allowed flex items-center gap-2 px-6 py-3 playful-border"
                            >
                                <Download className="h-5 w-5" />
                                <span>Get on App Store</span>
                            </Button>
                            
                            <Button
                                disabled
                                className="bg-[#8b5e3c]/50 text-[#FFF8E1]/70 cursor-not-allowed flex items-center gap-2 px-6 py-3 playful-border"
                            >
                                <Download className="h-5 w-5" />
                                <span>Get on Google Play</span>
                            </Button>
                        </div>

                        <div className="mt-6 p-4 bg-[#a87b5d]/20 rounded-lg playful-border text-center lg:text-left">
                            <p className="text-sm text-[#614e2e] flex items-center justify-center lg:justify-start gap-2">
                                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                                <span className="font-medium">Want early access? Sign up to be notified when we launch!</span>
                            </p>
                        </div>
                        </p>
                    </div>

                    {/* Right side - Phone Mockup */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className="relative transform hover:scale-105 transition-transform duration-300">
                            {/* Phone Frame */}
                            <div className="w-72 h-[550px] bg-gradient-to-b from-[#5D4037] to-[#3a2e23] rounded-[3rem] p-4 shadow-2xl relative playful-shadow border-4 border-[#8b5e3c]/30">
                                {/* Phone Notch */}
                                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-[#2a1f17] rounded-full"></div>
                                
                                {/* Screen */}
                                <div className="w-full h-full bg-gradient-to-b from-[#f4efe4] to-[#e9e2d6] rounded-[2.5rem] relative overflow-hidden paper-bg border-2 border-[#a87b5d]/20">
                                    {/* Status Bar */}
                                    <div className="h-10 bg-gradient-to-r from-[#8b5e3c] to-[#a87b5d] flex items-center justify-between px-6 text-white text-xs font-medium">
                                        <span className="flex items-center gap-1">
                                            <div className="w-1 h-1 bg-white rounded-full"></div>
                                            <div className="w-1 h-1 bg-white rounded-full"></div>
                                            <div className="w-1 h-1 bg-white rounded-full"></div>
                                            <span className="ml-1">9:41</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <div className="w-6 h-3 border border-white rounded-sm">
                                                <div className="w-full h-full bg-white rounded-sm"></div>
                                            </div>
                                            <span>100%</span>
                                        </span>
                                    </div>
                                    
                                    {/* App Content Preview */}
                                    <div className="p-6 h-full">
                                        <div className="text-center mb-6">
                                            <img
                                                src="https://i.imgur.com/B7ptMnm.png"
                                                alt="Toonly AI"
                                                className="h-16 w-16 mx-auto mb-3 drop-shadow-lg"
                                            />
                                            <h3 className="text-xl font-bold text-[#5D4037] mb-1">Toonly AI</h3>
                                            <p className="text-xs text-[#8b5e3c]">Transform • Create • Share</p>
                                        </div>
                                        
                                        {/* Mock interface */}
                                        <div className="space-y-4">
                                            {/* Upload Area */}
                                            <div className="h-36 bg-white/60 rounded-xl flex flex-col items-center justify-center playful-border stitch-border relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#a87b5d]/10 to-[#8b5e3c]/10"></div>
                                                <Camera className="h-10 w-10 text-[#8b5e3c] mb-2 relative z-10" />
                                                <p className="text-xs text-[#5D4037] font-medium relative z-10">Tap to capture</p>
                                            </div>
                                            
                                            {/* Style Pills */}
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="h-10 bg-gradient-to-r from-[#8b5e3c]/40 to-[#a87b5d]/40 rounded-full flex items-center justify-center">
                                                    <Palette className="h-4 w-4 text-[#5D4037]" />
                                                </div>
                                                <div className="h-10 bg-gradient-to-r from-[#a87b5d]/60 to-[#8b5e3c]/60 rounded-full flex items-center justify-center playful-shadow">
                                                    <Star className="h-4 w-4 text-white" />
                                                </div>
                                                <div className="h-10 bg-gradient-to-r from-[#8b5e3c]/40 to-[#a87b5d]/40 rounded-full flex items-center justify-center">
                                                    <Sparkles className="h-4 w-4 text-[#5D4037]" />
                                                </div>
                                            </div>
                                            
                                            {/* Transform Button */}
                                            <div className="h-12 bg-gradient-to-r from-[#8b5e3c] to-[#a87b5d] rounded-xl flex items-center justify-center playful-shadow relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                                                <Zap className="h-5 w-5 text-white mr-2" />
                                                <span className="text-white text-sm font-bold">Transform Magic</span>
                                            </div>
                                            
                                            {/* Bottom Navigation */}
                                            <div className="flex justify-around pt-4 border-t border-[#a87b5d]/20">
                                                <div className="flex flex-col items-center">
                                                    <Camera className="h-5 w-5 text-[#8b5e3c] mb-1" />
                                                    <div className="w-1 h-1 bg-[#8b5e3c] rounded-full"></div>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <Star className="h-5 w-5 text-[#a87b5d]/60 mb-1" />
                                                    <div className="w-1 h-1 bg-transparent rounded-full"></div>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <Heart className="h-5 w-5 text-[#a87b5d]/60 mb-1" />
                                                    <div className="w-1 h-1 bg-transparent rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Home Indicator */}
                                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-white/40 rounded-full"></div>
                            </div>
                            
                            {/* Floating Elements */}
                            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce shadow-lg playful-shadow">
                                <Sparkles className="h-6 w-6 text-[#3a2e23]" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg flex items-center justify-center">
                                <Heart className="h-5 w-5 text-white" />
                            </div>
                            <div className="absolute top-1/3 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-teal-400 rounded-full animate-bounce delay-700 shadow-md">
                            </div>
                            <div className="absolute top-2/3 -right-3 w-8 h-8 bg-gradient-to-br from-pink-400 to-red-400 rounded-full animate-pulse delay-1000 shadow-md flex items-center justify-center">
                                <Star className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MobileApp