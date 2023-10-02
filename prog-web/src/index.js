import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createContext } from 'react';
// import { createContext } from 'react';
const root = ReactDOM.createRoot(document.getElementById('root'));
export const context = createContext({ isAuthenticated: false });

const AppWrapper = () => { // Corrected component name
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReg, setIsReg] = useState(false);
  const [islogin, setIsLogg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [User, setUser] = useState({});
  const [img, setImg] = useState('');
  const [voteadd, setVoteadd] = useState('0x0C5a6Dd883dBd55a4991De1862155e7de0A95Dbf');
  const [img2, setImg2] = useState('');
  const [emails, setEmails] = useState('')
  const [names, setNames] = useState('')
  const [succeeded, setSuccess] = useState(false);
  return (
    <context.Provider value={{ names, succeeded, setSuccess, setNames, islogin, setIsLogg, img, img2, emails, setEmails, setImg2, voteadd, setVoteadd, setImg, isAuthenticated, setIsAuthenticated, isReg, setIsReg, loading, setLoading, User, setUser }}>
      <App />
    </context.Provider>
  );
}

root.render(
  <AppWrapper />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
