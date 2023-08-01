import { useState, useEffect } from "react"
import useUserCheck from '../hooks/useUserCheck'
import { fetchURL } from '../App'

export default function UtmPersonnelManagement() {
  const [myUnit, setMyUnit] = useState([])
  const {unitID} = useUserCheck();
  const [error, setError] = useState(null);

  console.log('unit',unitID)
  useEffect(() => {
    fetch(`http://${fetchURL}/unit/status/${unitID}`)
      .then(res => res.json())
      .then((data) => {
        setMyUnit(data);
      })
      .catch((error) => {
        console.error('Error fetching myUnit:', error);
        setError(error.message);
      });
  }, [unitID]);




  return (
    <div>
      {Array.isArray(myUnit) ? (
        <div>
          {/* Map through the outer array */}
          {myUnit.map((personnel, index) => (
            <div key={index}>
              {/* Display user information (assuming it is the same for each userTrainings group) */}
              <p>
                User: {personnel[0].first_name} {personnel[0].last_name}
              </p>
              {/* Map through the inner array (userTrainings) to display each training */}
              {personnel.map((training, innerIndex) => (
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
  );
}






//   return (
//     <div>

//       <div>
//       <h2>Manage Personnel Section</h2>
//       {/* Add a fetch to grab all personnel of the UTM's unit */}
//       </div>
//       <div>
//         {/* Add the sub-menu content for the Manage Personnel section? */}
//       </div>
//     </div>
//   )
// }