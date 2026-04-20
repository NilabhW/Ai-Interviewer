import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { InterviewProvider } from "./context/InterviewContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Navbar from "./components/layout/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";
import Interview from "./pages/Interview";
import SessionDetail from "./pages/SessionDetail";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InterviewProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/setup" element={<ProtectedRoute><Setup /></ProtectedRoute>} />
            <Route path="/interview" element={<ProtectedRoute><Interview /></ProtectedRoute>} />
            <Route path="/session/:sessionId" element={<ProtectedRoute><SessionDetail /></ProtectedRoute>} />
          </Routes>
        </InterviewProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}