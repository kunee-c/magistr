/**
 * Created by kunee on 21/04/2019.
 */
import React, {Component} from 'react';

import {
    Grid,
    Divider,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import AdItem from '../ad/AdItem';
import AutoSuggest from '../autoSuggest/AutoSuggest';

class SearchResult extends Component {

    constructor() {
        super();
    }

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
        const topics = ['language', 'music'];
        const cities = ['toronto', 'vancouver', 'montreal'];

        const {ads, handleChange, handleSearch, location} = this.props;


        return (
            <Grid container style={{marginTop: '30px'}} justify="center" spacing={16}>
                <Grid item xs={3}>

                    <form noValidate autoComplete="off" style={{marginTop: -8}}>

                        <div>
                            <AutoSuggest placeholder="topic" handleChange={handleChange('topic')} data={topics}
                                         value={location.state.topic}/>
                        </div>
                        <div style={{marginTop: 15}}>
                            <AutoSuggest placeholder="city" handleChange={handleChange('location')} data={cities}
                                         value={location.state.location}/>
                        </div>

                    </form>

                    <Divider variant="fullWidth" style={{marginTop: 30, marginBottom: 30}}/>
                    <form noValidate autoComplete="off">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={this.state.isFirstLessonFree}
                                              onChange={this.handleChange('isFirstLessonFree')}
                                              value='isFirstLessonFree'/>
                                }
                                label="First lesson free"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={false} value=""/>
                                }
                                label="Skype lesson"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={false}
                                        value=""
                                    />
                                }
                                label="Face to face"
                            />
                        </FormGroup>
                        <Button variant="outlined" color="primary" onClick={handleSearch}
                                style={{marginTop: 30, width: '100%'}}>
                            Search
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={7}>
                    <Grid container spacing={24} direction="column">
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