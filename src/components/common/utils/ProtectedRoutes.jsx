import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for the access token in the cookie
    // const accessToken = Cookies.get("accessToken");

    // Check for the access token in localStorage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      // If the token doesn't exist, redirect to the login page
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
