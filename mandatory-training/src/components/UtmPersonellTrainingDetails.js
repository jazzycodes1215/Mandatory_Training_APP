import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function UtmPersonellTrainingDetails() {
  let { userId, trainingId } = useParams();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [fileType, setFileType] = useState(null);
  console.log(userId)
  useEffect(() => {
    // Fetch user information from location state
    const user = location.state;
    setUserInfo(user);

    // Fetch file content and type based on user ID
    fetch(`/files/${userId}`)
      .then((response) => {
        console.log(response)
        console.log("Response Headers:", response.headers);
        const contentType = response.headers.get('Content-type');
        console.log("Content-Type Header:", contentType);
        return response.blob();
      })
      .then((blob) => {
        console.log("Blob:", blob);

        // Convert blob to object URL
        const fileUrl = URL.createObjectURL(blob);
        console.log("File URL:", fileUrl);

        setFileContent(fileUrl);
        setFileType(blob.type);
      })
      .catch((error) => {
        console.error("Error fetching file content:", error);
      });
  }, [location]);

  return (
    <div>
      {userInfo && (
        <div>
          <h1>{userInfo.first_name} {userInfo.last_name}: {userInfo.training_name} Training Certificate</h1>
          <p>User Name: {userInfo.first_name} {userInfo.last_name}</p>
        </div>
      )}

      {fileContent && (
        <div>
          <h2>Training Certificate</h2>
          {fileType.startsWith("image/") ? (
            <img src={fileContent} alt="Training Certificate" />
          ) : (
            <p>Unsupported file type: {fileType}</p>
          )}
        </div>
      )}
    </div>
  );
}