import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App'
import useUserCheck from '../hooks/useUserCheck'

import { ToggleButton, ToggleButtonGroup, Button } from '@mui/material';

export default function CreateTraining() {
  const [alignment, setAlignment] = useState('source');
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [interval, setInterval] = useState(null);
  const [source, setSource] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [number, setNumber] = useState(null);
  const [summary, setSummary] = useState(null);
  const [dutyOptions, setDutyOptions] = useState(null);
  const [duties, setDuties] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDutyOptions();
  }, []);
  
  const fetchDutyOptions  = async () => {
    try {
      const response = await fetch(`${fetchURL}/duties`);
      const data = await response.json();
      setDutyOptions(data);
    } catch (error) {
      console.error('Error fetching duty options', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name: name,
      type_id: parseInt(type),
      interval: parseInt(interval),
      source: alignment === 'source' ? source : `${firstName} ${lastName}, ${number}`,
      };
      console.log(formData)
  
    try {
      const response = await fetch(`${fetchURL}/requiredTraining`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
      throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const { trainingId } = data; // Extract the newly created training ID from the response
      console.log('POST request successful. New training ID:', trainingId);
  
      // Now use the trainingId to connect the training to the associated duties
      // Perform the subsequent POST request to /dutyTraining/:trainingId endpoint
      const dutyTrainingData = {
      dutyIds: duties,
      };
      console.log(dutyTrainingData);
  
      const dutyTrainingResponse = await fetch(`${fetchURL}/dutyTraining/${trainingId.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dutyTrainingData),
      });
  
      if (!dutyTrainingResponse.ok) {
      throw new Error('Network response was not ok');
      }
  
      const dutyTrainingResult = await dutyTrainingResponse.json();
      alert('Training created successfully!');
      navigate('/unit-training-manager');
    } catch (error) {
      alert('Training creation failed!');
      console.error('Error making POST request:', error);
    }
    }; 


  const handleSelectDuties = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedValues = selectedOptions.map((option) => parseInt(option.value));
    setDuties(selectedValues);
    };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleCancel = () => {
    navigate('/unit-training-manager');
  };

  return (
    <CreateTrainingWrapper>
      <h1>Create New Training</h1>
      <TrainingInputContainer>
        <Row>
          <Column>
            <Label for="inputName">Training Name:</Label>
            <InputTrainingInfo onChange={(e)=>{setName(e.target.value)}} id="inputName" type="text" required></InputTrainingInfo>
          </Column>
          <Column>
            <Label for="selectType">Training Type</Label>
              <SelectTrainingInfo className="clickable" onChange={(e)=>{setType(e.target.value)}} id="selectType" required>
                <option value="null">Select a training type</option>
                <option value="1">Primary Training</option>
                <option value="2">Auxilary Training</option>
                <option value="3">Professional Military Education</option>
                <option value="4">Additional Duty Training</option>
              </SelectTrainingInfo>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label for="inputInterval">Training Interval Requirement (days):</Label>
            <InputTrainingInfo onChange={(e)=>{setInterval(e.target.value)}} id="inputInterval" type="number" required></InputTrainingInfo>
          </Column>
          <Column>
          <Label for="source-poc">Training Information Source:
            <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            id="source-poc"
            >
            <ToggleButton value="source" title="Provide a URL">URL</ToggleButton>
            <ToggleButton value="poc" title="Provide a POC">POC</ToggleButton>
            </ToggleButtonGroup>
            </Label>
            { alignment === 'source' ?
              <>
                <label for="inputSource">Training URL: </label>
                <InputTrainingInfo onChange={(e)=>{setSource(e.target.value)}} id="inputSource" type="url" required></InputTrainingInfo>
              </>
              :
              <>
                <label for="inputFirstName">POC First Name: </label>
                <InputTrainingInfo onChange={(e)=>{setFirstName(e.target.value)}} id="inputFirstName" type="text" required></InputTrainingInfo>
                <label for="inputNumber">POC Last Name: </label>
                <InputTrainingInfo onChange={(e)=>{setLastName(e.target.value)}} id="inputLastName" type="text" required></InputTrainingInfo>
                <label for="inputNumber">POC Phone Number (123-456-7890)</label>
                <InputTrainingInfo onChange={(e)=>{setNumber(e.target.value)}} id="inputNumber" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required></InputTrainingInfo>
              </>
            }
          </Column>
        </Row>
        <Row>
          <Column>
            <Label for="selectDuties">Training Duties:</Label>
            <SelectTrainingInfo className='clickable' onChange={handleSelectDuties} id="selectDuties" multiple required>
              {dutyOptions?.map((element)=> {
                return (
                  <option value={element.id}>{element.title}</option>
                )
              })}
            </SelectTrainingInfo>
          </Column>
          {/* <Column>
            <Label for="inputSummary">Training Summary:</Label>
            <InputSummary rows="4" onChange={(e)=>{setSummary(e.target.value)}} id="inputSummary" type="text"></InputSummary>
          </Column> */}
        </Row>
      </TrainingInputContainer>
      <ButtonContainer>
        <Button id="createSub" variant="contained" onClick={handleSubmit}>Create Training</Button>
        <Button variant="contained" onClick={handleCancel}>Cancel</Button>
      </ButtonContainer>
    </CreateTrainingWrapper>
  )
}

const CreateTrainingWrapper = styled.div`
padding: 10px;
`
const TrainingInputContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`
const Row = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
`
const Column = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
width: 50%;
height: fit-content;
margin-left: 20px;
margin-right: 20px;
margin-top: 50px;
`
const InputTrainingInfo = styled.input`
align-self: stretch;
`
const InputSummary = styled.textarea`
align-self: stretch;
`
const SelectTrainingInfo = styled.select`
align-self: stretch;
`
const Label = styled.label`
font-weight: 700;
`
const ButtonContainer = styled.div`
display: flex;
justify-content: center;
margin: 50px;
`