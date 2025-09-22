import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  } from "@/components/ui/select";
import { CATEGORY_OPTIONS } from "@/lib/categoryOptions";



export function StyleSelector({ 
  selectedStyle, 
  onChange, 
  customPrompt,
  onCustomPromptChange,
  className,
  disabled = false
}) {
  const [selectedCategory, setSelectedCategory] = useState("anime");
  const [useCustomPrompt, setUseCustomPrompt] = useState(false);
  
  const currentCategory = CATEGORY_OPTIONS.find(cat => cat.id === selectedCategory) || CATEGORY_OPTIONS[0];
  const availableStyles = currentCategory.styles;
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const category = CATEGORY_OPTIONS.find(cat => cat.id === categoryId);
    if (category) {
      const firstAvailableStyle = category.styles.find(style => !style.disabled && !style.comingSoon);
      if (firstAvailableStyle) {
        onChange(firstAvailableStyle.id);
      }
    }
  };

  const handleStyleModeChange = (isCustom) => {
    setUseCustomPrompt(isCustom);
    if (!isCustom) {
      // Reset to first available style when switching back to predefined
      const firstAvailableStyle = currentCategory.styles.find(style => !style.disabled && !style.comingSoon);
      if (firstAvailableStyle) {
        onChange(firstAvailableStyle.id);
      }
    } else {
      // Clear selected style when switching to custom
      onChange(null);
    }
  };
  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Style Mode Toggle */}
      <div className="space-y-2">
        <h3 className="font-medium text-lg text-[#5D4037]">Choose Style Method</h3>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "flex-1 h-auto p-3 text-left rounded-lg border border-[#a87b5d] text-[#8b5e3c] hover:border-[#8b5e3c] hover:bg-[#a87b5d]/10",
              !useCustomPrompt 
                ? "!bg-[#a87b5d]/20 !border-[#8b5e3c] !text-[#5D4037] playful-shadow" 
                : ""
            )}
            onClick={() => handleStyleModeChange(false)}
            disabled={disabled}
          >
            <div className="flex flex-col">
              <span className="font-medium">Predefined Styles</span>
              <span className="text-xs opacity-70">Choose from our curated styles</span>
            </div>
          </Button>
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "flex-1 h-auto p-3 text-left rounded-lg border border-[#a87b5d] text-[#8b5e3c] hover:border-[#8b5e3c] hover:bg-[#a87b5d]/10",
              useCustomPrompt 
                ? "!bg-[#a87b5d]/20 !border-[#8b5e3c] !text-[#5D4037] playful-shadow" 
                : ""
            )}
            onClick={() => handleStyleModeChange(true)}
            disabled={disabled}
          >
            <div className="flex flex-col">
              <span className="font-medium">Custom Prompt</span>
              <span className="text-xs opacity-70">Write your own transformation</span>
            </div>
          </Button>
        </div>
      </div>

      {useCustomPrompt ? (
        /* Custom Prompt Input */
        <div className="space-y-2">
          <Label htmlFor="custom-prompt" className="font-medium text-lg text-[#5D4037]">
            Custom Style Prompt
          </Label>
          <Input
            id="custom-prompt"
            type="text"
            placeholder="e.g., Turn this into a watercolor painting with soft brushstrokes..."
            value={customPrompt || ""}
            onChange={(e) => onCustomPromptChange(e.target.value)}
            disabled={disabled}
            className="border-[#a87b5d] bg-[#f4efe4] text-[#5D4037] placeholder:text-[#8b5e3c]/60 focus:border-[#8b5e3c] focus:ring-0"
          />
          <p className="text-xs text-[#8b5e3c]/70">
            Describe how you want your image to be transformed. Be specific for better results!
          </p>
        </div>
      ) : (
        /* Predefined Styles */
        <>
      <div className="space-y-2">
        <h3 className="font-medium text-lg text-[#5D4037]">Select Category</h3>
        <Select 
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-full border-[#a87b5d] bg-[#f4efe4] text-[#5D4037] ring-0 outline-none ring-offset-0 focus:ring-0 focus:outline-none focus:border-[#a87b5d] focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="bg-[#f4efe4] border-[#a87b5d]">
            <div className="max-h-[150px] overflow-y-auto custom-scrollbar p-1">
              {CATEGORY_OPTIONS.map((category) => (
                <SelectItem 
                  key={category.id} 
                  value={category.id} 
                  className="text-[#5D4037] focus:bg-[#a87b5d]/40 hover:bg-[#a87b5d]/20 cursor-pointer whitespace-normal"
                >
                  {category.name}
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-lg text-[#5D4037]">Select Style</h3>
        
        <div className="flex flex-wrap gap-2 max-h-20 sm:max-h-28 overflow-y-auto custom-scrollbar pr-2">
          {availableStyles.map((style) => (
            <Button
              key={style.id}
              variant="ghost"
              className={cn(
                "h-auto items-start p-3 text-left rounded-full bg-white border border-[#a87b5d] text-[#8b5e3c] hover:border-[#8b5e3c] hover:bg-[#a87b5d]/10",
                selectedStyle === style.id 
                  ? "!bg-[#a87b5d]/20 !border-[#8b5e3c] !text-[#5D4037] playful-shadow" 
                  : "",
                style.disabled || style.comingSoon ? "opacity-70 cursor-not-allowed" : ""
              )}
              onClick={() => !(style.disabled || style.comingSoon) && onChange(style.id)}
              disabled={disabled || style.disabled || style.comingSoon}>

              <div className="flex flex-col">
                <span className="font-medium">{style.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
        </>
      )}
    </div>
  );
}
