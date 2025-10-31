import React, { useState } from "react";
import "./SpecialDonationPopup.css";

const DonationPopup = ({ sevaName, onClose }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose({
      sevaName,
      donorName: name,
      amount,
      success: true,
    });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Donate for {sevaName}</h2>
        <p><strong>Temple Account:</strong> Sri Ayyappa Swamy Trust</p>
        <p><strong>Bank:</strong> HDFC Bank, Tirupati</p>
        <p><strong>Account No:</strong> 1234567890 | IFSC: HDFC0000456</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Donation Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <div className="popup-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={() => onClose(null)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationPopup;
