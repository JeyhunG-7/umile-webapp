import React, { useEffect, useState } from 'react'
import '../Profile.css';
import Map from '../../../Components/Map';
import Validate from 'validate.js';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

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
        handleShowAddressUpdate();
    }, [props.addressObj])

    const handleClickInfo = (e, val) => {
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
            if (result){
                props.refresh();
            } else {
                //TODO: show error
            }
        }
    }

    // Render elements
    function _renderAddressInput() {
        if (showAddressUpdate) {
            return (
                <div style={{ height: 250, width: '70%', margin: 'auto'}}>
                    <AddressInput
                        errorMessage={stateObj.locationMessage}
                        selectedAddress={handleAddressPickUpSelect} />
                </div>
            );
        } else {
            if (props.addressObj){
                return (
                    <div style={{ border: '1px solid #ebeef0', width: 300, height: 250, margin: 'auto', borderRadius: 3, overflow: 'hidden' }}>
                        <Map lat={props.addressObj && props.addressObj.lat} lng={props.addressObj && props.addressObj.lng} />
                    </div>
                );
            }

            return (
                <div style={{ margin: 'auto', borderRadius: 3, overflow: 'hidden' }}>
                    No information
                </div>
            );
            
        }
    }

    function _renderUpdateButtons() {
        if (showAddressUpdate) {
            return (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 300 }}>
                    <Button variant='contained'
                        color='primary'
                        style={{ display: 'flex', margin: '20px auto' }}
                        onClick={handleShowAddressUpdate}>
                        Cancel
                    </Button>
                    <Button variant='contained'
                        color='primary'
                        style={{ display: 'flex', margin: '20px auto' }}
                        onClick={handleAddressUpdate}>
                        Update
                    </Button>
                </div>
            )
        } else {
            return (
                <Button variant='contained'
                    color='primary'
                    style={{ display: 'flex', margin: '20px auto' }}
                    onClick={handleShowAddressUpdate}>
                    Update
                </Button>
            );
        }
    }

    return (
        <Paper style={{ padding: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <h2 style={{ fontWeight: '500', textAlign: 'center' }}>Default Pick up Address</h2>
                <InfoIcon aria-haspopup="true" onMouseEnter={handleClickInfo} onMouseLeave={handleClosePopover} />
            </div>
            <Popover
                open={openPopover}
                anchorEl={anchorEl}
                style={{ pointerEvents: 'none'}}
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
                <Typography style={{ padding: 10, maxWidth: 300, textAlign: 'center' }}>
                    Having this will make adding new orders faster.
                            </Typography>
            </Popover>
            {_renderAddressInput()}
            <p>{props.addressObj && props.addressObj.address}</p>
            {_renderUpdateButtons()}
        </Paper>
    );
}