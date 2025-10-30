import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <h3>LOGIN</h3>
        <h5>Enter your email and password to login:</h5>

        <form>
          <input type="email" placeholder="E-mail" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">LOGIN</button>
        </form>

        <div className="forgot">
          <div onClick={() => navigate("/recover")}>Forgot Password?</div>
        </div>

        <div className="signup-link">
          <div onClick={() => navigate("/signup")}>
            Don't have an account? Signup
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
