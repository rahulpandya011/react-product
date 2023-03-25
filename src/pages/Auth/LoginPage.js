import { useState } from 'react';
import { Form, InputGroup, FormControl, Button, Row, Col, Container } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import { useAdminLogin } from '../../hooks';
import { loginSuccess } from '../../store/features/authSlice';
import { setAuthToken } from '../../libs/HttpClient';
import './Login.css';
import validationSchema from './LoginValidation';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRevealPwd, setIsRevealPwd] = useState();

  const { mutate: doLogin, isLoading } = useAdminLogin((res) => {
    const dataStore = {
      userData: res.data,
      isLoggedIn: true,
      accessToken: res.data.access_token,
    };
    dispatch(loginSuccess(dataStore));
    setTimeout(function () {
      setAuthToken(res.data.access_token);
      navigate('/dashboard');
    }, 1500);
    toast.success(res.message);
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      doLogin(values);
    },
  });

  return (
    <Container>
      <div className="login">
        <h1>Login</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col xs={3}></Col>
            <Col xs={6} className="text-start">
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="mt-1 field-label">Email</Form.Label>
                <Form.Control
                  className={
                    'form-field ' +
                    (formik.touched.email && formik.errors.email
                      ? 'form-field-error'
                      : formik.touched.email && !formik.errors.email
                      ? 'form-field-success'
                      : '')
                  }
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <div className="form-field-error-text">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
              </Form.Group>

              <div>
                <Form.Label className="field-label field-label-top">Password</Form.Label>
                <InputGroup className="form-group-field">
                  <FormControl
                    className={
                      '' +
                      (formik.touched.password && formik.errors.password
                        ? 'form-field-error'
                        : formik.touched.password && !formik.errors.password
                        ? 'form-field-success'
                        : '')
                    }
                    name="password"
                    placeholder="Enter Password"
                    autoComplete="off"
                    type={isRevealPwd ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <InputGroup.Text
                    className={
                      '' +
                      (formik.touched.password && formik.errors.password
                        ? 'form-field-error'
                        : formik.touched.password && !formik.errors.password
                        ? 'form-field-success'
                        : '')
                    }>
                    <FontAwesomeIcon
                      onClick={() => setIsRevealPwd((prevState) => !prevState)}
                      icon={isRevealPwd ? faEye : faEyeSlash}
                    />
                  </InputGroup.Text>
                </InputGroup>
                <div className="form-field-error-text">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className="primary-button mt-2 text-center">
                <Button disabled={isLoading} type="submit">
                  Login
                </Button>
              </div>
            </Col>
            <Col xs={3}></Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
