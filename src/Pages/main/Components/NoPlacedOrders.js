import React from 'react'
import '../Main.css';


export default function NoPlacedOrders(props) {

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>No new orders to show</h2>
            <p>Placed orders will appear here. To place order go to <a href="/neworder" style={{textDecoration: 'none', color: '#2993ec'}}>new order</a> page.</p>
        </div>
    );
}