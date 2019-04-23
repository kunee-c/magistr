/**
 * Created by kunee on 21/04/2019.
 */
/**
 * Created by kunee on 03/04/2019.
 */
import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import {Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default props => {

    const {ad} = props;

    return (
        <Paper>
            <Grid container alignItems="center" spacing={16}>
                <Grid item xs={2}>
                    <Avatar alt="Remy Sharp"
                            src="https://cdn.pixabay.com/photo/2015/07/28/22/04/female-865110_1280.jpg"
                            style={{width:60, height:60}}/>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h6">
                        {ad.user}
                    </Typography>
                    <Typography ariant="caption" gutterBottom>
                        {ad.title}
                    </Typography>
                    <Typography variant="body1">
                        {ad.description}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>
                        $12/h
                    </Typography>
                </Grid>
            </Grid>
        </Paper>)
}