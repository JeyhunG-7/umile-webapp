import React, { useState } from 'react'
import '../Profile.css';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';


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
        <Paper style={{ padding: '5%', borderRadius: 30 }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <h2 style={{ fontWeight: '500', textAlign: 'center' }}>Balance</h2>
                <Button
                    style={{ backgroundColor: 'transparent', height: 40, minWidth: 50, padding: 0 }}
                    disableElevation={true}
                    onClick={handleClickInfo}
                    variant='contained'>
                    <InfoIcon />
                </Button>
                <h2 style={{ fontWeight: '500', textAlign: 'center', marginLeft: 50 }}>{'C$' + props.balance}</h2>
            </div>
            <Popover
                open={openPopover}
                anchorEl={anchorEl}
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
                    This is balance for the current running month.
                            </Typography>
            </Popover>
        </Paper>
    );
}