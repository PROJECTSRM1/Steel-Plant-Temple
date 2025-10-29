import React, { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import "./Home.css";
import { useLocation } from "react-router-dom";

const Home = () => {
  const videoRef = useRef(null);
  const location = useLocation();

  // ✅ SCROLL to section when navigated from header
  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 300); // delay ensures Home page loads fully
      }
    }
  }, [location]);

  // ✅ Fade-in scroll animation
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ✅ YouTube auto-play & auto-pause setup
  useEffect(() => {
    const iframe = videoRef.current;
    if (!iframe) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(tag, firstScript);

    let player;
    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player(iframe, {
        events: {
          onReady: (event) => event.target.playVideo(),
        },
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (player && player.playVideo && player.pauseVideo) {
            if (entry.isIntersecting) player.playVideo();
            else player.pauseVideo();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(iframe);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <Hero />

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="section about-section">
        <div className="container">
          <h3 className="section-title fade-in">
            🌿 Welcome to Lord Ayyappa Swamy Temple 🌿
          </h3>

          <div className="fade-in">
            <p className="intro-text">
              Welcome to the sacred abode of Lord Ayyappa, the divine symbol of
              Dharma, purity, and devotion. The <strong>Ayyappa Swamy Temple</strong> stands as a
              sanctuary for all devotees seeking inner peace, divine blessings,
              and the strength to follow a righteous life.
            </p>
            <p>
              As the sacred chant <strong>“Swamiye Saranam Ayyappa”</strong> echoes through the
              air, the temple becomes a space of tranquility and surrender.
              Every corner reflects the spiritual energy of faith and the
              message of Lord Ayyappa — to live with discipline, humility, and
              equality.

              This temple is more than a place of worship; it is a spiritual
              home for the community, nurturing both the soul and society.
              Devotees gather here to offer prayers, participate in poojas,
              perform seva (service), and engage in charitable activities that
              uphold the essence of Sanatana Dharma.
            </p>
          </div>

          <hr className="decor-divider fade-in" />

          <div className="fade-in about-flex">
            <div className="about-img">
              <img src="/assets/i1.webp" alt="Temple Architecture" />
            </div>
            <div className="about-text">
              <h4 className="subheading">🏛️ Divine Ambiance & Architecture</h4>
              <p>
                The temple is built in traditional Kerala architectural style,
                featuring beautifully carved pillars, a golden dhwajasthambam
                (flagpole), and a serene idol of Lord Ayyappa in yogic posture
                symbolizing balance, meditation, and peace. The premises also
                include shrines dedicated to Lord Ganapathi, Goddess
                Malikapurathamma, and Nagaraja. The serene surroundings,
                fragrance of incense, and soothing chants create an atmosphere
                that rejuvenates every heart that steps into this sacred space.
              </p>
            </div>
          </div>

          <hr className="decor-divider fade-in" />

          <div className="fade-in about-flex reverse">
            <div className="about-img">
              <img src="/assets/12.webp" alt="Community Service" />
            </div>
            <div className="about-text">
              <h4 className="subheading">🤝 Community & Service</h4>
              <ul className="service-list">
                <li>
                  <strong>Annadanam</strong> – Free meal service for devotees
                  and the needy.
                </li>
                <li>
                  <strong>Health Camps</strong> – Regular medical check-ups and
                  awareness programs.
                </li>
                <li>
                  <strong>Educational Assistance</strong> – Scholarships for
                  underprivileged students.
                </li>
                <li>
                  <strong>Cultural Activities</strong> – Bhajans, music, and
                  youth participation in temple events.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIVE DARSHAN SECTION ===== */}
      <section id="live" className="section container live">
        <h3>Live Darshan</h3>
        <div className="video-container">
          <iframe
            ref={videoRef}
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/BOjJGALm2kQ?enablejsapi=1&autoplay=1&mute=1&rel=0&modestbranding=1&showinfo=0"
            title="Live Darshan"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* ===== EVENTS SECTION ===== */}
      <section id="events" className="section container">
        <h3>Upcoming Events & Pujas</h3>
        <div className="events-grid">
          <div className="event-card">
            <div className="ev-date">
              <span>Jan</span>
              <strong>14</strong>
            </div>
            <div>
              <h4>Pongala Festival</h4>
              <p>6:00 AM</p>
            </div>
          </div>
          <div className="event-card">
            <div className="ev-date">
              <span>Feb</span>
              <strong>19</strong>
            </div>
            <div>
              <h4>Pradosha</h4>
              <p>5:30 PM</p>
            </div>
          </div>
          <div className="event-card">
            <div className="ev-date">
              <span>Mar</span>
              <strong>03</strong>
            </div>
            <div>
              <h4>Vishnu Sahasranama</h4>
              <p>8:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY SECTION ===== */}
      <section id="gallery" className="section container">
        <h3>Temple Gallery</h3>
        <div className="gallery-grid">
          <img src="/assets/a1.jpg" alt="Temple" />
          <img src="/assets/a2.jpg" alt="Temple" />
          <img src="/assets/18-holy-steps.jpg" alt="Temple" />
          <img src="/assets/wp5164283-ayyappan-wallpapers.jpg" alt="Temple" />
          <img src="/assets/wp8383375-a-ayyappan-wallpapers.jpg" alt="Temple" />
          <img
            src="/assets/wp10186611-sabarimala-ayyappa-swamy-wallpapers.jpg"
            alt="Temple"
          />
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="section container">
        <h3>Contact & Visit</h3>
        <div className="contact-grid">
          <div>
            <h4>Address</h4>
            <p>Vizag Steel Plant, Visakhapatnam City, India</p>
          </div>
          <div>
            <h4>Temple Hours</h4>
            <p>Mon - Sun • 05:00 AM - 08:00 PM</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              Phone: +91 98xxxxxx00
              <br />
              Email: info@ayyappatemple.com
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
