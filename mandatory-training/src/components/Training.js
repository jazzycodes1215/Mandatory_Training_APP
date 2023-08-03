import { useState, useEffect, useContext, createContext, useRef } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App'
import '../stylesheets/training.css'
import myPlus from '../Icons/16px/Plus.svg'


import { Box, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';

import Card from './TrainingCard';


export default function Training() {

    const [selectedTab, setSelectedTab] = useState('All');
    const [requiredTraining, setRequiredTraining] = useState([])
    const [endpoint, setEndpoint] = useState('')
    const [activeButton, setActiveButton] = useState(0);


    const handleButtonClick = (index, tab) => {
        setActiveButton(index);
        HandleTabChange(tab)
      };

      const buttonsData = [
        { text: 'All', id: 0, tab: '' },
        { text: 'Primary Training', id: 1, tab:'primaryTraining' },
        { text: 'Auxiliary Training', id: 2, tab: 'auxTraining' },
        { text: 'Professional Military Education', id: 3, tab: 'PME'},
        { text: 'Additional Duty Training', id: 4, tab: 'ADT'}
      ];



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


    const HandleTabChange = (tab) => {
        setEndpoint(tab);
      };

    return (
        <>
     <div className='subheading'>
        <h1>Training</h1>
        <Link to="/create-training">
          <img className='plus-btn' src={myPlus} alt="plus button"></img>
        </Link>
    </div>

        <TRContainer className='boy'>
            <Type className='top'>
                <h2>Type</h2>
                <div className='type-btns'>
                    {/* <button id='btn1' innerRef={active} className='activeBtn' onClick={() => HandleTabChange('', 1)}>All</button>
                    <button id='btn2' innerRef={active} onClick={() => HandleTabChange('primaryTraining', 2)}>Primary Trainings</button>
                    <button id='btn3' innerRef={active} onClick={() => HandleTabChange('auxTraining', 3)}>Auxilary Training</button>
                    <button id='btn4' innerRef={active} onClick={() => HandleTabChange('PME', 4)}>Professional Military Education</button>
                    <button id='btn5' innerRef={active} onClick={() => HandleTabChange('ADT', 5)}>Additional Duty Training</button> */}
{buttonsData.map((button, index, tab) => (
        <button 
          key={button.id}
          className={`toggle-button ${activeButton === index ? 'highlighted' : ''}`}
          onClick={() => handleButtonClick(index, button.tab)}
        >
          {button.text}
        </button>
      ))}
                    <div>
      
    </div>
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