import React, { useState, createContext } from 'react';

export const SEVERITY = {
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    SUCCESS: 'success'
}

export const GlobalContext = createContext({});

export const GlobalContextProvider = props => {
    const [alert, setAlert] = useState({});

    return (
        <GlobalContext.Provider value={{ alert, setAlert }}>
            {props.children}
        </GlobalContext.Provider>
    );
}