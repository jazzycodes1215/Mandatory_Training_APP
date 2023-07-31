import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App';
import '../stylesheets/help.css';
import FileUpload from './FileUpload';

export default function Help() {
    const { testStr } = useContext(AppContext);
    return (
            <section className="holder">
                <div className="left-side">
                    <h2>About the App</h2>
                    <p>The current system employed by the space force to track mandatory training is inefficient and cumbersome to the user. It lacks essential features such as notifications and direct links to the trainings, which means it takes longer to spin up newer Guardians on their certifications and requirements. Subsequently, this causes mission delay and degrades unit readiness.</p>
                    <p>Solution: UTM Tool is THE All-in-one app that aids in navigation, and notification. This app will cut mission delay and fortify unit readiness.</p>
                    <p>Created by Mr. Jaylin Moore, Mr. Anthony Caldemone, Mr. Nicholas Johnson, Mr. Gabriel Losey, and Mr. Josh Penrod</p>
                </div>
                <div className="right-side">
                    <section className="links"><h2>Helpful Links</h2></section>
                    <section className="contact"><h2>Contact</h2></section>
                </div>
            </section>
    )
}