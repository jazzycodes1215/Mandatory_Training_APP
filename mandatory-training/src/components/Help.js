import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App';
import '../stylesheets/help.css';

export default function Help() {
    const { testStr } = useContext(AppContext);
    return (
        <>
            <section>About the App</section>
            <div>
                <article>Helpful Links</article>
                <article>Contact an admin</article>
            </div>
            <h1>This is the Help Component!</h1>
            { testStr}
        </>
    )
}