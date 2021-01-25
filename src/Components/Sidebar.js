import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { 
    Drawer, Divider,
    ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// icons
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: "flex"
  },
  docked: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  mainDrawerItems: {
      flexGrow: 1,
      marginTop: "10px"
  }
}));

const PAGES = Object.freeze({
    profile: {
        id: 0,
        route: '/profile'
    },
    dashboard: {
        id: 1,
        route: '/main2'
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
    const screenX = window.screen.width;

    const [selectedPage, setSelectedPage] = useState(-1);

    const classes = useStyles();

    useEffect(function() {
        let pathname = window.location.pathname;
        if (pathname === PAGES.dashboard.route){
            setSelectedPage(PAGES.dashboard.id);
        } else if (pathname === PAGES.profile.route){
            setSelectedPage(PAGES.profile.id);
        } else if (pathname === PAGES.orders.route){
            setSelectedPage(PAGES.orders.id)
        } else if (pathname === PAGES.neworder.route){
            setSelectedPage(PAGES.neworder.id)
        }
    }, [])

    function navigateTo(link){
        props.history.push(link);
    }

    function logout(){
        alert("Logout");
    }

    return (
        <>
            <Drawer 
                variant="permanent" 
                anchor="left" 
                className={classes.drawer} 
                classes={{ paper: classes.drawerPaper, docked: classes.docked }}
            >
                <div>
                    <ListItem button selected={selectedPage === PAGES.profile.id} onClick={e => navigateTo("/profile")}>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                </div>

                <Divider />

                <div className={classes.mainDrawerItems}>
                    <ListItem button selected={selectedPage === PAGES.dashboard.id} onClick={e => navigateTo("/main2")}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>

                    <ListItem button selected={selectedPage === PAGES.orders.id} onClick={e => navigateTo("/orders")}>
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Order History" />
                    </ListItem>

                    <ListItem button selected={selectedPage === PAGES.neworder.id} onClick={e => navigateTo("/neworder")}>
                        <ListItemIcon>
                            <AddBoxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="New Order" />
                    </ListItem>
                </div>
                

                <div>
                    <ListItem button onClick={e => logout()}>
                        <ListItemIcon>
                            <ExitToAppIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </div>

            </Drawer>
        </>
    );
}

export default withRouter(Sidebar);