import React, { useState } from "react";
// import Image from "next/image";

interface NavItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  subItems?: NavItem[];
  isOpen?: boolean;
}

const Sidebar: React.FC = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      id: "overview",
      name: "Overview",
      icon: (
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
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: "channels",
      name: "Channels",
      icon: (
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
        >
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      ),
      isOpen: true,
      subItems: [
        {
          id: "meta-ads",
          name: "Meta Ads",
          icon: null,
        },
        {
          id: "google-ads",
          name: "Google Ads",
          icon: null,
        },
        {
          id: "quick-commerce",
          name: "Quick Commerce",
          icon: null,
        },
      ],
    },
    {
      id: "creatives",
      name: "Creatives",
      icon: (
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
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
  ]);

  const toggleSubItems = (id: string) => {
    setNavItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  return (
    <div className="h-screen w-[220px] bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 border-b border-gray-200 flex items-center px-4">
        <div className="w-8 h-8 rounded overflow-hidden bg-gray-100 mr-3 flex items-center justify-center">
          <span className="text-xs font-bold text-green-600">D</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="text-sm font-semibold">Test_brand</span>
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
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="py-2">
          {navItems.map((item) => (
            <li key={item.id} className="mb-1">
              <div
                className={`flex items-center px-4 py-2 text-sm cursor-pointer ${
                  item.id === "channels"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => item.subItems && toggleSubItems(item.id)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
                {item.subItems && (
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
                    className={`ml-auto transform ${
                      item.isOpen ? "rotate-90" : ""
                    }`}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </div>

              {item.isOpen && item.subItems && (
                <ul className="pl-9 mt-1">
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem.id}
                      className={`
                        px-4 py-2 text-sm cursor-pointer
                        ${
                          subItem.id === "quick-commerce"
                            ? "text-green-700 bg-green-50 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }
                      `}
                    >
                      {subItem.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <div className="border-t border-gray-200 py-2">
          <ul>
            <li className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center">
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
                className="mr-3"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>Help</span>
            </li>
            <li className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center">
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
                className="mr-3"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Settings</span>
            </li>
          </ul>
        </div>
        <div className="px-4 py-3 flex items-center border-t border-gray-200">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            HK
          </div>
          <div className="ml-2">
            <div className="text-xs text-gray-500">Logged in as</div>
            <div className="text-sm font-medium">Humnashin Khan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
