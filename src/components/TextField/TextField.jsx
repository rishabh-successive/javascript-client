import React, { Component } from 'react';
import validField, { disabledField, errorField,  } from './style';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.value) {
      return (
        <span>
          <b>A Valid Input</b>
          <br />
          <br />
          <input type="text" style={validField} defaultValue={this.props.value} />
          <br />
        </span>
      );
    }
    else if (this.props.disabled) {
      return (
        <span>
          <b>This is a Disabled Input</b>
          <br />
          <br />
          <input type="text"  value="Disabled Input" disabled={this.props.disabled} />
          <br />
        </span>
      );
    }

    else if (this.props.error) {
      return (
        <span>
          <b>An input with errors</b>
          <br />
          <br />
          <input type="text" style={errorField} value="101" />
          <br />
         
          
        </span>
      );
    }

    return (
      <span />
    );
  }
}

export default TextField;