import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const userInfo = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "https://project-auth-3-ueps.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred while logging in.");
      }

      data.token && localStorage.setItem("Net-Token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message); // Displays the error message from the backend
    }
  };

  useEffect(() => {
    if (localStorage.getItem("Net-Token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="login-form">
        <img
          src="/login.png"
          className="login-icon"
          alt="Login Icon"
        />
        <h2>Login</h2>
        <div>
          <label htmlFor="email">Email：</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="name@domain.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password：</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Type your password"
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>
        Have not signed up yet？Click <a href="/signup">here</a> to sign up
      </p>
    </>
  );
};
