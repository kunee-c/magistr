/**
 * Created by kunee on 18/04/2019.
 */
import React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


export default props => {
    const { btnclass, login } = props;
    return(
    <AppBar position="static">
        <Toolbar>
            <IconButton className={btnclass.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={btnclass.grow}>

            </Typography>
            <Button color="inherit" onClick={login}>Login</Button>
        </Toolbar>
    </AppBar>)
}
