import React, { useState } from 'react';
import './ViewRankings.css';

const ViewRankings = () => {
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

  const commonAreaCode = "555";
  const secondaryAreaCodes = ["778", "236", "877"];

  const initialPhotographers = Array.from({ length: 200 }, () => {
    const areaCode =
      Math.random() < 0.8
        ? commonAreaCode
        : secondaryAreaCodes[Math.floor(Math.random() * secondaryAreaCodes.length)];

    const phoneNumber = `${areaCode}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    return {
      id: `PHT-${Math.floor(1000 + Math.random() * 9000)}`,
      elo: Math.floor(80 + Math.random() * (120)),
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      phoneNumber
    };
  });

  const [photographers, setPhotographers] = useState(initialPhotographers);

  // Sorting function
  const sortPhotographers = (criteria) => {
    const sorted = [...photographers];
    switch (criteria) {
      case "firstName":
        sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
        break;
      case "lastName":
        sorted.sort((a, b) => a.lastName.localeCompare(b.lastName));
        break;
      case "id":
        sorted.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case "score":
        sorted.sort((a, b) => b.elo - a.elo); // Descending order
        break;
      default:
        break;
    }
    setPhotographers(sorted);
  };

  return (
    <div className="rankings-container">
      <h1 className="rankings-title">Photographers Rankings</h1>
      <div className="filter-dropdown">
        <label htmlFor="sortCriteria">Sort by: </label>
        <select
          id="sortCriteria"
          onChange={(e) => sortPhotographers(e.target.value)}
        >
          <option value="">Select</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="id">Photographer ID</option>
          <option value="score">Score</option>
        </select>
      </div>
      <table className="rankings-table">
        <thead>
          <tr>
            <th>Photographer ID</th>
            <th>Score</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {photographers.map((photographer, index) => (
            <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>{photographer.id}</td>
              <td className="score-column">{photographer.elo}</td>
              <td>{photographer.firstName}</td>
              <td>{photographer.lastName}</td>
              <td>{photographer.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRankings;
