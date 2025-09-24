import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, X, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";



export function ImageUpload({ onImageSelect, className, isUploading = false }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (file) => {
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result);
    };
    reader.readAsDataURL(file);
    onImageSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleClearImage = () => {
    setPreviewUrl(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {!previewUrl ? (
        <div
          className={cn(
            "border-[3px] border-dashed rounded-xl p-4 flex flex-col items-center justify-center h-full transition-all stitch-border bg-[#f4efe4]",
            isDragging ? "border-[#6d4c30] bg-[#a87b5d]/10" : "border-[#a87b5d] hover:border-[#6d4c30] hover:bg-[#a87b5d]/5",
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 text-[#8b5e3c] mb-2" />
          <p className="text-base font-medium mb-1 text-[#5D4037]">Drag & drop an image</p>
          <p className="text-sm text-[#8b5e3c] mb-4">PNG, JPG, WEBP (max 10MB)</p>
          <input
            id="image-upload"
            type="file"
            className="sr-only"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />
          <Button
            onClick={() => document.getElementById('image-upload')?.click()}
            type="button"
            className="bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow"
          >
            <span>Select Image</span>
          </Button>
        </div>
      ) : (
        <div className="relative w-full max-h-[500px] rounded-xl bg-[#f4efe4] flex items-center justify-center overflow-hidden">
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl z-20">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm font-medium">Uploading image...</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm z-10 rounded-full text-white"
            onClick={handleClearImage}
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove image</span>
          </Button>
          <img
            src={previewUrl}
            alt="Preview"
            className="object-contain max-w-full max-h-[500px]"
          />
        </div>

      )}
    </div>
  );
}
