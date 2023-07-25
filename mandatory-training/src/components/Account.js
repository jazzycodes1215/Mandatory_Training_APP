import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Account() {
    const { registered, setRegistered, user } = useContext(AppContext);
    const [editMode, setEditMode] = useState(false);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        setRegistered(false);
        fetchAccount();
    }, []);

    const fetchAccount = async () => {
        try {
            const response = await fetch(`http://localhost:4000/users/${user}`);
            const data = await response.json();
            setAccount(data);
        } catch (error) {
            console.error('Error fetching the item', error);
        }
    };

    const fetchUTM = () => {

    }

    const handleEditModeOn = () => {
        setEditMode(true);
    }

    const handleConfirmEdit = () => {
        setEditMode(false);
    }

    const handleCancelEdit = () => {
        setEditMode(false);
    }

    const handleSubmitDetails = () => {
        // handlePatch();
    }

    // const handlePatch = () => {
    //     return fetch(`http://localhost:4000/registration/${user}`,{
    //         method:"PATCH",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ "user_account_id": user, "item_name": itemName, "description": description, "quantity": quantity })
    //     })
    //         .then(res => {
    //             if (res.ok) {
    //                 return res.json();
    //             } else {
    //                 return res.json().then(data => { throw new Error(data.error) });
    //             }
    //         })
    //         .catch(err => {
    //             window.alert(err.message);
    //         });
    // }

    return (
        <>
            {!registered ? 
                <AccountHeader>
                    <h1>Account Information</h1>
                    <span>Please enter missing account details</span>
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
                            <InputAccountInfo id="inputFirstName" type="text" required></InputAccountInfo>
                        </Column>
                        <Column>
                            <Label for="inputLastName">Last Name:</Label>
                            <InputAccountInfo id="inputLastName" type="text" required></InputAccountInfo>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <Label for="inputEmail">Email:</Label>
                            <InputAccountInfo id="inputEmail" type="email" required></InputAccountInfo>
                        </Column>
                        <Column>
                            <Label for="inputPassword">Password (8 character minimum):</Label>
                            <InputAccountInfo id="inputPassword" type="password" minlength="8" required></InputAccountInfo>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <Label for="selectUnit">Unit:</Label>
                            <SelectAccountInfo id="selectUnit" required></SelectAccountInfo>
                        </Column>
                        <Column>
                            <Label for="selectDuties">Duties:</Label>
                            <SelectAccountInfo id="selectDuties" multiple required></SelectAccountInfo>
                        </Column>
                    </Row>
                </AccountInfoContainer>
                :
                <AccountInfoContainer>
                    <Row>
                        <Column>
                            <Label for="firstName">First Name:</Label>
                            <AccountInfo id="firstName">{account.first_name}</AccountInfo>
                        </Column>
                        <Column>
                            <Label for="lastName">Last Name:</Label>
                            <AccountInfo id="lastName">{account.last_name}</AccountInfo>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <Label for="email">Email:</Label>
                            <AccountInfo id="email">{account.email}</AccountInfo>
                        </Column>
                        <Column>
                            <Label for="password">Password:</Label>
                            <AccountInfo id="password">{account.password}</AccountInfo>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <Label for="unit">Unit:</Label>
                            <AccountInfo id="unit">{}</AccountInfo>
                        </Column>
                        <Column>
                            <Label for="duties">Duties:</Label>
                            <AccountInfo id="duties">test</AccountInfo>
                        </Column>
                    </Row>
                </AccountInfoContainer>
            }
            {registered ? 
                <></>
                :
                <ButtonContainer>
                    <Button variant="contained" sx={{backgroundColor: 'MidnightBlue'}}>Submit Account Details</Button>
                </ButtonContainer>
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
`
const Row = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
`
const Column = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
width: 50%;
height: 100px;
margin-left: 20px;
margin-right: 20px;
`
const AccountInfo = styled.span`
width: 50%;
`
const InputAccountInfo = styled.input`
align-self: stretch;
`
const SelectAccountInfo = styled.select`
align-self: stretch;
`
const Label = styled.label`
font-weight: 700;
`
const ButtonContainer = styled.div`
display: flex;
justify-content: center;
margin: 50px;
`
