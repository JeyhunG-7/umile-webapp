import React from 'react'
import './Main.css';

import Scheduled from './Components/Scheduled';
import Placed from './Components/Placed';

export default function Main(props) {
    

    return (
        <div className="dashboard">
            <Scheduled/>
            <Placed/>
        </div>
    );
}