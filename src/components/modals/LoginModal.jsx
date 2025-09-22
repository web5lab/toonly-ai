import React from 'react'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { GALLERY_ITEMS } from '../../data/data';

function LoginModal({ isAuthModalOpen, setIsAuthModalOpen, handleLoginWithGoogle }) {
    const WIZARD_IMAGE_URL = "https://i.imgur.com/B7ptMnm.png";
    return (
        <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
            <DialogContent className="sm:max-w-5xl bg-[#3a2e23] border-[#5D4037] p-0 rounded-2xl text-[#e9e2d6] overflow-hidden">
                <div className="flex flex-col md:flex-row h-full">

                    {/* Left Column: Gallery Grid */}
                    <div className="md:w-1/2 p-4 hidden md:grid grid-cols-3 gap-2 bg-[#2a1f17] overflow-y-auto border-r border-[#5D4037]">
                        {GALLERY_ITEMS.slice(0, 12).map((item) => (
                            <div key={item.id} className="w-full h-24 rounded-lg overflow-hidden border border-[#5D4037]">
                                <img
                                    src={item.src}
                                    alt={item.styleId}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Auth Section */}
                    <div className="flex-1 p-6 flex flex-col justify-center items-center">
                        <DialogHeader className="mb-6 text-center">
                            <img
                                src={WIZARD_IMAGE_URL}
                                alt="Toonly AI Wizard"
                                className="h-16 w-16 mx-auto mb-3"
                            />
                            <DialogTitle className="text-2xl font-bold text-white">
                                Sign In to Toonly AI
                            </DialogTitle>
                            <DialogDescription className="text-[#e9e2d6]/80 text-sm mt-1">
                                Welcome back! Sign in with Google to access your account.
                            </DialogDescription>
                        </DialogHeader>

                        <Button
                            onClick={handleLoginWithGoogle}

                            variant="outline"
                            className="w-full max-w-sm bg-white hover:bg-gray-50 text-gray-900 border-gray-300 disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {/* Google Icon */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Sign in with Google'
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal
