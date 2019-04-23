import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import {
    Grid,
} from '@material-ui/core'

import CssBaseline from '@material-ui/core/CssBaseline';
import {lime, teal} from '@material-ui/core/colors'


import WordCloud from "react-d3-cloud"

import './App.css';
import Bar from './header/Header';
import AdCategory from './adCategory/AdCategory';
import Login from './login/Login';
import SearchResult from './seachResult/SearchResult';
import SearchBar from './searchBar/SearchBar';
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
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'

    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '45%',
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
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
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    }
};


export default withStyles(styles)(
    class App extends Component {

        state = {
            ads: [],
            loginDialog: false
        }

        async componentDidMount() {
            const response = await fetch(`/api/users`);
            const users = await response.json();
            console.log(users);
        }

        handleLogin = () => {
            this.setState({loginDialog: !this.state.loginDialog})
        }


        handleChange = name => value => {
            this.setState({[name]: value});
        }


        handleSearch = async() => {
            console.log(this.state);
            const resAd = await fetch(`/api/ads?topic=${this.state.topic}&city=${this.state.city}`);
            const ads = await resAd.json();

            const adsWithUser = ads.map(async ad => {
                const resUser = await fetch(`/api/users/${ad.user}`);
                const user = await resUser.json();
                ad.user = user.firstName;
                return ad;
            });

            Promise.all(adsWithUser).then(adsWithUserCompleted => {
                this.setState({
                    ads: adsWithUserCompleted
                });
                console.log(adsWithUserCompleted);
            });

        }

        fetchTopics = () => {

        }

        fetchCity = () => {

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
                                    <Bar login={this.handleLogin} btnclass={classes}/>
                                    <Login open={this.state.loginDialog} handleLogin={this.handleLogin}/>
                                    </>
                                );
                            }}
                        />
                        <Route
                            exact path='/'
                            render={(routeProps) => {
                                return (
                                    <>
                                    <Grid container justify="center" spacing={16}>
                                        <Grid item xs={12}>
                                            <SearchBar classes={classes} handleChange={this.handleChange}
                                                       handleSearch={this.handleSearch}/>

                                        </Grid>
                                    </Grid>
                                    </>
                                );
                            }}
                        />
                        <Route
                            exact path='/'
                            render={(routeProps) => {
                                return (
                                    <>
                                    <Grid container justify="center" spacing={16} alignItems="center"
                                          className={classes.gridListContainer} >
                                        <Grid item ws={12}>
                                            <AdCategory classes={classes}/>
                                        </Grid>

                                    </Grid>
                                    </>
                                )}
                            }/>


                        <Route
                            exact path='/results'
                            render={(routeProps) => {
                                return (
                                    <>
                                    <SearchResult classes={classes} ads={this.state.ads}
                                                  handleChange={this.handleChange} handleSearch={this.handleSearch}/>
                                    </>
                                );
                            }}/>
                    </Router>
                </MuiThemeProvider>
            );
        }
    })