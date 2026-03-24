import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../Context/AuthContextUser';
import { useEffect } from "react";

const PrivateRoute = ({ children }: { children: any }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  useEffect(() => {
    console.log(user);
  }, );

  if (!isAuthenticated && isLoading == false) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
