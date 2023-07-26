import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link , useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'
import useUserCheck from '../hooks/useUserCheck'
export default function Admin() {
    const {validatedUserType, validToken} = useUserCheck();
    const navigate = useNavigate();

    return (
        <>
            {validatedUserType === 4 ?
            <>
            <FlexContainer>
                <div className="left-align-div">
                    <p>This is where my tools would be if I HAD THEM</p>
                    <p>This would be a second tool IF I HAD THEM</p>
                </div>
                <div className="right-align-div">
                    <p>This is where my tickets would be... IF I HAD THEM</p>
                </div>
            </FlexContainer>
            <div className="admin-footer">
                <p>This is where the footer goes</p>
            </div>
            </> : <></>}
        </>
    )
}

const FlexContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 10px;
`
const FlexItem = styled.div `
width: 40%;`