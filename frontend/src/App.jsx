import { Login } from "./Pages/Login";
import { NavBar } from "./Pages/NavBar";
import { BrowserRouter } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Login />
    </BrowserRouter>
  );
};
