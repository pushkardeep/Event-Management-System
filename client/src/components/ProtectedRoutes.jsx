import React from "react";

import { Navigate } from "react-router";

function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to={"/sign_in"} />;
}

export default ProtectedRoutes;
