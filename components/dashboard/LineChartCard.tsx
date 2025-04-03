/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface LineChartCardProps {
  title: string;
  data: any;
  dataKey: string;
  lastMonthDataKey?: string;
}

const LineChartCard: React.FC<LineChartCardProps> = ({
  title,
  data,
  dataKey,
  lastMonthDataKey,
}) => {
  if (!data || !data.query0 || !data.query1) {
    return (
      <div className="p-6 rounded-lg border border-gray-200 h-full">
        Loading...
      </div>
    );
  }

  const totalValue = data.query0.data[0]?.[dataKey] || 0;
  const percentChange = data.query0.percentChange || 0;
  const chartData = data.query1.data.map((item: any) => {
    const date = item[dataKey.split(".")[0] + ".created_at"] || "";
    return {
      date: date ? format(new Date(date), "dd") : "",
      value: item[dataKey] || 0,
    };
  });

  const lastMonthData = data.query1.lastMonthData?.map((item: any) => {
    const date = item[dataKey.split(".")[0] + ".created_at"] || "";
    return {
      date: date ? format(new Date(date), "dd") : "",
      value: item[dataKey] || 0,
    };
  });

  const maxValue = Math.max(
    ...chartData.map((item: any) => item.value),
    ...(lastMonthData?.map((item: any) => item.value) || [])
  );

  const yAxisTicks = [
    0,
    maxValue * 0.25,
    maxValue * 0.5,
    maxValue * 0.75,
    maxValue,
  ];

  return (
    <div className="p-6 rounded-lg border border-gray-200 h-full bg-white">
      <div className="mb-6">
        <div className="text-gray-600 text-sm mb-1">{title}</div>
        <div className="flex items-baseline">
          <div className="text-2xl font-semibold mr-3">
            {totalValue.toFixed(2)}
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
              className={`mr-0.5 ${
                percentChange >= 0
                  ? "transform rotate-0"
                  : "transform rotate-180"
              }`}
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            {Math.abs(percentChange).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 ml-2">vs 119.69 last month</div>
        </div>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "#94A3B8" }}
            />
            <YAxis
              domain={[0, maxValue]}
              ticks={yAxisTicks}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "#94A3B8" }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            {lastMonthData && (
              <Line
                type="monotone"
                dataKey="value"
                data={lastMonthData}
                stroke="#94A3B8"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
                activeDot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-start mt-2 text-xs">
        <div className="flex items-center mr-4">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
          <span className="text-gray-600">This Month</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
          <span className="text-gray-600">Last Month</span>
        </div>
      </div>
    </div>
  );
};

export default LineChartCard;
