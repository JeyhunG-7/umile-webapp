import React, { useEffect, useState } from 'react'
import '../Main.css';

import Paper from '@material-ui/core/Paper';

import OrdersMap from '../../../Components/OrdersMap';
import NoScheduledOrders from './NoScheduledOrders';
import OrdersTableHeader from './ScheduledOrder';


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
        <Paper className="paper-scheduled flex-column">
            <h3>Scheduled for delivery</h3>
            {_renderComponents()}
        </Paper>
    );
}