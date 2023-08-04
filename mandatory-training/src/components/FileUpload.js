import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App';
import useUserCheck from '../hooks/useUserCheck'
import FileList from './FileList';
import '../stylesheets/training.css'
// import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
// import Input from '@mui/material/Input';

const FileUpload = ({setErrorMessageCB}) => {
  const { userID } = useUserCheck();
  const [selectedFile, setSelectedFile] = useState(null);
  const [updated, setUpdated] = useState(false);

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
          console.log('test');
          setErrorMessageCB("Successfully Uploaded File")
          setUpdated(!updated);
        } else {
          setErrorMessageCB("Failed to Upload File")
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  useEffect(()=>{
    setSelectedFile(null);
  }, [updated])

  return (
  <>
    <form id='upload' onSubmit={(e)=>handleSubmit(e)}>
      <input type='file' onChange={handleFileChange} />
      <button id="submit" variant="contained" type='submit'>Submit</button>
    </form>
    {/* <FileList userID={userID} onFileSelect={handleFileSelect} /> */}
  </>
  );
};

export default FileUpload;