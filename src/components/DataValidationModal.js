import React, { useState } from 'react';

const DataValidationModal = ({ isOpen, onClose }) => {
  const [rule, setRule] = useState('');

  const applyValidation = () => {
    alert(`Validation Rule Applied: ${rule}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Data Validation</h2>
        <select value={rule} onChange={(e) => setRule(e.target.value)}>
          <option value="">Select Rule</option>
          <option value="numeric">Numeric Only</option>
          <option value="text">Text Only</option>
        </select>
        <div className="modal-actions">
          <button onClick={applyValidation}>Apply</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DataValidationModal;
