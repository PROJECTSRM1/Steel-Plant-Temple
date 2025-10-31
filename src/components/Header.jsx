import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const toggleDropdown = (e) => {
    if (windowWidth <= 768) {
      e.currentTarget.classList.toggle('active');
    }
  };

  return (
    <header className="main-header">
      <div className="header-top">
        <span className="om-symbol">ॐ</span>
        <h1 className="site-title">SRI AYYAPPA SWAMY TEMPLE</h1>
      </div>

      <nav className="navbar">
        <div className="navbar-container container">
          <ul className={`nav-menu ${mobileOpen ? 'active' : ''}`}>
            <li><Link to="/">Home</Link></li>

            <li className="dropdown" onClick={toggleDropdown}>
              <a href="#!">Seva Services</a>
              <ul className="dropdown-content">
                <li><Link to="/pooja">Pooja Services</Link></li>
                <li><Link to="/Special">Special Services</Link></li>
                <li><Link to="/yagnas">Yaghas</Link></li>
                <li><Link to="/dharshan">Dharshan</Link></li>
              </ul>
            </li>

            <li className="dropdown" onClick={toggleDropdown}>
              <a href="#!">Events</a>
              <ul className="dropdown-content">
                <li><a href="/events/day">Day Calendar</a></li>
                <li><a href="/events/week">Week</a></li>
                <li><a href="/events/month">Month</a></li>
                <li><a href="/events/year">Year</a></li>
              </ul>
            </li>

            <li className="dropdown" onClick={toggleDropdown}>
              <a href="#!">Live Darshan</a>
              <ul className="dropdown-content">
                <li><a href="#live">Live Telecast</a></li>
                <li><a href="#live">Telecast Old</a></li>
              </ul>
            </li>

            <li className="dropdown" onClick={toggleDropdown}>
              <a href="#!">Donation</a>
              <ul className="dropdown-content">
                <li><a href="/donations/online">Online Donations</a></li>
                <li><a href="/donations/offline">Offline Donations</a></li>
                <li><a href="/special-donations">Special Donations</a></li>
                <li><Link to="/events">Events & Donations</Link></li>
              </ul>
            </li>

            <li><a href="/gallery">Gallery</a></li>
            <li>
              <Link
                to="/"
                state={{ scrollTo: "contact" }}
                onClick={() => setMobileOpen(true)}
              >
                Contact Us
              </Link>
            </li>

            <li><Link to="/login" className="login-btn">Login</Link></li>
          </ul>



          <div
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
