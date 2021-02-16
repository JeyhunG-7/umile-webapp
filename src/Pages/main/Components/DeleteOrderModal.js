import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext, SEVERITY } from '.././../../Components/GlobalContext';
import { makePostRequest } from '../../../Utils/Fetch';
import { Modal, Backdrop, Fade, MenuItem, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3)
    },
}));

const DeleteOrderModal = React.forwardRef((props, ref) => {
    const { setAlert } = useContext(GlobalContext);
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        props.modalClose();
    };

    async function handleDelete() {
        const result = await makePostRequest('/orders/delete', { auth: true, body: { orderId: props.id } });
        if (!result) return setAlert({ message: 'Error while deleting the order', severity: SEVERITY.ERROR });

        props.orderDeleted();
        handleClose();
    }

    return (
        <div>
            <MenuItem onClick={handleOpen}>Delete order</MenuItem>
            <Modal
                open={open}
                className={`${classes.modal} modal-delete-order`}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Delete Order</h2>
                        <p>This can’t be undone and the order will be removed from your dashboard.</p>
                        <Button variant="contained" color="secondary" className="btn-delete-order" onClick={handleDelete}>Delete</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
});

export default DeleteOrderModal;