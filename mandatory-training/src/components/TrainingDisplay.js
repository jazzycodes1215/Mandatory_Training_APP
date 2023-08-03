import { useState, useEffect, useContext, useRef} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { AppContext, fetchURL } from '../App'
import styled from 'styled-components';
import useUserCheck from '../hooks/useUserCheck'
import SubmitBug from './SubmitBug'
import FileUpload from './FileUpload'
import FadeAwayMessage from './FadeAwayMessage'

import { Box, Button, List, ListItem, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails, Grid, Divider  } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TrainingDisplay() {
  const {training} = useParams();
  const [displaySubmit, setDisplaySubmit] = useState(false);
  const [displayFileUpload, setDisplayFileUpload] = useState(false);
  const [trainingData, setTrainingData] = useState({})
  const {validatedUserType, validToken, userID, unitID} = useUserCheck();
  const [isSupe, setIsSupe] = useState(false);
  const [subordinateData, setSubordinateData] = useState([])
  const [overdue, setOverdue] = useState([]);
  const [overduePercentage, setOverduePercentage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchTraining = async () => {
    const response = await fetch(`${fetchURL}/training/${training}`)
    const data = await response.json();
    setTrainingData(data);
  }

  const fetchSubordinates = async () => {

    if(!unitID)
    {
      console.log(unitID);
      return;
    }

    const response = await fetch(`${fetchURL}/unit/status/${unitID}`)
    const data = await response.json();

    let subordinate = [];
    let overdueSubordinates = [];
    let trainingStats = {totalSubordinates: 0};
    trainingStats['totalSubordinates'] = data.length-1;
    data?.forEach(element=>{
        let addUser = false;

        element.forEach((element)=>{
          if(element.supervisor_id === userID)
          {

            let dueDate;
            if(!trainingStats[training])
            {
              trainingStats[training] = 0;
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
          }

        })

        if(addUser)
        {
          overdueSubordinates.push(`${element[0].first_name} ${element[0].last_name}`)
        }

      })
    setOverduePercentage(trainingStats[training]/trainingStats['totalSubordinates'])
    setOverdue(overdueSubordinates)
    setSubordinateData(subordinate);
  }
  useEffect(()=>
  {
    fetchTraining();
    fetchSubordinates();
  }, [training, unitID])

  useEffect(()=>{
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }

    return () => clearTimeout(timer); // This will clear the timer when component unmount or on re-render
  }, [errorMessage])
  return (
    <>
      {displaySubmit ? <SubmitBug trainingId={training} setDisplay={setDisplaySubmit} userId={userID}/>: null}
      {displayFileUpload ?
      <SubmitOverlay>
        <Form>
          <div>
            <CloseButton onClick={()=>setDisplayFileUpload(false)}>X</CloseButton>
            <p>{errorMessage ? <FadeAwayMessage message={errorMessage} duration={10000}/> : null}</p>
          </div>
          <FileUpload setErrorMessageCB={setErrorMessage}/>
        </Form>
      </SubmitOverlay> : null}
      <ButtonTraining onClick={()=>navigate(-1)}>Go Back</ButtonTraining>
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
                <Grid>
                  {trainingData.type_name}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid>
                  {`Time Requirement: ${trainingData.interval ? `${trainingData.interval} ${trainingData.interval ===1 ? 'Day' : 'Days'}` : "One Time"}`}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid>
                  {`Source: ${trainingData.source}`}
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
      <Divider sx={{height: '75vh'}} orientation="vertical" flexItem />
      <RightDiv>
        <ButtonTraining onClick={()=>navigate(`/training-UTM/${training}`)}>Go To Training</ButtonTraining>
        <ButtonTraining onClick={()=>setDisplayFileUpload(!displayFileUpload)}>Submit Certificate</ButtonTraining>
        {subordinateData ?
        <div>
           <h3>Subordinate Completion Status</h3>
            <Box>
              Overdue: {Number.parseFloat((1 - overduePercentage) * 100).toFixed(2)} %
            </Box>
            <Box>

              Completion: {Number.parseFloat(overduePercentage * 100).toFixed(2)} %
            </Box>
            <Box>
              {overdue ? overdue?.map(element=><p>{element}</p>) : null}
            </Box>
          <ButtonTraining onClick={()=>setDisplaySubmit(!displaySubmit)}>Submit Bug</ButtonTraining>
        </div>
        : fetchTraining()}
      </RightDiv>
      </FlexDiv>
      : null}

    </>
  )
}


const InputLabel = styled.p`
align-self: flex-start`

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

const Form = styled.div`
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
    margin-top: 4vh;
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
`;
const ListHeader = styled.span`
font-size: xxx-large;
font-weight: 700;
`;
const ListSubHeader = styled.span`
font-size: x-large;
`;