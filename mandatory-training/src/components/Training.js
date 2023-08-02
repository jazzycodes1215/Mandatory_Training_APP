import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App'
import '../stylesheets/training.css'


import { Box, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';

import Card from './TrainingCard';


export default function Training() {

    const [selectedTab, setSelectedTab] = useState('All');
    const [requiredTraining, setRequiredTraining] = useState([])
    const [endpoint, setEndpoint] = useState('')

    const TRContainer = styled.div`
    display: grid;
    margin-top: 30px;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 80vh;
  `;


    const Type =styled.div`
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;`

    const Trainings =styled.div`
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 50px;
    `

    // useEffect(() => {
    //     fetchRequiredTraining();
    // }, []);

    // const fetchRequiredTraining = async (e) => {
    //     try {
    //         const response = await fetch(`${fetchURL}/requiredTraining/`);
    //         const data = await response.json();
    //         setRequiredTraining(data);
    //     } catch (error) {
    //         console.error('Error fetching your required training', error);
    //     }
    // };


    const HandleTabChange = (tab, btn) => {
        setSelectedTab(tab);
        setEndpoint(tab);
      };

      const SelectedBtn = (btn) => {
      switch (btn) {

        case 1:
        document.getElementById("btn1").classList.remove("btnDeactivated");
        document.getElementById("btn2").classList.add("btnDeactivated");
        document.getElementById("btn3").classList.add("btnDeactivated");
        document.getElementById("btn4").classList.add("btnDeactivated");
        document.getElementById("btn5").classList.add("btnDeactivated");
        break;

        case 2:
        document.getElementById("btn1").classList.add("btnDeactivated");
        document.getElementById("btn2").classList.remove("btnDeactivated");
        document.getElementById("btn3").classList.add("btnDeactivated");
        document.getElementById("btn4").classList.add("btnDeactivated");
        document.getElementById("btn5").classList.add("btnDeactivated");
        break;

        case 3:
        document.getElementById("btn1").classList.add("btnDeactivated");
        document.getElementById("btn2").classList.add("btnDeactivated");
        document.getElementById("btn3").classList.remove("btnDeactivated");
        document.getElementById("btn4").classList.add("btnDeactivated");
        document.getElementById("btn5").classList.add("btnDeactivated");
        break;

        case 4:
        document.getElementById("btn1").classList.add("btnDeactivated");
        document.getElementById("btn2").classList.add("btnDeactivated");
        document.getElementById("btn3").classList.add("btnDeactivated");
        document.getElementById("btn4").classList.remove("btnDeactivated");
        document.getElementById("btn5").classList.add("btnDeactivated");
        break;

        case 5:
        document.getElementById("btn1").classList.add("btnDeactivated");
        document.getElementById("btn2").classList.add("btnDeactivated");
        document.getElementById("btn3").classList.add("btnDeactivated");
        document.getElementById("btn4").classList.add("btnDeactivated");
        document.getElementById("btn5").classList.remove("btnDeactivated");
        break;
        default:
            console.log('Error finding that button')
      }
    }

    return (
        <>
     <div className='subheading'>
        <h1>Training</h1>
    </div>

        <TRContainer className='boy'>
            <Type className='top'>
                <h2>Type</h2>
                <div className='type-btns'>
                    <button id='btn1' className='activeBtn' onClick={() => HandleTabChange('', 1)}>All</button>
                    <button id='btn2' className="deactiveBtn btnDeactivated" onClick={() => HandleTabChange('primaryTraining', 2)}>Primary Trainings</button>
                    <button id='btn3' className="deactiveBtn btnDeactivated" onClick={() => HandleTabChange('auxTraining', 3)}>Auxilary Training</button>
                    <button id='btn4' className="deactiveBtn btnDeactivated" onClick={() => HandleTabChange('PME', 4)}>Professional Military Education</button>
                    <button id='btn5' className="deactiveBtn btnDeactivated" onClick={() => HandleTabChange('ADT', 5)}>Additional Duty Training</button>
                </div>
            </Type>
            <Trainings>
                <Card
                endp={endpoint}
                />
            </Trainings>
            </TRContainer>
        </>
    )
}

export const TrainingCard = styled.div`
display: grid;
grid-template-rows: 2fr .5fr;
border: 1px solid black;
width: 20%;
height: 50%;
`
export const TrainingCardTop = styled.div`
grid-column: 1;
grid-row: 1 / 2;

`
export const TrainingCardMid = styled.div`
grid-column: 1;
grid-row: 1 / 2;
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
padding: 20px 0 70px 0;
`