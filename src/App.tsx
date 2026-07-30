/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { Tutor } from "./pages/Tutor";
import { Profile } from "./pages/Profile";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { NotFound } from "./pages/NotFound";
import { MyMaterials } from "./pages/MyMaterials";
import { MyQuizzes } from "./pages/MyQuizzes";
import { MyMindmaps } from "./pages/MyMindmaps";
import { Community } from "./pages/Community";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/tutor" element={
            <ProtectedRoute>
              <Tutor />
            </ProtectedRoute>
          } />
          <Route path="/materials" element={
            <ProtectedRoute>
              <MyMaterials />
            </ProtectedRoute>
          } />
          <Route path="/quizzes" element={
            <ProtectedRoute>
              <MyQuizzes />
            </ProtectedRoute>
          } />
          <Route path="/mindmaps" element={
            <ProtectedRoute>
              <MyMindmaps />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

