import React from 'react';
import ParametersTable from '../components/ParametersTable';
import './ViewParameters.css';

const ViewParameters = () => {
  return (
    <div className="view-parameters-container">
      <h1 className="view-parameters-title">Active Parameters</h1>
      <div className="parameters-table-wrapper">
        <ParametersTable />
      </div>
    </div>
  );
};

export default ViewParameters;
