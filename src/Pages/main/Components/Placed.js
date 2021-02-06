import React from 'react'
import '../Main.css';

import Paper from '@material-ui/core/Paper';


export default function Placed(props) {

    return (
        <Paper style={{ padding: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 30 }}>
            <h3 style={{ width: '100%', fontWeight: '500', textAlign: 'left', margin: '0 0 30px 0'}}>Placed Orders</h3>
            <div>
                <h2 style={{textAlign: 'center'}}>No new orders to show</h2>
                <p>Added orders will appear here. To add an order go to <a style={{ textDecoration: 'none', color: '#2993ec'}}>new order</a> page.</p>
            </div>
        </Paper>
    );
}