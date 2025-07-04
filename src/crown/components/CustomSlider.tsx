import { Pause } from "@mui/icons-material";

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

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="relative w-full mb-6">
      <div className="relative">
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
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white border-4 border-teal-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          style={{ left: `${clampedPercentage}%` }}
        >
          <Pause className="w-5 h-5 text-teal-500" />
        </div>
      </div>
    </div>
  );
};

export default CustomSlider;
