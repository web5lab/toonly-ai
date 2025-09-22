import React from 'react'
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { StyleSelector } from "@/components/StyleSelector";
import { ImageResult } from "@/components/ImageResult";
import { Loader2, Brush, Pencil, Edit } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function Hero({isAuthenticated, isSubscribed, isProcessing, isEditing, processedImageUrl, selectedStyle, customPrompt, formattedProcessingTime, handleImageSelect, handleStyleChange, setCustomPrompt, handleTransformClick, handleEditImage, downloadImage}) {
    return (
        <div className="sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto bg-[#e9e2d6]/70 backdrop-blur-sm rounded-xl playful-shadow playful-border p-4 sm:p-6 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:divide-x md:divide-[#8b5e3c]/30 min-h-[500px] sm:min-h-[600px]">
                <div className="space-y-6 md:pr-6">
                    <ImageUpload onImageSelect={handleImageSelect} isUploading={isProcessing || isEditing} />

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
                                onChange={(e) => setCustomPrompt(e.target.value)}
                                disabled={!processedImageUrl || isProcessing || isEditing}
                                className="bg-white/80 border-[#a87b5d]/60 text-[#3a2e23] placeholder:text-[#5D4037]/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8b5e3c] focus-visible:ring-offset-0 min-h-[80px] resize-none disabled:cursor-not-allowed disabled:bg-opacity-60"
                            />
                        </div>
                    )}
                    {/* --- End Edit Transformation Area --- */}

                    <StyleSelector
                        selectedStyle={selectedStyle}
                        onChange={handleStyleChange}
                        customPrompt={customPrompt}
                        onCustomPromptChange={setCustomPrompt}
                        disabled={isProcessing || isEditing || (isAuthenticated && isSubscribed && !!processedImageUrl)}
                    />

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

                        {/* New Edit Button (Subscribers Only, after transform) */}
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

                    <div className="md:hidden">
                        {/* Pass combined loading state */}
                        <ImageResult imageUrl={processedImageUrl} isLoading={isProcessing || isEditing} onDownload={downloadImage} formattedProcessingTime={formattedProcessingTime} />
                    </div>
                </div>

                <div className="md:pl-6 flex items-center justify-center h-full">
                    <div className="hidden md:block w-full h-full stitch-border rounded-xl overflow-hidden bg-[#f4efe4]">
                        {/* Pass combined loading state */}
                        <ImageResult imageUrl={processedImageUrl} isLoading={isProcessing || isEditing} onDownload={downloadImage} formattedProcessingTime={formattedProcessingTime} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero