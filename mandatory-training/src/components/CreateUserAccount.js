import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import SchoolIcon from '@mui/icons-material/School';
import { AppContext, fetchURL } from '../App'
import useUserCheck from '../hooks/useUserCheck'

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
        <section className="body">
        <div className="container">
            <section className="title"><SchoolIcon /><h1>UTM Tool</h1></section>
            <section className="login">
                {error ? <h2>{error}</h2> : <></>}
                <h2>Welcome to UTM Tool</h2>
                <p>Please Create an Account</p>
                    {/* <label>First Name</label><input onChange={(e)=>setFirst(e.target.value)} type="textbox"></input>
                    <label>Last Name</label><input onChange={(e)=>setLast(e.target.value)} type="textbox"></input>
                    <label>Rank</label>
                        <select onChange={(e)=>{setRank(e.target.value)}} defaultValue="1" name="rank" id="agnosticRank">
                            <option value="1">E-1</option><option value="2">E-2</option><option value="3">E-3</option>
                            <option value="4">E-4</option><option value="5">E-5</option><option value="6">E-6</option>
                            <option value="7">E-7</option><option value="8">E-8</option><option value="9">E-9</option>
                            <option value="10">O-1</option><option value="11">O-2</option><option value="12">O-3</option>
                            <option value="13">O-4</option><option value="14">O-5</option><option value="15">O-6</option>
                            <option value="16">O-7</option><option value="17">O-8</option><option value="18">O-9</option>
                            <option value="19">O-10</option>
                        </select> */}
                    <label>Email</label><input onChange={(e)=>setEmail(e.target.value)} type="textbox"></input>
                    <label>DOD Id Number</label><input onChange={(e)=>setID(e.target.value)} type="textbox"></input>
                    <label>Password</label><input onChange={(e)=>setpwd(e.target.value)} type="password"></input>
                    <button onClick={HandleSubmit}className="button">Create Account</button>
            </section>
        </div>
    </section>
    : <p>You must be an administrator or UTM Training Manager to access this page!</p> }
    </>
    )
}