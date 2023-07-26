import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

import { Box, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';

export default function Training() {

    const [selectedTab, setSelectedTab] = useState('notifications');
    const [requiredTraining, setRequiredTraining] = useState([])
    const { testStr } = useContext(AppContext);

    const TRContainer = styled.div`
    display: grid; 
    grid-template-columns: 20% 80%; 
    grid-template-rows: 30%; 
    grid-column-gap: 0px;
    grid-row-gap: 0px; 
  `;

    const Subhead =styled.div`
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    justify-content: center;
    align-items: center;`

    const Type =styled.div`
    grid-area: 2 / 1 / 3 / 2;
    display: flex;
    flex-direction: column;`

    const Toggle =styled.div`
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    justify-content: center;
    align-items: center;`

    const Trainings =styled.div`
    grid-area: 2 / 2 / 3 / 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 50px;
    `

    useEffect(() => {
        fetchRequiredTraining();
    }, []);

    const fetchRequiredTraining = async () => {
        try {
            const response = await fetch(`http://localhost:4000/requiredTraining/`);
            const data = await response.json();
            setRequiredTraining(data);
        } catch (error) {
            console.error('Error fetching your required training', error);
        }
    };


    const handleTabChange = (tab) => {
        setSelectedTab(tab);
      };

    return (
        <>
        <TRContainer>
            <Subhead>
                <h1>Trainings</h1>
            </Subhead>
            <Type>
                <h2>Type</h2>
                
                <button onClick={() => handleTabChange('Primary Training')}>Primary Trainings</button>
                <button onClick={() => handleTabChange('Auxilary Training')}>Auxilary Training</button>
                <button onClick={() => handleTabChange('Professional Military Education')}>Professional Military Education</button>
                <button onClick={() => handleTabChange('Additional Duty Training')}>Additional Duty Training</button>
            </Type>
            <Toggle>
            <button onClick={() => handleTabChange('Active')}>Active</button>
                <button onClick={() => handleTabChange('Draft')}>Draft</button>
                <button onClick={() => handleTabChange('Archived')}>Archived</button>
            </Toggle>
            <Trainings>
                <InnerTraining>
                    {requiredTraining.map((training, index) =>
                    <TrainingCard key={index}>
                    <h3>{training.name}</h3>
                    <p>{training.type_name}</p>
                    </TrainingCard> )}
                </InnerTraining>
            </Trainings>
            </TRContainer>
        </>
    )
}

const TrainingCard = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 20% 80% 20%; 
border: 1px solid black;
width: 20%;
`
const InnerTraining = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 100%;
height: 30vh;
gap: 20px;
`