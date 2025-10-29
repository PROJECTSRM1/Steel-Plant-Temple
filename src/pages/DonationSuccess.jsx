// src/pages/DonationSuccess.js
import React from 'react';


const DonationSuccess = ({ amount, onNewDonation }) => {
    return (
        <section id="donation-success" className="section container success-page">
            <div className="card success-card">
                <span className="success-icon">✅</span>
                <h2>Sankalpa Accepted!</h2>
                <p>
                    Your generous donation of **₹{amount.toLocaleString()}** has been successfully submitted.
                </p>
                <p>
                    May the blessings of Sri Ayyappa Swamy be with you and your family. A receipt for your sacred offering has been sent to your email.
                </p>
                <button 
                    onClick={onNewDonation} 
                    className="button primary-button"
                >
                    Make Another Donation
                </button>
                <p className="small-text">
                    For any queries, please contact us.
                </p>
            </div>
        </section>
    );
};

export default DonationSuccess;