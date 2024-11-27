import React, { createContext, useState, useContext } from 'react';

// Create the context
const ParametersContext = createContext();

// Provide the context
export const ParametersProvider = ({ children }) => {
  const [parameters, setParameters] = useState([
    { id: 'Ghosting Rate', weight: 0.5, status: 'Active' },
    { id: 'Availability', weight: 0.8, status: 'Disabled' },
    { id: 'Decline Rate', weight: 0.3, status: 'Active' },
    { id: 'isNewPhotographer', weight: 0.8, status: 'Active' },
    { id: 'Customer Reviews', weight: 0.7, status: 'Disabled' },
  ]);

  return (
    <ParametersContext.Provider value={{ parameters, setParameters }}>
      {children}
    </ParametersContext.Provider>
  );
};

// Hook to use the context
export const useParameters = () => useContext(ParametersContext);
