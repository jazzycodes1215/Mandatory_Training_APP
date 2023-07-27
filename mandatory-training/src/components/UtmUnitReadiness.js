import { useState, useEffect } from 'react';
import useUserCheck from '../hooks/useUserCheck'

export default function UtmUnitReadiness() {
  const [unitReadinessData, setUnitReadinessData] = useState(null);
  const {unitID} = useUserCheck();
  const [error, setError] = useState(null);
  console.log(unitID)
  
  // Fetch the unit readiness data when the component mounts
  useEffect(() => {
    const fetchUnitReadinessData = async () => {
      try {
        const response = await fetch(`/unit/status/${unitID}`);
        console.log('response', response)
        if (response.ok) {
          const data = await response.json();
          setUnitReadinessData(data);
          console.log('unit readiness', unitReadinessData)
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

//   const renderedData = unitReadinessData
//     ? unitReadinessData.map((userData, index) => (
//         <div key={index}>
//           <h3>{`${userData[0].last_name}, ${userData[0].first_name}`}</h3>
//           <ul>
//             {userData.map((training, trainingIndex) => (
//               <li key={trainingIndex}>
//                 <strong>Training Name:</strong> {training.training_name} <br />
//                 <strong>Interval:</strong> {training.interval} <br />
//                 <strong>Completion Date:</strong> {training.completetion_date} <br />
//                 <strong>Submission Date:</strong> {training.submission_date} <br />
//                 <br />
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))
//     : null;

//   return (
//     <div>
//       <div>
//         <h2>Unit Readiness Section</h2>
//         {renderedData || (error ? <div>Error: {error.message}</div> : <div>Loading...</div>)}
//       </div>
//       <div>
//         {/* Add the download button to download the full report */}
//         <button onClick={handleDownloadReport}>Download Report</button>
//       </div>
//     </div>
//   );
// }

return (
  <div>
    <div>
      <h2>Unit Readiness Section</h2>
      {/* Add the fetched data to display the unit's readiness regarding the personnels' training status */}
      {unitReadinessData ? (
        <div>
          {/* Map through the outer array */}
          {unitReadinessData.map((userTrainings, index) => (
            <div key={index}>
              {/* Display user information (assuming it is the same for each userTrainings group) */}
              <p>
                User: {userTrainings[0].first_name} {userTrainings[0].last_name}
              </p>
              {/* Map through the inner array (userTrainings) to display each training */}
              {userTrainings.map((training, innerIndex) => (
                <div key={innerIndex}>
                  <p>Training Name: {training.training_name}</p>
                  {/* Add more information about the training as needed */}
                </div>
              ))}
            </div>
          ))}
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
