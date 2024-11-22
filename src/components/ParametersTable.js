import React from 'react';
import './ParametersTable.css';

const ParametersTable = () => {
  return (
    <table className="parameters-table">
      <thead>
        <tr>
          <th>Parameter ID</th>
          <th>Weight</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ghosting Rate</td>
          <td>0.5</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>Availability</td>
          <td>0.8</td>
          <td>Disabled</td>
        </tr>
        <tr>
          <td>Decline Rate</td>
          <td>0.3</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>isNewPhotographer</td>
          <td>0.8</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>Customer Reviews</td>
          <td>0.7</td>
          <td>Disabled</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ParametersTable;
