import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css'
import './index.scss';
import reducers from './reducer.js';
import App from './App';
let store= createStore(reducers);

ReactDOM.render(
    <App/>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
