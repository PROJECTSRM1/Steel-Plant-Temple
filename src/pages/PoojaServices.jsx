import React from 'react';
import './PoojaServices.css';

// Accept onBookPooja as a prop
function PoojaServices({ onBookPooja }) {
  const poojas = [
    { name: "Neyyabhishekam", desc: "The principal offering of <b>pure ghee</b>, symbolizing the union of the devotee's soul with the Supreme Lord.", timing: "Morning: 4:00 AM - 11:30 AM", cost: "₹ 251" },
    { name: "Archana", desc: "Recital of the <b>108 or 1008 holy names</b> of Ayyappa, dedicated by your family's name and nakshatra.", timing: "Throughout Opening Hours", cost: "₹ 101" },
    { name: "Neeranjanam", desc: "A sacred lamp offering using <b>black sesame oil</b>, beneficial for mitigating the adverse effects of *Shani Dosha*.", timing: "Evening: Before Deeparadhana", cost: "₹ 151", },
    { name: "Deeparadhana", desc: "Offering of <b>light and camphor</b> during the main services, invoking divine energy and removing ignorance.", timing: "Morning & Evening: Main Worship Times", cost: "₹ 51" },
    { name: "Pushpanjali", desc: "A humble offering of <b>fresh flowers</b> to the Lord, often coupled with specific mantras for a devotional request.", timing: "Daily: After Abhishekam", cost: "₹ 75" },
    { name: "Naivedyam (Prasadam)", desc: "Sponsor the preparation of the Lord's traditional sweet food offerings, such as <b>Appam</b> and <b>Aravana</b>.", timing: "Daily: Morning & Evening", cost: "₹ 351" },
  ];

  // The local handleBooking is now unnecessary as we use the prop directly on the button
  // const handleBooking = (poojaName) => {
  //   alert(`Proceeding to booking for ${poojaName}...`);
  // };

  return (
    <div className="pooja-page-content">
      <div className="container">
        <h2>Daily Nithya Pooja Services</h2>
        <p className="intro-text">These essential services are performed daily to secure the divine protection and blessings of Lord Ayyappa. </p>

        <div className="pooja-grid">
          {poojas.map((pooja, index) => (
            <div className="pooja-card" key={index}>
              <h3>{pooja.name}</h3>
              <p dangerouslySetInnerHTML={{ __html: pooja.desc }}></p>
              <span className="timing">{pooja.timing}</span>
              <span className="cost">{pooja.cost}</span>
              {/* UPDATED: Call the prop handler on button click */}
              <button onClick={() => onBookPooja(pooja.name)}>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PoojaServices;