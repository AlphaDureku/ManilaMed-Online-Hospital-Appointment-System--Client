import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './mediaque.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MantineProvider>
    <BrowserRouter>
    <Notifications position="top-center" zIndex={3000}/>
        <App />
    </BrowserRouter>
    </MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

