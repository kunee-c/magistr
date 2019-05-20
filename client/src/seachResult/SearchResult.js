/**
 * Created by kunee on 21/04/2019.
 */
import React, {Component} from 'react';

import {
    Grid,
    Divider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography
} from '@material-ui/core'
import AdItem from '../ad/AdItem';
import SearchBar from '../searchBar/SearchBar';

class SearchResult extends Component {

    state = {
        isFirstLessonFree: false
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
        this.props.handleChange(name)(event.target.checked);
    };

    componentDidMount() {

    }

    render() {

        const {getCities, getTopics, classes, ads, updateAds} = this.props;

        return (
            <Grid container style={{marginTop: '25px'}} justify="space-around" spacing={0}>
                <Grid item xs={3}>
                    <SearchBar classes={classes} getCities={getCities} getTopics={getTopics} updateAds={updateAds} direction="column"/>
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={24} direction="column" >
                        {
                            ads.length === 0 && <Grid item xs={12}><Typography align ="center" variant="h5" color="error">No results</Typography></Grid>
                        }
                        {
                            ads.map(ad => (
                                <Grid item xs={12}>
                                    <AdItem ad={ad}/>
                                </Grid>))
                        }
                    </Grid>
                </Grid>
            </Grid>)
    }
}

export default SearchResult;