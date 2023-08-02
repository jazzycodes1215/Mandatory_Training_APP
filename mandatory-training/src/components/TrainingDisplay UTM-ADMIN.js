import { useState, useEffect, useContext, createElement, useRef} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { AppContext, fetchURL } from '../App'
import styled from 'styled-components';
import useUserCheck from '../hooks/useUserCheck'
import ContentEditable from 'react-contenteditable';
import EditView from './EditTraining';

import { Box, Button, List, ListItem, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails, Grid, Divider  } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mySvg from '../Icons/16px/Settings.svg'
import '../stylesheets/training.css'

export default function TrainingDisplayUTM() {
  const {training} = useParams();
  const [trainingData, setTrainingData] = useState({})
  const navigate = useNavigate();
  const [editable, setEditable] = useState(true)
  const inputRef = useRef()
  const [saveButton, setSaveButton] = useState(false)
  const [editmode, setEditmode] = useState(false)
  const [trainingProp, setTrainingprop] = useState()


  const [source, setSource] = useState('')


  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here 
    // is better than directly setting `setValue(value + 1)`
}

const forceUpdate = useForceUpdate();

  const fetchTraining = async () => {
    const response = await fetch(`${fetchURL}/requiredTraining/${training}`)
    const data = await response.json();
    setTrainingData(data);
    console.log(data)
  }

  const EditPage = () => {
    forceUpdate();
    setEditmode(!editmode);
  }


  useEffect(()=>
  {
    fetchTraining();
  }, [training])

  return (
    <>
    {!editmode && (
      <div className='top-menu'>
      <ButtonTraining onClick={()=>navigate(-1)}>Go Back</ButtonTraining>
          <div className='editTraining'>
          <button onClick={()=>(EditPage())}>
            <p>Edit</p>
            <img src={mySvg} alt="(cog wheel)"></img>
            </button>
            </div>
      </div>)}
      
      {editmode && (
      <div className='top-menu'>
      <ButtonTraining onClick={()=>navigate(-1)}>Go Back</ButtonTraining>
          <div className='editTraining'>
          <button onClick={()=>(
            EditPage()
            )}>
            <p>Done</p>
            <img src={mySvg} alt="(cog wheel)"></img>
            </button>
            </div>
      </div>)}

      {trainingData ?
      <FlexDiv>
     
     {!editmode && ( <LeftDiv>
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
                  <h5>Type</h5>
                  {trainingData.type_name}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid>
                <h5>Interval</h5>
                  {`Time Requirement: ${trainingData.interval} days`}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid>
                <h5>Source</h5>
                  {`Source: ${trainingData.source}`}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid sx={{paddingRight: 2}}>
                <h5>Duty</h5>
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
      
      </LeftDiv>)}

      {editmode && (
        <EditView props={trainingData}/>)}

      <Divider sx={{height: '75vh'}}orientation="vertical" flexItem />
      <RightDiv>
        <h2>Training Statistics</h2>

      </RightDiv>
      </FlexDiv>
      : null}

    </>
  )
}

export const FlexDiv = styled.div`
overflow: hidden;
display: flex;`

export const LeftDiv = styled.div`
width: 75vw;
overflow: hidden;
align-items: center;
`

export const RightDiv = styled.div`
width: 25vw;
overflow: hidden;
display: flex;
flex-direction: column;
`

export const SubDiv = styled.div`
overflow: hidden;
margin-left: 3vw;`

export const ButtonTraining = styled.button`
    background-color: MidnightBlue;
    color: white;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #007BFF;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background-color: white;
        color: #007BFF;
    }

    &:focus {
        outline: none;
        border: 2px solid #0056b3; // Darker blue border
    }
`;

export const ListTitle = styled.div`
display: flex;
flex-direction: row;
width: 100%;
align-items: center;
`;
export const ListHeader = styled.span`
display: flex;
flex-direction: row;
align-items: center
font-size: xxx-large;
font-weight: 700;
`;
export const ListSubHeader = styled.span`
font-size: x-large;
`;