import React, { useRef, useState } from 'react';
import './NewOrder.css';
import Validate from 'validate.js';
import { makePostRequest } from '../../Utils/Fetch';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';

import { AddressInput } from '../../Components/AddressInput';

export default function NewOrder(props) {
    const [orderPlaced, setOrderPlaced] = useState(false);

    const namePickUp = useRef(null);
    const phonePickUp = useRef(null);
    const notesPickUp = useRef(null);
    const [addressPickUp, setAddressPickUp] = useState(null);

    const nameDropOff = useRef(null);
    const phoneDropOff = useRef(null);
    const notesDropOff = useRef(null);
    const [addressDropOff, setAddressDropOff] = useState(null);

    const [stateObj, setMessage] = useState({
        namePickUpMessage: null,
        phonePickUpMessage: null,
        notesPickUpMessage: null,
        addressPickUpMessage: null,
        nameDropOffMessage: null,
        phoneDropOffMessage: null,
        notesDropOffMessage: null,
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

    function handleAddressPickUpSelect(addr) {
        setAddressPickUp(addr);
    }

    function handleAddressDropOffSelect(addr) {
        setAddressDropOff(addr);
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOrderPlaced(false);
    };

    async function submitPlaceOrder() {
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
            let opts = {
                auth: true,
                body: {
                    cityId: 1,
                    pickup: {
                        placeId: addressPickUp,
                        note: ""
                    },
                    dropoff: {
                        placeId: addressDropOff,
                        customer_name: nameDropOff.current.value,
                        customer_phone: phoneDropOff.current.value,
                        note: ""
                    }
                }
            }

            let result = await makePostRequest('/orders/place', opts);
            console.log('RESULT: ', result);
            if (result){
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
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            label='Name'
                            variant='outlined'
                            fullWidth={true}
                            inputRef={namePickUp}
                            error={stateObj.namePickUpMessage}
                            helperText={stateObj.namePickUpMessage}
                            style={{ marginRight: 25 }}
                        />
                        <TextField
                            label='Phone'
                            variant='outlined'
                            fullWidth={true}
                            inputRef={phonePickUp}
                            error={stateObj.phonePickUpMessage}
                            helperText={stateObj.phonePickUpMessage}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AddressInput
                            errorMessage={stateObj.addressPickUpMessage}
                            selectedAddress={handleAddressPickUpSelect} />
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

            <Paper style={{ padding: '3% 5% 4% 5%', width: '60%', marginTop: 35}}>
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
                            errorMessage={stateObj.addressDropOffMessage}
                            selectedAddress={handleAddressDropOffSelect} />
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