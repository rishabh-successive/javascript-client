import React from "react";
import { TextField } from "../../components";

function TextFieldDemo(props) {
  return(
    <fieldset>
      <TextField value = "valid text field"/>
      <TextField disabled = { true } />
      <TextField error = "error field"/>
    </fieldset>
  )
}

export default TextFieldDemo