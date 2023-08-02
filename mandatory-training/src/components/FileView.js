import React, { useState } from 'react';

const FileView = ({ fileID, fileName }) => {
  const [fileData, setFileData] = useState(null);

  const handleDownloadFile = async () => {
    try {
      const response = await fetch(`http://localhost:4000/upload/${fileID}`);
      if (!response.ok) {
        throw new Error('File not found');
      }

      // Get the response headers to determine the file name and type
      const fileType = response.headers.get('Content-Type');
      const contentDispositionHeader = response.headers.get('Content-Disposition');
      const fileName = contentDispositionHeader
        ? contentDispositionHeader.split('filename=')[1]
        : 'file.txt'; // Default name if header not available

      // Read the response as a Blob
      const fileBlob = await response.blob();

      // Create a URL for the Blob object
      const fileURL = URL.createObjectURL(fileBlob);

      // Save the file data in state
      setFileData({
        fileName,
        fileType,
        fileURL,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDownloadFile}>Download File: {fileName}</button>
      {fileData && (
        <a href={fileData.fileURL} download={fileData.fileName}>
          {fileData.fileName}
        </a>
      )}
    </div>
  );
};

export default FileView;
