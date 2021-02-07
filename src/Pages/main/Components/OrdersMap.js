import React from 'react'
import '../Main.css';

import PlacedOrder from './PlacedOrder';
import ScheduledOrder from './ScheduledOrder';


export default function OrdersMap(props) {
    let listOrders = [];

    if (props.orders.length > 0) {
        if (!props.showScheduledOnly) {
            listOrders = props.orders
                .map((order) =>
                    <PlacedOrder
                        key={order.id}
                        order={order} />
                );

        } else {
            listOrders = props.orders
                .filter(order => order.status === 3).map((order) =>
                    <ScheduledOrder
                        key={order.id}
                        order={order} />
                );
        }
    }

    return (
        <>
            {
                listOrders
            }
        </>
    );
}