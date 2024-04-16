import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const UserContext = createContext({
    user: null,
    setUser: () => {}
});

// Create a provider component
export const UserProvider = ({ children }) => {
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    },[children]);

    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};