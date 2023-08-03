import React from "react";
import { useEffect, useState} from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchURL } from "../App";
import { LeftDiv, ListHeader, ListTitle, SubDiv } from "./TrainingDisplay UTM-ADMIN";
import { Box, Grid, Divider  } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import mySvg from '../Icons/16px/Check 2.svg'
import '../stylesheets/training.css'
import ContentEditable from "react-contenteditable";


export default function EditView(props) {
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



  const handleUpdates = () => {
    handleUpdateTraining();
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
      console.log('PATCH request successful:', data);
      // Handle the response data as needed
    } catch (error) {
      console.error('Error making PATCH request:', error);
      // Handle errors
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

      } catch (error) {
          console.error('Error fetching your required training', error);
      }
  };

    //update unchanged fields to their previous data



    // const HandleSubmit = async () => {
    //     let header = {
    //         let patchObject = {name: name ? name : trainingData.name, interval: interval ? interval : trainingData.interval, source: source ? source : trainingData.source, type_id: type ? type : trainingData.type_id}

    //         method: "PATCH",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(patchObject)};
    //         //Maybe don't go to the login login... API
    //         let response = await fetch(`${fetchURL}/createAccount`, header)
    //         let status = response.status;
    //         let data = await response.json();
    //         console.log(data);
    //         if(status === 201)
    //         {
    //           //setUserType(data.userType);
    //           //setToken(data.token)
    //         }
    //         else
    //         {
    //             setError(data.message)
    //         }
    // }

return (
    <>
<LeftDiv>
        <ListTitle>
          <StarIcon sx={{fontSize: 'xxx-large'}} />
          <ListHeader><ContentEditable className="name changeMe" innerRef={nameUpdate} tagName='p' html={trainingData.name}></ContentEditable>

          <button onClick={()=>(handleUpdates())}>
            <p>Save</p>
            <img src={mySvg} alt="(cog wheel)"></img>
            </button>

            </ListHeader>
        </ListTitle>
        <SubDiv>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              bgcolor: 'background.paper',
              color: 'text.secondary',
              '& svg': {
                m: 1.5,
              },
              '& hr': {
                mx: 2,
              },
            }}
          >
                <Grid sx={{
                  paddingLeft: 2
                }}>
                  <h5>Type:</h5>
                  <select
                    value={updatedType !== null ? updatedType : trainingData.type_id}
                    onChange={(e) => setUpdatedType(parseInt(e.target.value))}
                  >
                  <option value="1">Primary Training</option>
                  <option value="2">Auxilary Training</option>
                  <option value="3">Professional Military Education</option>
                  <option value="4">Additional Training </option>
                </select>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid>
                  <h5>Interval:</h5>
                 <ContentEditable className="changeMe" innerRef={intervalUpdate} tagName='p' html={`${trainingData.interval}`}></ContentEditable><p>days</p>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid>
                  <h5>Source:</h5>
                <ContentEditable className="changeMe" innerRef={sourceUpdate} tagName='p' html={trainingData.source}></ContentEditable>
                </Grid>
              </Box>
          </SubDiv>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '95%',
            height: '80%',
            border: (theme) => `3px solid ${theme.palette.divider}`,
            borderRadius: 1,
            bgcolor: 'background.paper',
            color: 'text.secondary',
            marginTop: '1vh',
            marginLeft: '1vw',
            '& svg': {
              m: 1.5,
            },
            '& hr': {
              mx: 0.5,
            },
          }}>
        </Box>
      </LeftDiv>
      </>
)}
