import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EventRegistrationForm.css";

const EventRegistrationForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const event = state?.event;

  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: event?.minAmount || 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      name: form.name,
      email: form.email,
      amount: form.amount,
      eventName: event?.name,
    };

    try {
      const res = await axios.post(
        "https://localhost:7029/api/EventRegistration",
        registrationData
      );
      console.log("Form Submitted:", res.data);
      alert("🙏 Donation registered successfully!");
      navigate("/events/success");
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Something went wrong while submitting donation.");
    }
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
