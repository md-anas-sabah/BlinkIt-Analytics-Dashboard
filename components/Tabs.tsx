import React from "react";

interface Tab {
  id: string;
  name: string;
  color: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`
            py-3 px-6 flex items-center cursor-pointer relative
            ${
              activeTab === tab.id
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
          onClick={() => onTabChange(tab.id)}
        >
          <span
            className={`w-3 h-3 rounded-full mr-2`}
            style={{ backgroundColor: tab.color }}
          ></span>
          <span className="text-sm font-medium">{tab.name}</span>
          {activeTab === tab.id && (
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: tab.color }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
