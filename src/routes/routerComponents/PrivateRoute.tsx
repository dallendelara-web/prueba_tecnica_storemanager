import React from 'react';
import { Navigate, useLocation, Outlet  } from 'react-router';
import { useAuth } from '../../Context/AuthContextUser';
import { useEffect } from "react";

const PrivateRoute = ({ children }: { children: any }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();
  useEffect(() => {
    console.log(user);
  }, );

  if ( user==null && isLoading == false ) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
