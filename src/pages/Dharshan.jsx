import React, { useEffect } from 'react';
import './Dharshan.css';

const Dharshan = () => {
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const date = e.target[2].value;
    const darshanType = e.target[3].value;

    try {
      
      const res = await fetch("https://localhost:7029/api/DharshanBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ FullName: fullName, Email: email, Date: date, DarshanType: darshanType })
      });

      const data = await res.json();
      if (res.ok) alert(data.message);
      else alert("Error: " + data.message);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend.");
    }
  };

  return (
    <main className="content">
      <section id="about-darshan">
        <h2>Welcome to the Sacred Abode of Lord Ayyappa</h2>
        <p>
          The <strong>Ayyappa Swamy Temple</strong> is a divine sanctuary dedicated to <strong>Lord Ayyappa</strong>...
        </p>
        <blockquote>“Swamiye Saranam Ayyappa” – The sacred chant that connects millions of devotees worldwide.</blockquote>
      </section>

      <section id="timings">
        <h2>Darshan Timings</h2>
        <table>
          <thead>
            <tr>
              <th>Session</th>
              <th>Timing</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Morning Darshan</td>
              <td>5:00 AM – 11:00 AM</td>
              <td>Suprabhatha Seva, Ganapathi Homam, and Nithya Pooja are performed before general Darshan begins.</td>
            </tr>
            <tr>
              <td>Afternoon Break</td>
              <td>11:00 AM – 5:00 PM</td>
              <td>Temple remains closed for cleaning and preparation.</td>
            </tr>
            <tr>
              <td>Evening Darshan</td>
              <td>5:00 PM – 8:30 PM</td>
              <td>Deepa Aradhana and evening prayers are performed.</td>
            </tr>
          </tbody>
        </table>
        <p className="note">⏰ Timings may vary on festival days or during Mandala and Makara Sankranti seasons.</p>
      </section>

      <section id="online-booking">
        <h2>Online Darshan Booking</h2>
        <p>To ensure a comfortable experience and manage crowd flow, devotees are encouraged to book Darshan tickets online.</p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" placeholder="Full name" required />
            <input type="email" placeholder="Email" required />
          </div>
          <div className="form-row">
            <input type="date" required />
            <select required>
              <option value="">Select Darshan Type</option>
              <option>General Darshan</option>
              <option>Special / Seva Darshan</option>
              <option>Festival Darshan</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Book Now</button>
        </form>
      </section>

      <section id="contact">
        <h2>Contact and Assistance</h2>
        <ul className="contact-info">
          <li>📞 <strong>Temple Office:</strong> +91-XXXXXXXXXX</li>
          <li>📧 <strong>Email:</strong> info@ayyappaswamytemple.org</li>
          <li>🌐 <strong>Website:</strong> <a href="/">www.ayyappaswamytemple.org</a></li>
        </ul>
      </section>

      <section id="blessings" className="center">
        <blockquote>“Swamiye Saranam Ayyappa”<br/>
          <span>May Lord Ayyappa bless you and your family with health, strength, and spiritual bliss.</span>
        </blockquote>
      </section>
    </main>
  );
};

export default Dharshan;
