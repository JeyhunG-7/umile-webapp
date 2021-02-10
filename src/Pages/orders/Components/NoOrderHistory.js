import React from 'react'
import '../Orders.css';


export default function NoOrderHistory(props) {

    return (
        <div className="div-no-orders">
            <h2>Order history is empty</h2>
            <p>Fulfilled order will appear here. To place order go to <a href="/neworder">new order</a> page.</p>
        </div>
    );
}