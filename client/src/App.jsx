import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// socket.io
import { socket } from "./socket";
import { listenForResponse } from "./services/socket/socket";

// protectors for routes
import OpenRoutes from "./components/OpenRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";

import EventDashboard from "./pages/EventDashboard";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import CreateEvent from "./pages/CreateEvent";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token || !user) return;
    socket.auth = { token };
    socket.connect();
    listenForResponse(dispatch);

    return () => {
      socket.disconnect();
      socket.off("enrollmentResponse");
    };
  }, [token, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoutes>
              <EventDashboard />
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
