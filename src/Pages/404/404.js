import React from 'react';
import './404.css';
import Header from '../../Components/Header';

export default function NotFound(props) {
    return (
        <div id="main" className="main">
            <Header pageName={props.pageName}/>
            

        </div>
    );
}