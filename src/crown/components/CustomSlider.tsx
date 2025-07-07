import { Pause } from "@mui/icons-material";
import { useState, useRef, useEffect, useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
  }
  return value.toString();
};

type CustomSliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
};

const CustomSlider = ({
  min,
  max,
  value,
  onChange,
  step = 1000,
}: CustomSliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const safeValue = Math.min(Math.max(value, min), max);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    onChange(newValue);
  }, [onChange]);

  const startDragging = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (isDragging && sliderRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = sliderRect.width;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const offsetX = clientX - sliderRect.left;

      let newPercentage = (offsetX / sliderWidth) * 100;
      newPercentage = Math.min(Math.max(newPercentage, 0), 100);

      const newValue = Math.round((newPercentage / 100) * (max - min) + min);

      const steppedValue = Math.round(newValue / step) * step;

      const clampedValue = Math.min(Math.max(steppedValue, min), max);

      onChange(clampedValue);
    }
  }, [isDragging, min, max, step, onChange]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', stopDragging);
      document.addEventListener('touchmove', handleDrag);
      document.addEventListener('touchend', stopDragging);
    }

    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', stopDragging);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging, handleDrag, stopDragging]);

  return (
    <div className="relative w-full mb-6">
      <div className="relative" ref={sliderRef}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeValue}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #2ca58d 0%, #2ca58d ${percentage}%, #c7ede7 ${percentage}%, #c7ede7 100%)`,
          }}
        />
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white border-4 border-teal-500 rounded-full flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing"
          style={{ left: `${clampedPercentage}%` }}
          onMouseDown={startDragging}
          onTouchStart={startDragging}
        >
          <Pause className="w-5 h-5 text-teal-500" />
        </div>
      </div>
    </div>
  );
};

export default CustomSlider;
