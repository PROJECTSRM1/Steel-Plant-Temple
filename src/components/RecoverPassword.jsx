import React from 'react';
import { Link } from 'react-router-dom';
import './login.css'; // Assuming you reuse the same CSS file for consistent styling


const RecoverPassword = () => {
  // Function to handle form submission (e.g., sending the recovery email)
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle the API call here
    console.log("Recovery email submitted.");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        {/* Title and prompt */}
        <div class="v-stack gap-4">
        <h3>RECOVER PASSWORD</h3>
        <p>Enter your email to recover your password:</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Email Input Field */}
          <input 
            type="E-mail" 
            placeholder="E-mail" 
            required 
          />
          
          {/* Recover Button */}
          <button type="submit">RECOVER</button>
        </form>

        {/* Back to Login Link */}
        <div className="back-to-login">
          Remember your password? 
          {/* Use Link to navigate back to the login route */}
          <Link to="/login">Back to login</Link>
        </div>

      </div>
    </div>
  );
};

export default RecoverPassword;