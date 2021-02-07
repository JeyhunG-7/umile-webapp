import React, { useEffect, useState } from 'react'
import '../Main.css';

import Paper from '@material-ui/core/Paper';

import OrdersMap from './OrdersMap';
import NoScheduledOrders from './NoScheduledOrders';
import OrdersTableHeader from './ScheduledOrder';
import { makeGetRequest } from '../../../Utils/Fetch';


export default function Scheduled(props) {
    const [ordersList, setOrdersList] = useState([]);

    useEffect(() => {
        async function effect(){
            var scheduledOrders = [];//await makeGetRequest('/orders/list', {auth: true, query: {cityId: 1, active: true}});
            setOrdersList(scheduledOrders);
        }
        effect();
    },[]);

    function _renderComponents() {
        if (ordersList.length > 0) {
            return (
                <>
                    <OrdersTableHeader header={true} />
                    <OrdersMap orders={ordersList} showScheduledOnly={true}/>
                </>
            );
        } else {
            return (
                <NoScheduledOrders />
            );
        }
    }

    return (
        <Paper style={{ padding: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ width: '100%', fontWeight: '500', textAlign: 'left', margin: '0 0 30px 0' }}>Scheduled for delivery</h3>
            {_renderComponents()}
        </Paper>
    );
}