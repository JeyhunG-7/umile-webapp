import React, { useEffect, useState } from 'react'
import { makeGetRequest } from '../../Utils/Fetch';
import './Profile.css';

import Container from '@material-ui/core/Container';

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
        if (result){
            setAddressObj(result);
        }
    }

    // fetch user information
    useEffect(() => {
        refreshUserInfo();
    }, []);
    
    return (
        <Container style={{ padding: 40 }}>
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr',  width: '100%', gridColumnGap: 40, gridTemplateRows: 'auto' }}>
                <div style={{ position: 'relative', display: 'grid', gridTemplateRows: '1fr 1fr', width: '100%', gridRowGap: 40, gridTemplateRows: 'auto' }}>
                    <UserInfo
                        name={name}
                        companyName={companyName}
                        email={email}
                        phone={phone}/>
                    <Balance 
                        balance={balance}/>
                </div>
                <Location
                    refresh={refreshUserInfo}
                    addressObj={addressObj}/>
            </div>

            {/* <Snackbar open={orderPlaced}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose}
                    severity="success"
                    elevation={6}
                    variant="filled">
                    Oder has been successfully placed.
                    </Alert>
            </Snackbar> */}
        </Container>
    );
}