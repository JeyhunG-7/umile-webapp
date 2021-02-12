import React, { useEffect, useState } from 'react'
import '../Main.css';

import Paper from '@material-ui/core/Paper';

import OrdersMap from '../../../Components/OrdersMap';
import NoScheduledOrders from './NoScheduledOrders';
import OrdersTableHeader from './ScheduledOrder';
import { makeGetRequest } from '../../../Utils/Fetch';


export default function Scheduled(props) {
    const [ordersList, setOrdersList] = useState([]);

    useEffect(() => {
        async function effect(){
            var scheduledOrders = await makeGetRequest('/orders/list', {auth: true, query: {cityId: 1, active: true}});
            if (scheduledOrders){
                scheduledOrders = scheduledOrders.filter((o) => o.status.id >= 3);
                setOrdersList(scheduledOrders);
            }
        }
        effect();
    },[]);

    function _renderComponents() {
        if (ordersList.length > 0) {
            return (
                <>
                    <OrdersTableHeader header={true} />
                    <OrdersMap orders={ordersList} showScheduled={true}/>
                </>
            );
        } else {
            return (
                <NoScheduledOrders />
            );
        }
    }

    return (
        <Paper className="paper-scheduled flex-column" elevation={0}>
            <h3>Scheduled for delivery</h3>
            {_renderComponents()}
        </Paper>
    );
}