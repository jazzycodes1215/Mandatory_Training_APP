import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App'
import useUserCheck from '../hooks/useUserCheck'
import '../stylesheets/Account.css'

import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Account() {
    const {validatedUserType, validToken, userID} = useUserCheck();
    const {setToken} = useContext(AppContext);
    const [editMode, setEditMode] = useState(false);
    const [account, setAccount] = useState({});
    const [supervisor, setSupervisor] = useState(null);
    const [supervisorId, setSupervisorId] = useState(null);
    const [supervisorAccount, setSupervisorAccount] = useState('');
    const [units, setUnits] = useState([]);
    const [role, setRole] = useState(null);
    const [firstname, setFirst] = useState(null);
    const [lastname, setLast] = useState(null);
    const [email, setEmail] = useState(null);
    const [unitid, setUnit] = useState(1);
    const [password, setPassword] = useState(null);
    const [rank, setRank] = useState(1);
    const [updated, setUpdated] = useState(false);
    const [userDuties, setUserDuties] = useState([]);
    const [duties, setDuties] = useState([]);
    const [selectedDuties, setSelectedDuties] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAccount();
        fetchDuties();
        fetchUsers();
        fetchUnits();
        console.log(userID);
    }, [userID, validatedUserType, updated]);

    useEffect(() => {
        fetchUserDuties();
    }, [account])

    useEffect(() => {
        findSupervisorId();
    }, [supervisor]);

    useEffect(() => {
        if (account?.supervisor_id) {
            fetchSupervisor();
        }
    }, [userID, account?.supervisor_id]);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${fetchURL}/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching user duties', error);
        }
    }

    const fetchDuties  = async () => {
        try {
            const response = await fetch(`${fetchURL}/duties`);
            const data = await response.json();
            setDuties(data);
        } catch (error) {
            console.error('Error fetching user duties', error);
        }
    }

    const fetchAccount = async () => {
        try {
            if(!userID)
            {
                return;
            }
            const response = await fetch(`${fetchURL}/users/${userID}`);
            const data = await response.json();
            setAccount(data);
            setFirst(data.first_name);
            setLast(data.last_name);
            setEmail(data.email);
            setUnit(data.unit_id);
            setPassword(data.password);
            setRank(data.rank_id);
            setRole(data.role_id);
        } catch (error) {
            console.error('Error fetching user data', error);
        }
    };

    const fetchSupervisor = async () => {
        try {
            if(!userID)
            {
                return;
            }
            const response = await fetch(`${fetchURL}/users/${account.supervisor_id}`);
            const data = await response.json();
            setSupervisorAccount(data);
        } catch (error) {
            console.error('Error fetching supervisor data', error);
        }
    }

    const findSupervisorId = () => {
        let found = users?.find((element)=> `${element.first_name} ${element.last_name}` === supervisor);
        if (found) {
            setSupervisorId(found.id);
            console.log(found.id);
        }
    }

    const fetchUserDuties = async () => {
        try {
            const response = await fetch(`${fetchURL}/duties/${userID}`);
            const data = await response.json();
            setUserDuties(data);
        } catch (error) {
            console.error('Error fetching user duties', error);
        }
    }

    const Duties = () => (
        <DutiesList>
        {userDuties?.map ?
        userDuties.map((duty) => (
            <DutyLi key={duty.id}>{duty.title}</DutyLi>
        )) : <DutyLi key={userDuties.id}>{userDuties.title}</DutyLi>}
        </DutiesList>
    );

    const fetchUnits = async () => {
        try {
            if(!userID)
            {
                return;
            }
            const response = await fetch(`${fetchURL}/units/`);
            const data = await response.json();
            setUnits(data);
        } catch (error) {
            console.error('Error fetching the item', error);
        }
    }

    const handleEditModeOn = () => {
        setEditMode(true);
        fetchAccount();
    }

    const handleCancelEdit = () => {
        setEditMode(false);
        setSupervisor(null);
    }

    const handleSubmitDetails = () => {
        setEditMode(false);
        handlePatch();
    }

    const handleSelectDutiesChange = (e) => {
        // Get all the selected options and map them to an array of values
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedValues = selectedOptions.map((option) => parseInt(option.value));
        setSelectedDuties(selectedValues);
      }

    const handlePut = () => {
        if(!password)
        {
            return;
        }
        return fetch(`${fetchURL}/duties/${userID}`,{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({duty_ids: selectedDuties}),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => { throw new Error(data.error) });
            }
        })
        .catch(err => {
            window.alert(err.message);
        });
    }

    const handlePatch = async () => {
        if(!password)
        {
            return;
        }
        return fetch(`${fetchURL}/registration/${userID}`,{
            method:"PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({first_name: firstname, last_name: lastname, password: password, newPassword: password, rank_id: rank, email: email, supervisor_id: supervisorId ? supervisorId : supervisorAccount.id, unit_id: unitid, role_id: role === 1 ? 2 : role})
        })
            .then(async res => {
                if (res.ok) {
                    let userData = {email: email.replace(/\s/g, ''), password: password.replace(/\s/g, '')}

                    let header = {method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData)};

                    let response = await fetch(`${fetchURL}/login`, header)
                    let status = response.status;
                    let data = await response.json();
                    if(status === 201)
                    {
                    console.log("Success")
                    setToken(data.token)
                    }
                    return res.json();
                } else {
                    return res.json().then(data => { throw new Error(data.error) });
                }
            })
            .then(data=>{
                setUpdated(!updated);
                handlePut();
                fetchAccount();
            })
            .catch(err => {
                window.alert(err.message);
            });
    }
    //I apologize for these. Reorganizing the ternarys was a PAIN without this though
    const EditDisplay = (<AccountInfoContainer>
        <Row>
            <Column>
                <Label for="inputEmail">Email:</Label>
                <InputAccountInfo onChange={(e)=>{setEmail(e.target.value)}} id="inputEmail" type="text" value={email ?? account.email} required></InputAccountInfo>
            </Column>
            <Column>
                <Label for="inputPassword">Enter Current Password to Confirm Changes:</Label>
                <InputAccountInfo onChange={(e)=>{setPassword(e.target.value)}} id="inputPassword" type="password" required></InputAccountInfo>
            </Column>
        </Row>
        <Row>
            <Column>
                <Label for="inputFirstName">First Name:</Label>
                <InputAccountInfo onChange={(e)=>{setFirst(e.target.value)}} id="inputFirstName" type="text" value={firstname ?? account.first_name} required></InputAccountInfo>
            </Column>
            <Column>
                <Label for="inputLastName">Last Name:</Label>
                <InputAccountInfo onChange={(e)=>{setLast(e.target.value)}} id="inputLastName" type="text" value={lastname ?? account.last_name} required></InputAccountInfo>
            </Column>
        </Row>
        <Row>
            <Column>
                <Label for="selectSupervisor">Unit:</Label>
                <SelectAccountInfo onChange={(e)=>{setUnit(e.target.value)}} id="selectUnit" defaultValue={account.unit_id} required>
                    {units?.map((element)=> {
                        return (
                            <option value={element.id}>{element.name}</option>
                        )
                    })}
                </SelectAccountInfo>
            </Column>
            <Column>
                <Label for="selectSupervisor">Supervisor:</Label>
                <InputAccountInfo onChange={(e)=>{setSupervisor(e.target.value)}} id="selectSupervisor" list="supervisors" value={supervisor ?? (supervisorAccount.first_name && supervisorAccount.last_name ? (`${supervisorAccount.first_name} ${supervisorAccount.last_name}`) : '')} required></InputAccountInfo>
                    <datalist id="supervisors">
                        {users?.map((element)=> {
                            return (
                                <option value={`${element.first_name} ${element.last_name}`}>{element.unit_name}</option>
                            )
                        })}
                    </datalist>
            </Column>
        </Row>
        <Row>
            <Column>
                <Label>Rank: </Label>
                    <SelectAccountInfo className='clickable' onChange={(e)=>{setRank(e.target.value)}} defaultValue={account.rank_id} name="rank" id="agnosticRank">
                        <option value="1">E-1</option><option value="2">E-2</option><option value="3">E-3</option>
                        <option value="4">E-4</option><option value="5">E-5</option><option value="6">E-6</option>
                        <option value="7">E-7</option><option value="8">E-8</option><option value="9">E-9</option>
                        <option value="10">O-1</option><option value="11">O-2</option><option value="12">O-3</option>
                        <option value="13">O-4</option><option value="14">O-5</option><option value="15">O-6</option>
                        <option value="16">O-7</option><option value="17">O-8</option><option value="18">O-9</option>
                        <option value="19">O-10</option>
                    </SelectAccountInfo>
            </Column>
            <Column>
                <Label for="selectDuties">Duties:</Label>
                <SelectAccountInfo className='clickable' onChange={handleSelectDutiesChange} id="selectDuties" multiple required>
                    {duties?.map((element)=> {
                        return (
                            <option value={element.id}>{element.title}</option>
                        )
                    })}
                </SelectAccountInfo>
            </Column>
        </Row>
    </AccountInfoContainer>)

    const AccountDisplay = (<AccountInfoContainer>
        <Row>
            <Column>
                <Label for="email">Email:</Label>
                <AccountInfo id="email">{account.email}</AccountInfo>
            </Column>
            <Column>
                <Label for="changePassword">Need to update your password?</Label>
                <AccountInfo id="changePassword"><Link to="/change-password">Click here to change your password</Link></AccountInfo>
            </Column>
        </Row>
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
                <Label for="unit">Unit:</Label>
                <AccountInfo id="unit">{account.unit_name}</AccountInfo>
            </Column>
            <Column>
                <Label for="supervisor">Supervisor:</Label>
                <AccountInfo id="supervisor">{supervisorAccount ? `${supervisorAccount.first_name} ${supervisorAccount.last_name}` : ''}</AccountInfo>
            </Column>
        </Row>
        <Row>
            <Column>
                <Label for="rank">Rank:</Label>
                <AccountInfo id="rank">{account.rank_name}</AccountInfo>
            </Column>
            <Column>
                <Label for="duties">Duties:</Label>
                <AccountInfo id="duties">{Duties()}</AccountInfo>
            </Column>
        </Row>
    </AccountInfoContainer>)
    return (
        <>
        {validToken ?
        <>
            <AccountHeader>
                <h1>Account Information</h1>
                {validatedUserType === 1 ?
                    <span>Please enter missing account details</span>
                    :
                    editMode ?
                        <div>
                            <CancelIcon className='clickable' onClick={handleCancelEdit}/>
                        </div>
                        :
                        <EditIcon id="edit" onClick={handleEditModeOn}/>
                }
            </AccountHeader>
            {editMode || validatedUserType === 1 ? EditDisplay : AccountDisplay}
        </>
        :
            <p>Please login to view this page</p>}
            {validToken && (validatedUserType === 1 || editMode) ?
                <ButtonContainer>
                    <Button id="submit" variant="contained" onClick={handleSubmitDetails}>Submit Account Details</Button>
                </ButtonContainer>
                :
                <></>
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
margin-top: 20px;
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
const DutiesList = styled.ul`
overflow: auto;
display: -webkit-box;
-webkit-line-clamp: 3;
line-clamp: 3;
-webkit-box-orient: vertical;
list-style-type: none;
padding-left: 0;
margin-top: 0;
`
const DutyLi = styled.li`
&:hover {
    background-color: WhiteSmoke;
}
`
