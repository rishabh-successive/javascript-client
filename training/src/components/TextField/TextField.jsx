/* eslint-disable react/destructuring-assignment */
import React from 'react';
import validField, { errorField, color } from './style';

function TextField(props) {
  if (props.value) {
    return (
      <span>
        A valid TextField:
        <br />
        <input type="text" style={validField} />
        <br />
      </span>
    );
  }
  if (props.disabled) {
    return (
      <span>
        This is a Disabled input:
        <br />
        <input type="text" style={validField} value="Disabled Input" disabled={props.disabled} />
        <br />
      </span>
    );
  }

  if (props.error) {
    return (
      <span>
        An error TextField:
        <br />
        <input type="text" style={errorField} value="101" />
        <br/>
        <span style={ color}>Could not be greater than</span>
      </span>

    );
  }
}
export default TextField;