import React, { useEffect, useState } from 'react';
import {fetchURL} from '../App'
import FileView from './FileView';

const FileList = ({ userID, onFileSelect }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the list of files for the given userID
    const fetchFiles = async () => {
      try {
        const response = await fetch(`http://localhost:4000/files/${userID}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFiles(data);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, [userID]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  return (
    <div>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a href={`http://localhost:4000/upload/${userID}`} download={file.file_name}>
            {file.file_name}
            </a>
          </li>
        ))}
      </ul>
      {selectedFile && <FileView file={selectedFile} />}
    </div>
  );
};

export default FileList;