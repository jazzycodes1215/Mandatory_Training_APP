import React, { useEffect, useState } from 'react';
import {fetchURL} from '../App'
import FileView from './FileView';

const FileList = ({ userID, onFileSelect }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch the list of files for the given userID
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${fetchURL}/files/${userID}`);
        if (response.ok) {
          const data = await response.json();
          setFiles(data);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, [userID, onFileSelect]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  return (
    <div>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <label>
              <input
                type="radio"
                name="file"
                value={file.id}
                onChange={() => handleFileSelect(file)}
                checked={selectedFile?.id === file.id}
              />
              {file.file_name}
            </label>
          </li>
        ))}
      </ul>
      {selectedFile && <FileView file={selectedFile} />}
    </div>
  );
};

export default FileList;