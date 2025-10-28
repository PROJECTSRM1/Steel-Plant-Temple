// src/components/ThankYouMessage.js
import React from 'react';

const ThankYouMessage = () => {
  return (
    <div className="thank-you-container">
      <h1 className="success-heading">
        Swamiyē Saranam Ayyappā! 🙏
      </h1>
      <p className="success-message">
        Your generous offering has been successfully received. May Lord Ayyappa
        bless you and your family.
      </p>
      <p className="receipt-info">
        A detailed receipt has been sent to your email. Please check your inbox.
      </p>
      
      <a href="/" className="back-button">
        Return to Temple Home
      </a>
    </div>
  );
};

export default ThankYouMessage;