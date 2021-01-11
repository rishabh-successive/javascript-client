export const disabledField = {
  padding: '5px',
  width: '94%',
  height: '25px',
};

const validField = {
  ...disabledField,
};

export const color = {
  color: 'red',
};

export const errorField = {
  ...validField,
  border: 'solid red',
};

export default validField;
