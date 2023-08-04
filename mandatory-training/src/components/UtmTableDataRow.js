import React from 'react';

export default function UtmTableDataRow({ userData, uniqueTrainingIds }) {
  const getCellClassName = (trainingId) => {
    const training = userData.find((training) => training.training_id === trainingId);
  
    if (!training) return 'not-applicable';
    if (training.most_recent_completion_date) {
      const completionDate = new Date(training.most_recent_completion_date);
  
      completionDate.setHours(0, 0, 0, 0);
  
      if (training.interval === null) {
        return 'up-to-date';
      }
  
      const dueDate = new Date(completionDate);
      dueDate.setFullYear(dueDate.getFullYear() + Math.floor(training.interval / 365));
      dueDate.setDate(dueDate.getDate() + (training.interval % 365));
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      if (dueDate < today) return 'overdue';
      if (dueDate <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)) return 'due-soon';
      if (dueDate <= new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000)) return 'coming-due';
      return 'up-to-date';
    } else {
      return 'overdue';
    }
  };
  
  const completionDatesMap = {};
  userData.forEach((training) => {
    if (training.most_recent_completion_date) {
      completionDatesMap[training.training_id] = new Date(training.most_recent_completion_date).toLocaleDateString(
        'en-US',
        {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit',
        }
      );
    } else {
      completionDatesMap[training.training_id] = 'Required';
    }
  });

  return (
    <tr>
      <td className="user-name">
        {userData[0].rank_name} {userData[0].last_name}, {userData[0].first_name}
      </td>
      {uniqueTrainingIds.map((trainingId) => {
        const cellClassName = getCellClassName(trainingId);
        return (
          <td key={trainingId} className={`training-status ${cellClassName}`}>
            {completionDatesMap[trainingId] || 'N/A'}
          </td>
        );
      })}
    </tr>
  );
}
