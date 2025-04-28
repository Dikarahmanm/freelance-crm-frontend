import React from 'react';

interface TableProps<T> {
  columns: { key: string; label: string }[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

const Table = <T,>({ columns, data, renderRow }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {renderRow(item)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;