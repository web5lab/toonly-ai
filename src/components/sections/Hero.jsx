import React from 'react'
import { useAppSelector, useAppDispatch } from "@/hooks/useAppSelector";
import { setCustomPrompt } from "@/store/slices/appSlice";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { StyleSelector } from "@/components/StyleSelector";
import { ImageResult } from "@/components/ImageResult";
import { Loader2, Brush, Pencil, Edit } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function Hero({isAuthenticated, isSubscribed, processedImageUrl, originalImageUrl, selectedStyle, formattedProcessingTime, handleImageSelect, handleStyleChange, handleTransformClick, handleEditImage, downloadImage}) {
    const dispatch = useAppDispatch();
    const { isProcessing, isEditing, customPrompt } = useAppSelector((state) => state.app);
    
    return (
        <div className="max-w-7xl mx-auto bg-[#e9e2d6]/70 backdrop-blur-sm rounded-xl playful-shadow playful-border p-4 sm:p-6 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Style Selection and Customization */}
                <div className="space-y-6">
                    {/* --- Edit Transformation Area (Subscribers Only) --- */}
                    {isAuthenticated && isSubscribed && (
                        <div className={`space-y-2 p-4 bg-white/30 rounded-lg border border-[#a87b5d]/40 shadow-inner transition-opacity duration-300 ${processedImageUrl ? 'opacity-100' : 'opacity-50'}`}>
                            <Label htmlFor="custom-prompt" className="flex items-center gap-1.5 text-sm font-semibold text-[#5D4037]">
                                <Pencil className="h-4 w-4" />
                                Edit Transformation
                            </Label>
                            <Textarea
                                id="custom-prompt"
                                placeholder={processedImageUrl ? "Describe further edits (e.g., 'add glasses', 'change background to forest')..." : "Transform an image first to enable editing."}
                                value={customPrompt}
                                onChange={(e) => dispatch(setCustomPrompt(e.target.value))}
                                disabled={!processedImageUrl || isProcessing || isEditing}
                                className="bg-white/80 border-[#a87b5d]/60 text-[#3a2e23] placeholder:text-[#5D4037]/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8b5e3c] focus-visible:ring-offset-0 min-h-[80px] resize-none disabled:cursor-not-allowed disabled:opacity-60"
                            />
                        </div>
                    )}

                    {/* Style Selection */}
                    <StyleSelector
                        selectedStyle={selectedStyle}
                        onChange={handleStyleChange}
                        customPrompt={customPrompt}
                        onCustomPromptChange={(value) => dispatch(setCustomPrompt(value))}
                        disabled={isProcessing || isEditing}
                    />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            onClick={handleTransformClick}
                            className="flex-1 bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow flex items-center justify-center gap-2 w-full sm:w-auto text-base"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Transforming...</span>
                                </>
                            ) : (
                                <>
                                    <Brush className="h-4 w-4" />
                                    <span>Transform Image</span>
                                    <img
                                        src="https://i.ibb.co/Rd8VZxC/Open-AI-Playground-2025-04-25-at-15-20-53.png"
                                        alt="Credit Icon"
                                        className="h-4 w-4"
                                    />
                                    <span>10</span>
                                </>
                            )}
                        </Button>

                        {/* Edit Button (Subscribers Only, after transform) */}
                        {isAuthenticated && isSubscribed && (
                            <Button
                                onClick={handleEditImage}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white playful-shadow flex items-center justify-center gap-2 w-full sm:w-auto text-base"
                            >
                                {isEditing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Editing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Edit className="h-4 w-4" />
                                        <span>Edit Image</span>
                                        <img
                                            src="https://i.ibb.co/Rd8VZxC/Open-AI-Playground-2025-04-25-at-15-20-53.png"
                                            alt="Credit Icon"
                                            className="h-4 w-4"
                                        />
                                        <span>5</span>
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Right Column - Generated Image (Top) and Upload Form (Bottom) */}
                <div className="space-y-6">
                    {/* Dynamic Content Based on State */}
                    {!processedImageUrl && !isProcessing && !isEditing ? (
                        /* Show Upload Form when no image is processed and not processing */
                        <div className="bg-[#f4efe4]/80 backdrop-blur-sm rounded-xl playful-shadow playful-border overflow-hidden">
                            <div className="p-4 border-b border-[#a87b5d]/30">
                                <h3 className="text-lg font-semibold text-[#5D4037]">Upload Your Image</h3>
                                <p className="text-sm text-[#8b5e3c] mt-1">Choose an image to transform with AI</p>
                            </div>
                            <div className="p-4">
                                <ImageUpload 
                                    onImageSelect={handleImageSelect} 
                                    isUploading={false}
                                    className="h-[400px]"
                                />
                            </div>
                        </div>
                    ) : (isProcessing || isEditing) ? (
                        /* Show Processing State */
                        <div className="bg-[#f4efe4]/80 backdrop-blur-sm rounded-xl playful-shadow playful-border overflow-hidden">
                            <div className="p-4 border-b border-[#a87b5d]/30">
                                <h3 className="text-lg font-semibold text-[#5D4037]">
                                    {isProcessing ? 'Transforming Image...' : 'Editing Image...'}
                                </h3>
                                <p className="text-sm text-[#8b5e3c] mt-1">
                                    AI is working its magic, please wait
                                </p>
                            </div>
                            <div className="h-[400px]">
                                <ImageResult 
                                    imageUrl={null} 
                                    isLoading={true} 
                                    onDownload={null} 
                                    formattedProcessingTime={formattedProcessingTime}
                                    className="h-full"
                                />
                            </div>
                        </div>
                    ) : (
                        /* Show Generated Image Result */
                        <div className="bg-[#f4efe4]/80 backdrop-blur-sm rounded-xl playful-shadow playful-border overflow-hidden">
                            <div className="p-4 border-b border-[#a87b5d]/30">
                                <h3 className="text-lg font-semibold text-[#5D4037]">Generated Result</h3>
                                <p className="text-sm text-[#8b5e3c] mt-1">Your AI-transformed image is ready!</p>
                            </div>
                            <div className="h-[400px] overflow-hidden">
                                <ImageResult 
                                    imageUrl={processedImageUrl} 
                                    originalImageUrl={originalImageUrl}
                                    isLoading={false} 
                                    onDownload={downloadImage} 
                                    formattedProcessingTime={formattedProcessingTime}
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                    )}

                    {/* Upload New Image Button - Show when result is displayed */}
                    {processedImageUrl && !isProcessing && !isEditing && (
                        <div className="bg-[#f4efe4]/80 backdrop-blur-sm rounded-xl playful-shadow playful-border overflow-hidden">
                            <div className="p-4 border-b border-[#a87b5d]/30">
                                <h3 className="text-lg font-semibold text-[#5D4037]">Try Another Image</h3>
                                <p className="text-sm text-[#8b5e3c] mt-1">Upload a new image to transform</p>
                            </div>
                            <div className="p-4">
                                <ImageUpload 
                                    onImageSelect={handleImageSelect} 
                                    isUploading={false}
                                    className="h-[200px]"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Hero