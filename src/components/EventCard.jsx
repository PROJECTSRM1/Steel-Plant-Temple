import React from "react";

const EventCard = ({ event, onDonate }) => (
  <div className="event-card">
    <img src={event.image} alt={event.name} />
    <h3>{event.name}</h3>
    <p>{event.description}</p>
    <p><strong>Date:</strong> {event.date}</p>
    <button onClick={() => onDonate(event)}>Donate / Register</button>
  </div>
);

export default EventCard;
