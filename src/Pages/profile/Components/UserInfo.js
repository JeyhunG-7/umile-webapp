import React, { useState } from 'react'
import '../Profile.css';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


export default function Userinfo(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPopover, setOpenPopover] = useState(false);

    const handleClickInfo = (e, val) => {
        setOpenPopover(true);
        setAnchorEl(e.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(false);
        setAnchorEl(null);
    };

    return (
        <Paper style={{ padding: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <h2 style={{ fontWeight: '500', textAlign: 'center' }}>User Information</h2>
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
                    To update your information please contact us. We currently don't support this through our web platform.
                            </Typography>
            </Popover>
            <TextField
                label='Contact name'
                variant='outlined'
                style={{ marginBottom: 20, width: 350 }}
                fullWidth={true}
                value={props.name}
                disabled={true}
            />
            <TextField
                label='Company name'
                variant='outlined'
                style={{ marginBottom: 20, width: 350 }}
                fullWidth={true}
                value={props.companyName}
                disabled={true}
            />
            <TextField
                label='Email'
                variant='outlined'
                style={{ marginBottom: 20, width: 350 }}
                fullWidth={true}
                value={props.email}
                disabled={true}
            />
            <TextField
                label='Phone'
                variant='outlined'
                style={{ marginBottom: 20, width: 350 }}
                fullWidth={true}
                value={props.phone}
                disabled={true}
            />
        </Paper>
    );
}