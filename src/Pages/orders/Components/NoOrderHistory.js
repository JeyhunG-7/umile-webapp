import React from 'react'
import '../Orders.css';


export default function NoOrderHistory(props) {

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Order history is empty</h2>
            <p>Fulfilled order will appear here. To place order go to <a href="/neworder" style={{ textDecoration: 'none', color: '#2993ec' }}>new order</a> page.</p>
        </div>
    );
}