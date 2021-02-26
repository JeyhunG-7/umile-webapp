import React, { useState, useEffect, useContext } from 'react';
import './NewOrder.css';
import Validate from 'validate.js';
import { Helmet } from 'react-helmet';
import { makePostRequest, makeGetRequest } from '../../Utils/Fetch';
import { GlobalContext, SEVERITY } from '.././../Components/GlobalContext';
import { AddressInput } from '../../Components/AddressInput';
import {
    Container, Button, TextField, Paper, Radio,
    RadioGroup, FormControlLabel, FormControl
} from '@material-ui/core';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';


export default function NewOrder(props) {
    const { setAlert } = useContext(GlobalContext);

    const [homeLocationObj, setHomeLocationObj] = useState(null);
    const [homeLocationType, setHomeLocationType] = useState('home');
    const [locationDropOff, setlocationDropOff] = useState({
        placeId: null,
        addrText: null
    });
    const [locationPickUp, setlocationPickUp] = useState({
        placeId: null,
        addrText: null
    });

    const [notesPickUp, setNotesPickup] = useState(null);
    const [nameDropOff, setNameDropOff] = useState(null);
    const [phoneDropOff, setPhoneDropOff] = useState(null);
    const [notesDropOff, setNotesDropOff] = useState(null);

    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [stateObj, setMessage] = useState({
        locationPickUpMessage: null,
        nameDropOffMessage: null,
        phoneDropOffMessage: null,
        locationDropOffMessage: null
    });

    const constraints = {
        locationPickUp: {
            presence: {
                allowEmpty: false,
                message: "Required!"
            }
        },
        nameDropOff: {
            format: {
                pattern: "[A-Za-z '’-]+",
                message: "Enter valid name."
            },
            presence: {
                allowEmpty: false,
                message: "Required!"
            }
        },
        phoneDropOff: {
            format: {
                pattern: "[0-9 ()+-]+",
                message: "Enter valid phone number."
            },
            presence: {
                allowEmpty: false,
                message: "Required!"
            }
        },
        locationDropOff: {
            presence: {
                allowEmpty: false,
                message: "Required!"
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

    async function submitPlaceOrder() {
        setLoadingSubmit(true);
        let check = Validate({
            locationPickUp: homeLocationObj && homeLocationType === 'home' ? homeLocationObj.id : locationPickUp?.placeId,
            nameDropOff: nameDropOff,
            phoneDropOff: phoneDropOff,
            locationDropOff: locationDropOff?.placeId,
        }, constraints,
            {
                fullMessages: false
            }
        );

        check && setMessage(prevState => {
            return {
                ...prevState,
                locationPickUpMessage: check.locationPickUp ? check.locationPickUp[0] : null,
                nameDropOffMessage: check.nameDropOff ? check.nameDropOff[0] : null,
                phoneDropOffMessage: check.phoneDropOff ? check.phoneDropOff[0] : null,
                locationDropOffMessage: check.locationDropOff ? check.locationDropOff[0] : null,
            }
        });

        if (!check) {
            let opts = {
                auth: true,
                body: {
                    cityId: 1,
                    pickup: {
                        placeId: homeLocationObj && homeLocationType === 'home' ? homeLocationObj?.id : locationPickUp?.placeId,
                        note: notesPickUp ?? ''
                    },
                    dropoff: {
                        placeId: locationDropOff?.placeId,
                        customer_name: nameDropOff,
                        customer_phone: phoneDropOff,
                        note: notesDropOff ?? ''
                    }
                }
            }

            const result = await makePostRequest('/orders/place', opts);
            if (!result) return setAlert({ message: 'Request error', severity: SEVERITY.ERROR });

            setTimeout(function () {
                setNotesPickup(null);
                setNameDropOff(null);
                setPhoneDropOff(null);
                setNotesDropOff(null);
                setlocationDropOff({});
                setLoadingSubmit(false);

                setAlert({
                    message: (
                        <div>
                            Success! To see orders go to
                            <a href='/' style={{ color: 'rgb(7 37 62)', marginLeft: '4px' }}>dashboard</a>
                        </div>),
                    severity: SEVERITY.SUCCESS
                });
            }, 1000);
        } else {
            setLoadingSubmit(false);
        }
    }

    function _renderPickUpLocationSelect() {
        if (homeLocationObj) {
            return (
                <FormControl component="fieldset">
                    <RadioGroup aria-label="home-location" value={homeLocationType} onChange={handleHomeLocationType}>
                        <FormControlLabel value="home" control={<Radio color="primary" />} label={`Home location (${homeLocationObj?.address})`} />
                        <FormControlLabel value="new" control={<Radio color="primary" />} label="Different location" />
                    </RadioGroup>
                </FormControl>
            );
        }
    }

    function _renderSubmitButton() {
        if (loadingSubmit) {
            return (
                <DynamicIcon type="loadingWhiteCircle" width={39} height={39} />
            );
        } else {
            return (
                <>Place Order</>
            );
        }
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
                        {_renderPickUpLocationSelect()}
                        <div className="flex-row">
                            <AddressInput
                                value={locationPickUp?.addrText}
                                disabled={homeLocationObj && homeLocationType === 'home'}
                                showError={Boolean(stateObj.locationPickUpMessage)}
                                errorMessage={stateObj.locationPickUpMessage}
                                selectedAddress={(id, addr) => setlocationPickUp({ placeId: id, addrText: addr })}
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
                                error={Boolean(stateObj.nameDropOffMessage)}
                                helperText={stateObj.nameDropOffMessage}
                                onChange={({ target: { value } }) => {
                                    setNameDropOff(value);
                                    setMessage(prevState => {
                                        return {
                                            ...prevState,
                                            nameDropOffMessage: null
                                        }
                                    });
                                }}
                            />
                            <TextField
                                label="Phone"
                                fullWidth={true}
                                variant="outlined"
                                value={phoneDropOff || ''}
                                error={Boolean(stateObj.phoneDropOffMessage)}
                                helperText={stateObj.phoneDropOffMessage}
                                onChange={({ target: { value } }) => {
                                    setPhoneDropOff(value);
                                    setMessage(prevState => {
                                        return {
                                            ...prevState,
                                            phoneDropOffMessage: null
                                        }
                                    });
                                }
                                }
                            />
                        </div>
                        <div className="flex-row">
                            <AddressInput
                                value={locationDropOff?.addrText}
                                showError={Boolean(stateObj.locationDropOffMessage)}
                                errorMessage={stateObj.locationDropOffMessage}
                                selectedAddress={(id, addr) => setlocationDropOff({ placeId: id, addrText: addr })} />
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
                    {_renderSubmitButton()}
                </Button>
            </Container>
        </>
    );
}