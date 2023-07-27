import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'
import '../stylesheets/training.css'


import { Box, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';

import All from './TrainingAll';
import Primary from './TrainingPrimary';
import Auxiliary from './TrainingAux';
import PME from './TrainingPME';
import ADT from './TrainingADT';

export default function Training() {

    const [selectedTab, setSelectedTab] = useState('notifications');
    const [requiredTraining, setRequiredTraining] = useState([])
    
    const { testStr } = useContext(AppContext);

    const TRContainer = styled.div`
    display: grid;
    margin-top: 30px;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 8vh 80vh; 
  `;

    const Subhead =styled.div`
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    justify-content: center;
    align-items: center;`

    const Type =styled.div`
    grid-area: 2 / 1 / 3 / 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 100px;`

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

      const selectedBtn1 = (Tab) => {
        document.getElementById("btn1").classList.remove("btnDeactivated");
        document.getElementById("btn2").classList.add("btnDeactivated");
        document.getElementById("btn3").classList.add("btnDeactivated");
        document.getElementById("btn4").classList.add("btnDeactivated");
        document.getElementById("btn5").classList.add("btnDeactivated");
      }
      const selectedBtn2 = (Tab) => {
        document.getElementById("btn1").classList.add("btnDeactivated");
        document.getElementById("btn2").classList.remove("btnDeactivated");
        document.getElementById("btn3").classList.add("btnDeactivated");
        document.getElementById("btn4").classList.add("btnDeactivated");
        document.getElementById("btn5").classList.add("btnDeactivated");
      }
      const selectedBtn3 = (Tab) => {
        document.getElementById("btn1").classList.add("btnDeactivated");
        document.getElementById("btn2").classList.add("btnDeactivated");
        document.getElementById("btn3").classList.remove("btnDeactivated");
        document.getElementById("btn4").classList.add("btnDeactivated");
        document.getElementById("btn5").classList.add("btnDeactivated");
      }
      const selectedBtn4 = (Tab) => {
        document.getElementById("btn1").classList.add("btnDeactivated");
        document.getElementById("btn2").classList.add("btnDeactivated");
        document.getElementById("btn3").classList.add("btnDeactivated");
        document.getElementById("btn4").classList.remove("btnDeactivated");
        document.getElementById("btn5").classList.add("btnDeactivated");
      }
      const selectedBtn5 = (Tab) => {
        document.getElementById("btn1").classList.add("btnDeactivated");
        document.getElementById("btn2").classList.add("btnDeactivated");
        document.getElementById("btn3").classList.add("btnDeactivated");
        document.getElementById("btn4").classList.add("btnDeactivated");
        document.getElementById("btn5").classList.remove("btnDeactivated");
      }

    return (
        <>
        <TRContainer className='boy'>
            <Subhead>
                <h1>Trainings</h1>
            </Subhead>
            <Type className='top'>
                <h2>Type</h2>
                <div className='type-btns'>
                    <button id='btn1' onClick={() => handleTabChange('All')}>All</button>
                    <button id='btn2' onClick={() => handleTabChange('Primary Training')}>Primary Trainings</button>
                    <button id='btn3' onClick={() => handleTabChange('Auxilary Training')}>Auxilary Training</button>
                    <button id='btn4' onClick={() => handleTabChange('PME')}>Professional Military Education</button>
                    <button id='btn5' onClick={() => handleTabChange('ADT')}>Additional Duty Training</button>
                </div>
            </Type>
            <Toggle>
                <button onClick={() => handleTabChange('Active')}>Active</button>
                <button onClick={() => handleTabChange('Draft')}>Draft</button>
                <button onClick={() => handleTabChange('Archived')}>Archived</button>
            </Toggle>
            <Trainings>
            {selectedTab === 'All' && (
                     <All />
              )}

              {selectedTab === 'Primary Training' && (
                     <Primary />
              )}

{selectedTab === 'Auxiliary Training' && (
                     <Auxiliary />
              )}

{selectedTab === 'PME' && (
                     <PME />
              )}

{selectedTab === 'ADT' && (
                     <ADT />
              )}
            </Trainings>
            </TRContainer>
        </>
    )
}

export const TrainingCard = styled.div`
display: grid;
grid-template-rows: .5fr 2fr .5fr; 
border: 1px solid black;
width: 20%;
height: 50%;
margin-bottom: 20px;
`
export const TrainingCardTop = styled.div`
grid-column: 1;
grid-row: 1 / 2;

`
export const TrainingCardMid = styled.div`
grid-column: 1;
grid-row: 2 / 3;
display: flex;
flex-direction: column;
align-items: flex-start;

text-align: left;
padding-left: 10px
`
export const TrainingCardBot = styled.div`
grid-column: 1;
grid-row: 3;

`
export const InnerTraining = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
flex-wrap: wrap;
width: 100%;
height: 100%;
gap: 20px;
overflow-y: auto;
padding-top: 20px;
`