import React, { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export default () => {
    const { alert: { message, severity }, setAlert } = useContext(GlobalContext);

    const handleAlertClose = (event, reason) => {
        console.log('sdfdsfdsfdsfdsfs');
        if (reason === 'clickaway') return;
        setAlert({});
    };

    return (
        <Snackbar
            open={Boolean(message)}
            autoHideDuration={4000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                elevation={6}
                variant="filled"
                severity={severity}
                onClose={handleAlertClose}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}