/**
 * Created by kunee on 21/04/2019.
 */
import React from 'react';
import {
    IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom';
import AutoSuggest from  '../autoSuggest/AutoSuggest';

class SearchBar extends React.Component {

    state = {

    }

    handleChange = name => value => {
        this.props.handleChange(name)(value);
        this.setState({[name] : value});
    }

    render() {
        const topics = ['language', 'music'];
        const cities = ['toronto', 'vancouver', 'montreal'];
        const {classes, handleSearch} = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <div style={{marginRight: 15}}>
                    <AutoSuggest placeholder="topic" handleChange={this.handleChange('topic')} data={topics}/>
                </div>
                <div>
                    <AutoSuggest placeholder="city" handleChange={this.handleChange('location')} data={cities}/>
                </div>
                <IconButton color="inherit" aria-label="Menu">
                    <Link to={{pathname: '/results', state: this.state }} onClick={handleSearch}>
                        <SearchIcon />
                    </Link>
                </IconButton>
            </form>)
    }

}

export default SearchBar;