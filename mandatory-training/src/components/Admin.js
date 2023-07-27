import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link , useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'
import useUserCheck from '../hooks/useUserCheck'
export default function Admin() {
    const {validatedUserType, validToken} = useUserCheck();
    const [tickets, setTickets] = useState([]);
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
            let response = await fetch(`http://localhost:4000/tickets/`, method)
            let data = response.json();
            setTickets(data);
        }
    }
    useEffect(()=>
    {

    }, [] )

    return (
        <>
            {validatedUserType === 4 ?
            <>
            <FlexContainer>
                <div className="left-align-div">
                    <Button onClick={()=>navigate('/create-account')}>Create Account</Button>
                </div>
                <div className="right-align-div">
                    <List>
                    {tickets?.map((element, index)=>{
                        return (
                        <ListItem>
                            <p>element.name</p>
                        </ListItem>
                        )
                    })}
                    </List>
                    <div className="ticket-submenu">
                        <Button>Close Ticket</Button>
                        <Button>Delete Ticket</Button>
                    </div>
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

const List = styled.ul `
`

const ListItem = styled.li `
`
//I dont even know how to style this. I mean I know how to style  it but I'm not even sure what to make it look like
const Button = styled.button `

`