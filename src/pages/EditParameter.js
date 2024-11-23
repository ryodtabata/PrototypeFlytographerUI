import React, { useState } from 'react';
import './EditParameter.css';

const EditParameter = () => {
  // Mock parameter data
  const [parameters, setParameters] = useState([
    { id: 'Ghosting Rate', weight: 0.5, status: 'Active' },
    { id: 'Availability', weight: 0.8, status: 'Disabled' },
    { id: 'Decline Rate', weight: 0.3, status: 'Active' },
    { id: 'isNewPhotographer', weight: 0.8, status: 'Active' },
    { id: 'Customer Reviews', weight: 0.7, status: 'Disabled' },
  ]);

  // State for showing messages
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // State for adding a new parameter
  const [newParameter, setNewParameter] = useState({
    id: '',
    weight: '',
    status: 'Active',
  });

  // Handle input change for weight
  const handleWeightChange = (index, value) => {
    const updatedParameters = [...parameters];
    updatedParameters[index].weight = value;
    setParameters(updatedParameters);
  };

  // Handle adding a new parameter
  const handleAddParameter = () => {
    const { id, weight, status } = newParameter;

    // Validate new parameter
    if (!id.trim()) {
      setErrorMessage('Parameter ID cannot be empty.');
      return;
    }
    if (!/^\d+(\.\d+)?$/.test(weight) || weight < 0 || weight > 1) {
      setErrorMessage('Weight must be a valid decimal value between 0 and 1.');
      return;
    }

    // Add new parameter
    setParameters([...parameters, { id, weight: parseFloat(weight), status }]);
    setNewParameter({ id: '', weight: '', status: 'Active' });
    setErrorMessage('');
    setShowMessage(true);

    // Hide success message after 2 seconds
    setTimeout(() => setShowMessage(false), 2000);
  };

  // Function to handle saving a parameter
  const handleSave = (index) => {
    const weight = parameters[index].weight;

    // Validate weight
    if (!/^\d+(\.\d+)?$/.test(weight) || weight < 0 || weight > 1) {
      setErrorMessage('Weight must be a valid decimal value between 0 and 1.');
      return;
    }

    // Clear any error message and show success message
    setErrorMessage('');
    setShowMessage(true);

    // Hide success message after 2 seconds
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div>
      <h1>Edit Parameters</h1>
      <table className="parameters-table">
        <thead>
          <tr>
            <th>Parameter ID</th>
            <th>Weight</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param, index) => (
            <tr key={index}>
              <td>{param.id}</td>
              <td>
                <input
                  type="text"
                  value={param.weight}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                />
              </td>
              <td>
                <select
                  value={param.status}
                  onChange={(e) => {
                    const updatedParameters = [...parameters];
                    updatedParameters[index].status = e.target.value;
                    setParameters(updatedParameters);
                  }}
                  className="status-dropdown"
                >
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </td>
              <td>
                <button className="save-button" onClick={() => handleSave(index)}>
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showMessage && <div className="update-message">Parameter updated!</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <h2>Add New Parameter</h2>
      <div className="add-parameter-form">
        <input
          type="text"
          placeholder="Parameter ID"
          value={newParameter.id}
          onChange={(e) => setNewParameter({ ...newParameter, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Weight (0 to 1)"
          value={newParameter.weight}
          onChange={(e) => setNewParameter({ ...newParameter, weight: e.target.value })}
        />
        <select
          value={newParameter.status}
          onChange={(e) => setNewParameter({ ...newParameter, status: e.target.value })}
          className="status-dropdown"
        >
          <option value="Active">Active</option>
          <option value="Disabled">Disabled</option>
        </select>
        <button className="add-button" onClick={handleAddParameter}>
          Add Parameter
        </button>
      </div>
    </div>
  );
};

export default EditParameter;
