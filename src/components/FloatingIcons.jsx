import React from 'react';
import './FloatingIcons.css';


const FloatingIcons = () => {
  return (
    <div className="floating-social">
      <button aria-label="Facebook"><i className="fab fa-facebook-f"></i></button>
      <button aria-label="Instagram"><i className="fab fa-instagram"></i></button>
      <button aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></button>
      <button aria-label="YouTube"><i className="fab fa-youtube"></i></button>
    </div>
  );
};

export default FloatingIcons;
