// src/pages/DonationsPage.js
import React, { useState } from 'react';
import DonationForm from '../components/DonationForm';

// Static list of available donation schemes
const donationSchemes = [
    { id: 'annadanam', name: 'Annadanam Seva (Food Donation)', description: 'Support the daily feeding of devotees.' },
    { id: 'temple-maintenance', name: 'Temple Maintenance Fund', description: 'Contribute to the upkeep and repair of the temple.' },
    { id: 'goshala-seva', name: 'Goshala Seva (Cow Care)', description: 'Help in the care and welfare of the temple cows.' },
    { id: 'general-fund', name: 'General Temple Fund', description: 'A flexible fund for the temple\'s most urgent needs.' },
    {
        id: 'pooja_samagri',
        name: 'Pooja Samagri (Ritual Items)',
        description: 'Donate for essential daily ritual supplies like ghee (neyy), camphor, incense, sandalwood, and fresh produce.',
    },
    {
        id: 'mala_alankaram',
        name: 'Garland & Ornamentation Fund (Mala Alankaram)',
        description: 'Sponsor fresh flower garlands, silks, and ornaments for the daily decoration of Lord Ayyappa.',
    },
    {
        id: 'mala_alankaram',
        name: 'Garland & Ornamentation Fund (Mala Alankaram)',
        description: 'Sponsor fresh flower garlands, silks, and ornaments for the daily decoration of Lord Ayyappa.',
       
    },
]

const DonationsPage = ({ selectedScheme, setSelectedScheme, amount, setAmount, handleDonationSubmit, isSubmitting }) => {
    // If no scheme is selected, default to the first one
    if (!selectedScheme) {
        setSelectedScheme(donationSchemes[0].id);
    }
    
    // Find the currently selected scheme object
    const currentScheme = donationSchemes.find(s => s.id === selectedScheme);


    return (
        <section id="donations" className="section container">
            <h2 className="section-title">Online Donations (Dhana)</h2>
            <p className="subtitle">
                Your contribution helps us maintain the sanctity of the temple and perform daily rituals and community services.
            </p>

            <div className="donation-grid">
                {/* 1. Scheme Selection Card */}
                <div className="scheme-selection-card card">
                    <h3>Select a Sacred Seva</h3>
                    <ul className="scheme-list">
                        {donationSchemes.map((scheme) => (
                            <li 
                                key={scheme.id} 
                                className={`scheme-item ${selectedScheme === scheme.id ? 'active' : ''}`}
                                onClick={() => setSelectedScheme(scheme.id)}
                            >
                                <h4>{scheme.name}</h4>
                                <p className="scheme-description">{scheme.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 2. Donation Form Card */}
                <div className="donation-form-container">
                    {/* The DonationForm now receives all data and handlers from App.js */}
                    <DonationForm 
                        selectedScheme={currentScheme ? currentScheme.id : 'general-fund'}
                        amount={amount}
                        setAmount={setAmount}
                        onSubmit={handleDonationSubmit}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </section>
    );
};

export default DonationsPage;