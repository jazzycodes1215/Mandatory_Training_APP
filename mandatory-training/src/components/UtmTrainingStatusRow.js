import React from 'react';

export default function UtmTrainingStatusRow({ unitReadinessData, uniqueTrainingIds }) {
  const trainingStatusMap = {};

  const trainingDataMap = {};
  unitReadinessData.forEach((userData) => {
    userData.forEach((training) => {
      const { training_id, most_recent_completion_date, interval } = training;
      if (!trainingDataMap[training_id]) {
        trainingDataMap[training_id] = {
          completedMembers: 0,
          dueMembers: 0,
          interval,
        };
      }

      if (most_recent_completion_date) {
        const completionDate = new Date(most_recent_completion_date);
        completionDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (interval === null || completionDate.getTime() + interval * 24 * 60 * 60 * 1000 >= today.getTime()) {
          trainingDataMap[training_id].completedMembers += 1;
        } else {
          trainingDataMap[training_id].dueMembers += 1;
        }
      } else {
        trainingDataMap[training_id].dueMembers += 1;
      }
    });
  });

  uniqueTrainingIds.forEach((trainingId) => {
    const { completedMembers, dueMembers } = trainingDataMap[trainingId] || { completedMembers: 0, dueMembers: 0 };
    const totalMembers = completedMembers + dueMembers;
    const percentageCompleted = ((completedMembers / totalMembers) * 100).toFixed(2);
    trainingStatusMap[trainingId] = `${completedMembers}/${totalMembers} (${percentageCompleted}%)`;
  });

  return (
    <tr>
      <td className="user-chart">Status</td>
      {uniqueTrainingIds.map((trainingId) => {
        const percentageCompleted = parseFloat(trainingStatusMap[trainingId].split('(')[1]);
        let statusClassName = '';
        if (percentageCompleted == 100) {
          statusClassName = 'green';
        } else if (percentageCompleted >= 66) {
          statusClassName = 'yellow';
        } else if (percentageCompleted >= 33) {
          statusClassName = 'orange';
        } else {
          statusClassName = 'red';
        }

        return (
          <td key={trainingId} className={`training-bar ${statusClassName}`}>
            {trainingStatusMap[trainingId]}
          </td>
        );
      })}
    </tr>
  );
}
