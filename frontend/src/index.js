import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {AppProvider} from "store";
import "antd/dist/antd.css";
import './index.css';
import Root from "routes";

ReactDOM.render(
    <BrowserRouter>
        <AppProvider>
            <Root/>
        </AppProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
