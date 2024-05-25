import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { NavBar } from "./Pages/NavBar";
import { HomePage } from "./Pages/HomePage";

const checkAuth = () => {
  return localStorage.getItem("Net-Token") != null;
};

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={checkAuth() ? <Navigate replace to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={checkAuth() ? <Navigate replace to="/" /> : <Signup />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
