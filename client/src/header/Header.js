/**
 * Created by kunee on 18/04/2019.
 */
import React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import {Link} from 'react-router-dom';

export default props => {
    const {btnclass, login} = props;
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton className={btnclass.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Link to={`/`}>
                    <HomeIcon color="action"/>
                </Link>
                <Typography variant="h6" color="inherit" className={btnclass.grow}>

                </Typography>
                <Button color="inherit" onClick={login}>Login</Button>
            </Toolbar>
        </AppBar>)
}
