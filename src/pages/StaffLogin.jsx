import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StaffLogin() {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "ayyappa123") {
      navigate("/week/update");
    } else {
      setErrorMsg("Invalid password!");
    }
  };

  return (
    <div className="staff-login-page">
      <h2>Temple Staff Login</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default StaffLogin;
