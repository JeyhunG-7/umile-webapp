import React from 'react'
import '../Main.css';

import Paper from '@material-ui/core/Paper';


export default function Scheduled(props) {

    return (
        <Paper style={{ padding: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 30 }}>
            <h3 style={{ width: '100%', fontWeight: '500', textAlign: 'left', margin: '0 0 30px 0'}}>Scheduled for delivery</h3>
            <div>
                <h2 style={{textAlign: 'center'}}>No scheduled orders to show</h2>
                <p>Submit palced order to schedule it for delivery.</p>
            </div>
        </Paper>
    );
}