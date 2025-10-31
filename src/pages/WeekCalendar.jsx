import React, { useEffect, useState } from "react";
import "./WeekCalendar.css";

const WeekCalendar = () => {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [events, setEvents] = useState({});
  const [isStaff, setIsStaff] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [newEvent, setNewEvent] = useState({
    day: "",
    title: "",
    date: "",
    time: "",
    image: null,
  });

  // ✅ Fetch all events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5038/api/WeekEvent");
        if (res.ok) {
          const data = await res.json();
          const grouped = {};
          data.forEach((ev) => {
            if (!grouped[ev.day]) grouped[ev.day] = [];
            grouped[ev.day].push(ev);
          });
          setEvents(grouped);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleLogin = () => {
    if (password === "ayyappa123") {
      setIsStaff(true);
      setShowLogin(false);
      setPassword("");
      alert("Login successful!");
    } else {
      setLoginError("Invalid password!");
    }
  };

  // ✅ Image upload same as DayCalendar
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewEvent({ ...newEvent, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // ✅ Save event to backend (base64 image)
  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (!newEvent.day || !newEvent.title || !newEvent.date || !newEvent.time || !newEvent.image) {
      return alert("Please fill all fields and upload an image!");
    }

    const eventData = {
      day: newEvent.day,
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      image: newEvent.image, // base64 image
    };

    try {
      const res = await fetch("http://localhost:5038/api/WeekEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (res.ok) {
        const savedEvent = await res.json();
        setEvents((prev) => {
          const updated = { ...prev };
          if (!updated[savedEvent.day]) updated[savedEvent.day] = [];
          updated[savedEvent.day].push(savedEvent);
          return updated;
        });
        setShowAddEvent(false);
        setNewEvent({ day: "", title: "", date: "", time: "", image: null });
      } else {
        const error = await res.text();
        alert("Failed to save event: " + error);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend.");
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to clear all events?")) return;
    try {
      await fetch("http://localhost:5038/api/WeekEvent/clear", { method: "DELETE" });
      setEvents({});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="week-calendar-container">
      <header className="temple-header">
        <h2>🪔 Ayyappa Swamy Temple Week Calendar</h2>
      </header>

      <div className="week-calendar">
        {weekDays.map((day) => (
          <div className="day-card" key={day}>
            <h3>{day}</h3>
            {events[day] && events[day].length > 0 ? (
              events[day].map((ev, i) => (
                <div key={i} className="event-card">
                  <strong>{ev.title}</strong>
                  <div>{ev.date} | {ev.time}</div>
                  {ev.image && (
                    <img src={ev.image} alt="Event" className="event-img" />
                  )}
                </div>
              ))
            ) : (
              <p className="no-events">No Events</p>
            )}
          </div>
        ))}
      </div>

      <div className="update-section">
        <button onClick={() => (!isStaff ? setShowLogin(true) : null)}>
          Update Schedule
        </button>

        {isStaff && (
          <div className="staff-actions">
            <button onClick={() => setShowAddEvent(true)}>Add Event</button>
            <button onClick={handleClearAll}>Clear All</button>
          </div>
        )}
      </div>

      {(showLogin || showAddEvent) && (
        <div
          className="overlay"
          onClick={() => {
            setShowLogin(false);
            setShowAddEvent(false);
          }}
        />
      )}

      {/* Login Popup */}
      {showLogin && (
        <div className="popup">
          <h3>Temple Staff Login</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          {loginError && <p className="error-msg">{loginError}</p>}
          <div className="popup-buttons">
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Add Event Popup */}
      {showAddEvent && (
        <div className="popup">
          <h3>Add New Event</h3>
          <form onSubmit={handleAddEvent}>
            <label>Day:</label>
            <select
              value={newEvent.day}
              onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}
            >
              <option value="">Select Day</option>
              {weekDays.map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>

            <label>Event Title:</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="e.g., Maha Abhishekam"
            />

            <label>Date:</label>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />

            <label>Time:</label>
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            />

            <label>Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {newEvent.image && <img src={newEvent.image} alt="Preview" className="preview-img" />}

            <div className="popup-buttons">
              <button type="submit">Add Event</button>
              <button type="button" onClick={() => setShowAddEvent(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WeekCalendar;
