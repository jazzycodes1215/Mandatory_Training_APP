import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App';
import '../stylesheets/help.css';

export default function Help() {
    const { testStr } = useContext(AppContext);
    return (
        <>
            <section className="container">
                <div className="left-side">
                    <h2>About the App</h2>
                    <p>This is an application created by Mr. Jaylin Moore, Mr. Anthony Caldemone, Mr. Nicholas Johnson, Mr. Gabriel Losey, and Mr. Josh Penrod</p>
                </div>
                <div className="right-side">
                    <section className="links"><h2>Helpful Links</h2></section>
                    <section className="contact"><h2>Contact</h2></section>
                </div>
            </section>
            {/* <h1>This is the Help Component!</h1>
            { testStr} */}
        </>
    )
}