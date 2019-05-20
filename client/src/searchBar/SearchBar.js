/**
 * Created by kunee on 21/04/2019.
 */
import React, { Component } from 'react';
import {
    IconButton,
    Grid,
    Button
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import AutoSuggest from  '../autoSuggest/AutoSuggest';

import {
    withRouter
} from 'react-router-dom';

class SearchBar extends Component {

    state = {
        queryParams: {}
    }

    handleSearch = async() => {
        this.checkParams();

        if(this.state.queryParams.topic && this.state.queryParams.location) {


            this.setState({formErr: false});

            const queryParams = this.buildQueryParams(this.state.queryParams);

            const resAd = await fetch(`/api/ads?${queryParams}`);
            const ads = await resAd.json();

            const adsWithUser = ads.map(async ad => {
                const resUser = await fetch(`/api/users/${ad.user}`);
                const user = await resUser.json();
                ad.teacher = user;
                return ad;
            });

            Promise.all(adsWithUser).then(adsWithUserCompleted => {
                this.setState({
                    ads: adsWithUserCompleted
                });
                this.props.updateAds(adsWithUserCompleted);
                this.props.history.push({pathname:'/results', state:  {queryParams: this.state.queryParams}})
            });
        } else {
            this.setState({formErr: true});
        }

    }
    checkParams = () => {
        if(!this.state.queryParams.topic) {
            this.setState({formErrTopic: true});
        }

        if(!this.state.queryParams.location) {
            this.setState({formErrLocation: true});
        }
    }


    handleChangeSearchDialog = name => value => {
        this.setState({formErrTopic: false});
        this.setState({formErrLocation: false});

        let tmpQueryParams = this.state.queryParams;
        tmpQueryParams[name] = value;
        this.setState({queryParams: tmpQueryParams});
    }

    buildQueryParams = (filters) => {
        let queryParams = "";
        for (let filter in filters) {
            if (filters[filter] !== false)
                queryParams += `${[filter]}=${filters[filter]}&`
        }
        return queryParams;
    }

    keyup = (event) => {
        if(event.keyCode === 13)
            this.handleSearch();
    }


    render() {

        const theme = {
            container:                'react-autosuggest__container',
            containerOpen:            'react-autosuggest__container--open',
            input:                    'react-autosuggest__input',
            inputOpen:                'react-autosuggest__input--open',
            inputFocused:             'react-autosuggest__input--focused',
            suggestionsContainer:     'react-autosuggest__suggestions-container',
            suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
            suggestionsList:          'react-autosuggest__suggestions-list',
            suggestion:               'react-autosuggest__suggestion',
            suggestionFirst:          'react-autosuggest__suggestion--first',
            suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
            sectionContainer:         'react-autosuggest__section-container',
            sectionContainerFirst:    'react-autosuggest__section-container--first',
            sectionTitle:             'react-autosuggest__section-title'
        }

        const theme_err = {
            container:                'react-autosuggest__container',
            containerOpen:            'react-autosuggest__container--open',
            input:                    'react-autosuggest__input_err',
            inputOpen:                'react-autosuggest__input--open',
            inputFocused:             'react-autosuggest__input--focused',
            suggestionsContainer:     'react-autosuggest__suggestions-container',
            suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
            suggestionsList:          'react-autosuggest__suggestions-list',
            suggestion:               'react-autosuggest__suggestion',
            suggestionFirst:          'react-autosuggest__suggestion--first',
            suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
            sectionContainer:         'react-autosuggest__section-container',
            sectionContainerFirst:    'react-autosuggest__section-container--first',
            sectionTitle:             'react-autosuggest__section-title'
        }

        const {getCities, getTopics, direction} = this.props;
        return (
            <form noValidate autoComplete="off" onKeyUp={this.keyup}>
                <Grid container spacing={8} direction={direction}>
                    <Grid item xs>
                        <AutoSuggest placeholder="topic" theme={this.state.formErrTopic ? theme_err : theme} handleChange={this.handleChangeSearchDialog('topic')} data={getTopics()}/>
                    </Grid>
                    <Grid item xs>
                        <AutoSuggest placeholder="city" theme={this.state.formErrLocation ? theme_err : theme} handleChange={this.handleChangeSearchDialog('location')} data={getCities()}/>
                    </Grid>
                    <Grid item xs>
                        <Button variant="outlined" color="primary" style={{width:'100%', height:'100%'}} onClick={this.handleSearch}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </form>)
    }

}

export default withRouter(SearchBar);