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

import {unstable_useMediaQuery as useMediaQuery} from '@material-ui/core/useMediaQuery';

import {
    withRouter
} from 'react-router-dom';

const AdItem = props => {

    let itemHeight;

    if (useMediaQuery('(max-width:600px)'))
        itemHeight = 110;
    else
        itemHeight = 90;

    const {ad, user} = props;

    const handleClickDetail = () => {
        props.history.push({pathname: `/ads/${ad._id}`})
    }
    return (
        <Paper style={{height: itemHeight}}>
            <Grid container alignItems="center" spacing={16}>
                <Grid item xs={8}>
                    <div style={{float: 'left', marginRight: 15}}>
                        <Avatar alt="Picture"
                                src={ad.teacher.picture}
                                style={{width: 55, height: 55, marginLeft: 10}}/>
                    </div>
                    <div>
                        <Typography variant="h6">
                            {ad.teacher.firstName}
                        </Typography>
                        <Typography ariant="caption" gutterBottom>
                            {ad.title}
                        </Typography>
                        <Typography variant="body1" wrap="nowrap">
                            {ad.description}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={4} sm={4}>
                    <div>
                        <Typography variant="h6" inline gutterBottom>
                            ${ad.price}
                        </Typography >

                        { ad.isFirstLessonFree &&

                        <Typography variant="caption" color="secondary" style={{marginLeft: 5}} inline={useMediaQuery('(min-width:600px)')}>
                            <sup>1<sup>st</sup> lesson free!</sup>
                        </Typography>}
                    </div>
                    <div style={{marginRight: 10}}>
                        <Button variant="contained" color="secondary" fullWidth onClick={handleClickDetail}>
                            {useMediaQuery('(max-width:600px)') ? 'Book' : 'Book a lesson'}
                        </Button>
                    </div>

                </Grid>
            </Grid>
        </Paper>)
}

export default withRouter(AdItem);