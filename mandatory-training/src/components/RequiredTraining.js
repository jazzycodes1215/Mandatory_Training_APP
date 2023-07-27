import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../App'
import styled from 'styled-components';
import useUserCheck from '../hooks/useUserCheck'

import { Box, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';


export default function RequiredTraining() {
    const { testStr, isSupervisor, user } = useContext(AppContext);
    const [requiredTraining, setRequiredTraining] = useState([]);
    const [subordinates, setSubordiantes] = useState([]);
    const {validToken, validatedUserType, userID} = useUserCheck()

    useEffect(() => {
        fetchRequiredTraining();
        fetchSubordinates();
    }, [validToken]);

    const fetchRequiredTraining = async () => {
        try {
            if(!userID)
            {
                return;
            }
            const response = await fetch(`http://localhost:4000/requiredtraining/${userID}`);
            const data = await response.json();
            console.log(data);
            setRequiredTraining(data);
        } catch (error) {
            console.error('Error fetching your required training', error);
        }
    };
    const fetchSubordinates = async () => {
        if (isSupervisor) {
            try {
                const response = await fetch(`http://localhost:4000/users?supervisor=${userID}`);
                const data = await response.json();
                setSubordiantes(data);
            } catch (error) {
                console.error('Error fetching your subordinates', error);
            }
        } else {
            setSubordiantes([]);
        }
    };

    return (
        <>
            {validToken ?
            <RequiredTrainingWrapper>
            <InfoContainer>
                <ListHeading>
                    <ListTitle>
                        <StarIcon sx={{fontSize: 'xxx-large'}} />
                        <ListHeader>My Mandatory Training</ListHeader>
                    </ListTitle>
                    <ListSubHeader>Access your mandatory training courses</ListSubHeader>
                </ListHeading>
                <ListContainer>
                    <List sx={
                        { width: '99%',
                        height: '100%', bgcolor:
                        'background.paper',
                        overflow: 'hidden',
                        'overflow-y': 'scroll',
                        padding: '0px',
                        'margin-left': '1vw',
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
                            style={{'margin-bottom': '20px', padding: 0}}
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
            </InfoContainer>
            {isSupervisor ?
                 <ListContainer>
                    <List sx={{ width: '100%', height: '100%', bgcolor: 'background.paper'}}>
                        {subordinates.map((subordinate, index) => (
                            <ListItem
                            key={index}
                            disableGutters
                            style={{margin: 0, padding: 0}}
                            secondaryAction={
                                <Link to={`/required-training/subordinate`}>
                                    <IconButton aria-label="info">
                                    <InfoIcon />
                                    </IconButton>
                                </Link>
                            }
                            >
                            <ListItemText
                            primary={subordinate.training_name}
                            secondary={subordinate.requiredTraining}
                            />
                            </ListItem>
                        ))}
                    </List>
                </ListContainer>
                :
                <></>
            }

        </RequiredTrainingWrapper> : <p>You need to be logged in to access this page!</p>}
        </>
    )
}

const RequiredTrainingWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`;
const ListContainer = styled.div`
flex-grow: 1;
height:68vh;
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