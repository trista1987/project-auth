// import "./NavBar.css";
// import { useNavigate } from "react-router-dom";

// export const NavBar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("Net-Token");
//     navigate("/login");
//   };
//   return (
//     <nav className="navbar-wrapper">
//       <div className="navbar-logo">Authentication</div>
//       <ul className="nav-links">
//         <li>
//           <a href="/login">Home</a>
//         </li>
//         <li>
//           <a href="/signup">Sign up</a>
//         </li>
//         <li>
//           <a href="/login">Login</a>
//         </li>
//       </ul>
//       <button onClick={handleLogout} className="logout-btn">Logout</button>
//     </nav>
//   );
// };

import "./NavBar.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Net-Token");
    setIsLoggedIn(!!token); // Set to true if token exists, otherwise false
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Net-Token");
    setIsLoggedIn(false); // Update login status
    navigate("/login");
  };

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-logo">Authentication</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        {!isLoggedIn && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      {isLoggedIn && (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      )}
    </nav>
  );
};
