import React from 'react'
import '../Main.css';

import Paper from '@material-ui/core/Paper';

import OrdersMap from '../../../Components/OrdersMap';
import NoPlacedOrders from './NoPlacedOrders';
import OrdersTableHeader from './PlacedOrder';

export default function Placed(props) {
    let tmpOrders = [];

    tmpOrders = [
        {
            id: 1,
            status: 2,
            received_date: 1612651443719,
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
            status: 3,
            received_date: 1612651433719,
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

    function _renderComponents() {
        if (tmpOrders.length > 0) {
            return (
                <>
                    <OrdersTableHeader header={true}/>
                    <OrdersMap orders={tmpOrders} showPlaced={true}/>
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