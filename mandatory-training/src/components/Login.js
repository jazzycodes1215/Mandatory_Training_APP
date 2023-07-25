import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App';
import SchoolIcon from '@mui/icons-material/School';
import '../stylesheets/login.css';

export default function Login() {
    const { testStr } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [pwd, setpwd] = useState("");
    
    const HandleSubmit = async () =>
    {
        let userData = {email: email, password: pwd}

        const header = {method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)};
        //Maybe don't go to the login login... API
        let response = await fetch(`http://localhost:3001/login`, header)
        let status = response.status;
        let data = await response.json();
  
        if(status === 201)
        {
          //setUserType(data.userType);
          //setToken(data.token)
        }
    }


    return (
        <>
            <section className="body">
                <div className="container">
                    <section className="title"><SchoolIcon /><h1>UTM Tool</h1></section>
                    <section className="login">
                        <h2>Welcome to UTM Tool</h2>
                        <p>Please sign in to your account to continue</p>
                        <div className="form">
                            <label>Email</label><input onChange={(e)=>setEmail(e.target.value)} type="textbox"></input>
                            <label>Password</label><input onChange={(e)=>setpwd(e.target.value)} type="password"></input>
                            <button onClick={HandleSubmit}className="button">Login</button>
                        </div>
                    </section>
                </div>
            </section>
        </>
    )
}