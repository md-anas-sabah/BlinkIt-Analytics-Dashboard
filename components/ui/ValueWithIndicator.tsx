import React from "react";

interface ValueWithIndicatorProps {
  value: number;
  change?: number;
  percentage?: boolean;
  currency?: boolean;
  digits?: number;
}

const ValueWithIndicator: React.FC<ValueWithIndicatorProps> = ({
  value,
  change = 0,
  percentage = false,
  currency = false,
  digits = 2,
}) => {
  const formattedValue = () => {
    if (value === undefined || value === null) return "-";

    let formatted = value.toFixed(digits);

    if (currency) {
      return `₹${formatted}`;
    }

    if (percentage) {
      return `${formatted}%`;
    }

    return formatted;
  };

  return (
    <div className="flex items-center">
      <span className="mr-2">{formattedValue()}</span>
      {change !== undefined && change !== null && change !== 0 && (
        <div
          className={`flex items-center text-xs ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`mr-0.5 ${change >= 0 ? "" : "transform rotate-180"}`}
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          {Math.abs(change).toFixed(1)}%
        </div>
      )}
    </div>
  );
};

export default ValueWithIndicator;
