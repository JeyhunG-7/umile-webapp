import React, { useEffect, useState } from 'react'
import '../Main.css';

import Paper from '@material-ui/core/Paper';

import OrdersMap from './OrdersMap';
import NoPlacedOrders from './NoPlacedOrders';
import OrdersTableHeader from './PlacedOrder';
import { makeGetRequest } from '../../../Utils/Fetch';

export default function Placed(props) {
    const [ordersList, setOrdersList] = useState([]);

    useEffect(() => {
        async function effect(){
            var placedOrders = await makeGetRequest('/orders/list', {auth: true, query: {cityId: 1, active: false}}) ?? [];
            var activeOrders = await makeGetRequest('/orders/list', {auth: true, query: {cityId: 1, active: true}}) ?? [];
            setOrdersList(placedOrders.concat(activeOrders));
        }
        effect();
    },[]);

    function _renderComponents() {
        if (ordersList.length > 0) {
            return (
                <>
                    <OrdersTableHeader header={true}/>
                    <OrdersMap orders={ordersList} />
                </>
            );
        } else {
            return (
                <NoPlacedOrders />
            );
        }
    }

    return (
        <Paper style={{ padding: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ width: '100%', textAlign: 'left', margin: '0 0 30px 0' }}>Placed Orders</h3>
            {_renderComponents()}
        </Paper>
    );
}