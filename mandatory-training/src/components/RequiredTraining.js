import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../App'
import styled from 'styled-components';

import { Box, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';

export default function RequiredTraining() {
    const { testStr, isSupervisor, user } = useContext(AppContext);
    const [requiredTraining, setRequiredTraining] = useState([]);
    const [subordinates, setSubordiantes] = useState([]);

    useEffect(() => {
        fetchRequiredTraining();
        fetchSubordinates();
    }, []);

    const fetchRequiredTraining = async () => {
        try {
            const response = await fetch(`http://localhost:3001/required-training/:${user}`);
            const data = await response.json();
            setRequiredTraining(data);
        } catch (error) {
            console.error('Error fetching your required training', error);
        }
    };
    const fetchSubordinates = async () => {
        if (isSupervisor) {
            try {
                const response = await fetch(`http://localhost:3001/users?supervisor=${user}`);
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
        <RequiredTrainingWrapper>
            <InfoContainer>
                <ListContainer>
                    <ListHeading>
                        <ListTitle>
                            <StarIcon sx={{fontSize: 'xxx-large'}} />
                            <ListHeader>My Mandatory Training</ListHeader>
                        </ListTitle>
                        <ListSubHeader>Access your mandatory training courses</ListSubHeader>
                    </ListHeading>
                    <List sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
                        {requiredTraining.map((training, index) => (
                            <ListItem
                            key={index}
                            disableGutters
                            secondaryAction={
                                <Link to={`/required-training/${training.id}`}>
                                    <IconButton aria-label="info">
                                    <InfoIcon />
                                    </IconButton>
                                </Link>
                            }
                            >
                            <ListItemText 
                            primary={training.training_name}
                            secondary={training.due_date}
                            />
                            </ListItem>
                        ))}
                    </List>
                </ListContainer>
            </InfoContainer>
            {isSupervisor ? 
                 <ListContainer>
                    <List sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
                        {subordinates.map((subordinate, index) => (
                            <ListItem
                            key={index}
                            disableGutters
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

        </RequiredTrainingWrapper>
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
overflow: auto;
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