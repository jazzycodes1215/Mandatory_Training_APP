import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Account() {
    const { registered, setRegistered } = useContext(AppContext);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setRegistered(true);
    }, []);

    const handleEditModeOn = () => {
        setEditMode(true);
    }

    const handleConfirmEdit = () => {
        setEditMode(false);
    }

    const handleCancelEdit = () => {
        setEditMode(false);
    }

    return (
        <>
            {!registered ? 
                <AccountHeader>
                    <h1>Account Information</h1>
                    <h1>Please Enter Missing Account Details</h1>
                </AccountHeader>
                :
                <AccountHeader>
                    <h1>Account Information</h1>
                    {editMode ?
                        <div>
                            <CheckCircleIcon onClick={handleConfirmEdit}/>
                            <CancelIcon onClick={handleCancelEdit}/>
                        </div>
                        :
                        <EditIcon onClick={handleEditModeOn}/>
                    }
                </AccountHeader>
            }
            {editMode || !registered ?
                <AccountInfoContainer>
                    <InputAccountInfo></InputAccountInfo>
                    <InputAccountInfo></InputAccountInfo>
                    <InputAccountInfo></InputAccountInfo>
                    <InputAccountInfo></InputAccountInfo>
                    <SelectAccountInfo></SelectAccountInfo>
                    <SelectAccountInfo></SelectAccountInfo>
                </AccountInfoContainer>
                :
                <AccountInfoContainer>
                    <AccountInfo id="firstName"><b>First Name: </b></AccountInfo>
                    <AccountInfo id="lastName"><b>Last Name: </b></AccountInfo>
                    <AccountInfo id="email"><b>Email: </b></AccountInfo>
                    <AccountInfo id="password"><b>Password: </b></AccountInfo>
                    <AccountInfo id="unit"><b>Unit: </b></AccountInfo>
                    <AccountInfo id="duties"><b>Duties: </b></AccountInfo>
                </AccountInfoContainer>
            }
        </>
    )
}

const AccountHeader = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 10px;
`
const AccountInfoContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 10px;
`
const AccountInfo = styled.span`
width: 50%;
`
const InputAccountInfo = styled.input`
width: 50%;
`
const SelectAccountInfo = styled.select`
width: 50%;
`