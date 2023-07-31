import { useState, useEffect } from "react"
import useUserCheck from '../hooks/useUserCheck'
import '../stylesheets/UtmPersonnelManagement.css'

function calculateDueDate(completionDate, interval) {
    const dueDate = new Date(completionDate);
    dueDate.setFullYear(dueDate.getFullYear() + interval);
    return dueDate;
  }

export default function UtmPersonnelManagement() {
  const [myUnit, setMyUnit] = useState([])
  const {unitID, userID} = useUserCheck();
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log('unit',unitID)
  useEffect(() => {
    fetch(`http://localhost:4000/unit/status/${unitID}`)
      .then(res => res.json())
      .then((data) => {
        const processedData = Array.isArray(data) ? data : [data]; // Ensure that data is always an array
        const updatedData = processedData.map((personnel) => {
          const processedPersonnel = personnel.map((training) => {
            const completionDate = new Date(training.most_recent_completion_date);
            const interval = training.interval;
            const dueDate = calculateDueDate(completionDate, interval);
            const currentDate = new Date();
  
            return {
              ...training,
              due: currentDate > dueDate,
            };
          });
  
          return processedPersonnel.length > 0 ? processedPersonnel : null;
        });
  
        setMyUnit(updatedData);
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

  

  // const handleAddTraining = () => {
  //   // Implement the logic to add training to the selected user.
  // };

  // const handleDeleteTraining = (userID, trainingIndex) => {
  //   fetch(`http://localhost:4000/user/status/${userID}`, {
  //     method: 'DELETE',
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // Assuming the `myUnit` state is an array of users, you can remove the deleted training from the selected user
  //       setMyUnit((prevMyUnit) =>
  //         prevMyUnit.map((user, index) =>
  //           index === userID
  //             ? {
  //                 ...user,
  //                 // Assuming `trainings` is an array of training objects within a user object
  //                 trainings: user.trainings.filter(
  //                   (_, innerIndex) => innerIndex !== trainingIndex
  //                 ),
  //               }
  //             : user
  //         )
  //       );
  //     })
  //     .catch((error) => console.error('Error deleting training:', error));
  // };


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
        {personnel && personnel.length > 0 ? (
          <p>
            {personnel[0].rank_name}, {personnel[0].first_name} {personnel[0].last_name}
          </p>
        ) : (
          <p>No personnel data available</p>
        )}
        {selectedUser === personnel && personnel && personnel.length > 0 && (
          <div className="training-grid">
            {personnel.map((training, innerIndex) => (
              <div
                key={innerIndex}
                className={`training-card ${training.due ? "due" : "not-due"}`}
              >
                <p>Training Name: {training.training_name}</p>
                <p>Completion Date: {new Date(training.most_recent_completion_date).toDateString()}</p>
                <p>Due Date: {new Date(new Date(training.most_recent_completion_date).setFullYear(new Date(training.most_recent_completion_date).getFullYear() + 1)).toDateString()}</p>
              </div>
            ))}
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


  
