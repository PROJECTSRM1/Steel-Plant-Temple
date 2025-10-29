import React, { useState, useEffect } from "react";
import "./WeekCalendar.css";

const WeekCalendar = () => {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
    imageUrl: "",
  });

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("weekEvents"));
    if (saved) setEvents(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("weekEvents", JSON.stringify(events));
  }, [events]);

  const handleLogin = () => {
    if (password === "ayyappa123") {
      setIsStaff(true);
      setShowLogin(false);
      setPassword("");
      setLoginError("");
      alert("Login successful! You can now add or edit events.");
    } else {
      setLoginError("Invalid password!");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewEvent({ ...newEvent, image: file, imageUrl });
    }
  };

 const handleAddEvent = (e) => {
  e.preventDefault();

  if (!newEvent.day || !newEvent.title || !newEvent.date || !newEvent.time) {
    return alert("Please fill all fields!");
  }

  // Check for duplicate event at same date & time
  const existingDayEvents = events[newEvent.day] || [];
  const conflict = existingDayEvents.some(
    (ev) =>
      ev.date === newEvent.date &&
      ev.time === newEvent.time
  );

  if (conflict) {
    alert(`⚠️ An event is already scheduled on ${newEvent.date} at ${newEvent.time}.`);
    return;
  }

  // If no conflict, add event
  setEvents((prev) => {
    const updated = { ...prev };
    if (!updated[newEvent.day]) updated[newEvent.day] = [];
    updated[newEvent.day].push({
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      imageUrl: newEvent.imageUrl,
    });
    return updated;
  });

  setNewEvent({ day: "", title: "", date: "", time: "", image: null, imageUrl: "" });
  setShowAddEvent(false);
};


  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all events?")) {
      setEvents({});
      localStorage.removeItem("weekEvents");
    }
  };

  return (
    <div className="week-calendar-container">
      <header className="temple-header">
        <h2>Weekly Pooja Schedule</h2>
      </header>

      <div className="week-calendar">
        {weekDays.map((day) => (
          <div className="day-card" key={day}>
            <h3>{day}</h3>
           {events[day] && events[day].length > 0 ? (
  events[day].map((ev, i) => (
    <li key={i} className="event-item">
      <div className="event-content">
        <div className="event-image">
          {ev.imageUrl && <img src={ev.imageUrl} alt={ev.title} />}
        </div>
        <div className="event-details">
          <strong>🪔 {ev.title}</strong><br />
          📅 {ev.date} | ⏰ {ev.time}
        </div>
      </div>
    </li>
  ))
) : (
  <li>No Events</li>
)}


          </div>
        ))}
      </div>

      <div className="update-section">
        <button onClick={() => (!isStaff ? setShowLogin(true) : null)}>Update Schedule</button>

        {isStaff && (
          <div className="staff-actions">
            <button onClick={() => setShowAddEvent(true)}>Add Event</button>
            <button onClick={handleClearAll}>Clear All Events</button>
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

            <label>Event Image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {newEvent.imageUrl && (
              <img
                src={newEvent.imageUrl}
                alt="Preview"
                className="preview-img"
              />
            )}

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
