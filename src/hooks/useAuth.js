// useAuth.js
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/UserService";
import { jwtDecode } from "jwt-decode";
import { useSnack } from "../providers/SnackbarProvider";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token ? jwtDecode(token) : null;
  });
  const navigate = useNavigate();
  const setSnack = useSnack();

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
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        setSnack('success', 'Login successful!');
        return true;
      }
      return false;
    } catch (err) {
      setError(err.message || "Login failed");
      setSnack('danger', `Login failed: ${err.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, setSnack]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    setSnack('info', 'Logged out successfully');
    navigate("/");
    window.location.reload(); 
  }, [navigate, setSnack]);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token && !user) {
      setUser(jwtDecode(token));
    }
  }, [user]);

  return {
    isLoading,
    error,
    user,
    setUser,
    isLoggedIn: !!user,
    handleLogin,
    handleLogout
  };
};