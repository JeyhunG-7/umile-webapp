import React from 'react'

import PlacedOrder from '../Pages/main/Components/PlacedOrder';
import ScheduledOrder from '../Pages/main/Components/ScheduledOrder';
import HistoryOrder from '../Pages/orders/Components/HistoryOrder';


export default function OrdersMap(props) {
    let listOrders = [];

    if (props.orders.length > 0) {
        if (props.showScheduled) {
            listOrders = props.orders
                .filter(order => order.status === 3).map((order) =>
                    <ScheduledOrder
                        key={order.id}
                        order={order} />
                );
        } else if (props.showPlaced) {
            listOrders = props.orders
                .map((order) =>
                    <PlacedOrder
                        key={order.id}
                        order={order}
                        onUpdate={props.onUpdate} />
                );
        } else if (props.showHistory) {
            listOrders = props.orders
                .map((order) =>
                    <HistoryOrder
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