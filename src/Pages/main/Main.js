import React from 'react'
import './Main.css';
import { Helmet } from 'react-helmet';

import Scheduled from './Components/Scheduled';
import Placed from './Components/Placed';

export default function Main(props) {
    

    return (
        <>
            <Helmet>
                <title>{'UMile | Dashboard'}</title>
            </Helmet>
            <div className="dashboard">
                <Scheduled/>
                <Placed/>
            </div>
        </>
    );
}