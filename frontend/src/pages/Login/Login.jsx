import React from "react";
import './Login.scss'

const Login = () => {
  return (
    <div className="Login">
      <div className="login-form">
        <div className="logo-section">
          <img src="/assets/logo-fav.png" alt="Logo" />
        </div>
        <div className="form-section">
          <h2>Log In</h2>

          <form action="">
            <input type="email" className="form-control" name="email" placeholder="E-mail" required/>
            <input type="password" className="form-control" name="password" placeholder="Password" required/>
            <button className="form-control" type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
