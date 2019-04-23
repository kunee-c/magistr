/**
 * Created by kunee on 21/04/2019.
 */
import React from 'react';
import {
    IconButton,
    TextField
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom';
import AutoSuggest from  '../autoSuggest/AutoSuggest';

export default props => {

    const topics = ['language','music'];
    const cities = ['toronto','vancouver','montreal'];
    const {classes, handleChange, handleSearch, value} = props;
    return (
        <form className={classes.container} noValidate autoComplete="off">

            <AutoSuggest placeholder="topic"  handleChange={handleChange('topic')} value={value} data={topics}/>
            <AutoSuggest placeholder="city" handleChange={handleChange('city')} value={value} data={cities}/>

            <IconButton color="inherit" aria-label="Menu">
                <Link to={`/results`} onClick={handleSearch}>
                    <SearchIcon />
                </Link>
            </IconButton>
        </form>)
};