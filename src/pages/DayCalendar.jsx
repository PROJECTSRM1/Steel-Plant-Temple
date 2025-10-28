import React, { useEffect, useState } from "react";
import "./DayCalendar.css";

const DayCalendar = () => {
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem("dayEvents")) || {});
  const [selectedHour, setSelectedHour] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const selectedDate = new Date().toLocaleDateString();

  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 6 AM - 9 PM

  useEffect(() => {
    localStorage.setItem("dayEvents", JSON.stringify(events));
  }, [events]);

  const openPopup = (hour) => {
    setSelectedHour(hour);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setTitle("");
    setDesc("");
  };

  const saveEvent = () => {
    if (!title.trim()) return alert("Enter event title");
    const key = `${selectedDate}-${selectedHour}`;
    const updated = { ...events };
    if (!updated[key]) updated[key] = [];
    updated[key].push({ title, desc });
    setEvents(updated);
    closePopup();
  };

  const getTimeLabel = (h) => (h > 12 ? h - 12 : h) + (h >= 12 ? " PM" : " AM");

  return (
    <div className="day-calendar-container">
      <h2>🪔 Ayyappa Swamy Temple Day Calendar</h2>

      <div className="day-calendar">
        {hours.map((h) => (
          <div key={h} className="hour-block" onClick={() => openPopup(h)}>
            <div className="hour-label">{getTimeLabel(h)}</div>
            <div className="hour-events">
              {(events[`${selectedDate}-${h}`] || []).length > 0 ? (
                events[`${selectedDate}-${h}`].map((ev, i) => (
                  <div key={i} className="event-card">
                    <strong>{ev.title}</strong>
                    {ev.desc && <div>{ev.desc}</div>}
                  </div>
                ))
              ) : (
                <span className="no-events">No Events</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Overlay and Popup */}
      {popupOpen && <div className="overlay" onClick={closePopup}></div>}

      {popupOpen && (
        <div className="popup">
          <h3>Add Event at {getTimeLabel(selectedHour)}</h3>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Event Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="popup-buttons">
            <button onClick={saveEvent}>Save Event</button>
            <button onClick={closePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayCalendar;
