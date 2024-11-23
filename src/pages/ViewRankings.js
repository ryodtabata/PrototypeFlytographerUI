import React from 'react';

const ViewRankings = () => {
  // List of potential first names and last names
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

  // Define a common area code and secondary area codes
  const commonAreaCode = "555"; // Most numbers will have this area code
  const secondaryAreaCodes = ["778", "236", "877"]; // A few with different area codes

  // Generate a fake database of photographers
  const photographers = Array.from({ length: 200 }, () => {
    // Randomly choose an area code (80% chance for commonAreaCode)
    const areaCode =
      Math.random() < 0.8
        ? commonAreaCode
        : secondaryAreaCodes[Math.floor(Math.random() * secondaryAreaCodes.length)];

    // Generate a random phone number
    const phoneNumber = `${areaCode}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    return {
      id: `PHT-${Math.floor(1000 + Math.random() * 9000)}`, // Random ID
      elo: Math.floor(3500 + Math.random() * (5000 - 3500 + 1)), // Random ELO between 3500 and 5000
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)], // Random first name
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)], // Random last name
      phoneNumber // Generated phone number
    };
   
  });






  return (
    <div>
      <h1>Photographers Rankings</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Photographer ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Score</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>First Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Last Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {photographers.map((photographer, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                {photographer.id}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                {photographer.elo}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                {photographer.firstName}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                {photographer.lastName}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                {photographer.phoneNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRankings;
