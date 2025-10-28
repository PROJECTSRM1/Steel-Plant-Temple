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
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ month: "", date: "", title: "" });

  useEffect(() => {
    localStorage.setItem("yearSchedule", JSON.stringify(schedule));
  }, [schedule]);

  const handleUpdateClick = () => {
    if (!isStaff) setShowLogin(true);
    else setShowForm(true);
  };

  const handleLogin = () => {
    if (password === "ayyappa123") {
      setIsStaff(true);
      setShowLogin(false);
      setShowForm(true);
      setError("");
      setPassword("");
    } else {
      setError("Invalid password!");
    }
  };

  const handleEventAdd = (e) => {
    e.preventDefault();
    const { month, date, title } = formData;
    if (!month || !date || !title) return alert("All fields required");

    const updated = { ...schedule };
    if (!updated[month]) updated[month] = [];
    updated[month].push({ date, title });
    setSchedule(updated);
    setShowForm(false);
    setFormData({ month: "", date: "", title: "" });
  };

  const renderEvents = () =>
    monthNames.map((m, i) => (
      <div key={i} className="month-block">
        <h3>{m}</h3>
        <ul className="events-list">
          {schedule[i + 1] && schedule[i + 1].length > 0 ? (
            schedule[i + 1].map((ev, j) => (
              <li key={j}>
                {ev.date}: {ev.title}
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

      {/* Add Event Form */}
      {showForm && (
        <>
          <div className="overlay" onClick={() => setShowForm(false)}></div>
          <div className="popup">
            <h3>Add New Event</h3>
            <form onSubmit={handleEventAdd}>
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
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
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
