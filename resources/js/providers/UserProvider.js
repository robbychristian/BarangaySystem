import React, { createContext, useState } from 'react'

const UserContext = createContext()

const UserProvider = (props) => {
    const [user, setUser] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
  
    return (
      <UserContext.Provider
        value={{ user, userProfile, setUser, setUserProfile }}
      >
        {props.children}
      </UserContext.Provider>
    );
  };

export { UserProvider, UserContext };