import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './store/reducers/store';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './assets/styles/globalStyles.css';

const store = createStore(reducers)

axios.defaults.baseURL = 'http://161.35.139.54:8082/api/';
// axios.defaults.baseURL = 'https://cafe-service-b.herokuapp.com/api/';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
