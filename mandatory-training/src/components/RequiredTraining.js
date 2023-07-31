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


export default function RequiredTraining() {
    const { testStr, user } = useContext(AppContext);
    const [requiredTraining, setRequiredTraining] = useState([]);
    const [subordinates, setSubordinates] = useState([]);
    const [supervisor, setSupervisor] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const {validToken, validatedUserType, userID} = useUserCheck()

    useEffect(() => {
        fetchRequiredTraining();
        fetchSubordinates();
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
    const fetchSubordinates = async () => {
        //Dirty hack for checking if supervisor. May need to add a way to pull from DB
        const response = await fetch(`http://${fetchURL}:4000/users`);
        const data = await response.json();
        let tempSup = false;
        if(data?.find(element => element.supervisor_id === userID))
        {
            tempSup = true;
            setSupervisor(true)
        }
        if (supervisor || tempSup) {
            let subordinates = [];
            data.forEach((element)=>{
                if(element.supervisor_id === userID)
                {
                    subordinates.push(element);
                }
            })
            try {
                let mappedData = [];
                for ( const index in subordinates )
                {
                    let response = await fetch(`http://${fetchURL}:4000/requiredtraining/${subordinates[index].id}`)
                    let data = await response.json();
                    mappedData.push({name: `${subordinates[index].last_name}, ${subordinates[index].first_name}`, subordinate_id: subordinates[index].id, data: data});
                }
                setSubordinates(mappedData);
            } catch (error) {
                console.error('Error fetching your subordinates', error);
            }
        } else {
            setSubordinates([]);
        }
    };

    const handleExpand = (accordion) => {
        setExpanded(expanded === accordion ? null : accordion);
    }

    return (
        <>
            {validToken ?
            (
                <RequiredTrainingWrapper>
                    <TrainingContainer>
                        <Accordion expanded={expanded==='accordion1'} onClick={()=>handleExpand('accordion1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <ListTitle>
                                    <StarIcon sx={{fontSize: 'xxx-large'}} />
                                    <ListHeader>My Mandatory Training</ListHeader>
                                </ListTitle>
                                <ListSubHeader>Access your mandatory training courses</ListSubHeader>
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
                        {supervisor &&
                        <Accordion  expanded={ expanded ==='accordion2'} onClick={()=>handleExpand('accordion2')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                <ListTitle>
                                    <StarIcon sx={{fontSize: 'xxx-large'}} />
                                    <ListHeader>Subordinate Training</ListHeader>
                                </ListTitle>
                                <ListSubHeader>Access subordinates mandatory training courses</ListSubHeader>
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
                                        {subordinates.map((subordinate, index) => {
                                            return subordinate.data?.map((element, index)=> (
                                                <ListItem
                                                    key={index}
                                                    disableGutters
                                                    style={{'marginBottom': '20px', padding: 0}}
                                                    secondaryAction={
                                                <Link to={`/required-training/${element.id}`}>
                                                    <IconButton aria-label="info">
                                                    <InfoIcon />
                                                    </IconButton>
                                                </Link>
                                            }
                                            >
                                            <ListItemText
                                            primary={element.name}
                                            secondary={subordinate.name}
                                            />
                                            </ListItem>
                                            ))
                                            })}
                                    </List>
                                </ListContainer>
                            </AccordionDetails>
                        </Accordion>
                        }
                    </TrainingContainer>
                </RequiredTrainingWrapper>
            )
            :
            (
                <LoginP>You need to be logged in to access this page!</LoginP>
            )}
        </>
    )
}

const LoginP = styled.p`
font-size: 1vw;
margin-top: 3em`

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