import * as yup from 'yup';
const schema = yup.object().shape({
  name: yup.string().required().min(3).label('Name'),
  email: yup.string().email()
    .matches(/^[A-Za-z0-9._%+-]+@successive.tech$/,
      'Invalid Domain')
    .required()
    .label('Email'),
});

export default schema;