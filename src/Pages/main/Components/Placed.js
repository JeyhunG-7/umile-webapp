import React, { useEffect, useState } from 'react'
import '../Main.css';

import Paper from '@material-ui/core/Paper';

import OrdersMap from '../../../Components/OrdersMap';
import NoPlacedOrders from './NoPlacedOrders';
import OrdersTableHeader from './PlacedOrder';
import { makeGetRequest } from '../../../Utils/Fetch';

export default function Placed(props) {
    const [ordersList, setOrdersList] = useState([]);
    const [orderUpdated, setOrderUpdated] = useState(true);

    useEffect(() => {
        async function effect(){
            var placedOrders = await makeGetRequest('/orders/list', {auth: true, query: {cityId: 1, active: true}});
            if (placedOrders){
                placedOrders = placedOrders.filter((o) => o.status.id < 3);
                setOrdersList(placedOrders);
            }
        }

        if (orderUpdated){
            effect();
            setOrderUpdated(false);
        }
    },[orderUpdated]);

    function _renderComponents() {
        if (ordersList.length > 0) {
            return (
                <>
                    <OrdersTableHeader header={true}/>
                    <OrdersMap orders={ordersList} showPlaced={true} onUpdate={() => setOrderUpdated(true)}/>
                </>
            );
        } else {
            return (
                <NoPlacedOrders />
            );
        }
    }

    return (
        <Paper className="paper-placed flex-column">
            <h3>Placed Orders</h3>
            {_renderComponents()}
        </Paper>
    );
}