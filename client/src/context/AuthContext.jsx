import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = async () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }

      if (cookies.token) {
        try {
          const res = await verifyTokenRequest(cookies.token);
          if (!res.data) {
            setIsAuthenticated(false);
            setLoading(false);
            return; 
          };

          setIsAuthenticated(true);
          setUser(res.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        }
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
