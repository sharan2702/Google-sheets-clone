import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBold, toggleItalic, setFontSize } from '../redux/sheetSlice';

const Toolbar = () => {
  const dispatch = useDispatch();
  const selectedCell = useSelector((state) => state.sheet.selectedCell);

  const handleBold = () => {
    if (selectedCell) {
      dispatch(toggleBold(selectedCell));
    }
  };

  const handleItalic = () => {
    if (selectedCell) {
      dispatch(toggleItalic(selectedCell));
    }
  };

  const handleFontSizeChange = (e) => {
    const fontSize = e.target.value;
    if (selectedCell) {
      dispatch(setFontSize({ ...selectedCell, fontSize }));
    }
  };

  return (
    <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
      <button onClick={handleBold}>B</button>
      <button onClick={handleItalic}>I</button>
      <select onChange={handleFontSizeChange} defaultValue="14">
        <option value="10">10px</option>
        <option value="12">12px</option>
        <option value="14">14px</option>
        <option value="16">16px</option>
        <option value="18">18px</option>
        <option value="20">20px</option>
      </select>
    </div>
  );
};

export default Toolbar;
