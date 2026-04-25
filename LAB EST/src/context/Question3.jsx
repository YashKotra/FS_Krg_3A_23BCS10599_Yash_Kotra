import React, { createContext, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = () => {
    setIsAuthenticated((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function LoginPage() {
  const { isAuthenticated, toggleAuth } = useAuth();

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h2>Login Page</h2>
      <p>
        Current Status:{" "}
        <strong>{isAuthenticated ? "Logged In" : "Logged Out"}</strong>
      </p>
      <button
        onClick={toggleAuth}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        {isAuthenticated ? "Logout" : "Login"}
      </button>
      <p style={{ marginTop: "20px" }}>
        <Link to="/dashboard">Go to Dashboard</Link>
      </p>
    </div>
  );
}

export function DashboardPage() {
  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h2>Dashboard (Protected)</h2>
      <p>This is a protected route. Only visible when logged in.</p>
      <p>You have successfully accessed the dashboard!</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login">Go to Login</Link>
      </div>
    </div>
  );
}

export default AuthContext;
