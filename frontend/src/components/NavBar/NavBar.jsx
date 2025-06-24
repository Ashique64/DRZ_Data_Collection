import React from "react";
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="/assets/logo.png" alt="Logo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navMenu"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Status
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Received
              </a>
            </li>
          </ul>

          <button onClick={handleLogout} className="btn btn-outline-light logout-btn ms-lg-3">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
