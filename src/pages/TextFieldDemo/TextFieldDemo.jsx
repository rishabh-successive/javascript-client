import React from 'react';
import { TextField, Slider } from '../../components';

function TextFieldDemo(props) {
  return (
    <fieldset>
      <div>
        <Slider
          banner={
            [
              'load-balancer.png',
              'full-stack-web-development.jpg',
              'js.jpg',
              'dns-server.png',
              'cloud.jpg',
            ]
          }
          altText="Banner"
          duration={1000}
          random={false}
        />
      </div>
      <TextField value="valid text field" onChange={() => {}}  />
      <TextField disabled value="Disabled Input" onChange={() => {}} />
      <TextField value="" error="101" onChange={() => {}} />
    </fieldset>
  );
}

export default TextFieldDemo;