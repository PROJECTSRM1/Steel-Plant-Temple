import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const slidesList = [
  '/assets/head3.jpg',
  '/assets/head2.jpg',
  '/assets/head4.jpg',
  '/assets/head5.jpg'
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slidesList.length);
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="slideshow">
        {slidesList.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className={`slide ${i === current ? 'active' : ''}`}
            loading="lazy"
          />
        ))}
      </div>

      <div className="hero-overlay">
        <div className="hero-content container">
          <h2>SRI AYYAPPA SWAMY TEMPLE</h2>
          <div className="hero-buttons">
            <a href="#live" className="btn btn-primary">Watch Live Darshan</a>
            <a href="/dharshan" className="btn btn-secondary">Book Puja</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
