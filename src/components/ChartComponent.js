import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartComponent = () => {
  const chartRef = useRef(null);
  const [chartType, setChartType] = useState('bar');
  const [range, setRange] = useState('');
  const [chartInstance, setChartInstance] = useState(null);
  const sheetData = useSelector((state) => state.sheet.data);

  const extractDataFromRange = (range) => {
    try {
      const [start, end] = range.split(':');
      const startRow = parseInt(start.slice(1)) - 1; // Convert "A1" to row index
      const startCol = start.charCodeAt(0) - 65; // Convert "A" to column index
      const endRow = parseInt(end.slice(1)) - 1;
      const endCol = end.charCodeAt(0) - 65;

      const labels = [];
      const data = [];

      for (let r = startRow; r <= endRow; r++) {
        let rowLabel = `Row ${r + 1}`;
        labels.push(rowLabel);
        let rowSum = 0;

        for (let c = startCol; c <= endCol; c++) {
          const value = parseFloat(sheetData[r]?.[c] || 0); // Default to 0 if no data
          rowSum += value;
        }

        data.push(rowSum); // Sum of the row data
      }

      return { labels, data };
    } catch (error) {
      console.error('Invalid range or error in data extraction:', error);
      return { labels: [], data: [] };
    }
  };

  const generateChart = () => {
    if (chartInstance) {
      chartInstance.destroy(); // Destroy the previous chart instance
    }

    const { labels, data } = extractDataFromRange(range);

    if (labels.length === 0 || data.length === 0) {
      alert('Invalid range or no data found!');
      return;
    }

    const ctx = chartRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: 'Chart Data',
            data,
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChartInstance(newChart);
  };

  return (
    <div>
      <div className="buttons-row">
        <input
          type="text"
          placeholder="Enter range (e.g., A1:B3)"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        />
        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
          <option value="doughnut">Doughnut</option>
        </select>
        <button onClick={generateChart}>Generate Chart</button>
      </div>
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;
