import React from 'react';

const ViewRankings = () => {
  // Generate a fake database of photographers
  const photographers = Array.from({ length: 20 }, () => ({
    id: `PHT-${Math.floor(1000 + Math.random() * 9000)}`, // Random ID
    elo: Math.floor(3500 + Math.random() * (5000 - 3500 + 1)), // Random ELO between 3500 and 5000
  }));

  return (
    <div>
      <h1>Photographers Rankings</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Photographer ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ELO</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRankings;
