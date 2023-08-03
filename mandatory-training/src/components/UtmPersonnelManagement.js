import { useState, useEffect } from "react"
import useUserCheck from '../hooks/useUserCheck'
import { fetchURL } from '../App'
import '../stylesheets/UtmPersonnelManagement.css'
import { useNavigate, Route, Routes } from "react-router-dom";
import UtmPersonellTrainingDetails from "./UtmPersonellTrainingDetails.js";
import FileList from './FileList'

function calculateDueDate(completionDate, interval) {
  if (!completionDate) {
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
  const navigate = useNavigate();



  console.log('unit',unitID)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${fetchURL}/unit/status/${unitID}`);
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
      setSelectedUser(myUnit[userIndex]);
  };

  // const handleTrainingClick = (userIndex, innerIndex) => {
  //   if (
  //     myUnit[userIndex] &&
  //     myUnit[userIndex].length > 0 &&
  //     myUnit[userIndex][innerIndex]
  //   ) {
  //     const clickedUser = myUnit[userIndex];
  //     console.log("Clicked User:", clickedUser);
  //     const userId = clickedUser[innerIndex].id;
  //     const trainingId = clickedUser[innerIndex].training_id;

  //     console.log("Clicked User ID:", userId);
  //     console.log("Training ID:", trainingId);

  //     if (userId) {
  //       try {
  //         const userInfo = clickedUser[innerIndex];
  //         console.log("Navigating to:", `/unit-training-manager/${userId}/${trainingId}`);
  //         navigate(`/unit-training-manager/${userId}/${trainingId}`, { state: userInfo });
  //       } catch (error) {
  //         console.error("Error during navigation:", error);
  //       }
  //     } else {
  //       console.error("User ID is undefined.");
  //     }
  //   }
  // };

  const handleCloseClick = () => {
    setSelectedUser(null);
   };

  return (
    <div className="route">
      {/* <Routes>
        <Route path="/unit-training-manager/:userId/:trainingId" element={<UtmPersonellTrainingDetails  />} />
      </Routes> */}
    <div className="personnel-management-container">
      {loading ? (
        <div>Loading...</div>
      ) : Array.isArray(myUnit) ? (
        <div>
           <div className='subheading'>
        <h1>Personnel Management</h1>
     </div>
          <button className="close-button" onClick={() => handleCloseClick()}>Close user</button>
          {myUnit.map((personnel, index) => (
            <div
              key={index}
              className={`personnel-container ${
                personnel[0].due ? "due" : "not-due"
              } ${selectedUser === personnel ? "selected-user" : ""}`}
              onClick={(event) => {

                if (!event.target.classList.contains("training-card")) {
                  handleUserClick(index);
                }
              }}
            >

              {personnel && personnel.length > 0 ? (
                <p>
                  {/* <button onClick={() => handleCloseClick(index)}>close</button> */}
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
                      // onClick={() => handleTrainingClick(index, innerIndex)}
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
    </div>
  );
}





 // const handleAddTraining = () => {
  //   // Implement the logic to add training to the selected user.
  // };

  // const handleDeleteTraining = (userID, trainingIndex) => {
  //   fetch(`${fetchURL}/user/status/${userID}`, {
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
