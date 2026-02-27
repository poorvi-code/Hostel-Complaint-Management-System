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
    <div className="min-h-screen bg-[#f8fafc] selection:bg-blue-100 selection:text-blue-700 relative overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-50/50 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow">
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
        </main>

        <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-100 bg-white/50 backdrop-blur-sm">
          <p>© {new Date().getFullYear()} HostelOps Management System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
