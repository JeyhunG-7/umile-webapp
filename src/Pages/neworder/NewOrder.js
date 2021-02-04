import React, { useRef, useState } from 'react';
import './NewOrder.css';
import { AddressInput } from '../../Components/AddressInput';
import Validate from 'validate.js';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function NewOrder(props) {
    const [orderPlaced, setOrderPlaced] = useState(false);

    const namePickUp = useRef(null);
    const phonePickUp = useRef(null);
    const [addressPickUp, setAddressPickUp] = useState(null);

    const nameDropOff = useRef(null);
    const phoneDropOff = useRef(null);
    const [addressDropOff, setAddressDropOff] = useState(null);

    const [stateObj, setMessage] = useState({
        namePickUpMessage: null,
        phonePickUpMessage: null,
        addressPickUpMessage: null,
        nameDropOffMessage: null,
        phoneDropOffMessage: null,
        addressDropOffMessage: null
    });

    const constraints = {
        namePickUp: {
            format: {
                pattern: "[A-Za-z '’-]+"
            },
            presence: {
                allowEmpty: false
            }
        },
        phonePickUp: {
            format: {
                pattern: "[0-9 ()+-]+"
            },
            presence: {
                allowEmpty: false
            }
        },
        addressPickUp: {
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
        addressDropOff: {
            presence: {
                allowEmpty: false
            }
        }
    };

    function handleAddressPickUpSelect(val) {
        setAddressPickUp(val);
    }

    function handleAddressDropOffSelect(val) {
        setAddressDropOff(val);
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOrderPlaced(false);
    };

    function submitPlaceOrder() {
        let check = Validate({
            namePickUp: namePickUp.current.value,
            phonePickUp: phonePickUp.current.value,
            addressPickUp: addressPickUp,
            nameDropOff: nameDropOff.current.value,
            phoneDropOff: phoneDropOff.current.value,
            addressDropOff: addressDropOff,
        }, constraints);

        check && setMessage(prevState => {
            return {
                ...prevState,
                namePickUpMessage: check.namePickUp ? (check.namePickUp.length > 1 ? "Required!" : "Enter valid name") : null,
                phonePickUpMessage: check.phonePickUp ? (check.phonePickUp.length > 1 ? "Required!" : "Enter valid phone number") : null,
                addressPickUpMessage: check.addressPickUp ? "Required!" : null,
                nameDropOffMessage: check.nameDropOff ? (check.nameDropOff.length > 1 ? "Required!" : "Enter valid name") : null,
                phoneDropOffMessage: check.phoneDropOff ? (check.phoneDropOff.length > 1 ? "Required!" : "Enter valid phone number") : null,
                addressDropOffMessage: check.addressDropOff ? "Required!" : null,
            }
        });

        if (!check) {

            //Success BE order placed
            setOrderPlaced(true);

        }
    }


    return (
        <>
            <Container style={{ padding: 40 }}>
                <Grid container spacing={2} justify='flex-start'>
                    <Grid item xs={12}>
                        <h2 style={{ fontWeight: '500', margin: '10px 0' }}>Pick up information</h2>
                    </Grid>
                    <Grid container spacing={2} style={{ margin: 0 }}>
                        <Grid item xs={3}>
                            <TextField
                                label='Name'
                                variant='outlined'
                                fullWidth={true}
                                inputRef={namePickUp}
                                error={stateObj.namePickUpMessage}
                                helperText={stateObj.namePickUpMessage}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label='Phone'
                                variant='outlined'
                                fullWidth={true}
                                inputRef={phonePickUp}
                                error={stateObj.phonePickUpMessage}
                                helperText={stateObj.phonePickUpMessage}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <AddressInput
                            errorMessage={stateObj.addressPickUpMessage}
                            selectedAddress={handleAddressPickUpSelect} />
                    </Grid>
                </Grid>
                <Grid container spacing={2} justify='flex-start'>
                    <Grid item xs={12}>
                        <h2 style={{ fontWeight: '500', margin: '50px 0 10px 0' }}>Drop off information</h2>
                    </Grid>
                    <Grid container spacing={2} style={{ margin: 0 }}>
                        <Grid item xs={3}>
                            <TextField
                                label='Name'
                                variant='outlined'
                                fullWidth={true}
                                inputRef={nameDropOff}
                                error={stateObj.nameDropOffMessage}
                                helperText={stateObj.nameDropOffMessage}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label='Phone'
                                variant='outlined'
                                fullWidth={true}
                                inputRef={phoneDropOff}
                                error={stateObj.phoneDropOffMessage}
                                helperText={stateObj.phoneDropOffMessage}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <AddressInput
                            errorMessage={stateObj.addressDropOffMessage}
                            selectedAddress={handleAddressDropOffSelect} />
                    </Grid>
                </Grid>
                <Button variant='contained' color='primary' style={{ display: 'flex', margin: '50px auto' }} onClick={submitPlaceOrder}>Place order</Button>
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
        </>
    );
}