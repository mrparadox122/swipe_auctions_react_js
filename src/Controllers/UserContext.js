// UserContext.js
import React, { createContext, useState } from 'react';
export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [metaData , setMetaData] = useState({});
  return (
      <UserContext.Provider value={{ userData, setUserData, metaData, setMetaData }}>
        {children}
      </UserContext.Provider>
    );
  };