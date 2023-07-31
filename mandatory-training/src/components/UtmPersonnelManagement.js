import { useState, useEffect } from "react"
import useUserCheck from '../hooks/useUserCheck'
import '../stylesheets/UtmPersonnelManagement.css'

export default function UtmPersonnelManagement() {
  const [myUnit, setMyUnit] = useState([])
  const {unitID} = useUserCheck();
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log('unit',unitID)
  useEffect(() => {
    fetch(`http://localhost:4000/unit/status/${unitID}`)
      .then(res => res.json())
      .then((data) => {
        setMyUnit(data);
      })
      .catch((error) => {
        console.error('Error fetching myUnit:', error);
        setError(error.message);
      });
  }, [unitID]);
   
  const handleUserClick = (userIndex) => {
    if (selectedUser === myUnit[userIndex]) {
      setSelectedUser(null);
    } else {
      setSelectedUser(myUnit[userIndex]);
    }
  };

  const handleAddTraining = () => {
    // Implement the logic to add training to the selected user.
  };

  const handleDeleteTraining = (trainingIndex) => {
    // Implement the logic to delete training from the selected user.
  };

  // const lastEvalDate = new Date(latestEval.eval_date);
  // const evalDueDate = new Date(latestEval.eval_date);
  // evalDueDate.setFullYear(evalDueDate.getFullYear() + 1);


  return (
    <div className="personnel-management-container">
      {Array.isArray(myUnit) ? (
        <div>
          {myUnit.map((personnel, index) => (
            <div
              key={index}
              className={`personnel-container ${
                selectedUser === personnel ? "selected-user" : ""
              }`}
              onClick={() => handleUserClick(index)}
            >
              <p>
                {personnel[0].rank_name}, {personnel[0].first_name} {personnel[0].last_name}
              </p>
              {selectedUser === personnel && (
                <div className="training-grid">
                  {personnel.map((training, innerIndex) => (
                    <div key={innerIndex} className="training-card">
                      <p>Training Name: {training.training_name}</p>
                      <p>Completion Date: {new Date(training.most_recent_completion_date).toDateString()}</p>
                      <p>Due Date: {new Date(new Date(training.most_recent_completion_date).setFullYear(new Date(training.most_recent_completion_date).getFullYear() + 1)).toDateString()}</p>
                      <button
                        onClick={() => handleDeleteTraining(innerIndex)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button onClick={handleAddTraining} className="add-button">
                    Add Training
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : error ? (
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