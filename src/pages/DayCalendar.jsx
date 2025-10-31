import React, { useEffect, useState } from "react";
import "./DayCalendar.css";

const DayCalendar = () => {
  const [events, setEvents] = useState({});
  const [selectedHour, setSelectedHour] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const selectedDate = new Date().toLocaleDateString();

  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 6 AM – 9 PM

  // Fetch all events from backend on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5038/api/DayEvent");
        if (response.ok) {
          const data = await response.json();
          const mapped = {};
          data.forEach(ev => {
            mapped[ev.key] = ev;
          });
          setEvents(mapped);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  const openPopup = (hour) => {
    setSelectedHour(hour);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setTitle("");
    setDesc("");
    setImage(null);
  };

  // 🔹 Save event to backend
  const saveEvent = async () => {
    if (!title.trim() || !desc.trim() || !image) {
      alert("Please fill all fields and upload an image before saving.");
      return;
    }

    const key = `${selectedDate}-${selectedHour}`;
    const eventData = {
      key,
      title,
      desc,
      image,
      date: selectedDate,
      time: getTimeLabel(selectedHour)
    };

    try {
      const response = await fetch("http://localhost:5038/api/DayEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData)
      });

      if (response.ok) {
        const savedEvent = await response.json();
        setEvents(prev => ({ ...prev, [key]: savedEvent }));
        closePopup();
      } else {
        const errorText = await response.text();
        alert("Failed to save event: " + errorText);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const getTimeLabel = (h) => (h > 12 ? h - 12 : h) + (h >= 12 ? " PM" : " AM");

  return (
    <div className="day-calendar-container">
      <header className="temple-header">
        <h2>🪔 Ayyappa Swamy Temple Day Calendar</h2>
      </header>

      <div className="day-calendar">
        {hours.map((h) => {
          const event = events[`${selectedDate}-${h}`];
          return (
            <div key={h} className="hour-block" onClick={() => openPopup(h)}>
              <div className="hour-label">{getTimeLabel(h)}</div>
              <div className="hour-events">
                {event ? (
                  <div className="event-card">
                    <strong>{event.title}</strong>
                    <div>{event.desc}</div>
                    {event.image && <img src={event.image} alt="Event" className="event-img" />}
                  </div>
                ) : (
                  <span className="no-events">No Events</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Overlay */}
      {popupOpen && <div className="overlay" onClick={closePopup}></div>}

      {/* Popup for Adding Event */}
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

          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && <img src={image} alt="Preview" className="preview-img" />}

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
