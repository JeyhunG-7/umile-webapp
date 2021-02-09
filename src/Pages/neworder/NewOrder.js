import React, { useRef, useState, useEffect } from 'react';
import './NewOrder.css';
import Validate from 'validate.js';
import { makePostRequest, makeGetRequest } from '../../Utils/Fetch';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

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
            locationPickUp: homeLocationType === 'home' ? homeLocationObj && homeLocationObj.address : locationPickUp,
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

        if (!check) {
            let opts = {
                auth: true,
                body: {
                    cityId: 1,
                    pickup: {
                        placeId: homeLocationType === 'home' ? homeLocationObj && homeLocationObj.address : locationPickUp,
                        note: ""
                    },
                    dropoff: {
                        placeId: locationDropOff,
                        customer_name: nameDropOff.current.value,
                        customer_phone: phoneDropOff.current.value,
                        note: ""
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
        <Container style={{ padding: 40 }}>
            <Paper style={{ padding: '3% 5% 4% 5%', width: '60%' }}>
                <div style={{ position: 'relative', display: 'grid', width: '100%', gridRowGap: 25, gridTemplateRows: 'auto' }}>
                    <h2 style={{ fontWeight: '500', margin: '0' }}>Pick up information</h2>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="home-location" value={homeLocationType} onChange={handleHomeLocationType}>
                            <FormControlLabel value="home" control={<Radio color="primary" />} label={'Home location (' + (homeLocationObj && homeLocationObj.address) + ')'} />
                            <FormControlLabel value="new" control={<Radio color="primary" />} label="Different location" />
                        </RadioGroup>
                    </FormControl>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AddressInput
                            errorMessage={stateObj.locationPickUpMessage}
                            selectedAddress={handleSelectLocationPickUp}
                            disabled={homeLocationType === 'home'} />
                        <TextField
                            label='Notes'
                            variant='outlined'
                            fullWidth={true}
                            inputRef={notesPickUp}
                            style={{ marginLeft: 25 }}
                        />
                    </div>
                </div>
            </Paper>
            <Paper style={{ padding: '3% 5% 4% 5%', width: '60%', marginTop: 35 }}>
                <div style={{ position: 'relative', display: 'grid', width: '100%', gridRowGap: 25, gridTemplateRows: 'auto' }}>
                    <h2 style={{ fontWeight: '500', margin: '0' }}>Drop off information</h2>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            label='Name'
                            variant='outlined'
                            fullWidth={true}
                            inputRef={nameDropOff}
                            error={stateObj.nameDropOffMessage}
                            helperText={stateObj.nameDropOffMessage}
                            style={{ marginRight: 25 }}
                        />
                        <TextField
                            label='Phone'
                            variant='outlined'
                            fullWidth={true}
                            inputRef={phoneDropOff}
                            error={stateObj.phoneDropOffMessage}
                            helperText={stateObj.phoneDropOffMessage}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AddressInput
                            errorMessage={stateObj.locationDropOffMessage}
                            selectedAddress={handleSelectLocationDropOff} />
                        <TextField
                            label='Notes'
                            variant='outlined'
                            fullWidth={true}
                            inputRef={notesDropOff}
                            style={{ marginLeft: 25 }}
                        />
                    </div>

                </div>
            </Paper>
            <Button variant='contained'
                color='primary'
                style={{ display: 'flex', margin: '50px auto' }}
                onClick={submitPlaceOrder}>
                Place order
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