import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { NavBar } from "./Pages/NavBar";

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage /> }
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
