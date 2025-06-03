import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseURL from "../../API/BaseURLS.JS";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   navigate("/login", { replace: true });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${BaseURL}/api/auth/login/`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 2000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError("Access denied! Only superusers can log in.");
      } else {
        setTimeout(() => {
          setError("Invalid credentials or server error.");
        }, 2000);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="Login">
      <div className="login-form">
        <div className="logo-section">
          <img src="/assets/logo-fav.png" alt="Logo" />
        </div>
        <div className="form-section">
          <h2>Log In</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              name="username"
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              name="password"
              placeholder="Password"
              required
            />
            <button className="form-control" type="submit" disabled={loading}>
              {loading ? (
                <div className="spinner-container">
                  <span className="spinner"></span>
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
