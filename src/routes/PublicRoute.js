import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { loggedUser } from '../store/features/authSlice';

const PublicRoute = () => {
  const checkLoggenInUser = useSelector(loggedUser);

  /**
   * Checking if user is registered user or not
   */
  const isAdminLoggedIn = checkLoggenInUser.isAdminLoggedIn;
  return !isAdminLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to={{
        pathname: '/dashboard',
      }}
      replace
    />
  );
};

export default PublicRoute;
