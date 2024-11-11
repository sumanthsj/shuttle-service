// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/common.css';  // Importing common styles
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
