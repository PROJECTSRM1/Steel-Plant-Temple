import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>

        <form>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>

        <div className="forgot">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>

        <div className="back-to-login">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
