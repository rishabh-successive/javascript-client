import React from 'react';
import PropTypes from 'prop-types';
import { style, color } from './style';

const SelectField = (props) => {
  const {
    options,
    defaultText,
    value,
    onChange,
    onBlur,
    error,
  } = props;
  return (
    <>
      <select style={style} onChange={onChange} onBlur={onBlur}>
        <option value={value} key={{}}>{defaultText}</option>
        { options.map((item) => <option key={item.label} value={item.value}>{item.label}</option>)}
      </select>
      {error &&(<span style={color}>{error}</span>)}
    </>
  );
};
SelectField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  defaultText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};
SelectField.defaultProps = {
  error: '',
  defaultText: 'Select',
  options: [],
  onBlur: () => {},
};
export default SelectField;