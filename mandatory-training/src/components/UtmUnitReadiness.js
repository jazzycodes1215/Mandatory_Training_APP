import { useState, useEffect } from 'react';
import { fetchURL } from '../App'
import useUserCheck from '../hooks/useUserCheck';
import '../stylesheets/UtmUnitReadiness.css';

export default function UtmUnitReadiness() {
  const [unitReadinessData, setUnitReadinessData] = useState(null);
  const { unitID } = useUserCheck();
  const [error, setError] = useState(null);

  // Fetch the unit readiness data when the component mounts
  useEffect(() => {
    const fetchUnitReadinessData = async () => {
      try {
        if (!unitID) {
          return;
        }
        const response = await fetch(`http://${fetchURL}:4000/unit/status/${unitID}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setUnitReadinessData(data);
        } else {
          const errorData = await response.text();
          console.error('Error fetching unit readiness data:', errorData);
          throw new Error('Failed to fetch unit readiness data');
        }
      } catch (error) {
        console.error('Error fetching unit readiness data:', error);
        setError(error.message);
      }
    };

    fetchUnitReadinessData();
  }, [unitID]);

  // Function to handle downloading the full report as a CSV file
  const handleDownloadReport = () => {
    // Implement the logic to generate and download the CSV report here
  };

  const renderUnitReadinessData = () => {
    if (unitReadinessData) {
      // Extract the list of unique training names from the data
      const trainingNames = [...new Set(unitReadinessData.flatMap((userData) => userData.map((training) => training.training_name)))];

      return (
        <div>
          <table className="readiness-table">
            {/* ... (existing code) */}
            <tbody>
              {unitReadinessData.map((userData, index) => (
                <tr key={index}>
                  <td>{`${userData[0].rank_name} ${userData[0].last_name}, ${userData[0].first_name}`}</td>
                  {trainingNames.map((trainingName) => {
                    const userTraining = userData.find((training) => training.training_name === trainingName);
                    if (userTraining) {
                      let statusClass = '';
                      if (!userTraining.most_recent_completion_date) {
                        statusClass = 'overdue';
                      } else {
                        const completionDate = new Date(userTraining.most_recent_completion_date);
                        const now = new Date();
                        const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                        if (completionDate < now) {
                          statusClass = 'overdue';
                        } else if (completionDate <= sevenDaysFromNow) {
                          statusClass = 'due-soon';
                        } else if (completionDate > sevenDaysFromNow && completionDate <= new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)) {
                          statusClass = 'coming-due';
                        } else {
                          statusClass = 'up-to-date';
                        }
                      }

                      return (
                        <td key={userTraining.training_id} className={statusClass}>
                          {userTraining.most_recent_completion_date ? userTraining.most_recent_completion_date : 'overdue'}
                        </td>
                      );
                    } else {
                      return <td key={trainingName}>N/A</td>;
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (error) {
      return <div>Error: {error}</div>;
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <div className='readiness-container'>
      <div>
        <h2>Unit Readiness Section</h2>
        {renderUnitReadinessData()}
      </div>
      <div>
        {/* Add the download button to download the full report */}
        <button onClick={handleDownloadReport}>Download Report</button>
      </div>
    </div>
  );
};
