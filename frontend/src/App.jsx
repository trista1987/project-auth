import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { NavBar } from "./Pages/NavBar";
import { HomePage } from "./Pages/HomePage";

// Check if Net-Token in local storage is not empty
const checkAuth = () => {
  const isLoggedin = localStorage.getItem("Net-Token") !== null;
  return isLoggedin;
};

export const App = () => {
  return (
    <BrowserRouter>
      <>
        <NavBar checkAuth={checkAuth} />
        <Routes>
          <Route
            path="/"
            element={<HomePage checkAuth={checkAuth} />}
          />
          <Route
            path="/login"
            element={
              checkAuth() ? (
                <Navigate
                  replace
                  to="/"
                />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/signup"
            element={
              checkAuth() ? (
                <Navigate
                  replace
                  to="/"
                />
              ) : (
                <Signup />
              )
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  );
};
