import React from 'react';
import './Components.css';

import DynamicIcon from './Helpers/DynamicIcon';


export default function Loading(props) {

    return (
        <div className="flex-center">
            <DynamicIcon type="loading" width={75} height={75} />
        </div>
    );
}