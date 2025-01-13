import React from 'react';
import Toolbar from './components/Toolbar';
import FormulaBar from './components/FormulaBar';
import Spreadsheet from './components/Spreadsheet';
import DataQualityBar from './components/DataQualityBar';
import ChartComponent from './components/ChartComponent';
import { useDispatch, useSelector } from 'react-redux';
import { updateCell } from './redux/sheetSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.sheet.data);

  const handleSave = () => {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spreadsheet.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = JSON.parse(event.target.result);
      Object.keys(content).forEach((row) => {
        Object.keys(content[row]).forEach((col) => {
          dispatch(updateCell({ row: parseInt(row), col: parseInt(col), value: content[row][col] }));
        });
      });
    };
    reader.readAsText(file);
  };

  return (
    <div className="app">
      <header>
        <h1>Google Sheets Clone</h1>
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <button onClick={handleSave} style={{ marginRight: '10px' }}>Save</button>
          <input
            type="file"
            accept="application/json"
            onChange={handleLoad}
            style={{ marginTop: '5px' }}
          />
        </div>
      </header>
      <Toolbar />
      <FormulaBar />
      <DataQualityBar />
      <Spreadsheet />
      <div className="chart-section">
        <ChartComponent />
      </div>
    </div>
  );
};

export default App;
