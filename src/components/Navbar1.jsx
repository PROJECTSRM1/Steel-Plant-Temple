// src/components/Navbar1.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, User } from "lucide-react";
import "./Navbar1.css";

export default function Navbar1({ onToggleSidebar }) {
  return (
    <header className="nav-glass">
      <div className="nav-inner container">
        <div className="nav-left">
          <button
            className="hamburger"
            onClick={onToggleSidebar}
            aria-label="Open sidebar"
            title="Menu"
          >
            <Menu size={18} />
          </button>

          <Link to="/" className="brand">
            {/* <img src="/images/logo-small.png" alt="logo" className="brand-img" /> */}
            <div className="brand-text">
              <span className="brand-main">SRI AYYAPPASWAMY TEMPLE DASHBOARD</span>
              {/* <span className="brand-sub">Temple Dashboard</span> */}
            </div>
          </Link>
        </div>

        <div className="nav-right">
          <nav className="nav-links" role="navigation" aria-label="Main">
            <Link to="/events" className="nav-link">Events</Link>
            <Link to="/donations/online" className="nav-cta">Donate</Link>
          </nav>

          <div className="nav-actions">
            <button className="icon-btn" aria-label="Notifications">
              <Bell size={16} />
            </button>
            <button className="profile-btn" aria-label="Account">
              <User size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
