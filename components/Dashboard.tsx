/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useDashboard } from "../lib/useDashboard";
import Header from "./Header";
import Tabs from "./Tabs";
import LineChartCard from "./dashboard/LineChartCard";
import SemiPieChart from "./dashboard/SemiPieChart";
import DataTable from "./dashboard/DataTable";
import ValueWithIndicator from "./ui/ValueWithIndicator";

const Dashboard: React.FC = () => {
  const { config, data, loading, error, activeTab, setActiveTab } =
    useDashboard();

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!config || !data) {
    return <div className="p-6">No dashboard configuration found</div>;
  }

  const tabs = [
    { id: "blinkit", name: "Blinkit", color: "#F59E0B" },
    { id: "zepto", name: "Zepto", color: "#8B5CF6" },
    { id: "instamart", name: "Instamart", color: "#EC4899" },
  ];

  // Sort cards by their x position to ensure proper rendering order
  const sortedCards = [...config.cards].sort(
    (a, b) => a.gridstackProperties.x - b.gridstackProperties.x
  );

  // Generate table columns for SKU and City level data
  const generateTableColumns = (columnPrefix: string, nameField: string) => [
    {
      id: `${columnPrefix}.${nameField}`,
      header: nameField === "sku_name" ? "SKU Name" : "City",
      accessor: (row: any) => row[`${columnPrefix}.${nameField}`],
      Cell: (value: any) => <div className="font-medium">{value}</div>,
    },
    {
      id: `${columnPrefix}.sales_mrp_sum`,
      header: "Sales",
      accessor: (row: any) => row[`${columnPrefix}.sales_mrp_sum`],
      Cell: (value: any, row: any) => (
        <ValueWithIndicator value={value} change={row.percentChange} currency />
      ),
    },
    {
      id: `${columnPrefix}.out_of_stock_percentage`,
      header: "Out of Stock",
      accessor: (row: any) => row[`${columnPrefix}.out_of_stock_percentage`],
      Cell: (value: any, row: any) => (
        <ValueWithIndicator
          value={value}
          change={row.percentChange}
          percentage
        />
      ),
    },
    {
      id: `${columnPrefix}.inventory_sum`,
      header: "Total Inventory",
      accessor: (row: any) => row[`${columnPrefix}.inventory_sum`],
      Cell: (value: any) => <div>{value ? value.toFixed(1) : "-"}</div>,
    },
    {
      id: `${columnPrefix}.average_rank`,
      header: "Average Rank",
      accessor: (row: any) => row[`${columnPrefix}.average_rank`],
      Cell: (value: any, row: any) => (
        <ValueWithIndicator
          value={value}
          change={row.percentChange}
          digits={1}
        />
      ),
    },
    {
      id: `${columnPrefix}.estimated_traffic`,
      header: "Est. Traffic",
      accessor: (row: any) => row[`${columnPrefix}.estimated_traffic`],
      Cell: (value: any, row: any) => (
        <ValueWithIndicator value={value} change={row.percentChange} />
      ),
    },
    {
      id: `${columnPrefix}.estimated_impressions`,
      header: "Est. Impressions",
      accessor: (row: any) => row[`${columnPrefix}.estimated_impressions`],
      Cell: (value: any, row: any) => (
        <ValueWithIndicator value={value} change={row.percentChange} />
      ),
    },
    {
      id: `${columnPrefix}.ctr_percentage`,
      header: "CTR",
      accessor: (row: any) => row[`${columnPrefix}.ctr_percentage`],
      Cell: (value: any, row: any) => (
        <ValueWithIndicator
          value={value}
          change={row.percentChange}
          percentage
        />
      ),
    },
  ];

  return (
    <div className="flex-1 h-screen flex flex-col overflow-hidden">
      <Header title="Quick Commerce" />

      <div className="flex-1 overflow-y-auto p-6">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="grid grid-cols-3 gap-6 mb-6">
          {sortedCards.map((card) => {
            if (!card.active || card.gridstackProperties.y > 1) return null;

            switch (card.visualizationType) {
              case "linechart":
                return (
                  <LineChartCard
                    key={card.id}
                    title={card.title}
                    data={data[card.id]}
                    dataKey={
                      card.id === "sales-mrp"
                        ? "blinkit_insights_city.sales_mrp_sum"
                        : "blinkit_insights_city.quantity_sum"
                    }
                  />
                );
              case "semipiechart":
                return (
                  <SemiPieChart
                    key={card.id}
                    title={card.title}
                    data={data[card.id]}
                  />
                );
              default:
                return null;
            }
          })}
        </div>

        {sortedCards.map((card) => {
          if (!card.active || card.visualizationType !== "table") return null;

          if (card.id === "sku-data") {
            return (
              <DataTable
                key={card.id}
                title={card.title}
                subtitle={card.description || ""}
                data={data[card.id]}
                columns={generateTableColumns(
                  "blinkit_insights_sku",
                  "sku_name"
                )}
              />
            );
          }

          if (card.id === "city-data") {
            return (
              <DataTable
                key={card.id}
                title={card.title}
                subtitle={card.description || ""}
                data={data[card.id]}
                columns={generateTableColumns("blinkit_insights_city", "city")}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
