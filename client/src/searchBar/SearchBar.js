/**
 * Created by kunee on 21/04/2019.
 */
import React from 'react';


export default props => {
    const {classes, handleChange, handleSearch} = props;
    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="standard-name"
                label="Topic"
                className={classes.textField}
                value={this.state.topic}
                margin="normal"
                onChange={this.handleChange('topic')}
            />
            <TextField
                id="standard-name"
                label="City"
                className={classes.textField}
                value={this.state.city}
                margin="normal"
                onChange={this.handleChange('city')}
            />
            <IconButton color="inherit" aria-label="Menu">
                <SearchIcon onClick={this.handleSearch}/>
            </IconButton>
        </form>)
};