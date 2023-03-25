import * as Yup from 'yup';
let validationSchema = Yup.object({
  email: Yup.string('Email is required')
    .email('Email should be Email')
    .required('Email is required'),
  password: Yup.string('Password is required').required('Password is required'),
});

export default validationSchema;
