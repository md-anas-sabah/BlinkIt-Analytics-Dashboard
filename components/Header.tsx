import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="flex items-center">
        <div className="flex items-center mr-6 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 mr-2"
          >
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span className="text-sm font-medium">
            Aug 01, 024 - Aug 03, 2024
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div className="flex items-center">
          <div className="h-6 w-6 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 cursor-pointer mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
            </svg>
          </div>
          <div className="flex items-center justify-center w-12 h-6 mx-px bg-gray-100 text-gray-800 text-xs font-medium">
            1
          </div>
          <div className="h-6 w-6 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 cursor-pointer ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
