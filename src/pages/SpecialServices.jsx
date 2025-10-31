import React from "react";
import { useNavigate } from "react-router-dom";
import "./SpecialServices.css";

const SPECIAL_SEVAS_DATA = [
  {
    name: "Padi Pooja",
    highlight: "Premium Service",
    purpose:
      "Worship of the 18 Holy Steps — honors the spiritual path, bringing protection and fortune.",
    description:
      "The Pathinettam Padi (18 sacred steps) are considered the heart of Ayyappa worship. Each step represents a human quality to be transcended. During the Padi Pooja, the steps are adorned with flowers and lamps as priests chant hymns. This sacred service requires advance booking.",
    imageSrc: "/assets/download.webp",
    imageAlt: "Devotees performing Padi Pooja",
  },
  {
    name: "Udayasthamana Pooja",
    highlight: "Grand Offering",
    purpose:
      "Comprehensive worship performed from sunrise to sunset for fulfilling major wishes.",
    description:
      "‘Udayasthamaya’ literally means from sunrise to sunset. It includes 18 separate Poojas, making it a full-day offering for deep devotion. Conducted only on auspicious days.",
    imageSrc: "/assets/Udayasthaman-Pooja.png",
    imageAlt: "Ritual with sacred offerings",
  },
  {
    name: "Pushpabhishekam",
    highlight: "Abhisekham 🔥",
    purpose:
      "Ceremonial showering of flowers upon Lord Ayyappa — brings beauty and divine grace.",
    description:
      "This ritual involves showering the deity with flowers like jasmine, Tulsi, and lotus — symbolizing devotion and purity.",
    imageSrc: "/assets/ppp.jpg",
    imageAlt: "Flower offering to deity",
  },
  {
    name: "Kalabhabhishekam",
    highlight: "Aesthetic Focus",
    purpose:
      "Consecration of the idol with sandalwood paste — believed to bring prosperity and peace.",
    description:
      "Performed by the Tantri for strengthening the deity’s divine radiance. The ritual uses pure sandal paste and sacred chants.",
    imageSrc: "/assets/abhisekam.jpg",
    imageAlt: "Sandalwood consecration ritual",
  },
  {
    name: "Vedi Vazhipadu",
    highlight: "Traditional Feature",
    purpose:
      "The Firecracker Offering — symbolizes surrender of ego and drives away evil.",
    description:
      "A traditional and powerful ritual involving sacred firecrackers, believed to remove negative energies and obstacles.",
    imageSrc: "/assets/ulsavabali.webp",
    imageAlt: "Firecracker ritual offering",
  },
  {
    name: "Laksharchana",
    highlight: "Archana",
    purpose:
      "Collective prayer for family welfare and overall well-being through chanting divine names.",
    description:
      "Priests chant the Lord’s name 100,000 times for divine blessings, peace, and prosperity.",
    imageSrc: "/assets/laksharchana.webp",
    imageAlt: "Priests performing chanting ritual",
  },
  {
    name: "Annadanam 🙏",
    highlight: "Highest Daanam",
    purpose:
      "The sacred act of feeding devotees and the needy — the highest form of charity.",
    description:
      "Annadanam sustains life and grants immense spiritual merit. It represents the truest form of seva and compassion.",
    imageSrc: "/assets/OIP (12).webp",
    imageAlt: "Annadanam food offering",
  },
];

const SpecialServices = () => {
  const navigate = useNavigate();

  const handleBooking = (sevaName) => {
    navigate("/booking-form1", { state: { sevaName } });
  };

  return (
    <div className="special-services-page">
      <h1 className="page-title">Special Sevas</h1>
      <p className="page-subtitle">
        Participate in sacred temple rituals and offerings with divine blessings.
      </p>

      <div className="special-sevas-container">
        {SPECIAL_SEVAS_DATA.map((seva, index) => (
          <div className="special-seva-card" key={index}>
            <img src={seva.imageSrc} alt={seva.imageAlt} />
            <h3>{seva.name}</h3>
            <p className="highlight">{seva.highlight}</p>
            <p className="purpose">{seva.purpose}</p>
            <p className="description">{seva.description}</p>
            <button
              className="book-btn"
              onClick={() => handleBooking(seva.name)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialServices;
