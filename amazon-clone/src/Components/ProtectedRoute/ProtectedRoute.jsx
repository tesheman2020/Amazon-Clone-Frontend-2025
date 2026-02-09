import React, { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const { user } = useContext(DataContext);

  // 1️⃣ Firebase still checking auth
  if (user === undefined) {
    return <h2 style={{ padding: "2rem" }}>Checking authentication...</h2>;
  }

  // 2️⃣ Not logged in
  if (user === null) {
    return <Navigate to="/auth" replace state={{ msg, redirect }} />;
  }

  // 3️⃣ Logged in
  return children;
};

export default ProtectedRoute;
