import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Header() {
    const { testStr } = useContext(AppContext);
    return (
        <HeaderWrapper>
            <h1>This is the Header Component!</h1>
            { testStr}
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
background-color: BurlyWood;
height: 100%;
width: 90%;
padding-left: 5%;
padding-right: 5%;

display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: space-between;
align-items: center;
font-size: large;
`