import React, { useState } from 'react';
import Cell from './Cell';

const Spreadsheet = () => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);

  const addRow = () => setRows(rows + 1);
  const addColumn = () => setCols(cols + 1);

  return (
    <div className="spreadsheet">
      <table className="table"> {/* Add className="table" */}
        <thead>
          <tr>
            <th></th>
            {[...Array(cols)].map((_, index) => (
              <th key={index}>{String.fromCharCode(65 + index)}</th> // A, B, C, ...
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {[...Array(cols)].map((_, colIndex) => (
                <Cell key={colIndex} row={rowIndex} col={colIndex} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
    </div>
  );
};

export default Spreadsheet;
