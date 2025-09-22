import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const BeforeAfterSlider = ({ beforeImage, afterImage, className }) => {
  const [dividerPosition, setDividerPosition] = useState(50); // in %
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const animationRef = useRef(null);

  // Auto-animate on first load
  useEffect(() => {
    const autoAnimate = () => {
      let progress = 0;
      const animate = () => {
        progress += 0.02;
        if (progress <= 1) {
          // Smooth easing function
          const easeInOut = 0.5 - Math.cos(progress * Math.PI) / 2;
          const position = 20 + (easeInOut * 60); // Animate from 20% to 80%
          setDividerPosition(position);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Return to center after animation
          setTimeout(() => {
            setDividerPosition(50);
          }, 500);
        }
      };
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start auto-animation after a short delay
    const timer = setTimeout(autoAnimate, 1000);
    
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const updatePosition = useCallback((clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setDividerPosition(Math.min(95, Math.max(5, pos)));
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    updatePosition(touch.clientX);
  }, [updatePosition]);

  const startDrag = useCallback((e) => {
    isDragging.current = true;
    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Immediately update position on click/touch
    if (e.type === 'mousedown') {
      updatePosition(e.clientX);
    } else if (e.type === 'touchstart') {
      updatePosition(e.touches[0].clientX);
    }
  }, [updatePosition]);

  const stopDrag = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleContainerClick = useCallback((e) => {
    if (!isDragging.current) {
      updatePosition(e.clientX);
    }
  }, [updatePosition]);

  const resetPosition = useCallback(() => {
    setDividerPosition(50);
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalTouchMove = (e) => handleTouchMove(e);
    const handleGlobalMouseUp = () => stopDrag();
    const handleGlobalTouchEnd = () => stopDrag();

    if (isDragging.current) {
      document.addEventListener("mousemove", handleGlobalMouseMove, { passive: false });
      document.addEventListener("touchmove", handleGlobalTouchMove, { passive: false });
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("touchend", handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("touchmove", handleGlobalTouchMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [handleMouseMove, handleTouchMove, stopDrag]);

  return (
    <div
      ref={sliderRef}
      className={`relative w-full h-full rounded-xl overflow-hidden shadow-lg select-none cursor-col-resize ${className || ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleContainerClick}
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-contain bg-[#f4efe4]"
          draggable={false}
        />
      </div>

      {/* After Image */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden transition-all duration-75 ease-out"
        style={{ width: `${dividerPosition}%` }}
      >
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-contain bg-[#f4efe4]"
          style={{ width: `${100 * (100 / dividerPosition)}%` }}
          draggable={false}
        />
      </div>

      {/* Divider Line */}
      <div
        className={`absolute top-0 h-full w-1 bg-white shadow-lg z-10 transition-all duration-75 ease-out ${
          isDragging.current || isHovering ? 'w-1' : 'w-0.5'
        }`}
        style={{ left: `${dividerPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle Circle */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-[#8b5e3c] shadow-lg transition-all duration-200 flex items-center justify-center cursor-grab active:cursor-grabbing ${
            isDragging.current || isHovering ? 'w-12 h-12 scale-110' : 'w-10 h-10'
          }`}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        >
          {/* Drag Indicator */}
          <div className="flex items-center gap-0.5">
            <div className="w-0.5 h-4 bg-[#8b5e3c] rounded-full"></div>
            <div className="w-0.5 h-4 bg-[#8b5e3c] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md backdrop-blur-sm">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-[#8b5e3c]/90 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md backdrop-blur-sm">
        After
      </div>

      {/* Instructions - only show when hovering or on first load */}
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-opacity duration-300 ${
          isHovering || dividerPosition !== 50 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Click or drag to compare
      </div>

      {/* Reset Button */}
      <Button
        onClick={resetPosition}
        className={`absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#8b5e3c] border border-[#8b5e3c]/30 shadow-md transition-all duration-200 ${
          dividerPosition !== 50 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        size="sm"
      >
        <RotateCcw className="h-3 w-3 mr-1" />
        Reset
      </Button>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div 
          className="h-full bg-[#8b5e3c] transition-all duration-75 ease-out"
          style={{ width: `${dividerPosition}%` }}
        />
      </div>
    </div>
  );
};

export default BeforeAfterSlider;