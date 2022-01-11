import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './store/reducers/store';
import { BrowserRouter } from 'react-router-dom';
import { API } from './utils/constants';

import App from './App';

import './assets/styles/globalStyles.css';

const store = createStore(reducers)

axios.defaults.baseURL = `${API}/api/`;

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