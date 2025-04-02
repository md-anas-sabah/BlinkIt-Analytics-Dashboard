import React, { useState, KeyboardEvent } from "react";

type SizeOption = "small" | "medium" | "large";

interface SizeMap {
  [key: string]: { width: number; height: number };
}

interface ToggleSwitchProps {
  initialState?: boolean;
  greenColor?: string;
  size?: SizeOption;
  onChange?: (isOn: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  initialState = false,
  greenColor = "#2e7d62",
  size = "medium",
  onChange,
}) => {
  const [isOn, setIsOn] = useState<boolean>(initialState);

  const sizeMap: SizeMap = {
    small: { width: 30, height: 18 },
    medium: { width: 56, height: 32 },
    large: { width: 72, height: 40 },
  };

  const { width, height } = sizeMap[size] || sizeMap.medium;

  const circleSize: number = height - 4;
  const circlePosition: number = isOn ? width - circleSize - 2 : 2;

  const handleToggle = (): void => {
    const newState = !isOn;
    setIsOn(newState);
    onChange?.(newState);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      handleToggle();
      e.preventDefault();
    }
  };

  return (
    <div
      className="relative cursor-pointer rounded-full transition-all duration-300 ease-in-out"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: isOn ? greenColor : "#e2e8f0",
      }}
      onClick={handleToggle}
      role="switch"
      aria-checked={isOn}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute bg-white rounded-full shadow-md transition-all duration-300 ease-in-out"
        style={{
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          top: "2px",
          left: `${circlePosition}px`,
        }}
      />
    </div>
  );
};

export default ToggleSwitch;
