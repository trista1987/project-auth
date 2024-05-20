import "./Login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInfo = {
      username: "kminchelle",
      password: "0lelplR",
    };
    const { data } = await axios.post(
      "https://dummyjson.com/auth/login",
      userInfo
    );
    localStorage.setItem("Net-Token", data.token);
    navigate("/");
  };
  useEffect(() => {
    if (localStorage.getItem("Net-Token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit} className="login-form flex flex-col">
        <img src="/public/login.png" className="login-icon" />
        <h2>Sign up / Login</h2>
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
      <p>Haven't signed up yet？Click here to sign up</p>
    </>
  );
};
