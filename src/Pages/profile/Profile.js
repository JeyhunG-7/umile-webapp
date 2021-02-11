import React, { useEffect, useState } from 'react'
import { makeGetRequest } from '../../Utils/Fetch';
import './Profile.css';

import { Container, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import UserInfo from './Components/UserInfo';
import Balance from './Components/Balance';
import Location from './Components/Location';


export default function Profile(props) {
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [balance, setBalance] = useState('');
    const [addressObj, setAddressObj] = useState(null);

    const [addressUpdated, setAddressUpdated] = useState(null);

    async function refreshUserInfo() {
        var result = await makeGetRequest('/clients/info', { auth: true });
        if (!result) {
            // TODO: show error
        } else {
            setEmail(result.email);
            setName(`${result.first_name} ${result.last_name}`);
            setPhone(result.phone);
            setCompanyName(result.company);
            setBalance(result.balance);
        }

        result = await makeGetRequest('/clients/home', { auth: true });
        if (result) {
            setAddressObj(result);
        }
    }

    // fetch user information
    useEffect(() => {
        async function effect() {
            var result = await makeGetRequest('/clients/info', { auth: true });
            if (!result) {
                // TODO: show error
            } else {
                setEmail(result.email);
                setName(`${result.first_name} ${result.last_name}`);
                setPhone(result.phone);
                setCompanyName(result.company);
                setBalance(result.balance);
            }

            result = await makeGetRequest('/clients/home', { auth: true });
            if (result) {
                setAddressObj(result);
            }
        }
        effect();
    }, []);

    function handleAddressUpdateNotif(){
        setAddressUpdated(true);
    }
    
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAddressUpdated(false);
    };

    return (
        <Container className="profile">
            <div className="div-profile">
                <div className="col-left">
                    <UserInfo
                        name={name}
                        companyName={companyName}
                        email={email}
                        phone={phone} />
                    <Balance
                        balance={balance} />
                </div>
                <Location
                    refresh={refreshUserInfo}
                    addressObj={addressObj} 
                    notify={handleAddressUpdateNotif}/>
            </div>

            <Snackbar open={addressUpdated}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose}
                    severity="success"
                    elevation={6}
                    variant="filled">
                    Address updated!
                    </Alert>
            </Snackbar>
        </Container>
    );
}