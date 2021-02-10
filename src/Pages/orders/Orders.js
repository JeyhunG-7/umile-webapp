import React from 'react';
import './Orders.css';

import Paper from '@material-ui/core/Paper';

import NoOrderHistory from './Components/NoOrderHistory';
import OrdersTableHeader from './Components/HistoryOrder';
import OrdersMap from '../../Components/OrdersMap';


export default function Orders(props) {
    let tmpOrders = [];

    tmpOrders = [
        {
            id: 1,
            status: 4,
            status_date: 1612651443719,
            pickup: {
                address: "Warehouse Rd, SE, Calgary",
                note: "something in here",
                name: "Kenan",
                placeId: 1
            },
            dropoff: {
                address: "Green Circle, NW, Calgary",
                note: "something in here",
                name: "Sir. Johnson",
                placeId: 2
            }
        },
        {
            id: 2,
            status: 5,
            status_date: 1612651433719,
            pickup: {
                address: "Warehouse Rd, SE, Calgary",
                note: "something in here",
                placeId: 1
            },
            dropoff: {
                address: "Green Triangle, SW, Calgary",
                note: "something in here",
                name: "Stefanie",
                placeId: 2
            }
        }
    ];

    function _renderBody() {
        if (tmpOrders.length > 0) {
            return (
                <>
                    <OrdersTableHeader header={true} />
                    <OrdersMap orders={tmpOrders} showHistory={true} />
                </>
            );
        } else {
            return (
                <NoOrderHistory />
            );
        }
    }

    return (
        <div className="order-history">
            <Paper className="paper-order-history" elevation={0}>
                {_renderBody()}
            </Paper>
        </div>
    );
}