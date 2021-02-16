import React, { useContext, useEffect, useState } from 'react'
import { makeGetRequest } from '../../Utils/Fetch';
import { GlobalContext, SEVERITY } from '.././../Components/GlobalContext';
import { Helmet } from 'react-helmet';
import { Container } from '@material-ui/core';

import UserInfo from './Components/UserInfo';
import Balance from './Components/Balance';
import Location from './Components/Location';
import './Profile.css';

export default function Profile(props) {
    const { setAlert } = useContext(GlobalContext);

    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [balance, setBalance] = useState('');
    const [addressObj, setAddressObj] = useState(null);

    async function refreshUserInfo() {
        let result = await makeGetRequest('/clients/info', { auth: true });
        if (!result) return setAlert({ message: 'Error while getting client info', severity: SEVERITY.ERROR });

        setEmail(result.email);
        setName(`${result.first_name} ${result.last_name}`);
        setPhone(result.phone);
        setCompanyName(result.company);
        setBalance(result.balance);

        result = await makeGetRequest('/clients/home', { auth: true });
        if (!result) return setAlert({ message: 'Error while getting home address', severity: SEVERITY.ERROR });

        setAddressObj(result);
    }

    // fetch user information
    useEffect(() => {
        async function effect() {
            let result = await makeGetRequest('/clients/info', { auth: true });
            if (!result) return setAlert({ message: 'Error while getting client info', severity: SEVERITY.ERROR });

            setEmail(result.email);
            setName(`${result.first_name} ${result.last_name}`);
            setPhone(result.phone);
            setCompanyName(result.company);
            setBalance(result.balance);

            result = await makeGetRequest('/clients/home', { auth: true });
            if (!result) return setAlert({ message: 'Error while getting home address', severity: SEVERITY.ERROR });

            setAddressObj(result);
        }

        effect();
    }, [setAlert]);

    return (
        <>
            <Helmet>
                <title>{'UMile | Profile'}</title>
            </Helmet>
            <Container className="profile">
                <div className="div-profile">
                    <div className="col-left">
                        <UserInfo
                            name={name}
                            companyName={companyName}
                            email={email}
                            phone={phone}
                        />

                        <Balance balance={balance} />
                    </div>

                    <Location
                        addressObj={addressObj}
                        refresh={refreshUserInfo}
                        notify={() => setAlert({ message: 'Address updated!', severity: SEVERITY.SUCCESS })}
                    />
                </div>
            </Container>
        </>
    );
}