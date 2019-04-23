/**
 * Created by kunee on 03/04/2019.
 */
import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {Typography} from '@material-ui/core'

export default props => {

    const { ad } = props;

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2015/07/28/22/04/female-865110_1280.jpg"/>
            </ListItemAvatar>
            <ListItemText
                primary={ad.title}
                secondary={
                    <React.Fragment>
                        <Typography component="span" color="textPrimary">
                            {ad.user}
                        </Typography>
                        {ad.description}
                    </React.Fragment>
                }
            />
        </ListItem>)
}