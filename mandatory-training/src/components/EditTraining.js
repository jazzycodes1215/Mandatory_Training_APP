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
                  <select>
                    <option value="Guardian">Guardian</option>
                    <option value="Comsec Responsible Officer">Comsec Responsible Officer</option>
                    <option value="Unit Fitness Program Manager">Unit Fitness Program Manager</option>
                    <option value="Antiterrorism Officer">Antiterrorism Officer</option>
                    <option value="Unit Deployment Manager">Unit Deployment Manager</option>
                    <option value="Unit Training Manager">Unit Training Manager</option>
                    <option value="Space Systems Operations">Space Systems Operations</option>
                    <option value="All Source Intel">All Source Intel</option>
                    <option value="Imagery Analyst / GEOINT'">Imagery Analyst / GEOINT'</option>
                    <option value="ELINT Analyst (SIGINT)">ELINT Analyst (SIGINT)</option>
                    <option value="COMINT Analyst (SIGINT)">COMINT Analyst (SIGINT)</option>
                    <option value="Cyber Intel Analyst'">Cyber Intel Analyst'</option>
                    <option value="Analysis and Reporting (Fusion Analyst)">Analysis and Reporting (Fusion Analyst)</option>
                    <option value="Targeting Analyst">Targeting Analyst</option>
                    <option value="Intelligence">Intelligence</option>
                    <option value="Cyber Ops - Network Ops">Cyber Ops - Network Ops</option>
                    <option value="Cyber Ops - System Ops">Cyber Ops - System Ops</option>
                    <option value="Cyber Ops - RF Ops (SATCOM)">Cyber Ops - RF Ops (SATCOM)</option>
                    <option value="Cyber Ops - Defensive Cyber Ops">Cyber Ops - Defensive Cyber Ops</option>
                    <option value="Software Development Ops (SFSC Agnostic)">Software Development Ops (SFSC Agnostic)</option>
                  </select>
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