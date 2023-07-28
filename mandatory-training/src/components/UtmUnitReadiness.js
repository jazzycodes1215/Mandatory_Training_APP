import { useState, useEffect } from 'react';
import useUserCheck from '../hooks/useUserCheck'
import '../stylesheets/UtmUnitReadiness.css'

export default function UtmUnitReadiness() {
  const [unitReadinessData, setUnitReadinessData] = useState(null);
  const {unitID} = useUserCheck();
  const [error, setError] = useState(null);
  // Fetch the unit readiness data when the component mounts
  useEffect(() => {
    const fetchUnitReadinessData = async () => {
      try {
        if(!unitID) {
          return;
        }
        const response = await fetch(`http://localhost:4000/unit/status/${unitID}`);
        console.log('response', response);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setUnitReadinessData(data);
          console.log('unit readiness', unitReadinessData);
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
      return unitReadinessData.map((userTrainings, index) => (
        <div key={index} className='user-chart'>
          <h3>User {index + 1}</h3>
          {userTrainings.map((training, trainingIndex) => (
            <div key={trainingIndex} className='training bar'>
              <p>Training Name: {training.name}</p>
              <p>Interval: {training.interval}</p>
              {/* Add more information you want to display */}
            </div>
          ))}
        </div>
      ));
    } else if (error) {
      return <div>Error: {error.message}</div>;
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
}
