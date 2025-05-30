import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const RedirectIfAuthenticated = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isLoggedIn) {
        navigate('/espaceClient');
      }
    }, [isLoggedIn, navigate]);
  
    return !isLoggedIn ? children : null;
  };