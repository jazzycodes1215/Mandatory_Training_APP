import { useState, useEffect, useContext,} from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../App'
import styled from 'styled-components';
import useUserCheck from '../hooks/useUserCheck'

import { Box, Button, List, ListItem, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SubordinateTraining() {

  const { testStr, user } = useContext(AppContext);
  const [requiredTraining, setRequiredTraining] = useState([]);
  const [subordinates, setSubordinates] = useState([]);
  const [supervisor, setSupervisor] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const {validToken, validatedUserType, userID} = useUserCheck()

  useEffect(() => {
      fetchRequiredTraining();
  }, [validToken, supervisor]);

  const fetchRequiredTraining = async () => {
      try {
          if(!userID)
          {
              return;
          }
          const response = await fetch(`http://${fetchURL}:4000/requiredtraining/${userID}`);
          const data = await response.json();
          setRequiredTraining(data);
      } catch (error) {
          console.error('Error fetching your required training', error);
      }
  };

  return (<>{validToken ?
    ( <RequiredTrainingWrapper>
        <TrainingContainer>
            <Accordion expanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <ListTitle>
                        <StarIcon sx={{fontSize: 'xxx-large'}} />
                        <ListHeader>Subordinates Mandatory Training</ListHeader>
                    </ListTitle>
                    <ListSubHeader>View subordinate's mandatory training</ListSubHeader>
                </AccordionSummary>
                <AccordionDetails>
                    <ListContainer>
                    <List sx={
                            { width: '99%',
                            height: '100%', bgcolor:
                            'background.paper',
                            overflow: 'hidden',
                            'overflowY': 'scroll',
                            padding: '0px',
                            'marginLeft': '1vw',
                            '&::-webkit-scrollbar': {
                                width: '10px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#888',
                                borderRadius: '20px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: '#555',
                            },
                            }}>
                            {requiredTraining.map((training, index) => (
                                <ListItem
                                key={index}
                                disableGutters
                                style={{'marginBottom': '20px', padding: 0}}
                                secondaryAction={
                                    <Link to={`/required-training/${training.id}`}>
                                        <IconButton aria-label="info">
                                        <InfoIcon />
                                        </IconButton>
                                    </Link>
                                }
                                >
                                <ListItemText
                                primary={training.name}
                                secondary={training.interval}
                                />
                                </ListItem>
                            ))}
                        </List>
                    </ListContainer>
                </AccordionDetails>
            </Accordion>
            </TrainingContainer>
            </RequiredTrainingWrapper>)
            :
            (<p>You need to be logged in to access this page!</p>)}
            </>)
}

const TrainingContainer = styled.div`
display:flex;
flex-direction: column;
margin-top: 5em;
height: 100%;`

const RequiredTrainingWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`;
const ListContainer = styled.div`
flex-grow: 1;
height:50vh;
border-radius: 10px;
overflow: hidden;
box-sizing: border-box;
border: 2px solid black;
`;

const InfoContainer = styled.div`
width: 100%;
margin: 20px;
padding: 10px;
flex-grow: 1;
border-radius: 10px;
border: 4px solid black;
`
const ListHeading = styled.div`
display: flex;
flex-direction: column;
width: 100%;
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