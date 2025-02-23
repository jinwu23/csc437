import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'

import MainLayout from "./MainLayout";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Events />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

