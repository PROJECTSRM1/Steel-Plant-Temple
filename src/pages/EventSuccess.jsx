import React from "react";
import { Link } from "react-router-dom";
import "./EventSuccess.css";

const EventSuccess = () => (
  <div className="event-success">
    <h2>Thank You for Your Contribution!</h2>
    <p>Your registration for the event has been successfully received.</p>
    <Link to="/events">Back to Events</Link>
  </div>
);

export default EventSuccess;
