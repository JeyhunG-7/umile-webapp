import React, { useState } from 'react'
import '../Profile.css';

import { Paper, Popover, Typography, TextField }  from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';


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
        <Paper className="paper-ui flex-column" elevation={0}>
            <div className="info-header flex-row">
                <h2 className="lft">User Information</h2>
                <InfoIcon aria-haspopup="true" onMouseEnter={handleClickInfo} onMouseLeave={handleClosePopover}/>
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
                <Typography className="text-info">
                    To update your information please contact us. We currently don't support this through our web platform.
                            </Typography>
            </Popover>
            <TextField
                label='Contact name'
                variant='outlined'
                className="input-ui"
                fullWidth={true}
                value={props.name}
                disabled={true}
            />
            <TextField
                label='Company name'
                variant='outlined'
                className="input-ui"
                fullWidth={true}
                value={props.companyName}
                disabled={true}
            />
            <TextField
                label='Email'
                variant='outlined'
                className="input-ui"
                fullWidth={true}
                value={props.email}
                disabled={true}
            />
            <TextField
                label='Phone'
                variant='outlined'
                className="input-ui"
                fullWidth={true}
                value={props.phone}
                disabled={true}
            />
        </Paper>
    );
}