import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App'

export default function UserAccount() {
    const { testStr } = useContext(AppContext);
    return (
        <>
            <h1>This is the User Account Component!</h1>
            { testStr}
        </>
    )
}