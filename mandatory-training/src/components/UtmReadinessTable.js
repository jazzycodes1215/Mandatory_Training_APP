import React from 'react';
import UtmTableDataRow from './UtmTableDataRow';

export default function UtmReadinessTable({ unitReadinessData }) {
  if (!unitReadinessData) {
    return <div>Loading...</div>;
  }

  // Create an array of all unique training IDs
  const uniqueTrainingIds = Array.from(
    new Set(unitReadinessData.flatMap((userData) => userData.map((training) => training.training_id)))
  );

  return (
    <div>
      <table className="readiness-table">
        <tbody>
          <tr>
            <td className="user-chart">Member</td>
            {uniqueTrainingIds.map((trainingId) => (
              <td key={trainingId} className="training-bar">
                {unitReadinessData.length > 0 && unitReadinessData[0].find((training) => training.training_id === trainingId)?.training_name}
              </td>
            ))}
          </tr>
          {unitReadinessData.map((userData, index) => (
            <UtmTableDataRow key={index} userData={userData} uniqueTrainingIds={uniqueTrainingIds} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
