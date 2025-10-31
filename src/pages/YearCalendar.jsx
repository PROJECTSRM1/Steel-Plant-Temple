import React, { useEffect, useState } from "react";
import axios from "axios";
import "./YearCalendar.css";

const YearCalendar = () => {
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const [schedule, setSchedule] = useState({});
  const [isStaff, setIsStaff] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    month: "",
    date: "",
    day: "",
    time: "",
    title: "",
  });
  const [editEventId, setEditEventId] = useState(null);
  const [popupMsg, setPopupMsg] = useState("");

  // ✅ Load all events from backend
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://localhost:5038/api/YearCalendar");
      const data = res.data;
      const grouped = {};

      data.forEach((ev) => {
        if (!grouped[ev.month]) grouped[ev.month] = [];
        grouped[ev.month].push(ev);
      });

      setSchedule(grouped);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleUpdateClick = () => {
    if (!isStaff) setShowLogin(true);
    else setShowManager(true);
  };

  const handleLogin = () => {
    if (password === "ayyappa123") {
      setIsStaff(true);
      setShowLogin(false);
      setShowManager(true);
      setError("");
      setPassword("");
    } else {
      setError("Invalid password!");
    }
  };

  // ✅ Add or Update event in backend
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    const { month, date, day, time, title } = formData;

    if (!month || !date || !day || !time || !title)
      return alert("All fields are required");

    try {
      if (editEventId) {
        await axios.put(`https://localhost:5038/api/YearCalendar/${editEventId}`, {
          id: editEventId,
          month,
          date,
          day,
          time,
          title,
        });
        setPopupMsg("✅ Event updated successfully!");
      } else {
        await axios.post("https://localhost:5038/api/YearCalendar", {
          month,
          date,
          day,
          time,
          title,
        });
        setPopupMsg("✅ Event added successfully!");
      }

      setTimeout(() => setPopupMsg(""), 2000);
      setFormData({ month: "", date: "", day: "", time: "", title: "" });
      setEditEventId(null);
      fetchEvents(); // Refresh after update/add
    } catch (err) {
      console.error("Error saving event:", err);
      alert("Error saving event. Check backend connection.");
    }
  };

  // ✅ Edit event
  const handleEditEvent = (month, ev) => {
    setFormData({
      month,
      date: ev.date,
      day: ev.day,
      time: ev.time,
      title: ev.title,
    });
    setEditEventId(ev.id);
    setShowManager(true);
  };

  // ✅ Delete event from backend
  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`https://localhost:7029/api/YearCalendar`);
        fetchEvents();
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  const renderEvents = () =>
    monthNames.map((m, i) => (
      <div key={i} className="month-block">
        <h3>{m}</h3>
        <ul className="events-list">
          {schedule[i + 1] && schedule[i + 1].length > 0 ? (
            schedule[i + 1].map((ev) => (
              <li key={ev.id} className="event-item">
                <div className="event-info">
                  <strong>{ev.date}</strong> ({ev.day}) — {ev.title}
                  <br />
                  <span className="event-time">🕒 {ev.time}</span>
                </div>

                {isStaff && (
                  <div className="event-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditEvent(i + 1, ev)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteEvent(ev.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li>No events scheduled.</li>
          )}
        </ul>
      </div>
    ));

  return (
    <div className="calendar-container">
      <header className="temple-header">
        <h2>🪔 Temple Year Schedule</h2>
      </header>

      <div className="year-schedule">{renderEvents()}</div>

      <button className="update-btn" onClick={handleUpdateClick}>
        Update Schedule
      </button>

      {/* 🔐 Login Popup */}
      {showLogin && (
        <>
          <div className="overlay" onClick={() => setShowLogin(false)}></div>
          <div className="popup">
            <h3>Temple Staff Login</h3>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error-msg">{error}</p>}
            <div className="popup-buttons">
              <button onClick={handleLogin}>Login</button>
              <button onClick={() => setShowLogin(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}

      {/* ⚙️ Manage Events Popup */}
      {showManager && (
        <>
          <div className="overlay" onClick={() => setShowManager(false)}></div>
          <div className="popup wide-popup">
            <h3>{editEventId ? "Edit Event" : "Add New Event"}</h3>

            {popupMsg && <p className="info-msg">{popupMsg}</p>}

            <form onSubmit={handleSaveEvent}>
              <label>Month:</label>
              <select
                value={formData.month}
                onChange={(e) =>
                  setFormData({ ...formData, month: e.target.value })
                }
              >
                <option value="">Select Month</option>
                {monthNames.map((m, i) => (
                  <option key={i} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>

              <label>Date:</label>
              <input
                type="number"
                min="1"
                max="31"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />

              <label>Day:</label>
              <input
                type="text"
                placeholder="e.g., Monday"
                value={formData.day}
                onChange={(e) =>
                  setFormData({ ...formData, day: e.target.value })
                }
              />

              <label>Timing:</label>
              <input
                type="text"
                placeholder="e.g., 6:00 AM - 8:00 AM"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />

              <label>Event Title:</label>
              <input
                type="text"
                placeholder="e.g., Maha Pooja"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <div className="popup-buttons">
                <button type="submit">
                  {editEventId ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      month: "",
                      date: "",
                      day: "",
                      time: "",
                      title: "",
                    });
                    setEditEventId(null);
                    setShowManager(false);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default YearCalendar;
