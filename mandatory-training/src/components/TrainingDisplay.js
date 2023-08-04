import { useState, useEffect, useContext, useRef} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { AppContext, fetchURL } from '../App'
import styled from 'styled-components';
import useUserCheck from '../hooks/useUserCheck'
import SubmitBug from './SubmitBug'
import FileUpload from './FileUpload'
import FadeAwayMessage from './FadeAwayMessage'
import TrainingDisplayUTM from  './TrainingDisplay UTM-ADMIN';
import '../stylesheets/training.css'
import chevron from '../Icons/16px/chevron.svg'

import { boxStyle, gridStyle } from './TrainingDisplay UTM-ADMIN';

import { Box, Button, List, ListItem, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails, Grid, Divider  } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TrainingDisplay(props) {
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
  const [submissionFeedback, setSubmissionFeedback] = useState({ success: false, message: '' });

  const fetchTraining = async () => {
    const response = await fetch(`${fetchURL}/training/${training}`)
    const data = await response.json();
    setTrainingData(data);
  }
  console.log('props:', props.supervisor)
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



  const handleSubmitTraining = async () => {
    try {
      // Fetch the submitting user's name
      const userResponse = await fetch(`${fetchURL}/users/${userID}`);
      const userData = await userResponse.json();
      const { first_name, last_name } = userData;
  console.log(userData)
      // Prepare the comment with user's first name and last name
      const comment = `${trainingData.name} Completed by: ${first_name} ${last_name}`;
  
      // Send the POST request with the updated comment
      const response = await fetch(`${fetchURL}/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userID,
          training_id: trainingData.id,
          submission_date: new Date().toISOString(),
          comment,
          read_status: false,
          training_name: trainingData.name
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setSubmissionFeedback({ success: true, message: 'Training submitted successfully' });
    } catch (error) {
      console.error('Error submitting training:', error);
      setSubmissionFeedback({ success: false, message: 'Error submitting training. Please try again.' });
    }
  };


console.log(userID)
 console.log('trainingData',trainingData)
  return (
    <>
      {displaySubmit ? <SubmitBug trainingId={training} setDisplay={setDisplaySubmit} userId={userID}/>: null}
      {displayFileUpload ?
      <SubmitOverlay>
        <Form  id="file-upload">
        <h2>Submit Certificate</h2>
          <FileUpload setErrorMessageCB={setErrorMessage}/>
          <CloseButton onClick={()=>setDisplayFileUpload(false)}>close</CloseButton>
          <p>{errorMessage ? <FadeAwayMessage message={errorMessage} duration={10000}/> : null}</p>
        </Form>
      </SubmitOverlay> : null}
      <div className='top-div2'>
        <h1>My Training</h1>
     </div>
      <ButtonTraining id="back-btn" onClick={()=>navigate(-1)}>
        <img src={chevron} alt="left back button"></img></ButtonTraining>
      {trainingData ?
      <FlexDiv>
      <LeftDiv>
        <ListTitle>
          <StarIcon sx={{fontSize: 'xxx-large'}} />
          <ListHeader>{trainingData.name}</ListHeader>
        </ListTitle>
        <SubDiv>
          <Box
            sx={{display: 'flex',
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
            }}}
          >
                <Grid
                sx={{gridStyle}}>
                  {trainingData.type_name}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid
                sx={{gridStyle}}>
                  {`Time Requirement: ${trainingData.interval ? `${trainingData.interval} ${trainingData.interval ===1 ? 'Day' : 'Days'}` : "One Time"}`}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid 
                sx={{gridStyle}}>
                  {`Source: ${trainingData.source}`}
                </Grid>
              </Box>
          </SubDiv>
      </LeftDiv>
      <Divider sx={{height: '75vh'}} orientation="vertical" flexItem />
      <RightDiv>
        {/* <ButtonTraining onClick={()=>navigate(`/training-UTM/${training}`)}>Go To Training</ButtonTraining> */}
        <ButtonTraining onClick={()=>setDisplayFileUpload(!displayFileUpload)}>Submit Certificate</ButtonTraining>
        <ButtonTraining onClick={handleSubmitTraining}>Mark Complete</ButtonTraining>
        <div className='inner-right'>
  {submissionFeedback.message && (
    <FeedbackMessage success={submissionFeedback.success}>
      {submissionFeedback.message}
    </FeedbackMessage>
  )}
</div>
        {subordinateData ?
        <div className='inner-right2'>
          <div className='stats'>
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
            </div>
          <ButtonTraining onClick={()=>setDisplaySubmit(!displaySubmit)}>Submit Bug</ButtonTraining>
        </div>
        : fetchTraining()}
      </RightDiv>
      </FlexDiv>
      : null}

    </>
  )
}

const FeedbackMessage = styled.p`
  color: ${({ success }) => (success ? 'green' : 'red')};
  font-weight: bold;
`;

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
  right: 41.3%;
  bottom: 15px;
  font-size: 10px;
  padding: 5px 20px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  background-color: red;
  
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
display: flex;
    flex-direction: column;
    width: 75vw;
    overflow: hidden;
    justify-content: center;
`

const RightDiv = styled.div`
width: 25vw;
overflow: hidden;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between

`

const SubDiv = styled.div`
display: flex;
align-items: flex-start;
height: 50%;`

const ButtonTraining = styled.button`
background-color: black;
color: white;
font-size: 1.5em;
padding: 0.7em 4em;
border: none;
border-radius: 3px;
cursor: pointer;
transition: all .3s ease;
margin-bottom: 30px;
    &:hover {
        background-color: white;
        color: #007BFF;
        border: 1px solid #007BFF
    }
`;

const ListTitle = styled.div`
display: flex;
flex-direction: row;
width: 100%;
align-items: center;
`;
const ListHeader = styled.span`
display: flex;
flex-direction: row;
align-items: center;
font-size: xxx-large;
font-weight: 700;
`;

const ListSubHeader = styled.span`
font-size: x-large;
`;