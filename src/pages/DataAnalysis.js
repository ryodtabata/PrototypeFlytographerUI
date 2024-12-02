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
import './DataAnalysis.css'; // Import external CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getProfilePicture = (name) => {
  const femaleNames = ["Alice", "Diana", "Fiona", "Hannah", "Julia", "Luna", "Nina", "Paula", "Rachel", "Tina", "Uma", "Wendy", "Yara"];
  const maleNames = ["Bob", "Charlie", "Edward", "George", "Isaac", "Kevin", "Michael", "Oliver", "Quentin", "Samuel", "Victor", "Xavier", "Zane"];

  if (femaleNames.some((femaleName) => name.toLowerCase().includes(femaleName.toLowerCase()))) {
    const index = Math.floor(Math.random() * 49) + 1;
    return `../assets/tabler-avatars-1/png/${index}.png`;
  }

  if (maleNames.some((maleName) => name.toLowerCase().includes(maleName.toLowerCase()))) {
    const index = Math.floor(Math.random() * 45) + 1;
    return `/assets/tabler-avatars-1/png/m${index}.png`;
  }

  const index = Math.floor(Math.random() * 45) + 1;
  return `/assets/tabler-avatars-1/png/m${index}.png`;
};

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

  return Array.from({ length: count }, () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;

    return {
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
      phone: `+1 (205) ${Math.floor(1000000 + Math.random() * 9000000)}`,
      ghostingRate: Math.floor(Math.random() * 30),
      availability: Math.floor(Math.random() * 50) + 50,
      declineRate: Math.floor(Math.random() * 20),
      customerReviews: (Math.random() * 5).toFixed(1),
      score: Math.floor(Math.random() * 50) + 50,
    };
  });
};

const photographers = generatePhotographers();

const PhotographerAnalytics = () => {
  const [hoveredPhotographer, setHoveredPhotographer] = useState(null);

  const data = {
    labels: photographers.map((photographer) => photographer.name),
    datasets: [
      {
        label: 'Ghosting Rate (%)',
        data: photographers.map((photographer) => photographer.ghostingRate),
        borderColor: '#F44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Availability (%)',
        data: photographers.map((photographer) => photographer.availability),
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Decline Rate (%)',
        data: photographers.map((photographer) => photographer.declineRate),
        borderColor: '#FF9800',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Customer Reviews (Stars)',
        data: photographers.map((photographer) => photographer.customerReviews),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Score',
        data: photographers.map((photographer) => photographer.score),
        borderColor: '#9C27B0',
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
        position: 'top',
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (context) => {
            const index = context[0].dataIndex;
            const photographer = photographers[index];
            setHoveredPhotographer(photographer);
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
    <div className="analytics-container">
      <h1>Photographer Analytics</h1>
      <Line data={data} options={options} />
      {hoveredPhotographer && (
        <div className="profile-card">
          <div className="profile-info">
            <h2>{hoveredPhotographer.name}</h2>
            <p><strong>Email:</strong> {hoveredPhotographer.email}</p>
            <p><strong>Phone:</strong> {hoveredPhotographer.phone}</p>
            <p><strong>Ghosting Rate:</strong> {hoveredPhotographer.ghostingRate}%</p>
            <p><strong>Availability:</strong> {hoveredPhotographer.availability}%</p>
            <p><strong>Decline Rate:</strong> {hoveredPhotographer.declineRate}%</p>
            <p><strong>Customer Reviews:</strong> {hoveredPhotographer.customerReviews} stars</p>
            <p><strong>Score:</strong> {hoveredPhotographer.score}</p>
            <button className="message-button">Message</button>
          </div>
          <div className="profile-picture">
            <img
              src={getProfilePicture(hoveredPhotographer.name)}
              alt={`${hoveredPhotographer.name}'s profile`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographerAnalytics;
