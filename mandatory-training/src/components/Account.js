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
        setRegistered(false);
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
                    <h1>Please enter missing account details</h1>
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
                    <Row>
                        <Column>
                            <Label for="inputFirstName">First Name:</Label>
                            <InputAccountInfo id="inputFirstName" type="text"></InputAccountInfo>
                        </Column>
                        <Column>
                            <Label for="inputLastName">Last Name:</Label>
                            <InputAccountInfo id="inputLastName" type="text"></InputAccountInfo>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <Label for="inputEmail">Email:</Label>
                            <InputAccountInfo id="inputEmail" type="email"></InputAccountInfo>
                        </Column>
                        <Column>
                            <Label for="inputPassword">Password (8 character minimum):</Label>
                            <InputAccountInfo id="inputPassword" type="password"></InputAccountInfo>
                        </Column>
                    </Row>
                    <Row>
                        <Label for="selectUnit">Unit:</Label>
                        <SelectAccountInfo id="selectUnit"></SelectAccountInfo>
                        <Label for="selectDuties">Duties:</Label>
                        <SelectAccountInfo id="selectDuties"></SelectAccountInfo>
                    </Row>
                </AccountInfoContainer>
                :
                <AccountInfoContainer>
                    <Row>
                    <AccountInfo id="firstName"><b>First Name: </b></AccountInfo>
                    <AccountInfo id="lastName"><b>Last Name: </b></AccountInfo>
                    </Row>
                    <Row>
                    <AccountInfo id="email"><b>Email: </b></AccountInfo>
                    <AccountInfo id="password"><b>Password: </b></AccountInfo>
                    </Row>
                    <Row>
                    <AccountInfo id="unit"><b>Unit: </b></AccountInfo>
                    <AccountInfo id="duties"><b>Duties: </b></AccountInfo>
                    </Row>
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
const Row = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
margin-bottom: 20px;
`
const Column = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
flex-grow: 1;
margin-bottom: 20px;
`
const AccountInfo = styled.span`
width: 50%;
`
const InputAccountInfo = styled.input`
width: 100%;
margin-right: 10px;
`
const SelectAccountInfo = styled.select`
flex-grow: 5;
margin-right: 10px;
`
const Label = styled.label`

`
