import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';

import { Email, Person } from '@material-ui/icons';
import { SnackBarContext } from '../../../../contexts';
import schema from './validarion';
import callApi from '../../../../lib/utils/api';

class EditDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      touched: {
        name: false,
        email: false,
      },
      loader: false,
    };
  }

  handleNameValue = (event) => {
    const { details } = this.props;
    const { email, touched } = this.state;
    if (email === '') {
      this.setState({
        email: details.email,
      });
    }
    this.setState({
      name: event.target.value,
      touched: {
        ...touched,
        name: true,
      },
    });
  }

  handleEmailValue = (event) => {
    const { details } = this.props;
    const { name, touched } = this.state;
    if (name === '') {
      this.setState({
        name: details.name,
      });
    }
    this.setState({
      email: event.target.value,
      touched: {
        ...touched,
        email: true,
      },
    });
  }

  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
    return '';
  };

  hasErrors = () => {
    const { state } = this;
    try {
      schema.validateSync(state);
    } catch (err) {
      return true;
    }
    return false;
  }

  handleButtonError = () => {
    if (this.hasErrors()) {
      return false;
    }
    return true;
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  isValid = (item) => {
    const { state } = this;
    const { touched } = state;

    if (touched[[item]] === false) {
      return false;
    }
    return this.hasErrors();
  }

  onSubmit = async (event, openSnackBar) => {
    event.preventDefault();
    const { onSubmit, details, onClose } = this.props;
    const { name, email } = this.state;
    const header = localStorage.getItem('token');
    const { id } = details;
    this.setState({ loader: true });
    const dataToUpdate = {
      name,
      email,
    };
    if (name === details.name) {
      delete dataToUpdate.name;
    }
    if (email === details.email) {
      delete dataToUpdate.email;
    }
    await callApi('/trainee/update', 'PUT', { id, dataToUpdate }, header)
      .then((res) => {
        openSnackBar(res.data.message, 'success');
        this.setState({
          buttonEnable: false,
          name: '',
          email: '',
          touched: {
            name: false,
            email: false,
          },
        });
        onSubmit();
      })
      .catch((err) => {
        openSnackBar(err.response.data.err, 'error');
      });
    onClose();
    this.setState({ loader: false });
  }

  render() {
    const { editOpen, onClose, details } = this.props;
    const { loader } = this.state;
    return (
      <SnackBarContext.Consumer>
        {
          (openSnackBar) => (
            <Dialog open={editOpen} onClose={this.handleClose}>
              <DialogTitle>Edit Trainee</DialogTitle>
              <DialogContent>
                <DialogContentText>Enter your trainee details</DialogContentText>
                <TextField
                  label="Name"
                  defaultValue={details.name}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleNameValue}
                  onBlur={() => this.isTouched('name')}
                  helperText={this.getError('name')}
                  error={this.isValid('name')}
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
                  onChange={this.handleEmailValue}
                  onBlur={() => this.isTouched('email')}
                  helperText={this.getError('email')}
                  error={this.isValid('email')}
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
                {
                  loader ? (
                    <Button variant="contained" disabled>
                      <CircularProgress size={20} />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(event) => this.onSubmit(event, openSnackBar)}
                      disabled={!(this.handleButtonError())}
                    >
                      Submit
                    </Button>
                  )
                }
              </DialogActions>
            </Dialog>
          )
        }
      </SnackBarContext.Consumer>
    );
  }
}

EditDialog.propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func,
  editOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
};

EditDialog.defaultProps = {
  onClose: () => {},
  onSubmit: () => {},
  editOpen: false,
};

export default EditDialog;