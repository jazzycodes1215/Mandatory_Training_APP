import { useState, useEffect, useContext, createContext, useRef } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App';
import SchoolIcon from '@mui/icons-material/School';
import '../stylesheets/login.css';
import useUserCheck from '../hooks/useUserCheck'
import '../stylesheets/global.css'
import vid from '../videos/vid.mp4'

import { Button, OutlinedInput, FormControl, InputLabel, IconButton, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {

    const {user, setUser, token, setToken, authExp, setExp, userType, setUserType} = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);
    const {validToken, validatedUserType} = useUserCheck()
    const [email, setEmail] = useState('');
    const [pwd, setpwd] = useState("");
    const[error, setError] = useState(null);
    const navigate = useNavigate();
    const [firstTimeUser, setFirstTimeUser] = useState(false);

    useEffect(()=> {

    const isFirstTime = localStorage.getItem('firstTimeUser') === null;

    if (isFirstTime) {
      // Set the firstTimeUser state to true and update local storage
      setFirstTimeUser(true);
      localStorage.setItem('firstTimeUser', 'false');
      navigate('/Splash')
    }
        console.log(validToken);
        if(validToken)
        {
            if(validatedUserType === 1)
            {
                navigate("/account")
            }
            navigate('/')
        }
    }, validToken)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const HandleSubmit = async () =>
    {
            let userData = {email: email.replace(/\s/g, ''), password: pwd.replace(/\s/g, '')}

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
       <video id="background-video" autoPlay loop muted>
            <source src={vid} type="video/mp4" />
            Your browser does not support the video tag.
         </video>
            <section className="body">
                <div className="container">
                    {validToken ? navigate("/") : <></>}
                    <section className="title"><SchoolIcon sx={{ color: '#0F3D68' }} id='schoolIcon'/><h1>UTM Tool</h1></section>
                    <section className="login">

                        <h2>Welcome to the UTM Tool</h2>
                        <p>Please sign in to your account to continue</p>
                        <FormControl sx={{ml:2, mr:2, my:1}} variant="outlined">
                        <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                            id="email"
                            onChange={(e)=>setEmail(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                <AccountCircle />
                                </InputAdornment>
                                }
                                label="Email"
                            />
                        </FormControl>
                        <FormControl sx={{ml:2, mr:2, my:1}} variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                            onChange={(e)=>setpwd(e.target.value)}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Button id='login-btn' variant="contained" sx={{backgroundColor: '#0F3D68'}} onClick={HandleSubmit}>Login</Button>
                        {error ? <p className='errorLogin'>{`(${error})`}</p> : <></>}
                    </section>
                </div>
            </section>
        </>
    )
}