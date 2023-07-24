import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App';
import SchoolIcon from '@mui/icons-material/School';
import '../stylesheets/login.css';

export default function Login() {
    const { testStr } = useContext(AppContext);
    return (
        <>
            <section className="body">
                <div className="container">
                    <section className="title"><SchoolIcon /><h1>UTM Tool</h1></section>
                    <section className="login">
                        <h2>Welcome to UTM Tool</h2>
                        <p>Please sign in to your account to continue</p>
                        <div className="form">
                            <label>Email</label><input type="textbox"></input>
                            <label>Password</label><input type="password"></input>
                            <button className="button">Login</button>
                        </div>
                    </section>
                </div>
            </section>
        </>
    )
}