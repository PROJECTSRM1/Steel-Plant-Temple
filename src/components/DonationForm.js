// src/components/DonationForm.js
import React, { useState } from 'react';

const DonationForm = ({ selectedScheme, amount, setAmount, onSubmit, isSubmitting }) => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Display name for the currently selected scheme
  const schemeName = selectedScheme.toUpperCase().replace('-', ' ');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount < 1) {
        alert('Please enter a valid donation amount greater than ₹0.');
        return;
    }
    // Pass all necessary data back to the parent component (DonationsPage)
    onSubmit({ name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form-card">
      <h2>Pledge Your Sacred Offering</h2>
      
      {/* Display the selected scheme */}
      <p className="scheme-display">
        Current Scheme: **{schemeName}**
      </p>

      {/* Amount Input */}
      <div className="form-group">
        <label htmlFor="amount">Donation Amount (₹)</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          min="1"
        />
      </div>

      {/* Donor Details */}
      <div className="form-group">
        <label htmlFor="name">Your Full Name (Sankalpa)</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="For Prasad and blessings"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email (For Receipt)</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="receipt@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number (Optional)</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91-XXXXXXXXXX"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting} 
        className="pay-button"
      >
        {isSubmitting ? 'Processing Payment...' : `Donate ₹${amount.toLocaleString()}`}
      </button>
      
      <p className="security-note">
          **All donations are processed securely via Razorpay/Paytm.**
      </p>
    </form>
  );
};

export default DonationForm;