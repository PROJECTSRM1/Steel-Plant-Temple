import React, { useState } from 'react';

// --- PoojaServices Component ---
function PoojaServices({ onBookPooja }) {
  const poojas = [
    { name: "Neyyabhishekam", desc: "The principal offering of <b>pure ghee</b>, symbolizing the union of the devotee's soul with the Supreme Lord.", timing: "Morning: 4:00 AM - 11:30 AM", cost: "₹ 251" },
    { name: "Archana", desc: "Recital of the <b>108 or 1008 holy names</b> of Ayyappa, dedicated by your family's name and nakshatra.", timing: "Throughout Opening Hours", cost: "₹ 101" },
    { name: "Neeranjanam", desc: "A sacred lamp offering using <b>black sesame oil</b>, beneficial for mitigating the adverse effects of *Shani Dosha*.", timing: "Evening: Before Deeparadhana", cost: "₹ 151" },
    { name: "Deeparadhana", desc: "Offering of <b>light and camphor</b> during the main services, invoking divine energy and removing ignorance.", timing: "Morning & Evening: Main Worship Times", cost: "₹ 51" },
    { name: "Pushpanjali", desc: "A humble offering of <b>fresh flowers</b> to the Lord, often coupled with specific mantras for a devotional request.", timing: "Daily: After Abhishekam", cost: "₹ 75" },
    { name: "Naivedyam (Prasadam)", desc: "Sponsor the preparation of the Lord's traditional sweet food offerings, such as <b>Appam</b> and <b>Aravana</b>.", timing: "Daily: Morning & Evening", cost: "₹ 351" },
  ];

  return (
    <div className="pooja-page-content">
      <div className="container">
        <h2>Daily Nithya Pooja Services</h2>
        <p className="intro-text">These essential services are performed daily to secure the divine protection and blessings of Lord Ayyappa.</p>

        <div className="pooja-grid">
          {poojas.map((pooja, index) => (
            <div className="pooja-card" key={index}>
              <h3>{pooja.name}</h3>
              <p dangerouslySetInnerHTML={{ __html: pooja.desc }}></p>
              <span className="timing">{pooja.timing}</span>
              <span className="cost">{pooja.cost}</span>
              <button onClick={() => onBookPooja(pooja.name)}>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- BookingForm Component ---
function BookingForm({ poojaName, onBack }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://localhost:7029/api/poojabooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poojaName, userName: name, phone, email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Clear form
        setName('');
        setPhone('');
        setEmail('');
      } else {
        alert("Error booking pooja: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error booking pooja");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pooja-page-content">
      <div className="container" style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
        <button onClick={onBack} style={{ marginBottom: '20px', padding: '10px 20px', background: '#3b0101', color: 'white', border: 'none', cursor: 'pointer' }}>
          ← Back to Pooja Services
        </button>

        <h2>Book: {poojaName}</h2>
        <p>Please provide your details below to proceed with the booking and payment for the {poojaName} service.</p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number</label>
            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email (for confirmation)</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc' }} />
          </div>

          <button type="submit" disabled={isSubmitting} style={{ padding: '15px', background: '#ffcc33', color: '#3b0101', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1em', marginTop: '10px' }}>
            {isSubmitting ? 'Processing...' : `Proceed to Payment for ${poojaName}`}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Main PoojaBookingPage Component ---
function PoojaBookingPage() {
  const [selectedPooja, setSelectedPooja] = useState(null);

  const handleBookPooja = (poojaName) => {
    setSelectedPooja(poojaName);
  };

  const handleBack = () => {
    setSelectedPooja(null);
  };

  return (
    <div>
      {selectedPooja ? (
        <BookingForm poojaName={selectedPooja} onBack={handleBack} />
      ) : (
        <PoojaServices onBookPooja={handleBookPooja} />
      )}
    </div>
  );
}

export default PoojaBookingPage;
