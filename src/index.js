import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFOcWcqVEnHHL7Dd9_cKWidytGT9-kWc4",
  authDomain: "aodev-chat.firebaseapp.com",
  projectId: "aodev-chat",
  storageBucket: "aodev-chat.appspot.com",
  messagingSenderId: "862163854304",
  appId: "1:862163854304:web:c9132c9f4cc72288fd0185"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
