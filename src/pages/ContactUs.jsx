import React, { useState } from "react";
import axios from "axios";
import "./ContactUs.css";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:7029/api/Contact", form);
      alert(res.data.message);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Something went wrong while sending your message.");
    }
  };

  return (
    <div className="contact-page">
      <h2 className="contact-title">Contact & Visit</h2>
      <div className="contact-line"></div>

      <div className="contact-cards">
        <div className="contact-card">
          <h3>Address</h3>
          <p>Vizag Steel Plant, Visakhapatnam City, India</p>
        </div>

        <div className="contact-card">
          <h3>Temple Hours</h3>
          <p>Mon - Sun • 05:00 AM - 08:00 PM</p>
        </div>

        <div className="contact-card">
          <h3>Contact</h3>
          <p>Phone: +91 98xxxxxx00</p>
          <p>Email: info@ayyappatemple.com</p>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Send Us a Message</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
