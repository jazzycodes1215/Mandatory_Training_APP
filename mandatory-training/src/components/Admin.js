import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link , useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App'
import useUserCheck from '../hooks/useUserCheck'

import { Box, Button, List, ListItem, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails
, ListItemButton, ListItemIcon, Checkbox, InputLabel, Select, MenuItem } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function Admin() {
    const {validatedUserType, validToken, unitID} = useUserCheck();
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([])
    const [modState, setModState] = useState(null)
    const [userToDelete, setUserToDelete] = useState(null);
    //Yes its an object. No don't ask. It will hurt you as much inside as it hurt me to write it...
    const [roleToSet, setRoleToSet] = useState({});
    const navigate = useNavigate();

    const enableTickets = false;
    const fetchTickes = async () =>
    {
        if(enableTickets)
        {
            const method = {
                header: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(validToken)
            }
            let response = await fetch(`${fetchURL}/tickets/`, method)
            let data = response.json();
            setTickets(data);
        }
    }

    const fetchUsers = async () => {
        let response = await fetch(`${fetchURL}/users`)
        let data = await response.json();
        setUsers(data);
    }

    const HandleDeleteUser = async () => {
        if(modState === 'delUser') {
            setModState(null);
        }
        else {
            setModState('delUser');
            fetchUsers();
        }
    }
    const HandlePromoteUser = async () => {
        if(modState === 'promUser') {
            setModState(null);
        }
        else {
            setModState('promUser');
            fetchUsers();
        }
    }

    const handleToggle = (value) =>
    {
        if(userToDelete === value)
        {
            setUserToDelete(null);
        }
        setUserToDelete(value)
    }

    const UserRole = (roleId) => {
        switch(roleId) {
            case 1:
                return 'Unverified User'
            case 2:
                return 'User'
            case 3:
                return 'UTM'
            case 4:
                return 'Admin'
        }
    }

    const handleSelect = (e, id) => {
        setUserToDelete(id)
        setRoleToSet({...roleToSet, [id]: e.target.value})
    }

    const handleProm = async () => {
        if(!userToDelete || roleToSet)
        {
            return;
        }

        const method = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({role_id: roleToSet[userToDelete]})}
        console.log(method);
        const response = await fetch(`${fetchURL}/users/${userToDelete}`, method)
        const data = await response.json();
        if(response.ok)
        {
            setUserToDelete(null);
            setRoleToSet({});
            fetchUsers();
        }
    }

    const handleDelete = async () =>
    {
        if(userToDelete > -1)
        {
            const method = {
                header: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            }
            let response = await fetch(`${fetchURL}/users/${userToDelete}`, method)
            if(response.ok)
            {
                console.log("User Deleted");
                setUserToDelete(null);
                fetchUsers();
            }
            else
            {
                console.log("Unable to find user");
                setUserToDelete(null);
            }
        }
    }

    return (
        <>
            {validatedUserType === 4 ?
            <>
            <FlexContainer>
                <LeftDiv>
                    <ButtonTraining onClick={()=>navigate('/create-account')}>Create Account</ButtonTraining>
                    <ButtonTraining onClick={()=>HandleDeleteUser()}>Delete Account</ButtonTraining>
                    <ButtonTraining onClick={()=>HandlePromoteUser()}>Modify Role</ButtonTraining>
                    <ButtonTraining onClick={()=>navigate('/training')}>Manage Training</ButtonTraining>
                </LeftDiv>
                <RightDiv>
                <Accordion expanded={true} sx={{width: '85vw', marginRight: "5vw"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <ListTitle>
                        <StarIcon sx={{fontSize: 'xxx-large'}} />
                        <ListHeader>{modState === 'delUser' ? "Delete User" : "Tickets"}</ListHeader>
                    </ListTitle>
                </AccordionSummary>
                <AccordionDetails>
                    <ListContainer>
                    <List sx={
                            { width: '99%',
                            height: '100%', bgcolor:
                            'background.paper',
                            overflow: 'hidden',
                            'overflowY': 'scroll',
                            padding: '0px',
                            'marginLeft': '1vw',
                            '&::-webkit-scrollbar': {
                                width: '10px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#888',
                                borderRadius: '20px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: '#555',
                            },
                            }}>
                            {modState === 'delUser' ? users?.map((element, index)=>{

                                return (
                                    <ListItem
                                        key={index}
                                        disableGutters
                                        style={{'marginBottom': '20px', padding: 0}}
                                >
                                <ListItemButton role={undefined} onClick={() => handleToggle(element.id)} dense>
                                    <ListItemIcon style={{width: '50px'}}>
                                        <Checkbox
                                        edge="start"
                                        checked={element.id === userToDelete ? true : false}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': element.id }}
                                        style={{width: '20px'}}
                                        />
                                    </ListItemIcon>
                                </ListItemButton>
                                <ListItemText
                                style={{ width: "90%" }}
                                primary={`${element.last_name} ${element.first_name}`}
                                secondary={UserRole(element.role_id)}
                                />
                                </ListItem>
                                )
                            }) : (modState === 'promUser' ? users?.map((element, index)=>{
                                return (
                                    <ListItem
                                        key={index}
                                        disableGutters
                                        style={{'marginBottom': '20px', padding: 0}}
                                        secondaryAction={
                                            <>
                                            <InputLabel sx={{'fontSize': '15px', 'marginTop': '2.5vh'}} id="label">Role</InputLabel>
                                            <Select sx={{width: '15vw'}} labelId="label" onChange={(e)=>{handleSelect(e, element.id)}}
                                            id="select" value={roleToSet[element.id] ? roleToSet[element.id] : element.role_id}>
                                                <MenuItem value="1">Non-verified User</MenuItem>
                                                <MenuItem value="2">User</MenuItem>
                                                <MenuItem value="3">Unit Training Manager</MenuItem>
                                                <MenuItem value="4">Admin</MenuItem>
                                            </Select>
                                            </>
                                        }>
                                <ListItemButton role={undefined} onClick={() => handleToggle(element.id)} dense>
                                    <ListItemIcon style={{width: '50px'}}>
                                        <Checkbox
                                        edge="start"
                                        checked={element.id === userToDelete ? true : false}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': element.id }}
                                        style={{width: '20px'}}/>
                                    </ListItemIcon>
                                </ListItemButton>
                                <ListItemText
                                style={{ width: "90%" }}
                                primary={`${element.last_name} ${element.first_name}`}
                                secondary={UserRole(element.role_id)}/>
                                </ListItem>
                                )
                            }) : null)}
                        </List>
                    </ListContainer>
                </AccordionDetails>
            </Accordion>
                    <TicketMenu>

                            {modState == 'delUser' ?
                            <>
                                <ButtonTraining onClick={handleDelete}>Delete User</ButtonTraining>
                            </>
                             :  <>
                                    {modState == 'promUser' ? <ButtonTraining onClick={handleProm}>Promote User</ButtonTraining>
                                    :
                                    <>
                                    <ButtonTraining>Close Ticket</ButtonTraining>
                                    <ButtonTraining>Delete Ticket</ButtonTraining>
                                    </>
                                    }

                                </>
                         }

                    </TicketMenu>
                </RightDiv>
            </FlexContainer>

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
margin-top: 1em;
`

const LeftDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
`
const RightDiv = styled.div`
display: flex;
flex-direction: column;
`

const TicketMenu = styled.div`
display: flex;
flex-direction: row;
`
const FlexItem = styled.div `
width: 40%;`

const ButtonTraining = styled.button`
    background-color: MidnightBlue;
    color: white;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #007BFF;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background-color: white;
        color: #007BFF;
    }

    &:focus {
        outline: none;
        border: 2px solid #0056b3; // Darker blue border
    }
`;
const ListContainer = styled.div`
flex-grow: 1;
height:50vh;
border-radius: 10px;
overflow: hidden;
box-sizing: border-box;
border: 2px solid black;
`;

const ListHeading = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`;
const ListTitle = styled.div`
display: flex;
flex-direction: row;
width: 100%;
`;
const ListHeader = styled.span`
font-size: xxx-large;
font-weight: 700;
`;
const ListSubHeader = styled.span`
font-size: x-large;
`;


/*requiredTraining?.map((training, index) => (
                                <ListItem
                                key={index}
                                disableGutters
                                style={{'marginBottom': '20px', padding: 0}}
                                secondaryAction={
                                    <Link to={`/required-training/${training.id}`}>
                                        <IconButton aria-label="info">
                                        <InfoIcon />
                                        </IconButton>
                                    </Link>
                                }
                                >
                                <ListItemText
                                primary={training.name}
                                secondary={training.interval}
                                />
                                </ListItem>
                            ))*/