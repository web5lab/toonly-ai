import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Lightbulb, Send, X } from "lucide-react";
import { CATEGORY_OPTIONS } from "@/lib/categoryOptions";

export function SubmitStyleModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    styleName: '',
    category: '',
    description: '',
    prompt: '',
    referenceUrl: '',
    userEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.styleName.trim()) {
      toast.error("Please enter a style name");
      return;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please provide a description");
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically send to your backend
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Style suggestion submitted successfully! We'll review it and add it to our collection.");
      
      // Reset form
      setFormData({
        styleName: '',
        category: '',
        description: '',
        prompt: '',
        referenceUrl: '',
        userEmail: ''
      });
      
      onClose();
    } catch (error) {
      toast.error("Failed to submit style suggestion. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-[#3a2e23] border-[#5D4037] text-[#e9e2d6] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            Submit New Style
          </DialogTitle>
          <DialogDescription className="text-[#e9e2d6]/80">
            Have an idea for a new transformation style? Share it with us and help expand our collection!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Style Name */}
          <div className="space-y-2">
            <Label htmlFor="styleName" className="text-white font-medium">
              Style Name *
            </Label>
            <Input
              id="styleName"
              value={formData.styleName}
              onChange={(e) => handleInputChange('styleName', e.target.value)}
              placeholder="e.g., Van Gogh Painting, Cyberpunk Neon, Medieval Art"
              className="bg-[#e9e2d6]/10 border-[#5D4037] text-white placeholder:text-[#e9e2d6]/60"
              disabled={isSubmitting}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-white font-medium">
              Category *
            </Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleInputChange('category', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="bg-[#e9e2d6]/10 border-[#5D4037] text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-[#3a2e23] border-[#5D4037] text-white">
                {CATEGORY_OPTIONS.map((category) => (
                  <SelectItem key={category.id} value={category.id} className="focus:bg-[#5D4037]/50">
                    {category.name}
                  </SelectItem>
                ))}
                <SelectItem value="new" className="focus:bg-[#5D4037]/50">
                  Suggest New Category
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the style and what makes it unique. What should the transformed image look like?"
              className="bg-[#e9e2d6]/10 border-[#5D4037] text-white placeholder:text-[#e9e2d6]/60 min-h-[100px]"
              disabled={isSubmitting}
            />
          </div>

          {/* Suggested Prompt */}
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-white font-medium">
              Suggested Prompt (Optional)
            </Label>
            <Textarea
              id="prompt"
              value={formData.prompt}
              onChange={(e) => handleInputChange('prompt', e.target.value)}
              placeholder="Suggest the AI prompt that should be used for this style transformation"
              className="bg-[#e9e2d6]/10 border-[#5D4037] text-white placeholder:text-[#e9e2d6]/60"
              disabled={isSubmitting}
            />
          </div>

          {/* Reference URL */}
          <div className="space-y-2">
            <Label htmlFor="referenceUrl" className="text-white font-medium">
              Reference Image URL (Optional)
            </Label>
            <Input
              id="referenceUrl"
              value={formData.referenceUrl}
              onChange={(e) => handleInputChange('referenceUrl', e.target.value)}
              placeholder="Link to an example image that shows this style"
              className="bg-[#e9e2d6]/10 border-[#5D4037] text-white placeholder:text-[#e9e2d6]/60"
              disabled={isSubmitting}
            />
          </div>

          {/* User Email */}
          <div className="space-y-2">
            <Label htmlFor="userEmail" className="text-white font-medium">
              Your Email (Optional)
            </Label>
            <Input
              id="userEmail"
              type="email"
              value={formData.userEmail}
              onChange={(e) => handleInputChange('userEmail', e.target.value)}
              placeholder="We'll credit you when we add your style!"
              className="bg-[#e9e2d6]/10 border-[#5D4037] text-white placeholder:text-[#e9e2d6]/60"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 bg-transparent border-[#5D4037] text-[#e9e2d6] hover:bg-[#5D4037]/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-[#3a2e23] font-semibold"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#3a2e23] border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Style
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-[#5D4037]/20 rounded-lg">
          <p className="text-sm text-[#e9e2d6]/80">
            <strong>Note:</strong> All submissions will be reviewed by our team. If approved, your style will be added to our collection and you'll be credited as the contributor!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}