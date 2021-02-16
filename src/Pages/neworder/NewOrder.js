import React, { useState, useEffect } from 'react';
import './NewOrder.css';
import Validate from 'validate.js';
import { Helmet } from 'react-helmet';

import Alert from '@material-ui/lab/Alert';
import {
    Container, Button, TextField, Snackbar, Paper, Radio,
    RadioGroup, FormControlLabel, FormControl
} from '@material-ui/core';

import { makePostRequest, makeGetRequest } from '../../Utils/Fetch';
import { AddressInput } from '../../Components/AddressInput';


export default function NewOrder(props) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [locationPickUp, setlocationPickUp] = useState(null);
    const [homeLocationObj, setHomeLocationObj] = useState(null);
    const [homeLocationType, setHomeLocationType] = useState('home');
    const [locationDropOff, setlocationDropOff] = useState(null);

    const [notesPickUp, setNotesPickup] = useState(null);
    const [nameDropOff, setNameDropOff] = useState(null);
    const [phoneDropOff, setPhoneDropOff] = useState(null);
    const [notesDropOff, setNotesDropOff] = useState(null);

    const [stateObj, setMessage] = useState({
        notesPickUpMessage: null,
        locationPickUpMessage: null,
        nameDropOffMessage: null,
        phoneDropOffMessage: null,
        notesDropOffMessage: null,
        locationDropOffMessage: null
    });

    const constraints = {
        locationPickUp: {
            presence: {
                allowEmpty: false
            }
        },
        nameDropOff: {
            format: {
                pattern: "[A-Za-z '’-]+"
            },
            presence: {
                allowEmpty: false
            }
        },
        phoneDropOff: {
            format: {
                pattern: "[0-9 ()+-]+"
            },
            presence: {
                allowEmpty: false
            }
        },
        locationDropOff: {
            presence: {
                allowEmpty: false
            }
        }
    };

    async function getUserHomeLocation() {
        var result = await makeGetRequest('/clients/home', { auth: true });
        if (result) {
            setHomeLocationObj(result);
        } else {
            setHomeLocationType('new');
        }
    }

    // fetch user information
    useEffect(() => {
        getUserHomeLocation();
    }, []);

    const handleHomeLocationType = (event) => {
        setHomeLocationType(event.target.value);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    async function submitPlaceOrder() {
        let check = Validate({
            locationPickUp: homeLocationType === 'home' ? homeLocationObj && homeLocationObj.id : locationPickUp,
            nameDropOff: nameDropOff,
            phoneDropOff: phoneDropOff,
            locationDropOff: locationDropOff,
        }, constraints);

        check && setMessage(prevState => {
            return {
                ...prevState,
                locationPickUpMessage: check.locationPickUp ? "Required!" : null,
                nameDropOffMessage: check.nameDropOff ? (check.nameDropOff.length > 1 ? "Required!" : "Enter valid name") : null,
                phoneDropOffMessage: check.phoneDropOff ? (check.phoneDropOff.length > 1 ? "Required!" : "Enter valid phone number") : null,
                locationDropOffMessage: check.locationDropOff ? "Required!" : null,
            }
        });

        if (!check) {
            let opts = {
                auth: true,
                body: {
                    cityId: 1,
                    pickup: {
                        placeId: homeLocationType === 'home' ? homeLocationObj?.id : locationPickUp,
                        note: notesPickUp
                    },
                    dropoff: {
                        placeId: locationDropOff,
                        customer_name: nameDropOff,
                        customer_phone: phoneDropOff,
                        note: notesDropOff
                    }
                }
            }

            const result = await makePostRequest('/orders/place', opts);
            if (!result) return console.error('TODO: handle error ->', result);

            setNotesPickup(null);
            setNameDropOff(null);
            setPhoneDropOff(null);
            setNotesDropOff(null);
            setlocationDropOff(null);
            setSnackbarOpen(true);
        }
    }

    function _renderHomeLocationRadio() {
        return (
            homeLocationObj?.address ?
                <FormControlLabel
                    value="home"
                    control={<Radio color="primary" />}
                    label={`Home location (${homeLocationObj?.address})`}
                /> :
                <FormControlLabel
                    value="home"
                    label="Home location"
                    control={<Radio color="primary" />}
                />
        );
    }

    return (
        <>
            <Helmet>
                <title>{'UMile | New order'}</title>
            </Helmet>
            <Container className="new-order">
                <Paper className="paper-pick-up" elevation={0}>
                    <div className="div-pick-up">
                        <h2>Pick up information</h2>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="home-location" value={homeLocationType} onChange={handleHomeLocationType}>
                                {_renderHomeLocationRadio()}
                                <FormControlLabel value="new" control={<Radio color="primary" />} label="Different location" />
                            </RadioGroup>
                        </FormControl>

                        <div className="flex-row">
                            <AddressInput
                                disabled={homeLocationType === 'home'}
                                errorMessage={stateObj.locationPickUpMessage}
                                selectedAddress={(addr) => setlocationPickUp(addr)}
                            />
                            <TextField
                                label="Notes"
                                variant="outlined"
                                fullWidth={true}
                                value={notesPickUp || ''}
                                style={{ marginLeft: 25 }}
                                onChange={({ target: { value } }) => setNotesPickup(value)}
                            />
                        </div>
                    </div>
                </Paper>

                <Paper className="paper-drop-off" elevation={0}>
                    <div className="div-drop-off">
                        <h2>Drop off information</h2>
                        <div className="flex-row">
                            <TextField
                                label="Name"
                                fullWidth={true}
                                variant="outlined"
                                value={nameDropOff || ''}
                                style={{ marginRight: 25 }}
                                error={stateObj.nameDropOffMessage}
                                helperText={stateObj.nameDropOffMessage}
                                onChange={({ target: { value } }) => setNameDropOff(value)}
                            />
                            <TextField
                                label="Phone"
                                fullWidth={true}
                                variant="outlined"
                                value={phoneDropOff || ''}
                                error={stateObj.phoneDropOffMessage}
                                helperText={stateObj.phoneDropOffMessage}
                                onChange={({ target: { value } }) => setPhoneDropOff(value)}
                            />
                        </div>
                        <div className="flex-row">
                            <AddressInput
                                errorMessage={stateObj.locationDropOffMessage}
                                selectedAddress={(addr) => setlocationDropOff(addr)} />
                            <TextField
                                label="Notes"
                                fullWidth={true}
                                variant="outlined"
                                value={notesDropOff || ''}
                                style={{ marginLeft: 25 }}
                                onChange={({ target: { value } }) => setNotesDropOff(value)}
                            />
                        </div>

                    </div>
                </Paper>

                <Button variant="contained"
                    color="primary"
                    className="submit-no"
                    onClick={submitPlaceOrder}>
                    Place Order
            </Button>

                <Snackbar open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleSnackbarClose}
                        severity="success"
                        elevation={6}
                        variant="filled">
                        Oder has been successfully placed.
                </Alert>
                </Snackbar>
            </Container>
        </>
    );
}