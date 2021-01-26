import React, { useEffect, useState } from 'react'
import './Orders.css';
import { makeGetRequest } from '../../Utils/Fetch';

export default function Orders(props) {

    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        async function effect(){
            var opts = {
                auth: true, 
                query: {
                    cityId: 1,
                    active: false
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
                Orders
            </div>
        </>
    );
}