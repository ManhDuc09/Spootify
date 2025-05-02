import React from "react";

interface ProgressSliderProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

const ProgressSlider: React.FC<ProgressSliderProps> = ({ value, max, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <input
      type="range"
      value={value}
      max={max}
      min={0}
      step={1}
      onChange={handleChange}
      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
    />
  );
};

export default ProgressSlider;
