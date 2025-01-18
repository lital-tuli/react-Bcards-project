import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/UserService";
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!(localStorage.getItem("token") || sessionStorage.getItem("token"));
  });
  const navigate = useNavigate();

  const handleLogin = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await loginUser(
        credentials.email,
        credentials.password,
        credentials.rememberMe
      );

      if (token) {
        setIsLoggedIn(true);
        navigate("/");
        return token;
      }
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  }, [navigate]);

  return {
    isLoading,
    error,
    isLoggedIn,
    handleLogin,
    handleLogout
  };
};