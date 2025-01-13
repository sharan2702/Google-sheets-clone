import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const Chart = () => {
  const sheetData = useSelector((state) => state.sheet.data);
  const [selectedColumn, setSelectedColumn] = useState(0);

  const data = {
    labels: Object.keys(sheetData).map((row) => `Row ${parseInt(row) + 1}`),
    datasets: [
      {
        label: `Column ${String.fromCharCode(65 + selectedColumn)}`,
        data: Object.keys(sheetData).map((row) =>
          parseFloat(sheetData[row]?.[selectedColumn] || 0)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Chart</h2>
      <label>
        Select Column:
        <input
          type="number"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(parseInt(e.target.value))}
        />
      </label>
      <Bar data={data} />
    </div>
  );
};



export default Chart;

