import { useState, useEffect, useContext, createElement, useRef} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { AppContext, fetchURL } from '../App'
import styled from 'styled-components';
import useUserCheck from '../hooks/useUserCheck'
import ContentEditable from 'react-contenteditable';

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

  const [source, setSource] = useState('')

  const fetchTraining = async () => {
    const response = await fetch(`${fetchURL}/training/${training}`)
    const data = await response.json();
    setTrainingData(data);
    setSource(`${data.source}`);
  }

  useEffect(()=>
  {
    fetchTraining();
  }, [training])

  return (
    <>
      <div className='top-menu'>
      <ButtonTraining onClick={()=>navigate(-1)}>Go Back</ButtonTraining>
          <div className='editTraining'>
          <p>Edit</p>
          <img src={mySvg} alt="mmm"></img>
        </div>
      </div>
      {trainingData ?
      <FlexDiv>
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
      </LeftDiv>
      <Divider sx={{height: '75vh'}}orientation="vertical" flexItem />
      <RightDiv>
        <h2>Training Statistics</h2>

      </RightDiv>
      </FlexDiv>
      : null}

    </>
  )
}

const FlexDiv = styled.div`
overflow: hidden;
display: flex;`

const LeftDiv = styled.div`
width: 75vw;
overflow: hidden;
align-items: center;
`

const RightDiv = styled.div`
width: 25vw;
overflow: hidden;
display: flex;
flex-direction: column;
`

const SubDiv = styled.div`
overflow: hidden;
margin-left: 3vw;`

const ButtonTraining = styled.button`
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

const ListTitle = styled.div`
display: flex;
flex-direction: row;
width: 100%;
align-items: center;
`;
const ListHeader = styled.span`
font-size: xxx-large;
font-weight: 700;
`;
const ListSubHeader = styled.span`
font-size: x-large;
`;