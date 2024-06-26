import "./Signup.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      name,
      email,
      phone,
      password,
    };

    try {
      const response = await fetch(
        "https://project-auth-3-ueps.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Assuming the server sends back a JSON error message
        throw new Error(errorData.message || "Failed to register");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed: " + error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("Net-Token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <form onSubmit={handleSubmit} className="signup-wrapper">
        <img src="/signup.png" className="signup-icon" alt="Sign Up" />
        <h2>Sign Up</h2>
        <div>
          <label htmlFor="name">Name：</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email：</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone：</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
        <div>
          <label htmlFor="confirm-password">Re-enter Password：</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? Click <a href="/login">here</a> to log in.
      </p>
    </>
  );
};
