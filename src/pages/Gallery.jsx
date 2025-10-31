import React, { useRef } from "react";
import "./Gallery.css";


const Gallery = () => {
  const imageRowRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 435; // adjust scroll speed
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const images = [
    "../assets/12.webp",
    "../assets/head3.jpg",
    "../assets/18-holy-steps.jpg",
    "../assets/head4.jpg",
    "../assets/a1.jpg",
    "../assets/head5.jpg",
    "../assets/a2.jpg",
    "../assets/head2.jpg",
    "../assets/i1.webp",
    "../assets/ayyappa1.jpg",
    "../assets/ayyappa2.jpg",
    "../assets/ayyappa3.jpg",
  ];

  return (
    <div className="gallery-container">
      <h2>Ayyappa Swamy Temple Gallery</h2>

      {/* ---------- Image Gallery ---------- */}
      <div className="gallery-section">
        <h3>Temple Images</h3>
        <div className="scroll-container">
          <button
            className="arrow left"
            onClick={() => scroll(imageRowRef, "left")}
          >
            ◀
          </button>

          <div className="gallery-row" ref={imageRowRef}>
            {images.map((img, i) => (
              <div key={i} className="gallery-item">
                <img src={img} alt={`Temple ${i + 1}`} />
              </div>
            ))}
          </div>

          <button
            className="arrow right"
            onClick={() => scroll(imageRowRef, "right")}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
