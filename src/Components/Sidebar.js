import React, { useEffect, useState } from 'react';
import './Components.css';
import { withRouter } from 'react-router-dom';

import {
    Drawer, Divider,
    ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { logoutAsync } from './Helpers/Authenticator';
import LogoTransperent from '../Images/logo_transparent.png';


const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        display: "flex"
    }
    ,
    docked: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
        borderColor: 'rgb(235, 238, 240)'
    },
    mainDrawerItems: {
        flexGrow: 1
    }
}));

const PAGES = Object.freeze({
    profile: {
        id: 0,
        route: '/profile'
    },
    dashboard: {
        id: 1,
        route: '/'
    },
    orders: {
        id: 2,
        route: '/orders'
    },
    neworder: {
        id: 3,
        route: '/neworder'
    }
});


function Sidebar(props) {
    const [selectedPage, setSelectedPage] = useState(-1);

    const classes = useStyles();

    useEffect(function () {
        let pathname = window.location.pathname;
        if (pathname === PAGES.dashboard.route) {
            setSelectedPage(PAGES.dashboard.id);
        } else if (pathname === PAGES.profile.route) {
            setSelectedPage(PAGES.profile.id);
        } else if (pathname === PAGES.orders.route) {
            setSelectedPage(PAGES.orders.id)
        } else if (pathname === PAGES.neworder.route) {
            setSelectedPage(PAGES.neworder.id)
        }
    }, [])

    function navigateTo(page) {
        setSelectedPage(page.id)
        props.history.push(page.route);
    }

    async function logout() {
        await logoutAsync();
        console.log(props.history);
        window.location.reload();
    }

    return (
        <>
            <Drawer
                variant="permanent"
                anchor="left"
                className={`${classes.drawer} sidebar`}
                classes={{ paper: classes.drawerPaper, docked: classes.docked }}
            >
                <div className="div-logo">
                    <img alt="logo" src={LogoTransperent} />
                </div>
                <div className="sb-header">
                    <ListItem button selected={selectedPage === PAGES.profile.id} onClick={e => navigateTo(PAGES.profile)}>
                        <ListItemIcon>
                            <i className="lni lni-user"></i>
                        </ListItemIcon>
                        <ListItemText primary="Profile" style={{ letterSpacing: '0.025em' }} />
                    </ListItem>
                </div>
                <Divider />
                <div className={`sb-body ${classes.mainDrawerItems}`}>
                    <ListItem button selected={selectedPage === PAGES.dashboard.id} onClick={e => navigateTo(PAGES.dashboard)}>
                        <ListItemIcon>
                            <i className="lni lni-dashboard"></i>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button selected={selectedPage === PAGES.orders.id} onClick={e => navigateTo(PAGES.orders)}>
                        <ListItemIcon>
                            <i className="lni lni-list"></i>
                        </ListItemIcon>
                        <ListItemText primary="Order History" />
                    </ListItem>
                    <ListItem button selected={selectedPage === PAGES.neworder.id} onClick={e => navigateTo(PAGES.neworder)}>
                        <ListItemIcon>
                            <i className="lni lni-add-files"></i>
                        </ListItemIcon>
                        <ListItemText primary="New Order" />
                    </ListItem>
                </div>
                <div className="sb-footer">
                    <ListItem button onClick={e => logout()}>
                        <ListItemIcon>
                            <i className="lni lni-exit"></i>
                        </ListItemIcon>
                        <ListItemText primary="Log out" />
                    </ListItem>
                </div>
            </Drawer>
        </>
    );
}

export default withRouter(Sidebar);