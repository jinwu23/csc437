import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

import { JwtPayload, jwtDecode } from "jwt-decode";

import MainLayout from "./MainLayout";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/CreateAccount";
import PastEvents from "./pages/PastEvents";
import { ProtectedRoute } from "./ProtectedRoute";

interface CustomJwtPayload extends JwtPayload {
  username: string;
}

function App() {
  const [accountName, setAccountName] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(authToken);
        setAccountName(decoded.username);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [authToken]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute authToken={authToken}>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute authToken={authToken}>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute authToken={authToken}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/past-events"
          element={
            <ProtectedRoute authToken={authToken}>
              <PastEvents />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Route>
    </Routes>
  );
}

export default App;
