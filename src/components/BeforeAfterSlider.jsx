import React, { useState, useRef, useEffect } from "react";

const BeforeAfterSlider = ({ beforeImage, afterImage, className }) => {
  const [dividerPosition, setDividerPosition] = useState(50); // in %
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseMove = (e) => {
    if (!isDragging.current || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pos = ((e.clientX - rect.left) / rect.width) * 100;
    setDividerPosition(Math.min(95, Math.max(5, pos))); // clamp
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const pos = ((touch.clientX - rect.left) / rect.width) * 100;
    setDividerPosition(Math.min(95, Math.max(5, pos)));
  };

  useEffect(() => {
    const stopDrag = () => (isDragging.current = false);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className={`relative w-full h-full rounded-xl overflow-hidden shadow-lg select-none ${className || ''}`}
    >
      {/* Before Image */}
      <img
        src={beforeImage}
        alt="Before"
        className="absolute top-0 left-0 w-full h-full object-contain bg-[#f4efe4]"
      />

      {/* After Image */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden transition-all duration-150"
        style={{ width: `${dividerPosition}%` }}
      >
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-contain bg-[#f4efe4]"
          style={{ width: `${100 * (100 / dividerPosition)}%` }}
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 left-0 h-full w-[3px] bg-[#8b5e3c] cursor-ew-resize shadow-lg z-10"
        style={{ left: `${dividerPosition}%` }}
        onMouseDown={() => (isDragging.current = true)}
        onTouchStart={() => (isDragging.current = true)}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#8b5e3c] border-3 border-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
          <div className="w-1 h-4 bg-white rounded-full"></div>
          <div className="w-1 h-4 bg-white rounded-full ml-1"></div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 bg-[#3a2e23]/80 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
        Before
      </div>
      <div className="absolute top-3 right-3 bg-[#8b5e3c]/90 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
        After
      </div>

      {/* Instructions */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
        Drag to compare
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
