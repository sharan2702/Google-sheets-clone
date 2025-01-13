import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {}, // Stores cell values
  selectedCell: null, // Tracks the currently selected cell
  formatting: {}, // Stores formatting (bold, italic, font size) for cells
};

const sheetSlice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    // Update cell value
    updateCell(state, action) {
      const { row, col, value } = action.payload;
      if (!state.data[row]) state.data[row] = {};
      state.data[row][col] = value;
    },

    // Select a cell
    selectCell(state, action) {
      const { row, col } = action.payload;
      state.selectedCell = { row, col };
    },

    // Execute formula
    executeFormula(state, action) {
      const { row, col, formula } = action.payload;

      if (!state.data[row]) state.data[row] = {};
      if (!formula.startsWith('=')) {
        state.data[row][col] = formula; // Treat non-formulas as plain text
        return;
      }

      try {
        const func = formula.match(/^=(\w+)/)?.[1]?.toUpperCase(); // Extract function name
        const range = formula.match(/\((.*?)\)/)?.[1]; // Extract range, e.g., "A1:A3"

        if (func && range) {
          const [start, end] = range.split(':');
          const startRow = parseInt(start.slice(1)) - 1;
          const startCol = start.charCodeAt(0) - 65;
          const endRow = parseInt(end.slice(1)) - 1;
          const endCol = end.charCodeAt(0) - 65;

          const values = [];
          for (let r = startRow; r <= endRow; r++) {
            for (let c = startCol; c <= endCol; c++) {
              const cellValue = parseFloat(state.data[r]?.[c] || 0);
              values.push(cellValue);
            }
          }

          let result;
          switch (func) {
            case 'SUM':
              result = values.reduce((acc, val) => acc + val, 0);
              break;
            case 'AVERAGE':
              result = values.reduce((acc, val) => acc + val, 0) / values.length;
              break;
            case 'MAX':
              result = Math.max(...values);
              break;
            case 'MIN':
              result = Math.min(...values);
              break;
            case 'COUNT':
              result = values.filter((val) => !isNaN(val)).length;
              break;
            default:
              result = 'Invalid Function';
          }

          state.data[row][col] = result.toString();
        } else {
          state.data[row][col] = 'Invalid Formula';
        }
      } catch {
        state.data[row][col] = 'Error';
      }
    },

    // Toggle bold formatting
    toggleBold(state, action) {
      const { row, col } = action.payload;
      if (!state.formatting[row]) state.formatting[row] = {};
      if (!state.formatting[row][col]) state.formatting[row][col] = {};
      state.formatting[row][col].bold = !state.formatting[row][col].bold;
    },

    // Toggle italic formatting
    toggleItalic(state, action) {
      const { row, col } = action.payload;
      if (!state.formatting[row]) state.formatting[row] = {};
      if (!state.formatting[row][col]) state.formatting[row][col] = {};
      state.formatting[row][col].italic = !state.formatting[row][col].italic;
    },

    // Set font size
    setFontSize(state, action) {
      const { row, col, fontSize } = action.payload;
      if (!state.formatting[row]) state.formatting[row] = {};
      if (!state.formatting[row][col]) state.formatting[row][col] = {};
      state.formatting[row][col].fontSize = fontSize;
    },

    // Trim cell value
    trimCell(state, action) {
      const { row, col } = action.payload;
      if (state.data[row]?.[col]) {
        state.data[row][col] = state.data[row][col].trim();
      }
    },

    // Convert cell value to uppercase
    upperCaseCell(state, action) {
      const { row, col } = action.payload;
      if (state.data[row]?.[col]) {
        state.data[row][col] = state.data[row][col].toUpperCase();
      }
    },

    // Convert cell value to lowercase
    lowerCaseCell(state, action) {
      const { row, col } = action.payload;
      if (state.data[row]?.[col]) {
        state.data[row][col] = state.data[row][col].toLowerCase();
      }
    },

    // Find and replace text in a range
    findAndReplace(state, action) {
      const { range, findText, replaceText } = action.payload;
      const [start, end] = range.split(':');
      const startRow = parseInt(start.slice(1)) - 1;
      const startCol = start.charCodeAt(0) - 65;
      const endRow = parseInt(end.slice(1)) - 1;
      const endCol = end.charCodeAt(0) - 65;

      for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
          if (state.data[r]?.[c]?.includes(findText)) {
            state.data[r][c] = state.data[r][c].replace(findText, replaceText);
          }
        }
      }
    },

    // Remove duplicates
    removeDuplicates(state, action) {
      const { range } = action.payload;
      const [start, end] = range.split(':');
      const startRow = parseInt(start.slice(1)) - 1;
      const startCol = start.charCodeAt(0) - 65;
      const endRow = parseInt(end.slice(1)) - 1;
      const endCol = end.charCodeAt(0) - 65;

      const seenRows = new Set();
      for (let r = startRow; r <= endRow; r++) {
        let rowKey = '';
        for (let c = startCol; c <= endCol; c++) {
          rowKey += (state.data[r]?.[c] || '') + '|'; // Combine all cell values in a row
        }

        if (seenRows.has(rowKey)) {
          // Clear duplicate row
          for (let c = startCol; c <= endCol; c++) {
            if (state.data[r]) {
              delete state.data[r][c];
            }
          }
        } else {
          seenRows.add(rowKey); // Add row to seenRows
        }
      }
    },
  },
});

export const {
  updateCell,
  selectCell,
  executeFormula,
  toggleBold,
  toggleItalic,
  setFontSize,
  trimCell,
  upperCaseCell,
  lowerCaseCell,
  findAndReplace,
  removeDuplicates,
} = sheetSlice.actions;

export default sheetSlice.reducer;
