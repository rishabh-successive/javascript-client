import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  InputAdornment,
} from '@material-ui/core';

import { Email, Person } from '@material-ui/icons';

class EditDialog extends Component {
  constructor(props) {
    super(props);
    const { details } = props;
    this.state = {
      name: details.name,
      email: details.email,
      buttonEnable: false,
    };
  }

  handleValue = (item) => (event) => {
    this.setState({
      [item]: event.target.value,
      buttonEnable: true,
    });
  };

  onSubmit = async () => {
    const { onClose } = this.props;
    const { name, email } = this.state;
    const obj = { name, email };
    // eslint-disable-next-line no-console
    await console.log('Editted Item', obj);
    onClose();
    this.setState({ buttonEnable: false });
  }

  render() {
    const { editOpen, onClose, details } = this.props;
    const { name, email } = this.state;
    const { buttonEnable } = this.state;
    return (
      <Dialog open={editOpen} onClose={this.handleClose}>
        <DialogTitle>Edit Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your trainee details</DialogContentText>
          <TextField
            label="Name"
            defaultValue={details.name}
            margin="normal"
            variant="outlined"
            onChange={this.handleValue('name')}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email Address"
            defaultValue={details.email}
            margin="normal"
            variant="outlined"
            onChange={this.handleValue('email')}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.onSubmit}
            disabled={!buttonEnable}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditDialog.propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func,
  editOpen: PropTypes.bool,
};

EditDialog.defaultProps = {
  onClose: () => {},
  editOpen: false,
};

export default EditDialog;