/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const CUBEJS_API_URL =
  "https://amaranth-muskox.aws-us-east-1.cubecloudapp.dev/cubejs-api/v1/load";
const CUBEJS_API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuZElkIjoiNDkiLCJleHAiOjE3NDM0OTYyMTIsImlzcyI6ImN1YmVjbG91ZCJ9.luqfkt0CQW_B01j5oAvl_8hicbFzPmyLXfvEZYJbej4";

export async function fetchCubeData(query: string) {
  try {
    const parsedQuery = JSON.parse(query);

    const response = await axios.post(
      CUBEJS_API_URL,
      {
        query: parsedQuery,
        queryType: "multi",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CUBEJS_API_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data from Cube.js:", error);
    return null;
  }
}

export async function fetchAllCardData(cards: any[]) {
  const results: Record<string, any> = {};

  for (const card of cards) {
    if (!card.active) continue;

    results[card.id] = {};

    for (let i = 0; i < card.query.length; i++) {
      try {
        const data = await fetchCubeData(card.query[i]);
        results[card.id][`query${i}`] = data;
      } catch (error) {
        console.error(
          `Error fetching data for card ${card.id}, query ${i}:`,
          error
        );
        results[card.id][`query${i}`] = null;
      }
    }
  }

  return results;
}

// Mock data for development purposes
export function getMockData() {
  return {
    "sales-mrp": {
      query0: {
        data: [{ "blinkit_insights_city.sales_mrp_sum": 125.49 }],
        lastMonth: 119.69,
        percentChange: 2.4,
      },
      query1: {
        data: [
          {
            "blinkit_insights_city.created_at": "2025-02-09",
            "blinkit_insights_city.sales_mrp_sum": 2.1,
          },
          {
            "blinkit_insights_city.created_at": "2025-02-10",
            "blinkit_insights_city.sales_mrp_sum": 2.3,
          },
          {
            "blinkit_insights_city.created_at": "2025-02-11",
            "blinkit_insights_city.sales_mrp_sum": 2.5,
          },
          {
            "blinkit_insights_city.created_at": "2025-02-12",
            "blinkit_insights_city.sales_mrp_sum": 3.8,
          },
          {
            "blinkit_insights_city.created_at": "2025-02-13",
            "blinkit_insights_city.sales_mrp_sum": 2.7,
          },
          {
            "blinkit_insights_city.created_at": "2025-02-14",
            "blinkit_insights_city.sales_mrp_sum": 3.5,
          },
          {
            "blinkit_insights_city.created_at": "2025-02-15",
            "blinkit_insights_city.sales_mrp_sum": 4.6,
          },
        ],
        lastMonthData: [
          {
            "blinkit_insights_city.created_at": "2025-01-09",
            "blinkit_insights_city.sales_mrp_sum": 1.8,
          },
          {
            "blinkit_insights_city.created_at": "2025-01-10",
            "blinkit_insights_city.sales_mrp_sum": 2.5,
          },
          {
            "blinkit_insights_city.created_at": "2025-01-11",
            "blinkit_insights_city.sales_mrp_sum": 2.2,
          },
          {
            "blinkit_insights_city.created_at": "2025-01-12",
            "blinkit_insights_city.sales_mrp_sum": 3.1,
          },
          {
            "blinkit_insights_city.created_at": "2025-01-13",
            "blinkit_insights_city.sales_mrp_sum": 2.6,
          },
          {
            "blinkit_insights_city.created_at": "2025-01-14",
            "blinkit_insights_city.sales_mrp_sum": 2.9,
          },
          {
            "blinkit_insights_city.created_at": "2025-01-15",
            "blinkit_insights_city.sales_mrp_sum": 3.8,
          },
        ],
      },
    },
    "quantity-sold": {
      query0: {
        data: [{ "blinkit_insights_city.quantity_sum": 125.49 }],
        lastMonth: 119.69,
        percentChange: 2.4,
      },
      query1: {
        data: [
          {
            "blinkit_insights_city.created_at": "2025-02-09",
            "blinkit_insights_city.quantity_sum": 2.1,
          },
          {
            "blinkit_insights_city.created_at": "2025-02-10",
            "blinkit_insights_city.quantity_sum": 2.3,
          },
          {
            "blinkit_insights_city.created_at": "2025-02-11",
            "blinkit_insights_city.quantity_sum": 2.5,
          },
          {
            "blinkit_insights_city.created_at": "2025-02-12",
            "blinkit_insights_city.quantity_sum": 3.8,
          },
          {
            "blinkit_insights_city.created_at": "2025-02-13",
            "blinkit_insights_city.quantity_sum": 2.7,
          },
          {
            "blinkit_insights_city.created_at": "2025-02-14",
            "blinkit_insights_city.quantity_sum": 3.5,
          },
          {
            "blinkit_insights_city.created_at": "2025-02-15",
            "blinkit_insights_city.quantity_sum": 4.6,
          },
        ],
        lastMonthData: [
          {
            "blinkit_insights_city.created_at": "2025-01-09",
            "blinkit_insights_city.quantity_sum": 1.8,
          },
          {
            "blinkit_insights_city.created_at": "2025-01-10",
            "blinkit_insights_city.quantity_sum": 2.5,
          },
          {
            "blinkit_insights_city.created_at": "2025-01-11",
            "blinkit_insights_city.quantity_sum": 2.2,
          },
          {
            "blinkit_insights_city.created_at": "2025-01-12",
            "blinkit_insights_city.quantity_sum": 3.1,
          },
          {
            "blinkit_insights_city.created_at": "2025-01-13",
            "blinkit_insights_city.quantity_sum": 2.6,
          },
          {
            "blinkit_insights_city.created_at": "2025-01-14",
            "blinkit_insights_city.quantity_sum": 2.9,
          },
          {
            "blinkit_insights_city.created_at": "2025-01-15",
            "blinkit_insights_city.quantity_sum": 3.8,
          },
        ],
      },
    },
    "top-cities": {
      query0: {
        data: [{ "blinkit_insights_city.sales_mrp_sum": 568.21 }],
        percentChange: 2.2,
      },
      query1: {
        data: [
          {
            "blinkit_insights_city.city": "New Delhi",
            "blinkit_insights_city.sales_mrp_sum": 196.51,
            percentChange: 1.2,
            percentage: 35,
          },
          {
            "blinkit_insights_city.city": "Mumbai",
            "blinkit_insights_city.sales_mrp_sum": 136.4,
            percentChange: -3.3,
            percentage: 23,
          },
          {
            "blinkit_insights_city.city": "West Bengal",
            "blinkit_insights_city.sales_mrp_sum": 112.21,
            percentChange: -2.3,
            percentage: 21,
          },
          {
            "blinkit_insights_city.city": "Others",
            "blinkit_insights_city.sales_mrp_sum": 124.31,
            percentChange: 1.09,
            percentage: 21,
          },
        ],
      },
    },
    "sku-data": {
      query0: {
        data: [
          {
            "blinkit_insights_sku.sku_name": "Protein Bar 100g",
            "blinkit_insights_sku.sales_mrp_sum": 93132.12,
            "blinkit_insights_sku.out_of_stock_percentage": 1.68,
            "blinkit_insights_sku.inventory_sum": 931.9,
            "blinkit_insights_sku.average_rank": 3.2,
            "blinkit_insights_sku.estimated_traffic": 12303,
            "blinkit_insights_sku.estimated_impressions": 25005,
            "blinkit_insights_sku.ctr_percentage": 1.09,
          },
          {
            "blinkit_insights_sku.sku_name": "Choco Bar 100g",
            "blinkit_insights_sku.sales_mrp_sum": 8526.32,
            "blinkit_insights_sku.out_of_stock_percentage": 6.79,
            "blinkit_insights_sku.inventory_sum": 679,
            "blinkit_insights_sku.average_rank": 7,
            "blinkit_insights_sku.estimated_traffic": 3005,
            "blinkit_insights_sku.estimated_impressions": 4231,
            "blinkit_insights_sku.ctr_percentage": 0.79,
            percentChange: 2.4,
          },
          {
            "blinkit_insights_sku.sku_name": "Granola Bar 100g",
            "blinkit_insights_sku.sales_mrp_sum": 7012.72,
            "blinkit_insights_sku.out_of_stock_percentage": 3.28,
            "blinkit_insights_sku.inventory_sum": 328,
            "blinkit_insights_sku.average_rank": 4,
            "blinkit_insights_sku.estimated_traffic": 2960,
            "blinkit_insights_sku.estimated_impressions": 3657,
            "blinkit_insights_sku.ctr_percentage": 0.64,
            percentChange: 2.4,
          },
          {
            "blinkit_insights_sku.sku_name": "SKU 3",
            "blinkit_insights_sku.sales_mrp_sum": 9313,
            "blinkit_insights_sku.out_of_stock_percentage": 1.68,
            "blinkit_insights_sku.inventory_sum": 931.9,
            "blinkit_insights_sku.average_rank": 11,
            "blinkit_insights_sku.estimated_traffic": 1931.9,
            "blinkit_insights_sku.estimated_impressions": 9313,
            "blinkit_insights_sku.ctr_percentage": 1.09,
          },
          {
            "blinkit_insights_sku.sku_name": "SKU 4",
            "blinkit_insights_sku.sales_mrp_sum": 0,
            "blinkit_insights_sku.out_of_stock_percentage": 0,
            "blinkit_insights_sku.inventory_sum": 0,
            "blinkit_insights_sku.average_rank": 0,
            "blinkit_insights_sku.estimated_traffic": 0,
            "blinkit_insights_sku.estimated_impressions": 0,
            "blinkit_insights_sku.ctr_percentage": 0,
          },
        ],
        total: {
          "blinkit_insights_sku.sales_mrp_sum": 293132.12,
          "blinkit_insights_sku.out_of_stock_percentage": 16,
          "blinkit_insights_sku.inventory_sum": 2931,
          "blinkit_insights_sku.average_rank": 8.3,
          "blinkit_insights_sku.estimated_traffic": 61985,
          "blinkit_insights_sku.estimated_impressions": 261768,
          "blinkit_insights_sku.ctr_percentage": 1.09,
        },
      },
    },
    "city-data": {
      query0: {
        data: [
          {
            "blinkit_insights_city.city": "Delhi",
            "blinkit_insights_city.sales_mrp_sum": 93132.12,
            "blinkit_insights_city.out_of_stock_percentage": 1.68,
            "blinkit_insights_city.inventory_sum": 931.9,
            "blinkit_insights_city.average_rank": 3.2,
            "blinkit_insights_city.estimated_traffic": 12303,
            "blinkit_insights_city.estimated_impressions": 25005,
            "blinkit_insights_city.ctr_percentage": 1.09,
          },
          {
            "blinkit_insights_city.city": "Mumbai",
            "blinkit_insights_city.sales_mrp_sum": 8526.32,
            "blinkit_insights_city.out_of_stock_percentage": 6.79,
            "blinkit_insights_city.inventory_sum": 679,
            "blinkit_insights_city.average_rank": 7,
            "blinkit_insights_city.estimated_traffic": 3005,
            "blinkit_insights_city.estimated_impressions": 4231,
            "blinkit_insights_city.ctr_percentage": 0.79,
          },
          {
            "blinkit_insights_city.city": "Bengaluru",
            "blinkit_insights_city.sales_mrp_sum": 7012.72,
            "blinkit_insights_city.out_of_stock_percentage": 3.28,
            "blinkit_insights_city.inventory_sum": 328,
            "blinkit_insights_city.average_rank": 4,
            "blinkit_insights_city.estimated_traffic": 2960,
            "blinkit_insights_city.estimated_impressions": 3657,
            "blinkit_insights_city.ctr_percentage": 0.64,
            percentChange: 2.4,
          },
          {
            "blinkit_insights_city.city": "City 3",
            "blinkit_insights_city.sales_mrp_sum": 9313,
            "blinkit_insights_city.out_of_stock_percentage": 1.68,
            "blinkit_insights_city.inventory_sum": 931.9,
            "blinkit_insights_city.average_rank": 11,
            "blinkit_insights_city.estimated_traffic": 1931.9,
            "blinkit_insights_city.estimated_impressions": 9313,
            "blinkit_insights_city.ctr_percentage": 1.09,
          },
          {
            "blinkit_insights_city.city": "City 4",
            "blinkit_insights_city.sales_mrp_sum": 0,
            "blinkit_insights_city.out_of_stock_percentage": 0,
            "blinkit_insights_city.inventory_sum": 0,
            "blinkit_insights_city.average_rank": 0,
            "blinkit_insights_city.estimated_traffic": 0,
            "blinkit_insights_city.estimated_impressions": 0,
            "blinkit_insights_city.ctr_percentage": 0,
          },
        ],
        total: {
          "blinkit_insights_city.sales_mrp_sum": 293132.12,
          "blinkit_insights_city.out_of_stock_percentage": 16,
          "blinkit_insights_city.inventory_sum": 2931,
          "blinkit_insights_city.average_rank": 8.3,
          "blinkit_insights_city.estimated_traffic": 61985,
          "blinkit_insights_city.estimated_impressions": 261768,
          "blinkit_insights_city.ctr_percentage": 1.09,
        },
      },
    },
  };
}
