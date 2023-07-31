import React, { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();

    if (selectedFile) {
      // Create a new FormData object and append the selected file to it
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        // Send the file to the backend using fetch or axios
        const response = await fetch(`http://${fetchURL}:4000/upload`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // File uploaded successfully
          console.log('File uploaded successfully');
        } else {
          // Handle the error
          console.error('Error uploading file');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
    <Button variant="contained" type='submit' endIcon={<SendIcon />}>Submit</Button>
  </form>
  );
}

export default FileUpload;