import React, { useEffect, useState } from 'react';
import './Orders.css';
import { Helmet } from 'react-helmet';

import Paper from '@material-ui/core/Paper';

import NoOrderHistory from './Components/NoOrderHistory';
import OrdersTableHeader from './Components/HistoryOrder';
import OrdersMap from '../../Components/OrdersMap';
import { makeGetRequest } from '../../Utils/Fetch';


export default function Orders(props) {
    const [ordersList, setOrdersList] = useState([]);

    useEffect(() => {
        async function effect(){
            var scheduledOrders = await makeGetRequest('/orders/list', {auth: true, query: {cityId: 1, active: false}});
            setOrdersList(scheduledOrders);
        }
        effect();
    },[]);

    function _renderBody() {
        if (ordersList.length > 0) {
            return (
                <>
                    <OrdersTableHeader header={true} />
                    <OrdersMap orders={ordersList} showHistory={true} />
                </>
            );
        } else {
            return (
                <NoOrderHistory />
            );
        }
    }

    return (
        <>
            <Helmet>
                    <title>{'UMile | Order history'}</title>
                </Helmet>
            <div className="order-history">
                <Paper className="paper-order-history" elevation={0}>
                    {_renderBody()}
                </Paper>
            </div>
        </>
    );
}