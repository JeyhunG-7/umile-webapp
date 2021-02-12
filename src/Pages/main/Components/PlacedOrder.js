import React, { useState } from 'react';
import '../Main.css';
import Moment from 'react-moment';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Alert from '@material-ui/lab/Alert';
import { Button, Menu, MenuItem, Snackbar} from '@material-ui/core';

import { makePostRequest } from '../../../Utils/Fetch';
import DeleteOrder from './DeleteOrderModal';


export default function PlacedOrder(props) {
    let order = props.order;
    const [anchorEl, setAnchorEl] = useState(null);
    const [showNotif, setShowNotif] = useState(false);
    const [notifMessage, setNotifMessage] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    function orderIsUpdated() {
        props.onUpdate();
        handleCloseMenu();
    }

    async function handleUnsubmit() {
        let result = await makePostRequest('/orders/status', { auth: true, body: { orderId: order.id, submit: false } });
        if (result) {
            orderIsUpdated();
            notifyOrderUnsubmitedForDelivery();
        } else {
            alert('TODO: Failure');
        }
    }

    async function handleSubmitForDelivery() {
        let result = await makePostRequest('/orders/status', { auth: true, body: { orderId: order.id, submit: true } });
        if (result) {
            orderIsUpdated();
            notifyOrderSubmitedForDelivery();
        } else {
            alert('TODO: Failure');
        }
    }

    function handleModalClose() {
        handleCloseMenu();
    }

    const handleNotifClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowNotif(false);
    };

    function notifyOrderDeleted(){
        setShowNotif(true);
        setNotifMessage('Order has been deleted.');
    }

    function notifyOrderSubmitedForDelivery(){
        setShowNotif(true);
        setNotifMessage('Order submitted for delivery.');
    }

    function notifyOrderUnsubmitedForDelivery(){
        setShowNotif(true);
        setNotifMessage('Order unsubmitted for delivery.');
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
                    <li>{order.dropoff.customerName}</li>
                    <li>{order.pickup.address}</li>
                    <li>{order.dropoff.address}</li>
                    <li>
                        <Moment date={order.received_date} format="LL" withTitle />
                    </li>
                    <li>
                        {_renderStatus()}
                    </li>
                    <li>
                        <Button className="btn-menu" variant="contained" disableElevation={true} onClick={handleOpenMenu}>
                            <MoreVertIcon />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            {order.status.id === 2 && <MenuItem onClick={handleUnsubmit}>Unsubmit for delivery</MenuItem>}
                            <DeleteOrder id={order && order.id} 
                                modalClose={handleModalClose} 
                                orderDeleted={notifyOrderDeleted}/>
                        </Menu>
                    </li>
                </>
            );
        }
    }

    function _renderStatus() {
        if (order.status.id === 1) {
            return (
                <Button className="btn-submit-delivery" variant="contained" color="primary" disableElevation={true} onClick={handleSubmitForDelivery}>
                    Submit for delivery
                </Button>
            );
        } else {
            return (
                <div className="status-submitted">Submitted for delivery</div>
            );
        }
    }

    return (
        <ul key={order && order.received_date} className={props.header ? 'ul-hdr-placed-order-table' : 'ul-row-placed-order-table'}>
            {_renderRow()}
            <Snackbar open={showNotif}
                autoHideDuration={6000}
                onClose={handleNotifClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleNotifClose}
                    severity="success"
                    elevation={6}
                    variant="filled">
                    {notifMessage}
                    </Alert>
            </Snackbar>
        </ul>
    );
}