import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

// protectors for routes
import OpenRoutes from "./components/OpenRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import CreateEvent from "./pages/CreateEvent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <OpenRoutes>
              <Register />
            </OpenRoutes>
          }
        />
        <Route
          path="/sign_in"
          element={
            <OpenRoutes>
              <SignIn />
            </OpenRoutes>
          }
        />
        <Route
          path="/create_event"
          element={
            <ProtectedRoutes>
              <CreateEvent />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
