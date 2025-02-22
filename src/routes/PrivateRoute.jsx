import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (user && user.email) {
    return children;
  }

  return <Navigate to={"/auth"}></Navigate>;
};

export default PrivateRoute;
