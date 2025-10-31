import React from "react";
import "./EventCard.css";

const EventCard = ({ event, onDonate }) => {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-card-img" />
      <h3 className="event-card-title">{event.title}</h3>
      <p className="event-card-desc">{event.description}</p>
      <button className="donate-btn" onClick={onDonate}>
        Donate Now
      </button>
    </div>
  );
};

export default EventCard;
