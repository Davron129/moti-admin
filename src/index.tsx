import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './assets/styles/globalStyles.css';


// axios.defaults.baseURL = 'http://147.182.210.197:8082/api/';
axios.defaults.baseURL = 'https://cafe-service-b.herokuapp.com/api/';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
