import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import SchoolIcon from '@mui/icons-material/School';
import { AppContext, fetchURL } from '../App'
import useUserCheck from '../hooks/useUserCheck'
import '../stylesheets/Admin.css'
import vid from '../videos/vid.mp4'

export default function CreateUserAccount() {

    const { testStr } = useContext(AppContext);
    // const [first, setFirst] = useState('');
    // const [last, setLast] = useState('');
    const [id, setID] = useState(0);
    const [email, setEmail] = useState('');
    const [pwd, setpwd] = useState("");
    // const [rank, setRank] = useState('');
    const [error, setError] = useState(null);
    const {validatedUserType, validToken} = useUserCheck();
    const navigate = useNavigate();

    const HandleSelect = (e) =>
    {
        console.log(e.target.value);
    }
    const HandleSubmit = async () =>
    {
        //Role supervisor and unit default to 0 for now
        let userData = { email: email, password: pwd,
            dodID: id }
        console.log(userData);
        let header = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)};
        //Maybe don't go to the login login... API
        let response = await fetch(`${fetchURL}/createAccount`, header)
        let status = response.status;
        let data = await response.json();
        console.log(data);
        if(status === 201) {
            alert('Account created successfully!');
            navigate('/administrator');
        }
        else
        {
            alert('Account creation failed!');
            setError(data.message)
        }
    }
    return (
        <>
        {validatedUserType === 3 || validatedUserType === 4 ?
        
       <> <video id="background-video" autoPlay loop muted>
            <source src={vid} type="video/mp4" />
            Your browser does not support the video tag.
         </video>
        <section className="body">
        <div className="container">
            <section className="title"><SchoolIcon /><h1>UTM Tool</h1></section>
            <section className="login2">
                {error ? <h2>{error}</h2> : <></>}
                <h2>Welcome to UTM Tool</h2>
                <p>Please Create an Account</p>
                   <div className='col'> <label>Email</label><input onChange={(e)=>setEmail(e.target.value)} type="textbox"></input></div>
                    <div className='col'><label>DOD Id Number</label><input onChange={(e)=>setID(e.target.value)} type="textbox"></input></div>
                    <div className='col'><label>Password</label><input onChange={(e)=>setpwd(e.target.value)} type="password"></input></div>
                    <button onClick={HandleSubmit} id="login2-btn">Create Account</button>
            </section>
        </div>
    </section></>
    : <p>You must be an administrator or UTM Training Manager to access this page!</p> }
    </>
    )
}