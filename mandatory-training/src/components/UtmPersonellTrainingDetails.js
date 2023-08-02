import React from "react";
import { useParams } from "react-router-dom";

export default function UtmPersonellTrainingDetails({ userID }) {
  const { trainingId } = useParams();
  console.log("userID in UtmPersonellTrainingDetails:", userID);
  // Fetch the detailed training information based on the trainingId
  // You can use this ID to fetch the necessary data from your API or local state

  return (
    <div>
     
      <h2>Training Details for User ID: {userID}</h2>
      <h2>Training Details for Training ID: {trainingId}</h2>
    </div>
  );
}