import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './Controllers/UserContext';
import Header from './Components/Header';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Header/>
      <App/>
    </UserProvider>
  </React.StrictMode>
);


