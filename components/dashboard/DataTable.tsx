/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface Column {
  id: string;
  header: string;
  accessor: (row: any) => any;
  Cell?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  subtitle: string;
  data: any;
  columns: Column[];
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  subtitle,
  data,
  columns,
}) => {
  const [selectedRows, setSelectedRows] = React.useState<
    Record<string, boolean>
  >({});

  if (!data) {
    return (
      <div className="p-6 rounded-lg border border-gray-200">Loading...</div>
    );
  }

  const tableData = data.query0?.data || [];
  const totals = data.query0?.total || {};

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAllRows = () => {
    const allSelected =
      Object.keys(selectedRows).length === tableData.length &&
      Object.values(selectedRows).every(Boolean);

    if (allSelected) {
      setSelectedRows({});
    } else {
      const newSelected: Record<string, boolean> = {};
      tableData.forEach((row: any, index: number) => {
        newSelected[index.toString()] = true;
      });
      setSelectedRows(newSelected);
    }
  };

  const allSelected =
    tableData.length > 0 &&
    Object.keys(selectedRows).length === tableData.length &&
    Object.values(selectedRows).every(Boolean);

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className="flex items-center">
            <button className="flex items-center bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium">
              <span className="mr-1">Filters(1)</span>
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
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-green-600 rounded border-gray-300"
                      checked={allSelected}
                      onChange={toggleAllRows}
                    />
                  </div>
                </th>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      {column.id === columns[0].id && (
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
                          className="mr-1"
                        >
                          <line x1="8" y1="6" x2="21" y2="6"></line>
                          <line x1="8" y1="12" x2="21" y2="12"></line>
                          <line x1="8" y1="18" x2="21" y2="18"></line>
                          <line x1="3" y1="6" x2="3.01" y2="6"></line>
                          <line x1="3" y1="12" x2="3.01" y2="12"></line>
                          <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                      )}
                      {column.header}
                      {column.id !== columns[0].id && (
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
                          className="ml-1"
                        >
                          <path d="M7 10l5 5 5-5"></path>
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row: any, rowIndex: number) => (
                <tr
                  key={rowIndex}
                  className={
                    selectedRows[rowIndex.toString()] ? "bg-gray-50" : ""
                  }
                >
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-green-600 rounded border-gray-300"
                        checked={!!selectedRows[rowIndex.toString()]}
                        onChange={() => toggleRow(rowIndex.toString())}
                      />
                    </div>
                  </td>
                  {columns.map((column) => {
                    const value = column.accessor(row);
                    return (
                      <td
                        key={column.id}
                        className="px-3 py-3 whitespace-nowrap text-sm text-gray-900"
                      >
                        {column.Cell ? column.Cell(value, row) : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Totals Row */}
              <tr className="bg-gray-50 font-medium">
                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                  Total
                </td>
                {columns.map((column, colIndex) => {
                  // Skip the first column as we added "Total" text there
                  if (colIndex === 0) return null;

                  const totalKey = column.id;
                  const totalValue = totals[totalKey] || 0;

                  return (
                    <td
                      key={column.id}
                      className="px-3 py-3 whitespace-nowrap text-sm text-gray-900"
                    >
                      {column.Cell
                        ? column.Cell(totalValue, totals)
                        : totalValue}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
