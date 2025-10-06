import React from 'react'
import { Button } from "@/components/ui/button";
import { Linkedin, ExternalLink, Heart, Code, Sparkles } from "lucide-react";

function Team() {
    return (
        <section className="py-16 bg-[#f4efe4]/70 backdrop-blur-sm rounded-xl playful-shadow playful-border mb-16 text-[#3a2e23] relative overflow-hidden paper-bg">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a87b5d]/20 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#8b5e3c]/20 rounded-full translate-y-12 -translate-x-12 animate-bounce"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 bg-[#a87b5d]/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/4 right-20 w-8 h-8 bg-[#8b5e3c]/30 rounded-full animate-bounce delay-500"></div>
            
            <div className="container max-w-6xl mx-auto text-center relative z-10">
                <div className="mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#5D4037] flex items-center justify-center gap-3">
                        <Sparkles className="h-8 w-8 text-[#8b5e3c]" />
                        Meet Our Team
                    </h2>
                    <p className="text-lg text-[#614e2e]/90 max-w-3xl mx-auto">
                        The passionate minds behind ToonlyAI, dedicated to bringing AI-powered creativity to everyone
                    </p>
                </div>

                {/* Founder Profile */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl playful-shadow playful-border p-8 hover:bg-white/70 transition-all duration-300 hover:scale-105">
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            {/* Profile Image */}
                            <div className="relative">
                                <div className="w-48 h-48 rounded-full overflow-hidden playful-shadow border-4 border-[#8b5e3c]/30 relative">
                                    <img
                                        src="/images/founder.jpg"
                                        alt="Shiva Kumar - Founder"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400";
                                        }}
                                    />
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#8b5e3c] rounded-full flex items-center justify-center">
                                    <Code className="h-4 w-4 text-white" />
                                </div>
                                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <Sparkles className="h-3 w-3 text-[#3a2e23]" />
                                </div>
                            </div>

                            {/* Profile Content */}
                            <div className="flex-1 text-left lg:text-left text-center">
                                <div className="mb-4">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-[#5D4037] mb-2">
                                        Shiva Kumar
                                    </h3>
                                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                                        <span className="bg-gradient-to-r from-[#8b5e3c] to-[#a87b5d] text-white px-4 py-1.5 rounded-full text-sm font-semibold playful-shadow">
                                            Founder & CEO
                                        </span>
                                        <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <p className="text-[#614e2e] text-base leading-relaxed">
                                        <strong className="text-[#5D4037]">Visionary entrepreneur</strong> and AI enthusiast who founded ToonlyAI to make AI-powered image transformation accessible to everyone.
                                    </p>
                                    
                                    <div className="bg-[#a87b5d]/20 p-4 rounded-lg playful-border">
                                        <p className="text-[#614e2e] text-sm">
                                            Previously built <a href="https://redesignr.ai" target="_blank" rel="noopener noreferrer" className="text-[#8b5e3c] font-semibold hover:text-[#6d4c30] transition-colors underline">Redesignr.ai</a> and partnered with <strong className="text-[#8b5e3c]">Web5Lab</strong> for development.
                                        </p>
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="bg-gradient-to-r from-[#8b5e3c]/10 to-[#a87b5d]/10 p-4 rounded-lg mb-6 border-l-4 border-[#8b5e3c]">
                                    <p className="text-[#5D4037] italic text-sm leading-relaxed">
                                        "I believe creativity should have no boundaries. ToonlyAI empowers people to express themselves through AI-powered art transformation."
                                    </p>
                                    <p className="text-[#8b5e3c] text-xs mt-2 font-medium">- Shiva Kumar, Founder</p>
                                </div>

                                {/* LinkedIn Button */}
                                <div className="flex justify-center lg:justify-start">
                                    <Button
                                        asChild
                                        className="bg-[#0077b5] hover:bg-[#005885] text-white playful-shadow flex items-center gap-2 px-6 py-3"
                                    >
                                        <a 
                                            href="https://linkedin.com/in/helloshiva" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            <Linkedin className="h-5 w-5" />
                                            <span>Connect on LinkedIn</span>
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Team