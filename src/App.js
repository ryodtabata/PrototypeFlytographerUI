// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ViewRankings from './pages/ViewRankings';
import ViewParameters from './pages/ViewParameters';
import EditParameter from './pages/EditParameter';
import Login from './pages/Login';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" /> // If already logged in, go to the main app
            ) : (
              <Login onLogin={() => setIsAuthenticated(true)} /> // Pass login handler
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" />
          }
        >
          <Route index element={<ViewRankings />} />
          <Route path="view-parameters" element={<ViewParameters />} />
          <Route path="edit-parameter" element={<EditParameter />} />
        </Route>

        {/* Catch-All Redirect to Login or Home based on Authentication */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
