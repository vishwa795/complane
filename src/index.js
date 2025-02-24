import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-notifications-component/dist/theme.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactNotification from 'react-notifications-component'

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification isMobile={true} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
