import React from 'react'
import '../Main.css';


export default function NoPlacedOrders(props) {

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>No scheduled orders to show</h2>
            <p>Submit palced order to schedule it for delivery.</p>
        </div>
    );
}