import React from "react";
import { useEffect, useState} from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchURL } from "../App";
import { LeftDiv, ListHeader, ListTitle, SubDiv, gridStyle, boxStyle } from "./TrainingDisplay UTM-ADMIN";
import { Box, Grid, Divider  } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import mySvg from '../Icons/16px/Check 2.svg'
import '../stylesheets/training.css'
import ContentEditable from "react-contenteditable";
import styled from "styled-components";


export default function EditView({editmode, setEditmode}) {
  const {training} = useParams();
  const [trainingData, setTrainingData] = useState([])
  const [name, setName] = useState('')
  const nameUpdate = useRef(null);
  const intervalUpdate = useRef(null);
  const sourceUpdate = useRef(null);
  const [updatedName, setUpdatedName] = useState(trainingData.name || null);
  const [updatedInterval, setUpdatedInterval] = useState(trainingData.interval || null);
  const [updatedSource, setUpdatedSource] = useState(trainingData.source || null);
  const [updatedType, setUpdatedType] = useState(trainingData.type_id || null);
  const [updatedDuty, setUpdatedDuty] = useState(trainingData.duty_id || null);
  const [updatedTrainingData, setUpdatedTrainingData] = useState({})
  const navigate = useNavigate();

  const handleUpdates = () => {
    handleUpdateTraining();
    setEditmode(!editmode);
  }

  const handleUpdateTraining = async () => {
    try {
      const patchObject = {
        name: nameUpdate.current.innerHTML !== null ? nameUpdate.current.innerHTML : trainingData.name,
        type_id: updatedType !== null ? updatedType : trainingData.type_id,
        interval: parseInt(intervalUpdate.current.innerHTML) !== null ? parseInt(intervalUpdate.current.innerHTML) : trainingData.interval,
        source: sourceUpdate.current.innerHTML !== null ? sourceUpdate.current.innerHTML : trainingData.interval
      };

      console.log(patchObject);

      const response = await fetch(`${fetchURL}/requiredTraining/${training}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchObject),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      fetchRequiredTraining();
      alert('Training updated successfully!');
      navigate('/unit-training-manager');
    } catch (error) {
      alert('Training update failed!');
    }
  }


  useEffect(() => {
      fetchRequiredTraining();
  }, [training]);


  const fetchRequiredTraining = async () => {
      try {
          const response = await fetch(`${fetchURL}/requiredTraining/${training}`);
          const data = await response.json();
          console.log(data)
          setTrainingData(data);
          setUpdatedTrainingData(data);
      } catch (error) {
          console.error('Error fetching your required training', error);
      }
  };

return (
    <>
<LeftDiv>
        <ListTitle>
          <StarIcon sx={{fontSize: 'xxx-large'}} />
          <ListHeader>
            <ContentEditable className="name changeMe" innerRef={nameUpdate} tagName='p' html={trainingData.name}></ContentEditable>
          </ListHeader>
        </ListTitle>
        <SubDiv>
          <Box sx={boxStyle}>
                <Grid sx={gridStyle}>
                  <h5>Type:</h5>
                  <Select className="changeMe"
                    value={updatedType !== null ? updatedType : trainingData.type_id}
                    onChange={(e) => setUpdatedType(parseInt(e.target.value))}
                  >
                  <option value="1">Primary Training</option>
                  <option value="2">Auxilary Training</option>
                  <option value="3">Professional Military Education</option>
                  <option value="4">Additional Training </option>
                </Select>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid sx={gridStyle}>
                  <h5>Interval (days):</h5>
                 <ContentEditable className="changeMe" innerRef={intervalUpdate} html={`${trainingData.interval}`}></ContentEditable>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid sx={gridStyle}>
                  <h5>Source:</h5>
                <ContentEditable className="changeMe" innerRef={sourceUpdate} html={trainingData.source}></ContentEditable>
                </Grid>
              </Box>
          </SubDiv>
          <ButtonContainer>
            <button className="black" onClick={()=>(handleUpdates())}> Save Changes </button>
          </ButtonContainer>
      </LeftDiv>
      </>
)}

const ButtonContainer = styled.div`
display: flex;
justify-content: center;
`
const Select = styled.select`
font-size: x-large;
border: none;
color: #007BFF;
`
