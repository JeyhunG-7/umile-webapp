import React, { useRef, useState, useEffect } from 'react';
import './NewOrder.css';
import Validate from 'validate.js';
import { makePostRequest, makeGetRequest } from '../../Utils/Fetch';

import Alert from '@material-ui/lab/Alert';
import { Container, Button, TextField, Snackbar, Paper, Radio, RadioGroup, FormControlLabel, FormControl} from '@material-ui/core';

import { AddressInput } from '../../Components/AddressInput';


export default function NewOrder(props) {
    const [orderPlaced, setOrderPlaced] = useState(false);

    const notesPickUp = useRef(null);
    const [locationPickUp, setlocationPickUp] = useState(null);
    const [homeLocationObj, setHomeLocationObj] = useState(null);
    const [homeLocationType, setHomeLocationType] = useState('home');

    const nameDropOff = useRef(null);
    const phoneDropOff = useRef(null);
    const notesDropOff = useRef(null);
    const [locationDropOff, setlocationDropOff] = useState(null);

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
        }
    }

    // fetch user information
    useEffect(() => {
        getUserHomeLocation();
    }, []);

    const handleHomeLocationType = (event) => {
        setHomeLocationType(event.target.value);
    };

    function handleSelectLocationPickUp(addr) {
        setlocationPickUp(addr);
    }

    function handleSelectLocationDropOff(addr) {
        setlocationDropOff(addr);
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOrderPlaced(false);
    };

    async function submitPlaceOrder() {
        let check = Validate({
            locationPickUp: homeLocationType === 'home' ? homeLocationObj && homeLocationObj.id : locationPickUp,
            nameDropOff: nameDropOff.current.value,
            phoneDropOff: phoneDropOff.current.value,
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

        console.log(homeLocationObj);

        if (!check) {
            let opts = {
                auth: true,
                body: {
                    cityId: 1,
                    pickup: {
                        placeId: homeLocationType === 'home' ? homeLocationObj && homeLocationObj.id : locationPickUp,
                        note: notesPickUp.current.value
                    },
                    dropoff: {
                        placeId: locationDropOff,
                        customer_name: nameDropOff.current.value,
                        customer_phone: phoneDropOff.current.value,
                        note: notesDropOff.current.value
                    }
                }
            }

            let result = await makePostRequest('/orders/place', opts);
            console.log('RESULT: ', result);
            if (result) {
                //Success BE order placed
                setOrderPlaced(true);
            } else {
                //TODO: show error
            }
        }
    }

    return (
        <Container className="new-order">
            <Paper className="paper-pick-up" elevation={0}>
                <div className="div-pick-up">
                    <h2>Pick up information</h2>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="home-location" value={homeLocationType} onChange={handleHomeLocationType}>
                            <FormControlLabel value="home" control={<Radio color="primary" />} label={'Home location (' + (homeLocationObj && homeLocationObj.address) + ')'} />
                            <FormControlLabel value="new" control={<Radio color="primary" />} label="Different location" />
                        </RadioGroup>
                    </FormControl>
                    <div className="flex-row">
                        <AddressInput
                            errorMessage={stateObj.locationPickUpMessage}
                            selectedAddress={handleSelectLocationPickUp}
                            disabled={homeLocationType === 'home'} />
                        <TextField
                            label="Notes"
                            variant="outlined"
                            fullWidth={true}
                            inputRef={notesPickUp}
                            style={{ marginLeft: 25 }}
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
                            variant="outlined"
                            fullWidth={true}
                            inputRef={nameDropOff}
                            error={stateObj.nameDropOffMessage}
                            helperText={stateObj.nameDropOffMessage}
                            style={{ marginRight: 25 }}
                        />
                        <TextField
                            label="Phone"
                            variant="outlined"
                            fullWidth={true}
                            inputRef={phoneDropOff}
                            error={stateObj.phoneDropOffMessage}
                            helperText={stateObj.phoneDropOffMessage}
                        />
                    </div>
                    <div className="flex-row">
                        <AddressInput
                            errorMessage={stateObj.locationDropOffMessage}
                            selectedAddress={handleSelectLocationDropOff} />
                        <TextField
                            label="Notes"
                            variant="outlined"
                            fullWidth={true}
                            inputRef={notesDropOff}
                            style={{ marginLeft: 25 }}
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
            <Snackbar open={orderPlaced}
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
    );
}