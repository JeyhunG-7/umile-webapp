import React, { useState } from 'react';
import '../Main.css';
import Moment from 'react-moment';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makePostRequest } from '../../../Utils/Fetch';


export default function PlacedOrder(props) {
    let order = props.order;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    function orderIsUpdated(){
        props.onUpdate();
        handleCloseMenu();
    }

    async function handleUnsubmit() {
        let result = await makePostRequest('/orders/status', { auth: true, body: {orderId: order.id, submit: false}});
        if (result){
            orderIsUpdated();
        } else {
            alert('TODO: Failure');
        }
    }

    async function handleDelete() {
        let result = await makePostRequest('/orders/delete', { auth: true, body: {orderId: order.id}});
        if (result){
            orderIsUpdated();
        } else {
            alert('TODO: Failure');
        }
    }

    async function handleSubmitForDelivery(){
        let result = await makePostRequest('/orders/status', { auth: true, body: {orderId: order.id, submit: true}});
        if (result){
            orderIsUpdated();
        } else {
            alert('TODO: Failure');
        }
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
                            {order.status.id === 2 && <MenuItem onClick={handleUnsubmit}>Unsubmit for delivery</MenuItem>}
                            <MenuItem onClick={handleDelete}>Delete order</MenuItem>
                        </Menu>
                    </li>
                </>
            );
        }
    }

    function _renderStatus() {
        if (order.status.id === 1) {
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