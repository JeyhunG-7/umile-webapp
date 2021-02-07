import React, { useState } from 'react';
import '../Main.css';
import Moment from 'react-moment';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export default function PlacedOrder(props) {
    let order = props.order;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    function handleUnsubmit() {
        // BE call
    }

    function handleDelete() {
        // BE call
    }

    function handleSubmitForDelivery(){
        // BE call
    }

    function _renderRow() {
        if (props.header) {
            return (
                <>
                    <li>Customer</li>
                    <li>Pick up location</li>
                    <li>Drop off location</li>
                    <li>Order received date</li>
                    <li>Status</li>
                    <li style={{ width: 50 }}></li>
                </>
            );
        } else {
            return (
                <>
                    <li>{order.dropoff.name}</li>
                    <li>{order.pickup.address}</li>
                    <li>{order.dropoff.address}</li>
                    <li>
                        <Moment date={order.received_date} format="LL" withTitle />
                    </li>
                    <li>
                        {_renderStatus()}
                    </li>
                    <li>
                        <Button style={{ width: 50, backgroundColor: 'transparent' }} variant="contained" disableElevation={true} onClick={handleOpenMenu}>
                            <MoreVertIcon />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            {order.status === 3 && <MenuItem onClick={handleUnsubmit}>Unsubmit for delivery</MenuItem>}
                            <MenuItem onClick={handleDelete}>Delete order</MenuItem>
                        </Menu>
                    </li>
                </>
            );
        }
    }

    function _renderStatus() {
        if (order.status === 2) {
            return (
                <Button variant="contained" color="primary" disableElevation={true} onClick={handleSubmitForDelivery} style={{fontSize: 16, textTransform: 'inherit'}}>
                    Submit for delivery
                </Button>
            );
        } else {
            return (
                <>Submitted for delivery</>
            );
        }
    }

    return (
        <ul key={order && order.received_date} className={props.header ? 'ul-hdr-placed-order-table' : 'ul-row-placed-order-table'}>
            {_renderRow()}
        </ul>
    );
}