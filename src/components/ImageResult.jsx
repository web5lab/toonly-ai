import { cn } from "@/lib/utils";
import { dataURLtoBlob } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, Image as ImageIcon, ToggleLeft, ToggleRight, Share, Eye, X } from "lucide-react";
import { useState } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function ImageResult({
  imageUrl,
  isLoading,
  formattedProcessingTime,
  originalImageUrl,
  className,
  onDownload
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleShareImage = async () => {
    if (!imageUrl) {
      toast.error("No image to share");
      return;
    }

    // Check if Web Share API is supported
    if (!navigator.share) {
      toast.error("Sharing is not supported in your browser. Please download the image instead.");
      return;
    }

    setIsSharing(true);

    try {
      // Convert data URL to Blob
      const blob = await dataURLtoBlob(imageUrl);

      // Create a File object from the Blob
      const file = new File([blob], `toonly-ai-transformed-${Date.now()}.png`, {
        type: 'image/png',
      });

      // Check if the browser supports sharing files
      if (navigator.canShare && !navigator.canShare({ files: [file] })) {
        toast.error("Your browser doesn't support sharing images. Please download instead.");
        return;
      }

      // Share the image
      await navigator.share({
        title: 'My Toonly AI Transformation',
        text: 'Check out my AI-transformed image created with Toonly AI! 🎨✨',
        files: [file],
      });

      toast.success("Image shared successfully!");
    } catch (error) {
      // User cancelled sharing or other error occurred
      if (error.name === 'AbortError') {
        // User cancelled, don't show error
        console.log('User cancelled sharing');
      } else {
        console.error('Error sharing image:', error);
        toast.error("Failed to share image. Please try downloading instead.");
      }
    } finally {
      setIsSharing(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          "relative flex flex-col items-center justify-center h-full min-h-[400px] bg-[#f4efe4]",
          className
        )}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#a87b5d] border-t-transparent rounded-full mx-auto animate-spin mb-4"></div>
          <p className="text-lg font-medium text-[#5D4037]">Processing image...</p>
          <p className="text-sm text-[#8b5e3c] mt-1">This may take a moment</p>
        </div>
        <div className="absolute bottom-4 right-4 bg-[#3a2e23]/80 text-white text-xs font-mono px-2 py-1 rounded">
          {formattedProcessingTime}s
        </div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center h-full min-h-[400px] bg-[#f4efe4]",
          className
        )}
      >
        <div className="text-center p-6">
          <ImageIcon className="h-16 w-16 mx-auto mb-4 text-[#a87b5d]" />
          <p className="text-lg font-medium text-[#5D4037]">No image processed yet</p>
          <p className="text-sm text-[#8b5e3c] mt-1">
            Upload an image and select a style to get started
          </p>
        </div>
      </div>
    );
  }

  // Show comparison view if both images are available and comparison is enabled
  if (showComparison && originalImageUrl && imageUrl) {
    return (
      <div className={cn("relative h-full bg-[#f4efe4]", className)}>
        <BeforeAfterSlider
          beforeImage={originalImageUrl}
          afterImage={imageUrl}
          className="w-full h-full"
        />

        {/* Toggle Button */}
        <Button
          onClick={() => setShowComparison(false)}
          className="absolute top-4 left-4 bg-[#8b5e3c]/90 hover:bg-[#6d4c30] text-white z-20"
          variant="default"
          size="sm"
        >
          <ToggleLeft className="h-4 w-4 mr-2" />
          <span>Single View</span>
        </Button>

        {/* Download Button */}
        {onDownload && (
          <Button
            onClick={onDownload}
            className="absolute bottom-4 right-4 bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow z-20"
            variant="default"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            <span>Download Result</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative h-full bg-[#f4efe4] min-h-[400px]", className)}>
      {/* Image Container */}
      <div className="relative w-full h-full flex items-center justify-center p-4 pb-20">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-10 h-10 border-4 border-[#a87b5d] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <img
          src={imageUrl}
          alt="Processed image"
          className={cn(
            "object-contain max-w-full max-h-full rounded-xl shadow-lg",
            !isImageLoaded && "opacity-0"
          )}
          style={{ maxHeight: 'calc(100% - 80px)' }}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      {/* Action Buttons - Fixed positioning outside image container */}
      {isImageLoaded && (
        <div className="absolute bottom-4 right-4 flex gap-2 flex-wrap z-30">
          {/* Preview Button */}
          <Button
            onClick={() => setShowPreview(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
            variant="default"
            size="sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Preview</span>
          </Button>

          {/* Download Button */}
          {onDownload && (
            <Button
              onClick={onDownload}
              className="bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] shadow-lg hover:shadow-xl transition-all"
              variant="default"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          )}
        </div>
      )}

      {/* Full Screen Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 text-white border-none"
              variant="ghost"
              size="icon"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Full Screen Image */}
            <img
              src={imageUrl}
              alt="Full screen preview"
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: '90vh', maxWidth: '90vw' }}
            />

            {/* Action Buttons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
              {/* Download Button */}
              {onDownload && (
                <Button
                  onClick={onDownload}
                  className="bg-[#8b5e3c] hover:bg-[#6d4c30] text-white shadow-lg hover:shadow-xl transition-all"
                  variant="default"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  <span>Download</span>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}