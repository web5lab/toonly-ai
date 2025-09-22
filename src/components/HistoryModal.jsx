import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Clock, 
  Download, 
  Trash2, 
  Calendar, 
  Image as ImageIcon,
  AlertTriangle,
  X
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function HistoryModal({ isOpen, onClose, history, onDeleteItem, onClearAll }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const downloadImage = (imageUrl, filename) => {
    try {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  const handleDeleteItem = (id, event) => {
    event.stopPropagation();
    onDeleteItem(id);
    toast.success("Item removed from history");
  };

  const handleClearAll = () => {
    onClearAll();
    setShowConfirmClear(false);
    toast.success("History cleared successfully");
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeDetailView = () => {
    setSelectedItem(null);
  };

  if (selectedItem) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl bg-[#3a2e23] border-[#5D4037] text-[#e9e2d6] max-h-[90vh] overflow-hidden">
          <DialogHeader className="pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <ImageIcon className="h-6 w-6 text-yellow-400" />
                Transformation Details
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeDetailView}
                className="text-[#e9e2d6] hover:bg-[#5D4037]/50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-[#e9e2d6]/80">
              Created {formatDate(selectedItem.timestamp)}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before Image */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Original</h3>
              <div className="relative bg-[#5D4037]/20 rounded-lg overflow-hidden">
                <img
                  src={selectedItem.originalImage}
                  alt="Original"
                  className="w-full h-64 object-contain"
                />
                <Button
                  onClick={() => downloadImage(selectedItem.originalImage, `original-${selectedItem.id}.png`)}
                  className="absolute bottom-2 right-2 bg-[#8b5e3c] hover:bg-[#6d4c30] text-white"
                  size="sm"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* After Image */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Transformed</h3>
              <div className="relative bg-[#5D4037]/20 rounded-lg overflow-hidden">
                <img
                  src={selectedItem.processedImage}
                  alt="Transformed"
                  className="w-full h-64 object-contain"
                />
                <Button
                  onClick={() => downloadImage(selectedItem.processedImage, `transformed-${selectedItem.id}.png`)}
                  className="absolute bottom-2 right-2 bg-[#8b5e3c] hover:bg-[#6d4c30] text-white"
                  size="sm"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Style Info */}
          <div className="mt-6 p-4 bg-[#5D4037]/20 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Style Information</h4>
            <div className="space-y-2 text-sm">
              <p><span className="text-[#e9e2d6]/70">Style:</span> {selectedItem.style || 'Custom'}</p>
              {selectedItem.customPrompt && (
                <p><span className="text-[#e9e2d6]/70">Custom Prompt:</span> {selectedItem.customPrompt}</p>
              )}
              <p><span className="text-[#e9e2d6]/70">Created:</span> {new Date(selectedItem.timestamp).toLocaleString()}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={closeDetailView}
              variant="outline"
              className="flex-1 bg-transparent border-[#5D4037] text-[#e9e2d6] hover:bg-[#5D4037]/20"
            >
              Back to History
            </Button>
            <Button
              onClick={(e) => handleDeleteItem(selectedItem.id, e)}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[#3a2e23] border-[#5D4037] text-[#e9e2d6] max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Clock className="h-6 w-6 text-yellow-400" />
            Transformation History
          </DialogTitle>
          <DialogDescription className="text-[#e9e2d6]/80">
            Your recent transformations are stored locally on your device. We never store your images on our servers.
          </DialogDescription>
        </DialogHeader>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ImageIcon className="h-16 w-16 text-[#5D4037]/50 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No History Yet</h3>
            <p className="text-[#e9e2d6]/70">
              Transform some images to see them appear here!
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-[#e9e2d6]/70">
                {history.length} transformation{history.length !== 1 ? 's' : ''} saved locally
              </p>
              <Button
                onClick={() => setShowConfirmClear(true)}
                variant="outline"
                size="sm"
                className="bg-transparent border-red-500 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="relative bg-[#5D4037]/20 rounded-lg overflow-hidden cursor-pointer hover:bg-[#5D4037]/30 transition-colors group"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="aspect-square relative">
                      <img
                        src={item.processedImage}
                        alt="Transformed"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                    
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#e9e2d6]/70 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(item.timestamp)}
                        </span>
                        <Button
                          onClick={(e) => handleDeleteItem(item.id, e)}
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm font-medium text-white truncate">
                        {item.style || 'Custom Style'}
                      </p>
                      {item.customPrompt && (
                        <p className="text-xs text-[#e9e2d6]/60 truncate mt-1">
                          {item.customPrompt}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}

        {/* Clear All Confirmation */}
        {showConfirmClear && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#3a2e23] border border-[#5D4037] rounded-lg p-6 max-w-sm mx-4">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Clear All History?</h3>
              </div>
              <p className="text-[#e9e2d6]/80 mb-6">
                This will permanently delete all {history.length} transformation{history.length !== 1 ? 's' : ''} from your local history. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowConfirmClear(false)}
                  variant="outline"
                  className="flex-1 bg-transparent border-[#5D4037] text-[#e9e2d6] hover:bg-[#5D4037]/20"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleClearAll}
                  variant="destructive"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}