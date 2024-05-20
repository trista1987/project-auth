import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar-wrapper">
      <div className="navbar-logo">Authentication</div>
      <ul className="nav-links">
        <li>
          <a href="/login">Home</a>
        </li>
        <li>
          <a href="/signup">Sign up</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};
