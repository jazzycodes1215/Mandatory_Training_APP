import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Training() {

    const [selectedTab, setSelectedTab] = useState('notifications');
    const { testStr } = useContext(AppContext);

    const TRContainer = styled.div`
    display: grid; 
    grid-template-columns: 20% 80%; 
    grid-template-rows: 30% 70%; 
    grid-column-gap: 0px;
    grid-row-gap: 0px; 
  `;

    const subhead =styled.div`
    grid-area: 1 / 1 / 2 / 2;`

    const type =styled.div`
    display: none`

    const toggle =styled.div`
    display: none`

    const trainings =styled.div`
    display: none`


    const handleTabChange = (tab) => {
        setSelectedTab(tab);
      };

    return (
        <>
        <TRContainer>
            <subhead>
                <h1>Trainings</h1>
            </subhead>
            <type>
                <h2>Type</h2>
                
                <button onClick={() => handleTabChange('Primary Training')}>Primary Trainings</button>
                <button onClick={() => handleTabChange('Auxilary Training')}>Auxilary Training</button>
                <button onClick={() => handleTabChange('Professional Military Education')}>Professional Military Education</button>
                <button onClick={() => handleTabChange('Additional Duty Training')}>Additional Duty Training</button>
            </type>
            <toggle>
            <button onClick={() => handleTabChange('Active')}>Active</button>
                <button onClick={() => handleTabChange('Draft')}>Draft</button>
                <button onClick={() => handleTabChange('Archived')}>Archived</button>
            </toggle>
            <trainings>
                <h1>Training List Here</h1>
            </trainings>
            </TRContainer>
        </>
    )
}