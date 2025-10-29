import React, { useState, useEffect } from "react";
import "./SpecialDonations.css";

const SpecialDonations = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState("");
  const [formData, setFormData] = useState({ name: "", amount: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openForm = (donationType) => {
    setSelectedDonation(donationType);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({ name: "", amount: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `🙏 Thank you, ${formData.name}! You pledged ₹${formData.amount} towards ${selectedDonation}.`
    );
    closeForm();
  };

  return (
    <section className="section donations-section">
      <div className="container">
        <h2 className="section-title">💰 Special Donations</h2>

        <p className="intro-text">
          Your generous contributions help us maintain temple activities,
          support community programs, and preserve our sacred traditions. Every
          offering—big or small—is received with divine blessings from Lord
          Ayyappa.
        </p>

        <div className="donations-grid">
          {[
            {
              title: "🏛️ Temple Maintenance Fund",
              desc: "Support daily temple operations, upkeep, and festival preparations.",
            },
            {
              title: "🍚 Annadanam Seva",
              desc: "Contribute to our free meal service for devotees and the needy.",
            },
            {
              title: "📚 Education & Welfare",
              desc: "Help provide scholarships and educational aid to underprivileged children.",
            },
            {
              title: "🎉 Festival Sponsorship",
              desc: "Sponsor major temple festivals such as Mandala Pooja and Makara Jyothi.",
            },
          ].map((donation) => (
            <div key={donation.title} className="donation-card">
              <h4>{donation.title}</h4>
              <p>{donation.desc}</p>
              <button
                className="donate-btn"
                onClick={() => openForm(donation.title)}
              >
                Donate Now
              </button>
            </div>
          ))}
        </div>

        <hr className="decor-divider" />

        <div className="bank-details">
          <h3>🙏 Temple Bank Details</h3>
          <p>
            <strong>Account Name:</strong> Sri Ayyappa Swamy Temple Trust <br />
            <strong>Account No:</strong> 1234567890 <br />
            <strong>IFSC:</strong> SBIN000XXXX <br />
            <strong>Bank:</strong> State Bank of India, Visakhapatnam
          </p>

          <a
            href="https://wa.me/9198xxxxxx00?text=Namaste!%20I%20would%20like%20to%20make%20a%20special%20donation%20to%20Sri%20Ayyappa%20Swamy%20Temple."
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            💬 Donate via WhatsApp
          </a>
        </div>

        {/* ==== DONATION FORM POPUP ==== */}
        {showForm && (
          <div className="donation-form-overlay">
            <div className="donation-form">
              <button className="close-btn" onClick={closeForm}>
                ✕
              </button>
              <h3>{selectedDonation}</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Amount (₹):
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    required
                  />
                </label>
                <button type="submit" className="submit-btn">
                  Confirm Donation
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpecialDonations;
