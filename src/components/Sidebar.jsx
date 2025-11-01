// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Gift, Users, Calendar, BarChart2, Settings } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const location = useLocation();

  const items = [
    { to: "/dashboard", label: "Overview", icon: <Home size={16} /> },
    { to: "/pooja", label: "Seva Bookings", icon: <Gift size={16} /> },
    { to: "/donations/online", label: "Donations", icon: <Users size={16} /> },
    { to: "/events", label: "Events", icon: <Calendar size={16} /> },
    { to: "/reports", label: "Reports", icon: <BarChart2 size={16} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={16} /> },
  ];

  return (
    <aside className={`sidebar-glass ${isOpen ? "open" : ""}`} aria-label="Sidebar">
      <div className="sidebar-top">
        <div className="thumb">
          <img src="./assets/OIP-20.webp" alt="temple" />
        </div>
        {/* <div className="meta">
          <div className="name">Swamiye Saranam Ayyappa</div>
          <div className="role">Administrator</div>
        </div> */}
      </div>

      <nav className="nav-cards" role="navigation">
        {items.map((it) => {
          const active = location.pathname === it.to;
          return (
            <Link
              to={it.to}
              key={it.to}
              className={`nav-card ${active ? "active" : ""}`}
              onClick={() => { if (onClose) onClose(); }}
            >
              <div className="nav-icon">{it.icon}</div>
              <div className="nav-text">
                <div className="nav-label">{it.label}</div>
                <div className="nav-sub">Manage</div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* <div className="sidebar-footer">
        <small>Site: http://localhost:3006/</small>
      </div> */}
    </aside>
  );
}
