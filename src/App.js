import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ViewRankings from './pages/ViewRankings';
import ViewParameters from './pages/ViewParameters';
import EditParameter from './pages/EditParameter';
import Login from './pages/Login';
import PhotographerAnalytics from './pages/DataAnalysis'
import GlobalActivity from './pages/GlobalActivity';
import './App.css';
import { Global } from '@emotion/react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const generatePhotographers = (count = 100) => {
    const firstNames = [
      "Alice", "Bob", "Charlie", "Diana", "Edward", 
      "Fiona", "George", "Hannah", "Isaac", "Julia",
      "Kevin", "Luna", "Michael", "Nina", "Oliver",
      "Paula", "Quentin", "Rachel", "Samuel", "Tina",
      "Uma", "Victor", "Wendy", "Xavier", "Yara", "Zane"
    ];
    const lastNames = [
      "Anderson", "Brown", "Clark", "Davis", "Evans",
      "Fisher", "Garcia", "Harris", "Jackson", "King",
      "Lopez", "Martinez", "Nelson", "Owens", "Parker",
      "Quinn", "Reed", "Smith", "Taylor", "Underwood",
      "Vargas", "Walker", "Young", "Zimmerman"
    ];
  
    const photographers = Array.from({ length: count }, (_, i) => {
      // Generate random values for parameters
      const ghostingRate = parseFloat((Math.random() * 20).toFixed(2)); // 0-20%
      const availability = parseFloat((Math.random() * 100).toFixed(2)); // 0-100%
      const declineRate = parseFloat((Math.random() * 20).toFixed(2)); // 0-20%
      const isNewPhotographer = Math.random() > 0.5 ? 1 : 0; // 0 or 1
      const customerReviews = parseFloat((3 + Math.random() * 2).toFixed(2)); // 3.0-5.0 stars
  
      // Calculate score
      const score =
        (100 - ghostingRate) * 0.3 +
        availability * 0.4 -
        declineRate * 0.2 +
        isNewPhotographer * 5 +
        customerReviews * 20;
  
      // Generate random name
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName =
        lastNames[Math.floor(Math.random() * lastNames.length)];
  
      return {
        id: `PHT-${1000 + i}`,
        name: `${firstName} ${lastName}`,
        ghostingRate,
        availability,
        declineRate,
        isNewPhotographer,
        customerReviews,
        score: parseFloat(score.toFixed(2)), // Round to 2 decimals
      };
    });
  
    return photographers;
  };
  
  // Generate 100 photographers
  const photographers = generatePhotographers();
  
  
  



  const handleLogin = () => {
    setIsLoading(true); // Show loading screen
    setTimeout(() => {
      setIsAuthenticated(true); // Set authenticated state after loading
      setIsLoading(false); // Remove loading screen
    }, 2000); // Simulate a 2-second loading delay
  };

  return (
    <Router>
      {isLoading ? ( // Show loading screen while loading
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <Routes>
          {/* Login Page */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" /> // If already logged in, go to the main app
              ) : (
                <Login onLogin={handleLogin} /> // Pass login handler
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
            <Route path="data-anal" element= {<PhotographerAnalytics photographers={photographers}/>} />
            <Route path="global-activity" element= {<GlobalActivity photographers={photographers}/>} />
            <Route
          />
          </Route>

          {/* Catch-All Redirect to Login or Home based on Authentication */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
