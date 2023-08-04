import React from 'react';
import UtmTableDataRow from './UtmTableDataRow';
import UtmTrainingStatusRow from './UtmTrainingStatusRow';

export default function UtmReadinessTable({ unitReadinessData }) {
  if (!unitReadinessData) {
    return <div>Loading...</div>;
  }

  const uniqueTrainingIds = Array.from(
    new Set(unitReadinessData.flatMap((userData) => userData.map((training) => training.training_id)))
  );

  const trainingNamesMap = {};
  unitReadinessData.forEach((userData) => {
    userData.forEach((training) => {
      if (!trainingNamesMap[training.training_id]) {
        trainingNamesMap[training.training_id] = training.training_name;
      }
    });
  });

  return (
    <div>
      <table className="readiness-table">
        <tbody>
          <tr>
            <td className="user-chart">Trainings</td>
            {uniqueTrainingIds.map((trainingId) => (
              <td key={trainingId} className="training-bar">
                {trainingNamesMap[trainingId]}
              </td>
            ))}
          </tr>
            <UtmTrainingStatusRow unitReadinessData={unitReadinessData} uniqueTrainingIds={uniqueTrainingIds} />
          {unitReadinessData.map((userData, index) => (
            <UtmTableDataRow key={index} userData={userData} uniqueTrainingIds={uniqueTrainingIds} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
