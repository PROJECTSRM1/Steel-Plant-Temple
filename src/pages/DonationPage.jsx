// src/pages/DonationPage.jsx
import React, { useState, useEffect } from 'react';
import DonationForm from '../components/DonationForm';
import './DonationPage.css';

const donationSchemes = [
  { id: 'annadanam', name: 'Annadanam Seva (Food Donation)', description: 'Support the daily feeding of devotees.' },
  { id: 'temple-maintenance', name: 'Temple Maintenance Fund', description: 'Contribute to the upkeep and repair of the temple.' },
  { id: 'goshala-seva', name: 'Goshala Seva (Cow Care)', description: 'Help in the care and welfare of the temple cows.' },
  { id: 'general-fund', name: 'General Temple Fund', description: 'A flexible fund for the temple\'s most urgent needs.' },
  {
    id: 'pooja_samagri',
    name: 'Pooja Samagri (Ritual Items)',
    description: 'Donate for essential daily ritual supplies like ghee, camphor, incense, sandalwood, and fresh produce.',
  },
  {
    id: 'mala_alankaram',
    name: 'Garland & Ornamentation Fund (Mala Alankaram)',
    description: 'Sponsor fresh flower garlands, silks, and ornaments for the daily decoration of Lord Ayyappa.',
  },
];

const DonationPage = () => {
  const [selectedScheme, setSelectedScheme] = useState(donationSchemes[0].id);
  const [amount, setAmount] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Function to handle form submission
  const handleDonationSubmit = async ({ name, email, phone }) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('https://localhost:7029/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          selectedScheme,
          amount
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message); // ✅ show backend success message (same as before)
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('Unable to connect to server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentScheme = donationSchemes.find(s => s.id === selectedScheme);

  return (
    <section id="donations" className="section container">
      <h2 className="section-title">Online Donations (Dhana)</h2>
      <p className="subtitle">
        Your contribution helps us maintain the sanctity of the temple and perform daily rituals and community services.
      </p>

      <div className="donation-grid">
        {/* Scheme Selection */}
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

        {/* Donation Form */}
        <div className="donation-form-container">
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

export default DonationPage;
