import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App';
import mylogo from '../Icons/16px/logo512.png'
import '../stylesheets/help.css';

export default function Help() {
    const { testStr } = useContext(AppContext);
    return (
            <section className="holder">
                
                <div className="left-side">
                    <h2>About the App</h2>
                    <p>The current system employed by the space force to track mandatory training is inefficient and cumbersome to the user. It lacks essential features such as notifications and direct links to the trainings, which means it takes longer to spin up newer Guardians on their certifications and requirements. Subsequently, this causes mission delay and degrades unit readiness.</p>
                    <br></br>
                    <p>Solution: UTM Tool is THE All-in-one app that aids in navigation, and notification. This app will cut mission delay and fortify unit readiness.</p>
                    <br></br>
                    <p>Created by Mr. Jaylin Moore, Mr. Anthony Caldemone, Mr. Nicholas Johnson, Mr. Gabriel Losey, and Mr. Josh Penrod</p>
                </div>
                <div className="right-side">
                <div class="logo-container">
                    <img src={mylogo} alt="React Logo" class="react-logo"></img>
                </div>
                </div>
            </section>
    )
}