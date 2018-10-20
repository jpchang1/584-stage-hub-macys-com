import React from "react";
import { render } from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import 'babel-polyfill';
const app = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

render(app,document.getElementById("tvp-video-gallery"));