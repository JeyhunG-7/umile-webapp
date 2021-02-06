import React from 'react'
import './Main.css';

import Scheduled from './Components/Scheduled';
import Placed from './Components/Placed';

export default function Main(props) {
    

    return (
        <div style={{ position: 'relative', padding: 40, display: 'grid', gridTemplateRows: '1fr 1fr', width: '100%', gridRowGap: 45, gridTemplateRows: 'auto' }}>
            <Scheduled/>
            <Placed/>
        </div>
    );
}