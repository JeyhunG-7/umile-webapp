import React, { useState, useEffect } from 'react';
import '../Profile.css';
import Map from '../../../Components/Map';
import Validate from 'validate.js';

import { Paper, Button, Popover, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { AddressInput } from '../../../Components/AddressInput';
import { makePostRequest } from '../../../Utils/Fetch';


export default function Profile(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPopover, setOpenPopover] = useState(false);
    const [showAddressUpdate, setShowAddressUpdate] = useState(false);

    const [location, setLocation] = useState(null);
    const [stateObj, setMessage] = useState({
        locationMessage: null
    });

    const constraints = {
        location: {
            presence: {
                allowEmpty: false
            }
        }
    };

    useEffect(() => {
        setShowAddressUpdate(false);
    }, [props.addressObj])

    const handleHoverInfo = (e, val) => {
        setOpenPopover(true);
        setAnchorEl(e.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(false);
        setAnchorEl(null);
    };

    function handleShowAddressUpdate() {
        setShowAddressUpdate(!showAddressUpdate);
    }

    function handleAddressPickUpSelect(val) {
        setLocation(val);
    }

    async function handleAddressUpdate() {
        let check = Validate({
            location: location
        }, constraints);

        check && setMessage(prevState => {
            return {
                ...prevState,
                locationMessage: check.location ? "Required!" : null
            }
        });

        if (!check) {
            let opts = {
                auth: true,
                body: {
                    placeId: location
                }
            }
            let result = await makePostRequest('/clients/home', opts);
            if (result) {
                props.refresh();
                props.notify();
            } else {
                //TODO: show error
            }
        }
    }

    // Render elements
    function _renderAddressInput() {
        if (showAddressUpdate) {
            return (
                <div className="ai-address">
                    <AddressInput
                        errorMessage={stateObj.locationMessage}
                        selectedAddress={handleAddressPickUpSelect} />
                </div>
            );
        } else {
            if (props.addressObj) {
                return (
                    <div className="ai-map">
                        <Map lat={props.addressObj && props.addressObj.lat} lng={props.addressObj && props.addressObj.lng} />
                    </div>
                );
            }

            return (
                <div className="ai-no-info">
                    No information
                </div>
            );

        }
    }

    function _renderUpdateButtons() {
        if (showAddressUpdate) {
            return (
                <div className="div-location-btns flex-row">
                    <Button variant='contained'
                        color='primary'
                        className="btn-location-action"
                        onClick={handleShowAddressUpdate}>
                        Cancel
                    </Button>
                    <Button variant='contained'
                        color='primary'
                        className="btn-location-action"
                        onClick={handleAddressUpdate}>
                        Save
                    </Button>
                </div>
            )
        } else {
            return (
                <Button variant='contained'
                    color='primary'
                    className="btn-location-action"
                    onClick={handleShowAddressUpdate}>
                    Update
                </Button>
            );
        }
    }

    return (
        <Paper className="paper-location flex-column" elevation={0}>
            <div className="info-header flex-row">
                <h2 className="lft">Default Pick up Address</h2>
                <InfoIcon aria-haspopup="true" onMouseEnter={handleHoverInfo} onMouseLeave={handleClosePopover} />
            </div>
            <Popover
                open={openPopover}
                anchorEl={anchorEl}
                style={{ pointerEvents: 'none' }}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography className="text-info">
                    Having this will make adding new orders faster.
                            </Typography>
            </Popover>
            {_renderAddressInput()}
            <p>{!showAddressUpdate && props.addressObj && props.addressObj.address}</p>
            {_renderUpdateButtons()}
        </Paper>
    );
}