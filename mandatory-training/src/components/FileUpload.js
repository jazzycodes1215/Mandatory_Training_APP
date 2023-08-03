import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App';
import useUserCheck from '../hooks/useUserCheck'
import FileList from './FileList';
// import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
// import Input from '@mui/material/Input';

const FileUpload = () => {
  const { userID } = useUserCheck();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile && userID) {
      // Create a new FormData object and append the selected file to it
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('user_id', userID);
      try {
        // Send the file to the backend using fetch
        const response = await fetch('http://localhost:4000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully');
          console.log(userID);
        } else {
          console.error('Error uploading file');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
  <>
    <form onSubmit={(e)=>handleSubmit(e)}>
      <input type='file' onChange={handleFileChange} />
      <button variant="contained" type='submit'>Submit</button>
    </form>
    <FileList userID={userID} onFileSelect={handleFileSelect} />
  </>
  );
};

export default FileUpload;