import { useState, useEffect, useContext, createElement, useRef} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { AppContext, fetchURL } from '../App'
import styled from 'styled-components';
import useUserCheck from '../hooks/useUserCheck'
import ContentEditable from 'react-contenteditable';
import EditView from './EditTraining';

import { Box, IconButton, Grid, Divider  } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import '../stylesheets/training.css'

export default function TrainingDisplayUTM() {
  const {training} = useParams();
  const [trainingData, setTrainingData] = useState({})
  const navigate = useNavigate();
  const [editmode, setEditmode] = useState(false)


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

    fetchTraining();
  }

  const deleteTraining = async () => {
    try {
      const response = await fetch(`${fetchURL}/requiredTraining/${training}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Training deleted successfully');
      navigate('/unit-training-manager');
    } catch (error) {
      console.error('Error deleting training:', error);
    }
  };

  useEffect(()=>
  {
    fetchTraining();
  }, [training, editmode])

  return (
    <>
    {!editmode && (
      <div className='top-menu'>
      <ButtonTraining onClick={()=>navigate(-1)}>Go Back</ButtonTraining>
          <div className='editTraining'>
            <IconButton onClick={()=>(EditPage())}>
              <EditIcon/>
            </IconButton>
            <IconButton onClick={deleteTraining}>
              <DeleteIcon/>
            </IconButton>
          </div>
      </div>)}

      {editmode && (
      <div className='top-menu'>
      <ButtonTraining onClick={()=>navigate(-1)}>Go Back</ButtonTraining>
          <div className='editTraining'>
            <IconButton onClick={()=>(EditPage())}>
              <CancelIcon/>
            </IconButton>
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
          <Box sx={boxStyle}>
                <Grid sx={gridStyle}>
                  <h5>Type</h5>
                  {trainingData.type_name}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid sx={gridStyle}>
                <h5>Interval</h5>
                {`Time Requirement: ${trainingData.interval ? `${trainingData.interval} ${trainingData.interval ===1 ? 'Day' : 'Days'}` : "One Time"}`}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid sx={gridStyle}>
                <h5>Source</h5>
                  {`${trainingData.source}`}
                </Grid>
              </Box>
          </SubDiv>
      </LeftDiv>)}
      {editmode && (
        <EditView editmode={editmode} setEditmode={setEditmode}/>)}
      <Divider sx={{height: '75vh'}}orientation="vertical" flexItem />
      <RightDiv>
        <h2>Training Statistics</h2>
      </RightDiv>
      </FlexDiv>
      : null}
    </>
  )
}

export const boxStyle = {
  display: 'flex',
  alignItems: 'center',
  fontSize: "x-large",
  width: '100%',
  margin: "20px",
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
}
export const gridStyle = {
  padding: "10px",
  flexGrow: 1,
}

export const FlexDiv = styled.div`
overflow: hidden;
display: flex;`

export const LeftDiv = styled.div`
display: flex;
flex-direction: column;
width: 75vw;
overflow: hidden;
justify-content: center;
`

export const RightDiv = styled.div`
width: 25vw;
overflow: hidden;
display: flex;
flex-direction: column;
`

export const SubDiv = styled.div`
display: flex;
align-items: flex-start;
height: 50%;
`

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
align-items: center;
font-size: xxx-large;
font-weight: 700;
`;
export const ListSubHeader = styled.span`
font-size: x-large;
`;