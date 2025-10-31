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

  const playVideo = () => {
    const container = document.getElementById('videoPreview');
    if (!container) return;
    container.innerHTML = `
      <iframe width="600" height="340"
        src="https://www.youtube.com/embed/BOjJGALm2kQ?autoplay=1"
        title="Live Darshan"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen>
      </iframe>`;
  };

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

      <div className="live-preview container" id="live">
        <h3 style={{color: '#3b0101', textAlign: 'center'}}>Live Darshan</h3>
        <div className="video-container" id="videoPreview" onClick={playVideo}>
          <img src="https://img.youtube.com/vi/BOjJGALm2kQ/maxresdefault.jpg" alt="Live Darshan Preview" />
          <div className="play-button"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
