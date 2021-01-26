import React, { useEffect, useState } from 'react'
import { makeGetRequest } from '../../Utils/Fetch';
import './Profile.css';

export default function Profile(props) {

    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [balance, setBalance] = useState('');

    // fetch user information
    useEffect(() => {
        async function effect(){
            var result = await makeGetRequest('/clients/info', { auth: true });
            if (!result){
                // TODO: show error
            } else {
                setEmail(result.email);
                setName(`${result.first_name} ${result.last_name}`);
                setPhone(result.phone);
                setCompanyName(result.company);
                setBalance(result.balance);
            }
        }
        effect();
    }, []);
    
    

    return (
        <div>
            Profile
        </div>
    );
}