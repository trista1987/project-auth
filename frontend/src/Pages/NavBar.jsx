import "./NavBar.css";
import { useNavigate } from "react-router-dom";

export const NavBar = ({ checkAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Net-Token");
    navigate("/login");
  };

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-logo">Authentication</div>
      <ul className="nav-links">
        <li>
          <a href="/login">Home</a>
        </li>
        {!checkAuth() && (
          <>
            <li>
              <a href="/signup">Sign up</a>
            </li>

            <li>
              <a href="/login">Login</a>
            </li>
          </>
        )}
      </ul>
      {checkAuth() && (
        <button
          onClick={handleLogout}
          className="logout-btn">
          Logout
        </button>
      )}
    </nav>
  );
};
