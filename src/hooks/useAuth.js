import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/UserService";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token ? jwtDecode(token) : null;
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
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        return true;  // Return true on success
      }
      return false;
    } catch (err) {
      setError(err.message || "Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);


  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }, [navigate]);

  // Effect to handle token changes
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