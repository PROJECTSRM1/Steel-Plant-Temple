import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EventRegistrationForm.css";


const EventRegistrationForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const event = state?.event;
  const [form, setForm] = useState({ name: "", email: "", amount: event?.minAmount || 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    navigate("/events/success");
  };

  return (
    <div className="event-registration-form">
      <h2>Register for {event?.name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Donation Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
};

export default EventRegistrationForm;
