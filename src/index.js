import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { UserProvider } from './Controllers/UserContext';
import Header from './Components/Header';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Header />
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>
);
