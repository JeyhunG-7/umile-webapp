import React, { useEffect, useState } from 'react'
import './Main.css';
import { makeGetRequest } from '../../Utils/Fetch';

export default function Main(props) {

    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        async function effect(){
            var opts = {
                auth: true, 
                query: {
                    cityId: 1,
                    active: true
                }
            }
            var result = await makeGetRequest('/orders/list', opts);
            if (!result){
                // TODO: show error
            } else {
                setOrders(result);
            }
        }
        effect();
    }, []);

    return (
        <>
            <div>
                Hello
            </div>
        </>
    );
}