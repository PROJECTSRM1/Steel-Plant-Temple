// src/components/DonationCard.js
import React from 'react';

// Card component to display individual donation schemes
const DonationCard = ({ id, title, amount, description, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect(id, amount);
  };

  return (
    <div
      // Use a CSS class for styling the selected state
      className={`donation-card ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      aria-label={`Select ${title} donation scheme`}
    >
      <h3 className="card-title">{title}</h3>
      <p className="card-amount">
        Suggested Offering: **₹{amount.toLocaleString()}**
      </p>
      <p className="card-description">{description}</p>
      <div className="card-action-indicator">
        {isSelected ? 'SELECTED ✅' : 'Click to Select'}
      </div>
    </div>
  );
};

export default DonationCard;

// Note: The specific CSS styles for `.donation-card`, `.selected`, etc.,
// would be defined in your main CSS file (e.g., Donations.css).