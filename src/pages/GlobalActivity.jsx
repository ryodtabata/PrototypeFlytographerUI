import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { useNavigate } from "react-router-dom";
import "./GlobalActivity.css";

const GlobalActivity = () => {
  const globeRef = useRef();
  const navigate = useNavigate();
  const tooltipRef = useRef();

  // Function to generate clustered points
  const generateClusteredPoints = (baseLat, baseLng, count, isAvailable) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      const latOffset = (Math.random() - 0.5) * 0.5; // Random offset in degrees (latitude)
      const lngOffset = (Math.random() - 0.5) * 0.5; // Random offset in degrees (longitude)
      points.push({
        lat: baseLat + latOffset,
        lng: baseLng + lngOffset,
        available: isAvailable,
        id: isAvailable ? `PHT-${Math.floor(Math.random() * 1000)}` : null, // Random ID for green points
      });
    }
    return points;
  };

  // Example photographer data

  // Updated list of cities with varying distribution of photographers
const cities = [
  { name: "Victoria, BC", lat: 48.4284, lng: -123.3656, availableCount: 80, unavailableCount: 20 },
  { name: "Edmonton, AB", lat: 53.5461, lng: -113.4938, availableCount: 50, unavailableCount: 50 },
  { name: "Calgary, AB", lat: 51.0447, lng: -114.0719, availableCount: 70, unavailableCount: 30 },
  { name: "Toronto", lat: 43.651070, lng: -79.347015, availableCount: 90, unavailableCount: 10 },
  { name: "Mexico City", lat: 19.432608, lng: -99.133209, availableCount: 60, unavailableCount: 40 },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729, availableCount: 40, unavailableCount: 60 },
  { name: "Paris", lat: 48.8566, lng: 2.3522, availableCount: 75, unavailableCount: 25 },
  { name: "London", lat: 51.5074, lng: -0.1278, availableCount: 85, unavailableCount: 15 },
  { name: "Tokyo", lat: 35.6895, lng: 139.6917, availableCount: 65, unavailableCount: 35 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093, availableCount: 60, unavailableCount: 40 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437, availableCount: 55, unavailableCount: 45 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777, availableCount: 70, unavailableCount: 30 },
  { name: "Shanghai", lat: 31.2304, lng: 121.4737, availableCount: 50, unavailableCount: 50 },
  { name: "Berlin", lat: 52.5200, lng: 13.4050, availableCount: 80, unavailableCount: 20 },
  { name: "Dubai", lat: 25.276987, lng: 55.296249, availableCount: 65, unavailableCount: 35 },
];

const generateRealisticPoints = (cities) => {
  const points = [];
  cities.forEach((city) => {
    points.push(
      ...generateClusteredPoints(city.lat, city.lng, city.availableCount, true), // Available
      ...generateClusteredPoints(city.lat, city.lng, city.unavailableCount, false) // Unavailable
    );
  });
  return points;
};

// Generate photographers based on updated cities list
const photographers = generateRealisticPoints(cities);


  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.1;
    }
  }, []);

  // Hover handler for the tooltip
  const handlePointHover = (point) => {
    if (tooltipRef.current) {
      if (point && point.available) {
        tooltipRef.current.style.display = "block";
        tooltipRef.current.innerHTML = `<p>${point.id}</p>`;
      } else {
        tooltipRef.current.style.display = "none";
      }
    }
  };

  // Tooltip position update
  const handleMouseMove = (event) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.top = `${event.clientY + 10}px`;
      tooltipRef.current.style.left = `${event.clientX + 10}px`;
    }
  };

  // Global stats calculation
  const totalPhotographers = photographers.length;
  const availablePhotographers = photographers.filter((p) => p.available).length;
  const unavailablePhotographers = totalPhotographers - availablePhotographers;
  const availabilityPercentage = (
    (availablePhotographers / totalPhotographers) *
    100
  ).toFixed(2);

  return (
    <div className="layout-container" onMouseMove={handleMouseMove}>
      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => navigate("/rankings")} // Navigate to Rankings page
      >
        ← Back to Rankings
      </button>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          display: "none",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      ></div>

      {/* Stats Panel */}
      <div
        className="stats-panel"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "15px",
          borderRadius: "8px",
          width: "200px",
          zIndex: 1000,
        }}
      >
        <h3 style={{ margin: "0 0 10px 0" }}>Global Stats</h3>
        <p>Total: {totalPhotographers}</p>
        <p>Available: {availablePhotographers}</p>
        <p>Unavailable: {unavailablePhotographers}</p>
        <p>Availability: {availabilityPercentage}%</p>
      </div>

      {/* Legend */}
      <div
        className="legend"
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "10px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
          <div
            style={{
              width: "15px",
              height: "15px",
              background: "green",
              borderRadius: "50%",
              marginRight: "5px",
            }}
          ></div>
          <span>Available</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "15px",
              height: "15px",
              background: "red",
              borderRadius: "50%",
              marginRight: "5px",
            }}
          ></div>
          <span>Unavailable</span>
        </div>
      </div>

      {/* Globe */}
      <div className="globe-container">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={photographers}
          pointLat={(d) => d.lat}
          pointLng={(d) => d.lng}
          pointAltitude={(d) => 0.05} // Static altitude
          pointRadius={(d) => 0.15} // Size for points
          pointColor={(d) => (d.available ? "green" : "red")} // Green for available, red for unavailable
          onPointHover={handlePointHover}
        />
      </div>
    </div>
  );
};

export default GlobalActivity;
