import { useState, useEffect, useContext,} from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { AppContext, fetchURL } from '../App'
import styled from 'styled-components';
import useUserCheck from '../hooks/useUserCheck'
import '../stylesheets/training.css'

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
    const [trainingStatus, setTrainingStatus] = useState([]);
    const [completionDates, setCompletionDates] = useState([]);
    const {validToken, validatedUserType, userID} = useUserCheck();

    useEffect(() => {
        fetchTrainingStatus(userID);
        //fetchRequiredTraining();
        fetchSubordinates();
    }, [validToken, supervisor]);

    useEffect(() => {
        listSubordinates();
    }, [subordinates]);

    useEffect(() => {
        const tempCompletionDates = requiredTraining.map((training) => {
            let filtered = trainingStatus.filter((status) => status.name === training.training_name);
            let latestCompletionDate = null;
            for (const item of filtered) {
                if (item.completion_date && (!latestCompletionDate || item.completion_date > latestCompletionDate)) {
                latestCompletionDate = item.completion_date;
                }
            }
            return { name: training.training_name, completion_date: latestCompletionDate };
        });
        setCompletionDates(tempCompletionDates);
    }, [requiredTraining, trainingStatus]);

    const fetchTrainingStatus = async (id) => {
        try {
            if(!id)
            {
                return;
            }
            const response = await fetch(`${fetchURL}/user/status/${id}`);
            const data = await response.json();
            setTrainingStatus(data);
            setRequiredTraining(data);
        } catch (error) {
            console.error('Error fetching training statuses', error);
        }
    }

    // const fetchRequiredTraining = async () => {
    //     try {
    //         if(!userID)
    //         {
    //             return;
    //         }
    //         const response = await fetch(`${fetchURL}/requiredTraining/user/${userID}`);
    //         const data = await response.json();


    //     } catch (error) {
    //         console.error('Error fetching your required training', error);
    //     }
    // };


    const fetchSubordinates = async () =>
    {
        //Dirty hack for checking if supervisor. May need to add a way to pull from DB
        const response = await fetch(`${fetchURL}/users`);
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
                    let response = await fetch(`${fetchURL}/requiredtraining/${subordinates[index].id}`)
                    let data = await response.json();
                    mappedData.push({name: `${subordinates[index].last_name}, ${subordinates[index].first_name}`, subordinate_id: subordinates[index].id, data: data});
                }
                setSubordinates(mappedData);
            } catch (error) {
                console.error('Error fetching your subordinates', error); }
            }
        try {
            if(!userID)
            {
                return;
            }
            const response = await fetch(`${fetchURL}/user/subordinates/${userID}`);
            const data = await response.json();
            setSubordinates(data);
        } catch (error)
        {
            console.error('Error fetching your required training', error);
        }
    };

    const listSubordinates = () => (
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
            {subordinates.map((subordinate) => {
                if(!subordinate?.map)
                {
                    return;
                }
                return subordinate.map((training, index)=> {
                    let dueDate = null;
                    let complete;
                    if (training.most_recent_completion_date) {
                        const completionDate = new Date(training.most_recent_completion_date);
                        const completed = completionDate.toISOString().split('T')[0];
                        const intervalInMilliseconds = training.interval * 24 * 60 * 60 * 1000;
                        const newDueDate = new Date(completionDate.getTime() + intervalInMilliseconds);
                        dueDate = newDueDate.toISOString().split('T')[0];
                        complete = 'Completed'
                    } else {
                        dueDate = "Overdue"
                        complete = 'Not Completed'
                    }
                    let dueDateEpoch = Date.parse(dueDate)

                    const listItemStyle = {
                        marginBottom: '20px',
                        padding: 0,
                        borderRadius: '5px',
                        border: complete === 'Not Completed' ? '1px solid #ff6347' : '1px solid #98fb98',
                        backgroundColor: complete === !'Not Completed' ? '#ffe4e1' : '#f0fff0'
                      }

                    return (
                        <div style={listItemStyle}>
                        <ListItem
                            key={index}
                            disableGutters
                            secondaryAction={
                        <Link to={`/required-training/${training.training_id}`}>
                            <IconButton aria-label="info">
                            <InfoIcon />
                            </IconButton>
                        </Link>
                        }
                        >
                        <ListItemText

                        primary={`${training.first_name} ${training.last_name}`}
                        secondary={`${training.training_name}, Due: ${dueDate}`}
                        />
                        </ListItem>
                        </div>
                    )})
            })}
        </List>
    )

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
                                <ListSubHeader className='listSub'>Access your mandatory training courses</ListSubHeader>
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
                                        { requiredTraining ? requiredTraining.map((training, index)=> {

                                            let dueDate = null;
                                            let complete;
                                            if (training.most_recent_completion_date) {
                                                const completionDate = new Date(training.most_recent_completion_date);
                                                const completed = completionDate.toISOString().split('T')[0];
                                                const intervalInMilliseconds = training.interval * 24 * 60 * 60 * 1000;
                                                const newDueDate = new Date(completionDate.getTime() + intervalInMilliseconds);
                                                dueDate = newDueDate.toISOString().split('T')[0];
                                                complete = 'Completed'
                                            } else {
                                                dueDate = "Overdue"
                                                complete = 'Not Completed'
                                            }
                                            let dueDateEpoch = Date.parse(dueDate)
                                            if(dueDateEpoch < Date.now())
                                            {
                                                training['due'] = true;
                                            }
                                            else
                                            {
                                                training['due'] = false;
                                            }

                                            const listItemStyle = {
                                                marginBottom: '20px',
                                                padding: 0,
                                                borderRadius: '5px',
                                                border: complete === 'Not Completed' ? '1px solid #ff6347' : '1px solid #98fb98',
                                                backgroundColor: complete === !'Not Completed' ? '#ffe4e1' : '#f0fff0'
                                            }

                                            return (
                                                <div style={listItemStyle}>
                                                <ListItem
                                                    key={index}
                                                    disableGutters
                                                    secondaryAction={
                                                <Link to={`/required-training/${training.training_id}`}>
                                                    <IconButton aria-label="info">
                                                    <InfoIcon />
                                                    </IconButton>
                                                </Link>
                                                }
                                                >
                                                <ListItemText

                                                primary={`${training.training_name}`}
                                                secondary={`Completed: ${complete} Due: ${dueDate}`}
                                                />
                                                </ListItem>
                                                </div>
                                            )}) : null}
                                    </List>
                                </ListContainer>
                            </AccordionDetails>
                        </Accordion>
                        {supervisor && (
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
                                    {listSubordinates()}
                                </ListContainer>
                            </AccordionDetails>
                        </Accordion>
                         )}
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
display: flex;
flex-direction: column;
margin-top: 5em;
height: 100%;`

const RequiredTrainingWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
overflow-y: hidden;
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