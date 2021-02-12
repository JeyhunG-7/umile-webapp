import React from 'react';
import '../Main.css';
import Moment from 'react-moment';


export default function ScheduledOrder(props) {
    let order = props.order;

    function _renderRow() {
        if (props.header) {
            return (
                <>
                    <li>Customer</li>
                    <li>Pick up location</li>
                    <li>Drop off location</li>
                    <li>Order received date</li>
                    <li>Status</li>
                </>
            );
        } else {
            return (
                <>
                    <li>{order.dropoff.customerName}</li>
                    <li>{order.pickup.address}</li>
                    <li>{order.dropoff.address}</li>
                    <li>
                        <Moment date={order.received_date} format="LL" withTitle />
                    </li>
                    <li>
                        <div style={{backgroundColor: '#FAC710', padding: '5px 10px', borderRadius: 5, width: 140, margin: 'auto'}}>Scheduled</div>
                    </li>
                </>
            );
        }
    }

    return (
        <ul key={order && order.received_date} className={props.header ? 'ul-hdr-scheduled-order-table' : 'ul-row-scheduled-order-table'}>
            {_renderRow()}
        </ul>
    );
}