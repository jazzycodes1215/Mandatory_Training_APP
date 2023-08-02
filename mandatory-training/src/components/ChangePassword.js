import { useState, useEffect, useContext, createContext, useRef } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App';
import SchoolIcon from '@mui/icons-material/School';
import useUserCheck from '../hooks/useUserCheck'
import '../stylesheets/global.css'
import vid from '../videos/vid.mp4'

import { Button, FilledInput, FormControl, InputLabel, IconButton, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function ChangePassword() {
    const {validatedUserType, validToken, userID} = useUserCheck();
    const {setToken} = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);
    const [pwd, setPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [checkPwd, setCheckPwd] = useState("");
    const[error, setError] = useState(null);
    const navigate = useNavigate();
    const vidRef = useRef();

    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const HandleSubmitPwd = async () => {
        if(newPwd !== checkPwd)
        {
            setError('Passwords do not match')
        }
        return fetch(`${fetchURL}/registration/${userID}`,{
            method:"PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({password: pwd, newPassword: newPwd})
        })
            .then(res => {
                if (res.ok) {
                    handleLogout();
                    return res.json();
                } else {
                    return res.json().then(data => { throw new Error(data.error) });
                }
            })
            .catch(err => {
                setError(err.message);
            });
    }

    const handleLogout = () => {
        setToken(null);
        sessionStorage.clear();
        alert('Password updated successfully. You are logged out.');
        navigate('/login');
      }

    return (
        <>
       <video id="background-video" ref={ vidRef } autoPlay loop muted>
            <source src={vid} type="video/mp4" />
            Your browser does not support the video tag.
         </video>
            <section className="body">
                <div className="container">
                    <section className="title"><SchoolIcon sx={{ color: '#0F3D68' }} id='schoolIcon'/><h1>UTM Tool</h1></section>
                        <h2>Reset Account Password</h2>
                        <p>Please create a new password below</p>
                    <InputContainer>
                        <FormControl sx={{ml:2, mr:2, my:1}} variant="filled">
                        <InputLabel htmlFor="password">Enter Current Password</InputLabel>
                            <FilledInput
                            onChange={(e)=>setPwd(e.target.value)}
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
                        <FormControl sx={{ml:2, mr:2, my:1}} variant="filled">
                        <InputLabel htmlFor="newPassword">Enter New Password</InputLabel>
                            <FilledInput
                            onChange={(e)=>setNewPwd(e.target.value)}
                            id="newPassword"
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
                                label="NewPassword"
                            />
                        </FormControl>
                        <FormControl sx={{ml:2, mr:2, my:1}} variant="filled">
                        <InputLabel htmlFor="checkPassword">Confirm New Password</InputLabel>
                            <FilledInput
                            onChange={(e)=>setCheckPwd(e.target.value)}
                            id="checkPassword"
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
                                label="CheckPassword"
                            />
                        </FormControl>
                    </ InputContainer>
                    <Button id='login-btn' variant="contained" onClick={HandleSubmitPwd}>Submit</Button>
                        {error ? <p className='errorLogin'>{`(${error})`}</p> : <></>}
                </div>
            </section>
        </>
    )
}

const InputContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 50px;
`