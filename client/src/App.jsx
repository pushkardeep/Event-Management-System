import React from "react";

import { BrowserRouter, Routes, Route } from "react-router";

import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/sign_in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
