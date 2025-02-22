import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!user && !user.email) {
    return <Navigate to={"/auth"}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
