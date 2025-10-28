import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© <span id="cyear">{new Date().getFullYear()}</span> Sri Ayyappa Swamy Temple. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
