import React from "react";
import eventDonations from "../data/eventDonations";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";
import "./EventDonationPage.css";

const EventDonationPage = () => {
  const navigate = useNavigate();

  const handleDonate = (event) => {
    navigate(`/events/register/${event.id}`, { state: { event } });
  };

  return (
    <div className="event-donation-page">
      <h2>Temple Event Donations</h2>
      <div className="event-grid">
        {eventDonations.map((event) => (
          <EventCard key={event.id} event={event} onDonate={handleDonate} />
        ))}
      </div>
    </div>
  );
};

export default EventDonationPage;
