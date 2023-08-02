import React, { useState } from 'react';
import {fetchURL} from '../App'
import styled from 'styled-components';

export default function SubmitBug({ trainingId, setDisplay, userId }) {
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const method = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trainingId, description, userId }),
      }
      const response = await fetch(`${fetchURL}/tickets`, method);
      const data = await response.json();
      console.log(data);
      setMessage("Success")
      setTimeout(setDisplay(false), 5000)
    } catch (error) {
      setMessage("Error adding ticket to database!")
    }
  };

  return (
    <SubmitOverlay>
      {message && <Message>{message}</Message>}
      <Form onSubmit={handleSubmit}>
      <CloseButton onClick={()=>setDisplay(false)}>X</CloseButton>
        <h1>Report a Bug</h1>

        <Input
          type="number"
          value={trainingId}
          readOnly
        />

        <Textarea
          placeholder="Describe the bug..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <Button type="submit">Submit</Button>
      </Form>
    </SubmitOverlay>
  );
}

const Message = styled.div`
  position: absolute;
  top: -50px;
  background-color: white;
  color: black;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
`;

const SubmitOverlay = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0, 0.9);
`;

const CloseButton = styled.button`
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 24px;
  background: transparent;
  border: none;
  color: #000;
  cursor: pointer;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 1rem;
`;

const Textarea = styled.textarea`
  margin-bottom: 1rem;
  min-height: 100px;
`;

const Button = styled.button`
  cursor: pointer;
`;