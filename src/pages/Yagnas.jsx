import React, { useEffect } from "react";
import "./Yagnas.css";


const Yagnas = () => {
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

  return (
    <section id="yagnas" className="section container yagnas-section">
      <h2 className="section-title fade-in">🔥 Yagnas and Homas (Vedic Fire Rituals)</h2>

      <div className="fade-in">
        <p className="intro-text">
          The <strong>Ayyappa Swamy Temple</strong> upholds the age-old Vedic tradition of performing{" "}
          <strong>Yagnas</strong> and <strong>Homas</strong> — sacred fire rituals that purify the mind, body, and surroundings.
        </p>
        <p>
          In Hindu philosophy, fire (<em>Agni</em>) is considered the divine messenger that carries the devotee’s prayers
          and offerings to the gods. Every Yagna performed at the temple is a sacred act of surrender, invoking blessings
          for peace, prosperity, and spiritual protection.
        </p>
        <p>
          The flickering flames of the sacred fire represent the <strong>light of wisdom</strong>, while the offerings made
          into it symbolize the sacrifice of ego, negativity, and worldly attachments. Participating in or sponsoring a Yagna
          helps devotees experience inner harmony, removes obstacles, and attracts divine grace from Lord Ayyappa and the presiding deities.
        </p>
      </div>

      <hr className="decor-divider fade-in" />

      <div className="fade-in yagna-list">
        <div className="yagna-card">
          <h3>1. Maha Ganapathi Homam</h3>
          <p>
            This is one of the most important rituals conducted before the start of any new venture, festival, or temple event.
            Dedicated to <strong>Lord Ganesha</strong>, the remover of obstacles, it ensures success and harmony in all undertakings.
            The Homam invokes positivity, removes hindrances, and bestows clarity of mind.
          </p>
        </div>

        <div className="yagna-card">
          <h3>2. Navagraha Homam</h3>
          <p>
            The nine celestial planets (<strong>Navagrahas</strong>) have a profound influence on human life. This Homam balances
            planetary energies and reduces the malefic effects of unfavorable alignments. Through mantras and sacred offerings,
            devotees seek the blessings of the Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu.
          </p>
        </div>

        <div className="yagna-card">
          <h3>3. Sudarsana Homam</h3>
          <p>
            Dedicated to <strong>Lord Sudarsana</strong>, this Homam is performed for protection from negativity, fear, and unseen
            obstacles. It invokes powerful energies that purify the aura and remove harmful influences. Especially recommended
            for those facing prolonged challenges or uncertainty.
          </p>
        </div>

        <div className="yagna-card">
          <h3>4. Dhanvanthari Homam</h3>
          <p>
            <strong>Lord Dhanvanthari</strong>, the divine physician, is invoked in this sacred ritual for health, healing, and vitality.
            The offerings of herbs, ghee, and medicinal leaves symbolize divine nourishment. This Yagna promotes physical well-being
            and strengthens both body and mind.
          </p>
        </div>

        <div className="yagna-card">
          <h3>5. Ayyappa Maha Yagna</h3>
          <p>
            The most significant ritual dedicated to <strong>Lord Ayyappa</strong>, this grand ceremony is performed for the collective
            welfare of devotees and the world. The Maha Yagna symbolizes the ultimate offering of the self to the Divine — bringing
            unity, peace, and spiritual awakening.
          </p>
        </div>
      </div>

      <hr className="decor-divider fade-in" />

      <p className="fade-in outro-text">
        Performing or attending a Yagna at the <strong>Ayyappa Swamy Temple</strong> is a sacred experience that uplifts the soul
        and cleanses the heart. Each flame, mantra, and offering carries divine blessings, transforming prayers into spiritual power.
      </p>
    </section>
  );
};

export default Yagnas;
