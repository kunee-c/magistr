/**
 * Created by kunee on 26/04/2019.
 */
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';

import Grade from '../grade/Grade';

import {
    Grid
} from '@material-ui/core'

import TextField from '@material-ui/core/TextField';
import Map from '../map/Map';
import Button from '@material-ui/core/Button';

import Review from '../review/Review';
import {Link} from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import {unstable_useMediaQuery as useMediaQuery} from '@material-ui/core/useMediaQuery';


class AdDetail extends Component {

    state = {
        teacher: {},
        title: '',
        description: '',
        price: 0,
        reviews: [],
        geolocation: {},
        showReviews: false
    }

    async componentDidMount() {

        const resAd = await fetch(`/api/ads/${this.props.match.params.id}`);
        const ad = await resAd.json();

        const resUser = await fetch(`/api/users/${ad.user}`);
        const teacher = await resUser.json();

        const resReviews = await fetch(`/api/reviews?teacherId=${teacher._id}`);
        const reviews = await resReviews.json();

        const reviewsWithAuthor = reviews.map(async review => {
            const resAuthor = await fetch(`/api/users/${review.author}`);
            const author = await resAuthor.json();
            review.author = author;
            return review;
        });

        Promise.all(reviewsWithAuthor).then(reviewsWithAuthorCompleted => {
            this.setState({
                reviews: reviewsWithAuthorCompleted
            });
        });

        this.setState({
            teacher: teacher,
            title: ad.title,
            descShort: ad.descShort,
            descLong: ad.descLong,
            rate: ad.price,
            geolocation: ad.geolocation,
            reviews: reviews,
            isFirstLessonFree: ad.isFirstLessonFree
        });

    }

    handleReturnClick = () => {
        this.props.history.push({pathname: '/results'});
    }

    handleShowReviews = (event) =>  {
        this.setState({showReviews: !this.state.showReviews})
    }

    render() {
        return (
            <>
            <Grid container justify="center" spacing={16} style={{marginTop: 10, marginLeft: '1%', marginRight: 20}}>
                <Grid item xs={12} sm={6}>
                    <Grid container alignItems="center" spacing={16}>
                        <Grid item xs={12}>
                            <Grid item xs container spacing={16}>
                                <Grid item xs={4}>
                                    <Avatar alt={this.state.teacher.firstName}
                                            src={this.state.teacher.picture}
                                            style={{margin: 10, width: 70, height: 70}}/>
                                    <Typography style={{margin: 15}} variant="overline" inline="true" gutterBottom>
                                        {this.state.teacher.firstName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} style={{textAlign: 'right'}}>
                                    <Button color="primary" onClick={this.handleReturnClick}>
                                        Back to results list
                                    </Button>

                                </Grid>
                                <Grid item xs={12}>
                                    <Typography inline="true" variant="h6" gutterBottom>
                                        {this.state.title}
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom paragraph>
                                {this.state.descShort}
                            </Typography>
                            <Typography variant="body1" gutterBottom paragraph>
                                {this.state.descLong}
                            </Typography>
                            <Typography variant="subtitle1">
                                Rates
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                ${this.state.rate}/hour { this.state.isFirstLessonFree &&
                            <i> (First lesson is free)</i>}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {this.state.reviews.length > 0 && <Grade reviews={this.state.reviews}/>}
                            <Link onClick={this.handleShowReviews}>
                                {`(${this.state.reviews.length} reviews)`}
                            </Link>
                            <Collapse in={this.state.showReviews}>
                                <List>
                                    {this.state.reviews.map(review => <Review
                                        review={review}/>)}
                                </List>
                            </Collapse>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container justify="center" spacing={16}>
                        <Grid item xs={12}>
                            <Map
                                lng={parseFloat(this.state.geolocation.lng)}
                                lat={parseFloat(this.state.geolocation.lat)}
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhQ1WehTR7k0ES075PY5gw4lVW_xLvxPM&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{height: `100%`}}/>}
                                containerElement={<div style={{height: `400px`}}/>}
                                mapElement={<div style={{height: `100%`, width: '90%'}}
                                />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label={"Contact " + this.state.teacher.firstName}
                                multiline
                                rows="5"
                                defaultValue=""
                                margin="normal"
                                variant="outlined"
                                style={{width: '90%'}}
                            />
                            <Button style={{float: 'right', marginRight: '10%'}} color="primary">Send</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </>
        );
    }
}


export default AdDetail;