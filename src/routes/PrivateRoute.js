import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Row, Col, Container } from 'react-bootstrap';

import { logoutSuccess, loggedUser } from '../store/features/authSlice';

const PrivateRoute = () => {
  // Calling selector hook from redux, to get data from stores, like loader, login info
  const checkLoggenInUser = useSelector(loggedUser);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const doLogout = () => {
    dispatch(logoutSuccess());
    navigate('/login');
    toast.success('Logout Successfully');
  };

  /**
   * Checking if user is registered user or not
   */
  const isAdminLoggedIn = checkLoggenInUser.isAdminLoggedIn;
  return isAdminLoggedIn ? (
    <Container>
      <Row>
        <Col onClick={doLogout} className="text-end">
          Logout
        </Col>
      </Row>
      <Outlet />
    </Container>
  ) : (
    <Navigate
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
};

export default PrivateRoute;
