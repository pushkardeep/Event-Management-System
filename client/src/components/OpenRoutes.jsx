import React from "react";
import { Navigate } from "react-router";

function OpenRoutes({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to={"/"} /> : children;
}

export default OpenRoutes;
