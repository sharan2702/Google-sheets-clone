import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { executeFormula } from '../redux/sheetSlice';

const FormulaBar = () => {
  const [formula, setFormula] = useState('');
  const dispatch = useDispatch();
  const selectedCell = useSelector((state) => state.sheet.selectedCell);

  const handleFormulaSubmit = (e) => {
    if (e.key === 'Enter' && selectedCell) {
      const { row, col } = selectedCell;
      dispatch(executeFormula({ row, col, formula }));
      setFormula(''); // Clear formula input
    }
  };

  return (
    <div className="formula-bar">
      <input
        type="text"
        placeholder="Enter formula (e.g., =SUM(A1:A3))"
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
        onKeyDown={handleFormulaSubmit}
      />
    </div>
  );
};

export default FormulaBar;
