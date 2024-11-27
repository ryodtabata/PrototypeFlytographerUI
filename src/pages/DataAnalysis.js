import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PhotographerAnalytics = ({ photographers }) => {
  const [hoveredPhotographer, setHoveredPhotographer] = useState(null);

  // Prepare chart data
  const data = {
    labels: photographers.map((photographer) => photographer.name), // Photographer names
    datasets: [
      {
        label: 'Ghosting Rate (%)',
        data: photographers.map((photographer) => photographer.ghostingRate),
        borderColor: '#F44336', // Red for ghosting
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: true,
        tension: 0.3, // Smooth line
      },
      {
        label: 'Availability (%)',
        data: photographers.map((photographer) => photographer.availability),
        borderColor: '#2196F3', // Blue for availability
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Decline Rate (%)',
        data: photographers.map((photographer) => photographer.declineRate),
        borderColor: '#FF9800', // Orange for decline rate
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Customer Reviews (Stars)',
        data: photographers.map((photographer) => photographer.customerReviews),
        borderColor: '#4CAF50', // Green for reviews
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Score',
        data: photographers.map((photographer) => photographer.score),
        borderColor: '#9C27B0', // Purple for score
        backgroundColor: 'rgba(156, 39, 176, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Display the legend at the top
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (context) => {
            const index = context[0].dataIndex;
            const photographer = photographers[index];
            setHoveredPhotographer(photographer); // Show detailed info
            return photographer.name;
          },
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Photographers',
        },
        ticks: {
          callback: function (val, index) {
            return this.getLabelForValue(val).substring(0, 10); // Shorten names
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Values (Scores & Percentages)',
        },
      },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Photographer Analytics</h1>
      <Line data={data} options={options} />
      {hoveredPhotographer && (
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h2>{hoveredPhotographer.name}</h2>
          <p>
            <strong>ID:</strong> {hoveredPhotographer.id}
          </p>
          <p>
            <strong>Ghosting Rate:</strong> {hoveredPhotographer.ghostingRate}%
          </p>
          <p>
            <strong>Availability:</strong> {hoveredPhotographer.availability}%
          </p>
          <p>
            <strong>Decline Rate:</strong> {hoveredPhotographer.declineRate}%
          </p>
          <p>
            <strong>Customer Reviews:</strong> {hoveredPhotographer.customerReviews} stars
          </p>
          <p>
            <strong>Score:</strong> {hoveredPhotographer.score}
          </p>
        </div>
      )}
    </div>
  );
};

export default PhotographerAnalytics;
