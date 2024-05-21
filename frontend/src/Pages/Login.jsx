import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInfo = {
      username: email, 
      password: password,
    };

    // Placeholder for actual login via API
    console.log("Login attempt:", userInfo);
    // Assume login is successful and we get a token back
    const token = "your-token-here"; // Replace with actual token from your API
    localStorage.setItem("Net-Token", token);
    navigate("/"); // Navigate to homepage or dashboard as needed
  };

  useEffect(() => {
    // Redirect if user is already logged in
    if (localStorage.getItem("Net-Token")) {
      navigate("/");
    }
  }, [navigate]); // Added dependency to useEffect

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <img src="/public/login.png" className="login-icon" alt="Login Icon" />
        <h2>Login</h2>
        <div>
          <label htmlFor="email">Account：</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password：</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>
        Haven't signed up yet？Click <a href="/signup">here</a> to sign up
      </p>
    </>
  );
};
