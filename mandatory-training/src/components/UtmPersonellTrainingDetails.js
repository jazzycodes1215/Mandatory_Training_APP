import React from "react";
import { useParams } from "react-router-dom";

export default function UtmPersonellTrainingDetails() {
  const { userId, trainingId } = useParams();

  // Now you have both `userId` and `trainingId` available for further processing

  return (
    <div>
      <h2>Training Details for User ID: {userId}</h2>
      <h2>Training Details for Training ID: {trainingId}</h2>
    </div>
  );
}