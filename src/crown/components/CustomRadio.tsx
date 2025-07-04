// CustomRadio.jsx
import React from "react";

interface CustomRadioProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer transition-all ${
        selected ? "border-[#38AD93]" : "border-gray-200"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full border-2 ${
          selected ? "border-[#38AD93]" : "border-gray-300"
        } flex items-center justify-center`}
      >
        {selected && <div className="w-2.5 h-2.5 bg-[#38AD93] rounded-full" />}
      </div>
      <span className="text-base font-medium">{label}</span>
    </div>
  );
};

export default CustomRadio;
