import React, { useState } from 'react';
import '../Profile.css';

import { Paper, Popover, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';


export default function Balance(props) {
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
        <Paper className="paper-balance" elevation={0}>
            <div className="info-header flex-row">
                <h2 className="lft">Balance</h2>
                <InfoIcon aria-haspopup="true" onMouseEnter={handleClickInfo} onMouseLeave={handleClosePopover} />
                <h2 className="rht">{props.balance}</h2>
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
                disableRestoreFocus
            >
                <Typography className="text-info">
                    This is balance for the current running month.
                </Typography>
            </Popover>
        </Paper>
    );
}