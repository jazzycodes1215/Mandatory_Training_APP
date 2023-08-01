import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchURL } from "../App";
import { LeftDiv, ListHeader, ListTitle, SubDiv } from "./TrainingDisplay UTM-ADMIN";
import { Box, Grid, Divider  } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import mySvg from '../Icons/16px/Settings.svg'
import '../stylesheets/training.css'


export default function EditView(props) {
    const {training} = useParams();
    const [trainingData, setTrainingData] = useState([])

    useEffect(() => {
        console.log(training)
        fetchRequiredTraining();
    }, [training]);

    const fetchRequiredTraining = async () => {

        try {
            const response = await fetch(`${fetchURL}/training/${training}`);

            const data = await response.json();

            setTrainingData(data);
            console.log(data)

        } catch (error) {
            console.error('Error fetching your required training', error);
        }
    };

return (    
<LeftDiv>
        <ListTitle>
          <StarIcon sx={{fontSize: 'xxx-large'}} />
          <ListHeader>{trainingData.name}</ListHeader>
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
                <select>
                  <option value="Primary Training">Primary Training</option>
                  <option value="Auxiliary Training">Auxilary Training</option>
                  <option value="Professiional Military Education">Professional Military Education</option>
                  <option value="Additional Training">Additional Training </option>
                </select>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid>
                <h5>Interval:</h5>
                  {`Time Requirement: ${trainingData.interval} days`}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid>
                <h5>Source:</h5>
                  {`Source: ${trainingData.source}`}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid sx={{paddingRight: 2}}>
                <h5>Duty:</h5>
                  {`Duty: ${trainingData.source}`}
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
)}