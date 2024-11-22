import React from 'react';
import './EditParameter.css';

const EditParameter = () => {
  // Generate dropdown options for weight values
  const weightOptions = Array.from({ length: 10 }, (_, i) => (i / 10).toFixed(1));

  // Mock parameter data
  const parameters = [
    { id: 'Ghosting Rate', weight: 0.5, status: 'Active' },
    { id: 'Availability', weight: 0.8, status: 'Disabled' },
    { id: 'Decline Rate', weight: 0.3, status: 'Active' },
    { id: 'isNewPhotographer', weight: 0.8, status: 'Active' },
    { id: 'Customer Reviews', weight: 0.7, status: 'Disabled' },
  ];

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
                <select defaultValue={param.weight.toFixed(1)}>
                  {weightOptions.map((weight) => (
                    <option key={weight} value={weight}>
                      {weight}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select defaultValue={param.status}>
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </td>
              <td>
                <button className="save-button">Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditParameter;
