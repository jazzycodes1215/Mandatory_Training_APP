import React from 'react';
import myDown from '../Icons/16px/download.png'
import '../stylesheets/UtmUnitReadiness.css'

export default function UtmUnitReport({ unitReadinessData }) {
  const handleDownloadReport = () => {
    if (!unitReadinessData) {
      return;
    }

    const csvData = [];
    const headerRow = ['Member', ...unitReadinessData[0].map((training) => training.training_name)];
    csvData.push(headerRow);

    unitReadinessData.forEach((userData) => {
      const rowData = [
        `${userData[0].rank_name} ${userData[0].last_name}, ${userData[0].first_name}`,
        ...userData.map((training) =>
          training.most_recent_completion_date
            ? new Date(training.most_recent_completion_date).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit',
              })
            : 'Required'
        ),
      ];
      csvData.push(rowData);
    });

    const csvContent = csvData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'unit_readiness_report.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button id="download-btn" onClick={handleDownloadReport} title="Download Unit Readiness Report">
      <img src={myDown} alt='download button'></img>
      </button>
  );
};
