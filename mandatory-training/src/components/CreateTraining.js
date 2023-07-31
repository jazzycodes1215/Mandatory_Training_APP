import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App'
import useUserCheck from '../hooks/useUserCheck'
export default function CreateTraining() {
    const { testStr } = useContext(AppContext);
    return (
        <>
            <h1>This is the Creaet Training Component!</h1>
            { testStr}
        </>
    )
}