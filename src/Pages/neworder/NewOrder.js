import React, { useRef } from 'react';
import './NewOrder.css';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function NewOrder(props) {
    
    const namePickUp = useRef(null);
    const phonePickUp = useRef(null);
    const addressPickUp = useRef(null);

    const nameDropOff = useRef(null);
    const phoneDropOff = useRef(null);
    const addressDropOff = useRef(null);

    return (
        <>
            <Container style={{ padding: '40px 20px 20px 20px' }}>
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
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label='Phone'
                                variant='outlined'
                                fullWidth={true}
                                inputRef={phonePickUp}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label='Pick up address'
                            variant='outlined'
                            fullWidth={true}
                            inputRef={addressPickUp}
                        />
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
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label='Phone'
                                variant='outlined'
                                fullWidth={true}
                                inputRef={phoneDropOff}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label='Address'
                            variant='outlined'
                            fullWidth={true}
                            inputRef={addressDropOff}
                        />
                    </Grid>
                </Grid>
                <Button variant='contained' color='primary' style={{display: 'flex', margin: '50px auto'}}>Place order</Button>
            </Container>
        </>
    );
}