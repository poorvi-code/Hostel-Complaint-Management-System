import React, { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const getStoredUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const rawUser = localStorage.getItem("user");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    return null;
  }
};

const App = () => {
  const [user, setUser] = useState(getStoredUser);

  const defaultRoute = useMemo(() => {
    if (!user) return "/login";
    return user.role === "admin" ? "/admin" : "/student";
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        <Route
          path="/login"
          element={user ? <Navigate to={defaultRoute} replace /> : <LoginPage setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={defaultRoute} replace /> : <RegisterPage setUser={setUser} />}
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute user={user} allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={defaultRoute} replace />} />
      </Routes>
    </div>
  );
};

export default App;
