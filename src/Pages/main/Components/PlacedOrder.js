import React, { useState, useContext } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { makePostRequest } from '../../../Utils/Fetch';
import { GlobalContext, SEVERITY } from '.././../../Components/GlobalContext';
import DeleteOrder from './DeleteOrderModal';
import Moment from 'react-moment';
import '../Main.css';

export default function PlacedOrder(props) {
    let order = props.order;

    const { setAlert } = useContext(GlobalContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);

    const handleCloseMenu = () => setAnchorEl(null);

    function orderIsUpdated() {
        props.onUpdate();
        handleCloseMenu();
    }

    async function handleUnsubmit() {
        const result = await makePostRequest('/orders/status', { auth: true, body: { orderId: order.id, submit: false } });
        if (!result) return setAlert({ message: 'Request error', severity: SEVERITY.ERROR });

        orderIsUpdated();
        setAlert({ message: 'Order unsubmitted for delivery.', severity: SEVERITY.SUCCESS });
    }

    async function handleSubmitForDelivery() {
        const result = await makePostRequest('/orders/status', { auth: true, body: { orderId: order.id, submit: true } });
        if (!result) return setAlert({ message: 'Request error', severity: SEVERITY.ERROR });

        orderIsUpdated();
        setAlert({ message: 'Order submitted for delivery.', severity: SEVERITY.SUCCESS });
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

                            <DeleteOrder
                                id={order && order.id}
                                modalClose={handleCloseMenu}
                                orderDeleted={() => setAlert({ message: 'Request error', severity: SEVERITY.SUCCESS })}
                            />
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
        </ul>
    );
}