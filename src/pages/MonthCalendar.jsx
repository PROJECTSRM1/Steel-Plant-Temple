import React, { useEffect, useState } from "react";
import "./MonthCalendar.css";

const MonthCalendar = () => {
  const today = new Date();
  const [currentMonth] = useState(today.getMonth());
  const [currentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isStaff, setIsStaff] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("templeEvents")) || {}
  );

  useEffect(() => {
    localStorage.setItem("templeEvents", JSON.stringify(events));
  }, [events]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateClick = (day) => {
    const dateStr = `${day}-${currentMonth + 1}-${currentYear}`;
    setSelectedDate(dateStr);
  };

  const handleLogin = () => {
    if (password === "ayyappa123") {
      setIsStaff(true);
      setPopupOpen(false);
      setPassword("");
    } else {
      alert("Invalid password!");
    }
  };

  const handleAddOrEditEvent = () => {
    if (!eventTitle.trim()) {
      alert("Enter event title!");
      return;
    }
    const updated = { ...events };
    updated[selectedDate] = { title: eventTitle, desc: eventDesc };
    setEvents(updated);
    setPopupOpen(false);
    setEventTitle("");
    setEventDesc("");
  };

  const handleDeleteEvent = (date) => {
    if (window.confirm(`Delete the event on ${date}?`)) {
      const updated = { ...events };
      delete updated[date];
      setEvents(updated);
    }
  };

  const getFormattedDate = (day) => `${day}-${currentMonth + 1}-${currentYear}`;
  const showEvent = selectedDate ? events[selectedDate] : null;

  const openPopupForEvent = (isEdit = false) => {
    if (!selectedDate) {
      alert("Select a date first!");
      return;
    }
    setEditMode(isEdit);
    setShowLogin(false);
    setPopupOpen(true);
    if (isEdit && events[selectedDate]) {
      setEventTitle(events[selectedDate].title);
      setEventDesc(events[selectedDate].desc);
    } else {
      setEventTitle("");
      setEventDesc("");
    }
  };

  const openLoginPopup = () => {
    setPopupOpen(true);
    setShowLogin(true);
  };

  return (
    <div className="puja-calendar-container">
      <h2>🪔 Ayyappa Swamy Temple Puja Calendar</h2>

      <div className="main-container">
        {/* Left side */}
        <div className="calendar-container">
          <div className="calendar">
            {daysArray.map((day) => {
              const dateObj = new Date(currentYear, currentMonth, day);
              const isPast =
                dateObj <
                new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const isToday = day === today.getDate();
              const isSelected =
                selectedDate === getFormattedDate(day);

              return (
                <div
                  key={day}
                  className={`day ${isToday ? "today" : ""} ${
                    isSelected ? "selected" : ""
                  }`}
                  style={{
                    background: isPast ? "#eee" : "",
                    cursor: isPast ? "not-allowed" : "pointer",
                  }}
                  onClick={() => !isPast && handleDateClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {!isStaff && (
            <button
              className="below-calendar-btn"
              onClick={openLoginPopup}
              style={{ display: selectedDate ? "inline-block" : "none" }}
            >
              Update Schedule
            </button>
          )}

          <div className="month-events">
            <h3>🪔 All Scheduled Temple Events</h3>
            {Object.keys(events).length === 0 ? (
              <p className="no-events-text">No events scheduled yet.</p>
            ) : (
              Object.keys(events)
                .sort((a, b) => {
                  const [da, ma, ya] = a.split("-").map(Number);
                  const [db, mb, yb] = b.split("-").map(Number);
                  return (
                    new Date(ya, ma - 1, da) - new Date(yb, mb - 1, db)
                  );
                })
                .map((dateStr) => (
                  <div key={dateStr} className="event-card">
                    <h4>{events[dateStr].title}</h4>
                    <p><strong>Date:</strong> {dateStr}</p>
                    <p>{events[dateStr].desc}</p>
                    {isStaff && (
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteEvent(dateStr)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="right-panel">
          <div className="event-display">
            {showEvent ? (
              <div className="event-card">
                <h4>{showEvent.title}</h4>
                <p><strong>Date:</strong> {selectedDate}</p>
                <p>{showEvent.desc}</p>
                {isStaff && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteEvent(selectedDate)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ) : (
              <p className="no-events-text">No event scheduled for this date.</p>
            )}
          </div>

          {isStaff && (
            <>
              <button className="action-btn" onClick={() => openPopupForEvent(false)}>
                Add Event
              </button>
              <button className="action-btn" onClick={() => openPopupForEvent(true)}>
                Edit Event
              </button>
            </>
          )}
        </div>
      </div>

      {/* Popup Overlay */}
      {popupOpen && (
        <>
          <div className="overlay" onClick={() => setPopupOpen(false)}></div>
          <div className="popup">
            {showLogin ? (
              <>
                <h3>Temple Staff Login</h3>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
              </>
            ) : (
              <>
                <h3>{editMode ? "Edit Event" : "Add Event"}</h3>
                <input
                  type="text"
                  placeholder="Event Title"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
                <textarea
                  placeholder="Event Description"
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                />
                <button onClick={handleAddOrEditEvent}>Save Event</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MonthCalendar;
