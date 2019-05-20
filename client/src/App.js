import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import {
    BrowserRouter as Router,
    Route,
    withRouter
} from 'react-router-dom';
import {
    Grid,
} from '@material-ui/core'

import CssBaseline from '@material-ui/core/CssBaseline';
import {teal} from '@material-ui/core/colors'


import WordCloud from "react-d3-cloud"

import './App.css';
import Bar from './header/Header';
import AdCategory from './adCategory/AdCategory';
import Login from './login/Login';
import SearchResult from './seachResult/SearchResult';
import SearchBar from './searchBar/SearchBar';
import AdDetail from './ad/AdDetail';

const theme = createMuiTheme({
    palette: {
        primary: teal
    }
})

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        cursor: 'pointer'
    },
    gridListContainer: {
        height: '400px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },

};


export default withStyles(styles)(
    class App extends Component {

        state = {
            ads: [],
            loginDialog: false,
            queryParams: {},
            credentials: {},
            userCity: ''
        }

        async componentDidMount() {
            fetch('/api/geolocation')
                .then(res => res.json())
                .then(geolocation => {
                    this.setState({userCity: geolocation.city})
                })
        }



        handleClickOpen = () => {
            this.setState({loginDialog: !this.state.loginDialog})
        }

        handleLogin = () => {
            fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify(this.state.credentials),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(res => console.log(res)).catch(e => console.log(e));
        }

        handleChangeLoginDialog = name => value => {
            const credentialsTmp = this.state.credentials;
            credentialsTmp[name] = value.target.value;
            this.setState({credentials: credentialsTmp});
        }


        updateAds = (ads) => {
            this.setState({ads: ads});
        }


        getTopics = () => {
            const topics = ['english', 'music', 'cooking', 'math'];
            return topics;
        }

        getCities = () => {
            const cities = ['toronto', 'vancouver', 'montreal', 'missisauga'];
            return cities;
        }

        render() {
            const {classes} = this.props;

            return (
                <MuiThemeProvider theme={theme}>

                    <CssBaseline />

                    <Router className={classes.root}>
                        <Route
                            path='/'
                            render={(routeProps) => {
                                return (
                                    <>
                                    <Bar login={this.handleClickOpen} btnclass={classes}/>
                                    <Login open={this.state.loginDialog} handleClose={this.handleClickOpen}
                                           handleChange={this.handleChangeLoginDialog} handleLogin={this.handleLogin}/>
                                    </>
                                );
                            }}
                        />
                        <Route
                            exact path='/'
                            render={(routeProps) => {
                                return (
                                    <>
                                    <Grid container justify="center" spacing={16} className={classes.gridListContainer}>
                                        <Grid item xs={9} style={{marginTop: 50}}>
                                            <SearchBar
                                                updateAds={this.updateAds} getCities={this.getCities}
                                                getTopics={this.getTopics} direction="row"/>

                                        </Grid>
                                        <Grid item xs={12}>
                                            <AdCategory {...routeProps} classes={classes} location={this.state.userCity} updateAds={this.updateAds}/>
                                        </Grid>
                                    </Grid>
                                    </>
                                );
                            }}
                        />


                        <Route
                            exact path='/results'
                            render={(routeProps) => {
                                return (
                                    <>
                                    <SearchResult {...routeProps} classes={classes} ads={this.state.ads}
                                                  getCities={this.getCities}
                                                  getTopics={this.getTopics}
                                                  updateAds={this.updateAds}/>
                                    </>
                                );
                            }}/>
                        <Route
                            exact path='/ads/:id'
                            render={(routeProps) => {
                                return (
                                    <>
                                    <AdDetail {...routeProps} classes={classes}/>
                                    </>
                                );
                            }}/>
                    </Router>
                </MuiThemeProvider>
            );
        }
    })