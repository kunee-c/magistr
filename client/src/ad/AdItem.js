/**
 * Created by kunee on 21/04/2019.
 */
/**
 * Created by kunee on 03/04/2019.
 */
import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import {Typography, Button, Icon} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

import {
    withRouter
} from 'react-router-dom';

const AdItem = props => {

    const {ad, user} = props;

    const handleClickDetail = () => {
        props.history.push({pathname:`/ads/${ad._id}`})
    }
    return (
        <Paper style={{height:90}}>
            <Grid container alignItems="center" spacing={16}>
                <Grid item xs={2}>
                    <Avatar alt="Picture"
                            src={ad.teacher.picture}
                            style={{width: 55, height: 55, marginLeft: 10}}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">
                        {ad.teacher.firstName}
                    </Typography>
                    <Typography ariant="caption" gutterBottom>
                        {ad.title}
                    </Typography>
                    <Typography variant="body1">
                        {ad.description}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <div>
                    <Typography variant="h6" inline gutterBottom >
                        ${ad.price}

                    </Typography >
                    { ad.isFirstLessonFree &&
                    <Typography variant="caption" color="secondary" style={{marginLeft:10}} inline>First lesson free!</Typography>}
                    </div>
                    <Button variant="contained" color="secondary"  onClick={handleClickDetail}>
                        Book a lesson
                    </Button>


                </Grid>
            </Grid>
        </Paper>)
}

export default withRouter(AdItem);