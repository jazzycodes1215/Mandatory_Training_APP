import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Login() {
    const { testStr } = useContext(AppContext);
    return (
        <>
            <section>
                <div>image here</div><h1>UTM Tool</h1>
                <section>
                    <h2>Welcome to UTM Tool</h2>
                    <p>Please sign in to your account to continue</p>
                </section>
            </section>
            <h1>This is the Login Component!</h1>
            { testStr}
        </>
    )
}