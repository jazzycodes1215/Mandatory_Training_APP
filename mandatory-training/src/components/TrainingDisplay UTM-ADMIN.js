import { useState, useEffect, useContext, createElement, useRef} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { AppContext, fetchURL } from '../App'
import useUserCheck from '../hooks/useUserCheck'
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';
import EditView from './EditTraining';
import chevron from '../Icons/16px/chevron.svg'

import { Box, IconButton, Grid, Divider  } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import '../stylesheets/training.css'

export default function TrainingDisplayUTM() {

  const {validatedUserType, validToken, unitID} = useUserCheck();
  const {training} = useParams();
  const [trainingData, setTrainingData] = useState({})
  const navigate = useNavigate();
  const [editmode, setEditmode] = useState(false)
  const [overduePercent, setOverDuePercent] = useState(NaN)

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
  }

  const EditPage = () => {
    forceUpdate();
    setEditmode(!editmode);

    fetchTraining();
  }

  const deleteTraining = async () => {
    // Show the confirmation prompt
    const confirmed = window.confirm('Warning! This will permanently delete this training/training requirement for all users!');
  
    if (!confirmed) {
      // If the user clicks Cancel, do nothing
      return;
    }
  
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
  
      alert('Training deleted successfully!');
      navigate('/unit-training-manager');
    } catch (error) {
      alert('Training deletion failed!');
    }
  };
  

  const fetchUnitStatus = async () => {
    try {
      if(!unitID) {
        return;
      }
      const response = await fetch(`${fetchURL}/unit/status/${unitID}`)
      const data = await response.json();
      let subordinate = [];
      let overdueSubordinates = [];
      let trainingStats = {totalSubordinates: 0};
      trainingStats['totalSubordinates'] = data.length;
      trainingStats[training] = 0;
      data?.forEach(element=>{
          let addUser = false;
          element.forEach((element)=>{
            console.log(element);
            let dueDate;
            if(element.training_id !== training) {
              return;
            }
            if(element.most_recent_completion_date)
            {
              dueDate = Date.parse(element.most_recent_completion_date) + (element.interval * 24 * 60 * 60 * 1000);
              if(dueDate < Date.now())
              {
                addUser = true;
              }
              else {
                trainingStats[training] += 1;
              }
            }
            else
            {
              addUser = true;
            }
            subordinate.push(element)
          })
          if(addUser)
          {
            overdueSubordinates.push(`${element[0].first_name} ${element[0].last_name}`)
          }
        })
      console.log(trainingStats)
      setOverDuePercent(trainingStats[training]/trainingStats['totalSubordinates'])
    } catch (error) {

    }
  }

  useEffect(()=>
  {
    fetchTraining();
    //fetchUnitStatus();
  }, [training, editmode, unitID])

  return (
    <>
    {!editmode && (<>
    <div className='top-div'>
        <ButtonTraining id="back-btn2" onClick={()=>navigate(-1)}>
        <img src={chevron} alt="left back button"></img></ButtonTraining>
        <h1>View Training</h1>
          <div className='editTraining'>

            <IconButton onClick={()=>(EditPage())} title="Toggle Edit Mode">
              <EditIcon/>
            </IconButton>
            <IconButton onClick={deleteTraining} title="Delete training">
              <DeleteIcon/>
            </IconButton>
          </div>
     </div>
      <div className='top-menu'>


      </div></>)}

      {editmode && (
      <>
    <div className='top-div'>
        <ButtonTraining id="back-btn2" onClick={()=>navigate(-1)}>
        <img src={chevron} alt="left back button"></img></ButtonTraining>
        <h1>Edit Training</h1>
          <div className='editTraining'>
          <IconButton onClick={()=>(EditPage())}>
         <CancelIcon/>
        </IconButton>
          </div>
     </div>
      <div className='top-menu'>


      </div></>)}

      {trainingData ?
      <FlexDiv>

    {!editmode && (<> <LeftDiv>
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
      </LeftDiv>

      <div className='bot-div'>
        <h2>Training Analytics Coming Soon!</h2>
      </div>

      </>)}

      {editmode && (<>
        <EditView editmode={editmode} setEditmode={setEditmode}/>

        <div className='bot-div'>
        <h2>Training Analytics Coming Soon!</h2>
      </div></>)}

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
display: flex;
flex-direction: column;
align-items: center;
height: 90vh;`


export const LeftDiv = styled.div`
display: flex;
flex-direction: column;
overflow: hidden;
justify-content: center;

height 30%;
margin-bottom: 50px;
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
padding: 0.4em 1em;
`;

export const ListTitle = styled.div`
display: flex;
flex-direction: row;
width: 100%;
align-items: center;
justify-content: center;
margin-bottom: 30px
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