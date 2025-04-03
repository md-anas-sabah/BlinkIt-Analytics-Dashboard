/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface SemiPieChartProps {
  title: string;
  data: any;
  colors?: string[];
}

const SemiPieChartComponent: React.FC<SemiPieChartProps> = ({
  title,
  data,
  colors = ["#4F46E5", "#F43F5E", "#FB923C", "#94A3B8"],
}) => {
  if (!data || !data.query0 || !data.query1) {
    return (
      <div className="p-6 rounded-lg border border-gray-200 h-full">
        Loading...
      </div>
    );
  }

  const totalValue =
    data.query0.data[0]?.["blinkit_insights_city.sales_mrp_sum"] || 0;
  const percentChange = data.query0.percentChange || 0;

  const cityData = data.query1.data.map((item: any, index: number) => ({
    name: item["blinkit_insights_city.city"],
    value: item["blinkit_insights_city.sales_mrp_sum"],
    percentage: item.percentage || 0,
    percentChange: item.percentChange || 0,
    color: colors[index % colors.length],
  }));

  return (
    <div className="p-6 rounded-lg border border-gray-200 h-full bg-white">
      <div className="mb-4">
        <div className="text-gray-600 text-sm mb-1">{title}</div>
        <div className="flex items-baseline">
          <div className="text-2xl font-semibold mr-3">
            ₹{totalValue.toFixed(2)}
          </div>
          <div
            className={`flex items-center text-xs ${
              percentChange >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
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
              className="mr-0.5"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            {Math.abs(percentChange).toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2">
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cityData}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={45}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {cityData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-1/2">
          {cityData.map((city: any, index: number) => (
            <div key={index} className="mb-2">
              <div className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: city.color }}
                ></div>
                <div className="text-xs font-medium">{city.name}</div>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <div className="text-sm font-semibold">
                  ₹{city.value.toFixed(2)}
                </div>
                <div className="flex items-center">
                  <div className="text-xs text-gray-500 mr-2">
                    {city.percentage}%
                  </div>
                  <div
                    className={`flex items-center text-xs ${
                      city.percentChange >= 0
                        ? "text-green-600"
                        : "text-red-600"
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
                      className={`mr-0.5 ${
                        city.percentChange >= 0 ? "" : "transform rotate-180"
                      }`}
                    >
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                    {Math.abs(city.percentChange).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SemiPieChartComponent;
