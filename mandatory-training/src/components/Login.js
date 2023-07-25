import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App';
import SchoolIcon from '@mui/icons-material/School';
import '../stylesheets/login.css';
import useUserCheck from '../hooks/useUserCheck'



export default function Login() {

    const {user, setUser, token, setToken, authExp, setExp, userType, setUserType} = useContext(AppContext);
    const {validToken, validatedUserType} = useUserCheck()
    const [email, setEmail] = useState('');
    const [pwd, setpwd] = useState("");
    const[error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>
    {
        console.log(validToken);
        if(validToken)
        {
            navigate('/')
        }
    }, validToken)

    const HandleSubmit = async () =>
    {
        let userData = {email: email, password: pwd}

        let header = {method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)};
        let response = await fetch(`http://localhost:4000/login`, header)
        let status = response.status;
        let data = await response.json();
        if(status === 201)
        {
          console.log("Success")
          setUserType(data.userType);
          setToken(data.token)
          setUser(data.user);
        }
        else
        {
          setError(data.message)
        }
    }
    return (
        <>
            <section className="body">
                <div className="container">
                    {validToken ? navigate("/") : <></>}
                    <section className="title"><SchoolIcon /><h1>UTM Tool</h1></section>
                    <section className="login">
                        {error ? <h2>{error}</h2> : <></>}
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