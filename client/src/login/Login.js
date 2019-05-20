/**
 * Created by kunee on 20/04/2019.
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends Component {

    render() {
        const { open, handleClose, handleLogin, handleChange } = this.props;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email"
                            type="email"
                            fullWidth
                            onChange={handleChange('email')}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={handleChange('password')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleLogin} color="primary">
                            Sign in
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}