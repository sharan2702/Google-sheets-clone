import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCell, selectCell } from '../redux/sheetSlice';

const Cell = ({ row, col }) => {
  const dispatch = useDispatch();
  const sheetData = useSelector((state) => state.sheet.data);
  const cellFormatting = useSelector((state) => state.sheet.formatting[row]?.[col] || {});
  const selectedCell = useSelector((state) => state.sheet.selectedCell);
  const value = sheetData[row]?.[col] || '';
  const isSelected = selectedCell?.row === row && selectedCell?.col === col;

  const handleClick = () => {
    dispatch(selectCell({ row, col }));
  };

  const handleChange = (e) => {
    dispatch(updateCell({ row, col, value: e.target.value }));
  };

  const cellStyle = {
    fontWeight: cellFormatting.bold ? 'bold' : 'normal',
    fontStyle: cellFormatting.italic ? 'italic' : 'normal',
    fontSize: cellFormatting.fontSize ? `${cellFormatting.fontSize}px` : '14px',
    backgroundColor: isSelected ? '#d1e7ff' : 'transparent',
  };

  return (
    <td onClick={handleClick} style={cellStyle}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{ width: '100%', border: 'none', background: 'transparent', ...cellStyle }}
      />
    </td>
  );
};

export default Cell;
