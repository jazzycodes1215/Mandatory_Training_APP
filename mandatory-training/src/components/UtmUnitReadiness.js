import { useState, useEffect } from 'react';
import useUserCheck from '../hooks/useUserCheck'

export default function UtmUnitReadiness() {
  const [unitReadinessData, setUnitReadinessData] = useState(null);
  const {unitID} = useUserCheck();
  const [error, setError] = useState(null);
  
  // Fetch the unit readiness data when the component mounts
  useEffect(() => {
    const fetchUnitReadinessData = async () => {
      try {
        const response = await fetch(`/unit/status/${unitID}`);
        if (response.ok) {
          const data = await response.json();
          setUnitReadinessData(data);
          console.log(unitReadinessData)
        } else {
          throw new Error('Failed to fetch unit readiness data');
        }
      } catch (error) {
        console.error('Error fetching unit readiness data:', error);
        setError(error.message);
      }
    };
  
    fetchUnitReadinessData();
  }, []);
  

  // Function to handle downloading the full report as a CSV file
  const handleDownloadReport = () => {
    // Implement the logic to generate and download the CSV report here
  };

  return (
    <div>
      <div>
        <h2>Unit Readiness Section</h2>
        {/* Add the fetched data to display the unit's readiness regarding the personnels' training status */}
        {unitReadinessData ? (
          <div>
            {/* Display the data */}
            <pre>{JSON.stringify(unitReadinessData, null, 2)}</pre>
          </div>
        ) : error ? ( // Display error message if there's an error
          <div>Error: {error.message}</div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div>
        {/* Add the download button to download the full report */}
        <button onClick={handleDownloadReport}>Download Report</button>
      </div>
    </div>
  );
}
