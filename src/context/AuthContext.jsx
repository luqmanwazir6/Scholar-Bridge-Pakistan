import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService";
import { initDemoData } from "../services/storageHelper";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize demo data and restore current session
  const refreshUser = useCallback(async () => {
    try {
      initDemoData();
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      console.error("Failed to load user session:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    
    // Listen for global reset events
    const handleReset = () => {
      refreshUser();
    };
    window.addEventListener("sbp_data_reset", handleReset);
    return () => window.removeEventListener("sbp_data_reset", handleReset);
  }, [refreshUser]);

  const login = async (email, password, role) => {
    const res = await authService.login(email, password, role);
    if (res.success) {
      setCurrentUser(res.user);
    }
    return res;
  };

  const loginAsDemoStudent = async () => {
    const user = await authService.loginAsDemoStudent();
    setCurrentUser(user);
    return user;
  };

  const loginAsDemoAdmin = async () => {
    const user = await authService.loginAsDemoAdmin();
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const register = async (regData) => {
    const res = await authService.register(regData);
    if (res.success) {
      setCurrentUser(res.user);
    }
    return res;
  };

  const updateProfile = async (updates) => {
    if (!currentUser) return;
    const res = await authService.updateProfile(currentUser.id, updates);
    if (res.success) {
      setCurrentUser(res.user);
    }
    return res;
  };

  const role = currentUser?.role || "guest";
  const isAuthenticated = !!currentUser;
  const isStudent = role === "student";
  const isAdmin = role === "admin";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isAuthenticated,
        isStudent,
        isAdmin,
        loading,
        login,
        loginAsDemoStudent,
        loginAsDemoAdmin,
        logout,
        register,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
