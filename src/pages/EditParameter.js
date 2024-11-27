import React, { useState } from 'react';
import './EditParameter.css';

const EditParameter = () => {
  const [parameters, setParameters] = useState([
    { id: 'Ghosting Rate', weight: 0.5, status: 'Active', isSubmitted: false },
    { id: 'Availability', weight: 0.8, status: 'Disabled', isSubmitted: false },
    { id: 'Decline Rate', weight: 0.3, status: 'Active', isSubmitted: false },
    { id: 'isNewPhotographer', weight: 0.8, status: 'Active', isSubmitted: false },
    { id: 'Customer Reviews', weight: 0.7, status: 'Disabled', isSubmitted: false },
  ]);

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [newParameter, setNewParameter] = useState({
    id: '',
    weight: '',
    status: 'Active',
  });

  const handleWeightChange = (index, value) => {
    const updatedParameters = [...parameters];
    updatedParameters[index].weight = value;
    setParameters(updatedParameters);
  };

  const handleAddParameter = () => {
    const { id, weight, status } = newParameter;

    if (!id.trim()) {
      setErrorMessage('Parameter ID cannot be empty.');
      return;
    }
    if (!/^\d+(\.\d+)?$/.test(weight) || weight < 0 || weight > 1) {
      setErrorMessage('Weight must be a valid decimal value between 0 and 1.');
      return;
    }

    // Add new parameter with `isSubmitted` set to true
    setParameters([
      ...parameters,
      { id, weight: parseFloat(weight), status, isSubmitted: true },
    ]);
    setNewParameter({ id: '', weight: '', status: 'Active' });
    setErrorMessage('');
    setShowMessage(true);

    // Hide success message after 2 seconds
    setTimeout(() => setShowMessage(false), 2000);
  };

  const handleSave = (index) => {
    const weight = parameters[index].weight;

    if (!/^\d+(\.\d+)?$/.test(weight) || weight < 0 || weight > 1) {
      setErrorMessage('Weight must be a valid decimal value between 0 and 1.');
      return;
    }

    setErrorMessage('');
    setShowMessage(true);

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
                {param.isSubmitted ? (
                  <em>Awaiting backend review...</em>
                ) : (
                  <input
                    type="text"
                    className="weight-input"
                    value={param.weight}
                    onChange={(e) => handleWeightChange(index, e.target.value)}
                  />
                )}
              </td>
              <td>
                {param.isSubmitted ? (
                  <em>Pending</em>
                ) : (
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
                )}
              </td>
              <td>
                {!param.isSubmitted && (
                  <button
                    className="save-button"
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showMessage && <div className="update-message">Parameter submitted!</div>}
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
