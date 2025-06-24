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
    const role = localStorage.getItem("role");

    if (loggedIn === "true") {
      if (role == "admin") {
        // window.location.href = `${BaseURL}/admin`;
        navigate("/home", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${BaseURL}/api/auth/login/`, {
        username,
        password,
      });

      if (response.status === 200) {
        const {
          access,
          refresh,
          username: responseUsername,
          role,
        } = response.data;

        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", responseUsername);
        localStorage.setItem("role", role);

        if (role === "admin") {
          // window.location.href = `${BaseURL}/admin`;
          navigate("/home", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
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
              disabled={loading}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              name="password"
              placeholder="Password"
              required
              disabled={loading}
            />
            <button
              className="form-control"
              type="submit"
              disabled={loading || !username.trim() || !password.trim()}
            >
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
