import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { trimCell, upperCaseCell, lowerCaseCell, findAndReplace, removeDuplicates } from '../redux/sheetSlice';

const DataQualityBar = () => {
  const dispatch = useDispatch();
  const [range, setRange] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  const parseRange = (rangeString) => {
    try {
      const [start, end] = rangeString.split(':');
      const startRow = parseInt(start.slice(1)) - 1;
      const startCol = start.charCodeAt(0) - 65;
      const endRow = parseInt(end.slice(1)) - 1;
      const endCol = end.charCodeAt(0) - 65;

      return { startRow, startCol, endRow, endCol };
    } catch {
      alert('Invalid range format! Use format like A1:C3.');
      return null;
    }
  };

  const handleTrim = () => {
    const parsedRange = parseRange(range);
    if (!parsedRange) return;

    const { startRow, startCol, endRow, endCol } = parsedRange;
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        dispatch(trimCell({ row, col }));
      }
    }
  };

  const handleUpperCase = () => {
    const parsedRange = parseRange(range);
    if (!parsedRange) return;

    const { startRow, startCol, endRow, endCol } = parsedRange;
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        dispatch(upperCaseCell({ row, col }));
      }
    }
  };

  const handleLowerCase = () => {
    const parsedRange = parseRange(range);
    if (!parsedRange) return;

    const { startRow, startCol, endRow, endCol } = parsedRange;
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        dispatch(lowerCaseCell({ row, col }));
      }
    }
  };

  const handleFindAndReplace = () => {
    const parsedRange = parseRange(range);
    if (!parsedRange) return;

    const { startRow, startCol, endRow, endCol } = parsedRange;
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        dispatch(findAndReplace({ row, col, findText, replaceText }));
      }
    }
  };

  const handleRemoveDuplicates = () => {
    const parsedRange = parseRange(range);
    if (!parsedRange) return;

    dispatch(removeDuplicates({ range }));
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <input
        type="text"
        placeholder="Range (e.g., A1:C3)"
        value={range}
        onChange={(e) => setRange(e.target.value)}
      />
      <button onClick={handleTrim}>Trim</button>
      <button onClick={handleUpperCase}>Uppercase</button>
      <button onClick={handleLowerCase}>Lowercase</button>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Find Text"
          value={findText}
          onChange={(e) => setFindText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace Text"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
        />
        <button onClick={handleFindAndReplace}>Find & Replace</button>
      </div>
      <button onClick={handleRemoveDuplicates} style={{ marginTop: '10px' }}>
        Remove Duplicates
      </button>
    </div>
  );
};

export default DataQualityBar;
