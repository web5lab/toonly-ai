import { useState, useRef, useEffect } from "react";

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
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
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-lg select-none"
    >
      {/* Before Image */}
      <img
        src={beforeImage}
        alt="Before"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* After Image */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden transition-all duration-150"
        style={{ width: `${dividerPosition}%` }}
      >
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 left-0 h-full w-[2px] bg-[#8b5e3c] cursor-ew-resize shadow-md"
        style={{ left: `${dividerPosition}%` }}
        onMouseDown={() => (isDragging.current = true)}
        onTouchStart={() => (isDragging.current = true)}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#8b5e3c] border-2 border-white shadow-lg hover:scale-110 transition-transform"></div>
      </div>

      {/* Labels */}
      <div className="absolute top-2 left-2 bg-white/70 px-2 py-1 rounded text-xs font-semibold text-[#4E342E]">
        Before
      </div>
      <div className="absolute top-2 right-2 bg-white/70 px-2 py-1 rounded text-xs font-semibold text-[#4E342E]">
        After
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
