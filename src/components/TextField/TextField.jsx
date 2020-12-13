
/* eslint-disable no-const-assign */
import React from "react";
import PropTypes from 'prop-types';
import validField, { errorField, color } from "./style";

function TextField(props) {

  const { value, disabled, error, onChange } = props;

  let inputProps = {}
  let heading = '';

  if(value) {
    heading = 'A valid Input'
    inputProps = { style: validField, defaultValue: value, onChange: onChange }
  }
  else if(disabled) {
    heading = 'This is a Disabled Input'
    inputProps = {  value: value, disabled: disabled }
  }
  else if(error) {
    heading = 'An input with errors'
    inputProps = {  style: errorField , value: "101", onChange: onChange }
  }

  return (
    <span>
      <b>{heading}</b>
      <br />
      <input type="text" {...inputProps} />
      <br />
      {error &&(<span style={color}>Could Not be Greater than 100</span>)}
    </span>
  );

}

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  error: '',
  disabled: false,
};
export default TextField;