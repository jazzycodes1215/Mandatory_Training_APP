import { useState, useEffect } from "react"
import useUserCheck from '../hooks/useUserCheck'
import '../stylesheets/UtmPersonnelManagement.css'

function calculateDueDate(completionDate, interval) {
  if (!completionDate) {
    // If completionDate is null, consider it as due
    return {
      completionDate: null,
      due: true,
    };
  }

  const dueDate = new Date(completionDate);
  dueDate.setFullYear(dueDate.getFullYear() + interval);

  const currentDate = new Date();
  const due = currentDate > dueDate;

  return {
    completionDate: due ? null : dueDate,
    due,
  };
}

export default function UtmPersonnelManagement() {
  const [myUnit, setMyUnit] = useState([])
  const {unitID, userID} = useUserCheck();
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('unit',unitID)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/unit/status/${unitID}`);
        const data = await res.json();
        const updatedData = data.map((personnel) =>
          personnel.map((training) => {
            const { completionDate, due } = calculateDueDate(
              training.most_recent_completion_date,
              training.interval
            );

            return {
              ...training,
              completionDate,
              due,
            };
          })
        );

        setMyUnit(updatedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching myUnit:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
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
      {loading ? (
        <div>Loading...</div>
      ) : Array.isArray(myUnit) ? (
        <div>
          {myUnit.map((personnel, index) => (
            <div
              key={index}
              className={`personnel-container ${
                personnel[0].due ? "due" : "not-due"
              } ${selectedUser === personnel ? "selected-user" : ""}`}
              onClick={() => handleUserClick(index)}
            >
              {personnel && personnel.length > 0 ? (
                <p>
                  {personnel[0].rank_name}, {personnel[0].first_name}{" "}
                  {personnel[0].last_name}
                </p>
              ) : (
                <p>No personnel data available</p>
              )}
              {selectedUser === personnel && personnel && personnel.length > 0 && (
                <div className="training-grid">
                  {personnel.map((training, innerIndex) => (
                    <div
                      key={innerIndex}
                      className={`training-card ${
                        training.due ? "due" : "not-due"
                      }`}
                    >
                      <p>Training Name: {training.training_name}</p>
                      <p>
                        Completion Date:{" "}
                        {new Date(training.most_recent_completion_date).toDateString()}
                      </p>
                      <p>
                        Due Date:{" "}
                        {new Date(new Date(training.most_recent_completion_date).setFullYear(
                            new Date(training.most_recent_completion_date).getFullYear() + 1)).toDateString()}
                      </p>
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
        <div>Error: Data format is incorrect</div>
      )}
    </div>
  );
}


