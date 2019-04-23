/**
 * Created by kunee on 21/04/2019.
 */
import React from 'react';

import {
    TextField,
    Grid,
    Divider,
    FormGroup,
    FormControlLabel,
    FormControl,
    Checkbox
} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import AdItem from '../ad/AdItem';


export default props => {

    let city, topic;

    const {classes, ads, handleChange, handleSearch} = props;
    return (
        <Grid container style={{marginTop: '30px'}} justify="center" spacing={16}>
            <Grid item xs={4}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={false} value=""/>
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
                </FormControl>
                <Divider variant="middle"/>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="standard-name"
                        label="Topic"
                        value={topic}
                        margin="normal"
                        onChange={handleChange('topic')}
                        style={{width: '80%'}}
                    />
                    <TextField
                        id="standard-name"
                        label="City"
                        value={city}
                        margin="normal"
                        onChange={handleChange('city')}
                        style={{width: '80%'}}
                    />

                    <Button variant="outlined" color="primary" onClick={handleSearch} style={{marginTop: 30, width: '80%'}}>
                        Search
                    </Button>

                </form>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={24} direction="column">
                    {
                        ads.map(ad => (<Grid item xs={12}><AdItem ad={ad}/></Grid>))
                    }
                </Grid>
            </Grid>
        </Grid>);
}