import React from 'react';
import '../Orders.css';
import Moment from 'react-moment';


export default function HistoryOrder(props) {
    let order = props.order;

    function _renderRow() {
        if (props.header) {
            return (
                <>
                    <li>Customer</li>
                    <li>Pick up location</li>
                    <li>Drop off location</li>
                    <li>Order status date</li>
                    <li>Status</li>
                </>
            );
        } else {
            return (
                <>
                    <li>{order.dropoff.name}</li>
                    <li>{order.pickup.address}</li>
                    <li>{order.dropoff.address}</li>
                    <li>
                        <Moment date={order.status_date} format="LL" withTitle />
                    </li>
                    <li>
                        {_renderStatus()}
                    </li>
                </>
            );
        }
    }

    function _renderStatus(){
        if(order.status === 4){
            return(
                <div style={{backgroundColor: '#22bfa0', color: '#fff', padding: '5px 10px', borderRadius: 5, width: 120, margin: 'auto'}}>Delivered</div>
            );
        } else if(order.status === 5){
            return(
                <div style={{backgroundColor: '#d14242', color: '#fff', padding: '5px 10px', borderRadius: 5, width: 120, margin: 'auto'}}>Cancelled</div>
            );
        }
    }

    return (
        <ul key={order && order.status_date} className={props.header ? 'ul-hdr-history-order-table' : 'ul-row-history-order-table'}>
            {_renderRow()}
        </ul>
    );
}