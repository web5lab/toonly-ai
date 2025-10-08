import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from "@/hooks/useAppSelector";
import { setCustomPrompt } from "@/store/slices/appSlice";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { StyleSelector } from "@/components/StyleSelector";
import { ImageResult } from "@/components/ImageResult";
import { Loader2, Brush, Pencil, Edit, Wand2, ImagePlus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function Hero({isAuthenticated, isSubscribed, processedImageUrl, originalImageUrl, selectedStyle, formattedProcessingTime, handleImageSelect, handleStyleChange, handleTransformClick, handleEditImage, downloadImage, handleGenerateImage}) {
    const dispatch = useAppDispatch();
    const { isProcessing, isEditing, customPrompt } = useAppSelector((state) => state.app);
    const [activeMode, setActiveMode] = useState('edit');
    
    return (
        <div className="max-w-7xl mx-auto bg-[#e9e2d6]/70 backdrop-blur-sm rounded-xl playful-shadow playful-border p-4 sm:p-6 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Mode Selection and Controls */}
                <div className="order-2 md:order-1 space-y-6">
                    {/* Mode Selector Tabs */}
                    <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-[#f4efe4] border-2 border-[#a87b5d]/40">
                            <TabsTrigger
                                value="edit"
                                className="data-[state=active]:bg-[#8b5e3c] data-[state=active]:text-white flex items-center gap-2"
                            >
                                <Edit className="h-4 w-4" />
                                <span className="hidden sm:inline">Edit Image</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="transform"
                                className="data-[state=active]:bg-[#8b5e3c] data-[state=active]:text-white flex items-center gap-2"
                            >
                                <Wand2 className="h-4 w-4" />
                                <span className="hidden sm:inline">Transform</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="generate"
                                className="data-[state=active]:bg-[#8b5e3c] data-[state=active]:text-white flex items-center gap-2"
                            >
                                <ImagePlus className="h-4 w-4" />
                                <span className="hidden sm:inline">Generate</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Edit Image Mode */}
                        <TabsContent value="edit" className="space-y-4 mt-6">
                            <div className="space-y-2 p-4 bg-white/30 rounded-lg border border-[#a87b5d]/40 shadow-inner">
                                <Label className="flex items-center gap-1.5 text-sm font-semibold text-[#5D4037]">
                                    <Pencil className="h-4 w-4" />
                                    Edit Your Transformed Image
                                </Label>
                                <p className="text-xs text-[#8b5e3c] mb-2">
                                    {isAuthenticated && isSubscribed
                                        ? "Describe the changes you want to make to the transformed image"
                                        : "Premium feature - Subscribe to edit images"}
                                </p>
                                <Textarea
                                    placeholder={processedImageUrl ? "e.g., 'add glasses', 'change background to forest', 'make it brighter'..." : "Transform an image first to enable editing."}
                                    value={customPrompt}
                                    onChange={(e) => dispatch(setCustomPrompt(e.target.value))}
                                    disabled={!processedImageUrl || isProcessing || isEditing || !isAuthenticated || !isSubscribed}
                                    className="bg-white/80 border-[#a87b5d]/60 text-[#3a2e23] placeholder:text-[#5D4037]/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8b5e3c] focus-visible:ring-offset-0 min-h-[100px] resize-none disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </div>

                            {/* Edit Button (Subscribers Only) */}
                            {isAuthenticated && isSubscribed && (
                                <Button
                                    onClick={handleEditImage}
                                    disabled={!processedImageUrl || isProcessing || isEditing || !customPrompt.trim()}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white playful-shadow flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
                        </TabsContent>

                        {/* Transform Mode */}
                        <TabsContent value="transform" className="space-y-4 mt-6">

                            {/* Style Selection */}
                            <StyleSelector
                                selectedStyle={selectedStyle}
                                onChange={handleStyleChange}
                                customPrompt={customPrompt}
                                onCustomPromptChange={(value) => dispatch(setCustomPrompt(value))}
                                disabled={isProcessing || isEditing}
                            />

                            {/* Transform Button */}
                            <Button
                                onClick={handleTransformClick}
                                disabled={isProcessing || isEditing}
                                className="w-full bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
                        </TabsContent>

                        {/* Generate New Image Mode */}
                        <TabsContent value="generate" className="space-y-4 mt-6">
                            <div className="space-y-2 p-4 bg-white/30 rounded-lg border border-[#a87b5d]/40 shadow-inner">
                                <Label className="flex items-center gap-1.5 text-sm font-semibold text-[#5D4037]">
                                    <ImagePlus className="h-4 w-4" />
                                    Generate New Image from Prompt
                                </Label>
                                <p className="text-xs text-[#8b5e3c] mb-2">
                                    Describe the image you want to create - no upload needed
                                </p>
                                <Textarea
                                    placeholder="e.g., 'a magical forest with glowing mushrooms', 'cyberpunk city at night', 'cute cat wearing sunglasses'..."
                                    value={customPrompt}
                                    onChange={(e) => dispatch(setCustomPrompt(e.target.value))}
                                    disabled={isProcessing || isEditing}
                                    className="bg-white/80 border-[#a87b5d]/60 text-[#3a2e23] placeholder:text-[#5D4037]/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8b5e3c] focus-visible:ring-offset-0 min-h-[120px] resize-none disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </div>

                            {/* Generate Button */}
                            <Button
                                onClick={handleGenerateImage}
                                disabled={isProcessing || isEditing || !customPrompt.trim()}
                                className="w-full bg-gradient-to-r from-[#8b5e3c] to-[#6d4c30] hover:from-[#6d4c30] hover:to-[#5a3e25] text-[#FFF8E1] playful-shadow flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Generating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="h-4 w-4" />
                                        <span>Generate Image</span>
                                        <img
                                            src="https://i.ibb.co/Rd8VZxC/Open-AI-Playground-2025-04-25-at-15-20-53.png"
                                            alt="Credit Icon"
                                            className="h-4 w-4"
                                        />
                                        <span>15</span>
                                    </>
                                )}
                            </Button>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column - Generated Image (Top) and Upload Form (Bottom) */}
                <div className="order-1 md:order-2 space-y-6">
                    {/* Dynamic Content Based on State */}
                    {!processedImageUrl && !isProcessing && !isEditing ? (
                        /* Show Upload Form when no image is processed and not processing (only for edit and transform modes) */
                        activeMode !== 'generate' ? (
                            <div className="bg-[#f4efe4]/80 backdrop-blur-sm rounded-xl playful-shadow playful-border overflow-hidden">
                                <div className="p-4 border-b border-[#a87b5d]/30">
                                    <h3 className="text-lg font-semibold text-[#5D4037]">
                                        {activeMode === 'edit' ? 'Upload Image to Edit' : 'Upload Your Image'}
                                    </h3>
                                    <p className="text-sm text-[#8b5e3c] mt-1">
                                        {activeMode === 'edit'
                                            ? 'Upload and transform first, then add custom edits'
                                            : 'Choose an image to transform with AI'
                                        }
                                    </p>
                                </div>
                                <div className="p-4">
                                    <ImageUpload
                                        onImageSelect={handleImageSelect}
                                        isUploading={false}
                                        className="h-[400px]"
                                    />
                                </div>
                            </div>
                        ) : (
                            /* Show placeholder for Generate mode */
                            <div className="bg-[#f4efe4]/80 backdrop-blur-sm rounded-xl playful-shadow playful-border overflow-hidden h-[488px] flex items-center justify-center">
                                <div className="text-center p-8">
                                    <Wand2 className="h-16 w-16 mx-auto mb-4 text-[#a87b5d]" />
                                    <h3 className="text-xl font-semibold text-[#5D4037] mb-2">
                                        Generate Mode
                                    </h3>
                                    <p className="text-sm text-[#8b5e3c] max-w-sm mx-auto">
                                        No upload needed! Just describe what you want to create in the prompt field on the left, and AI will generate it for you.
                                    </p>
                                </div>
                            </div>
                        )
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

                    {/* Upload New Image Button - Show when result is displayed (not in generate mode) */}
                    {processedImageUrl && !isProcessing && !isEditing && activeMode !== 'generate' && (
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
