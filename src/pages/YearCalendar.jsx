import React, { useEffect, useState } from "react";
import "./YearCalendar.css";


const YearCalendar = () => {
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const [schedule, setSchedule] = useState(
    JSON.parse(localStorage.getItem("yearSchedule")) || {}
  );
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
  const [editIndex, setEditIndex] = useState(null);
  const [popupMsg, setPopupMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("yearSchedule", JSON.stringify(schedule));
  }, [schedule]);

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

  const handleSaveEvent = (e) => {
    e.preventDefault();
    const { month, date, day, time, title } = formData;

    if (!month || !date || !day || !time || !title)
      return alert("All fields are required");

    const updated = { ...schedule };
    if (!updated[month]) updated[month] = [];

    // 🔎 Duplicate check (same day & time in same month)
  const duplicate = updated[month].some((ev, idx) => {
  const existingDay = ev?.day?.toLowerCase?.() || "";
  const existingTime = ev?.time?.trim?.() || "";
  return (
    idx !== editIndex &&
    existingDay === day.toLowerCase() &&
    existingTime === time.trim()
  );
});


    if (duplicate) {
      setPopupMsg("⚠️ Event already scheduled at that particular time!");
      setTimeout(() => setPopupMsg(""), 3000);
      return;
    }

    if (editIndex !== null) {
      updated[month][editIndex] = { date, day, time, title };
    } else {
      updated[month].push({ date, day, time, title });
    }

    setSchedule(updated);
    setFormData({ month: "", date: "", day: "", time: "", title: "" });
    setEditIndex(null);
    setPopupMsg("✅ Event saved successfully!");
    setTimeout(() => setPopupMsg(""), 2000);
  };

  const handleEditEvent = (month, index) => {
    const event = schedule[month][index];
    setFormData({ month, ...event });
    setEditIndex(index);
    setShowManager(true);
  };

  const handleDeleteEvent = (month, index) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const updated = { ...schedule };
      updated[month].splice(index, 1);
      setSchedule(updated);
    }
  };

 const renderEvents = () =>
  monthNames.map((m, i) => (
    <div key={i} className="month-block">
      <h3>{m}</h3>
      <ul className="events-list">
        {schedule[i + 1] && schedule[i + 1].length > 0 ? (
          schedule[i + 1].map((ev, j) => (
            <li key={j} className="event-item">
              <div className="event-info">
                <strong>{ev.date}</strong> ({ev.day}) — {ev.title}
                <br />
                <span className="event-time">🕒 {ev.time}</span>
              </div>

              {/* Show edit + delete only for staff */}
              {isStaff && (
                <div className="event-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditEvent(i + 1, j)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteEvent(i + 1, j)}
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
      <h2>🪔 Temple Year Schedule</h2>

      <div className="year-schedule">{renderEvents()}</div>

      <button className="update-btn" onClick={handleUpdateClick}>
        Update Schedule
      </button>

      {/* Login Popup */}
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

      {/* Manage Events Popup */}
      {showManager && (
        <>
          <div className="overlay" onClick={() => setShowManager(false)}></div>
          <div className="popup wide-popup">
            <h3>{editIndex !== null ? "Edit Event" : "Add New Event"}</h3>

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
                  {editIndex !== null ? "Update" : "Add"}
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
                    setEditIndex(null);
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
