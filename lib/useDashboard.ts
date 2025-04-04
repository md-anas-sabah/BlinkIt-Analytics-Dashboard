/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { fetchAllCardData, getMockData } from "./cube-api";

export interface DashboardConfig {
  id: string;
  brandId: string;
  name: string;
  description: string;
  logo: string;
  active: boolean;
  cards: Card[];
}

export interface Card {
  visualizationType: "linechart" | "semipiechart" | "table";
  title: string;
  id: string;
  logo?: string;
  description?: string;
  gridstackProperties: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  query: string[];
  datatableProperties?: {
    columnOrder: string[];
    columnsPinned: string[];
    columnsVisible: Record<string, boolean>;
  };
  active: boolean;
}

export const useDashboard = () => {
  const [config, setConfig] = useState<DashboardConfig | null>(null);
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("blinkit");

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/dashboard-config.json");
        const configData = await response.json();
        setConfig(configData);

        // In a real application, we would fetch the data using the actual API
        // For this demo, we'll use mock data
        setData(getMockData());

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard config:", err);
        setError("Failed to fetch dashboard configuration");
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return {
    config,
    data,
    loading,
    error,
    activeTab,
    setActiveTab,
  };
};
