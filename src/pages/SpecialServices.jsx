import React from 'react';
// Import your CSS file
import './SpecialServices.css'; 


const SPECIAL_SEVAS_DATA = [
   
    {
        name: "Padi Pooja",
        highlight: "Premium Service",
        purpose: "Worship of the 18 Holy Steps. Honors the spiritual path, bringing protection and fortune.",
        description: "The Pathinettam Padi (18 sacred steps) are considered the heart of Ayyappa worship. Each step represents a human quality to be transcended on the path to realization. During the Padi Pooja, the steps are adorned with flowers, lamps, and sandal paste while priests chant sacred hymns. Witnessing this ritual fills devotees with humility and divine energy, reminding them of life’s spiritual journey toward liberation. This service requires **advance booking**.",
        imageSrc: "/images/download.webp",
        imageAlt: "Devotees performing Padi Pooja on the 18 Holy Steps",
        buttonText: "Advance Booking",
        buttonClass: "primary",
        rowClass: "grand",
        reverse: false
    },
    {
        name: "Udayasthamana Pooja",
        highlight: "Grand Offering",
        purpose: "All-inclusive, comprehensive worship performed from Sunrise to Sunset. Highly effective for fulfilling major wishes.",
        description: "‘Udayasthamaya’ literally means from <b>sunrise to sunset</b>. This is an all-encompassing worship conducted from dawn to dusk (from Nirmalyam to Athazha pooja). It includes **18 separate Poojas**, making it a truly expansive offering for the day. Due to the elaborate arrangements needed, this Pooja is conducted only on certain auspicious days.",
        imageSrc: "udyaspuja.webp",
        imageAlt: "Ritual with a thousand pots of sacred water",
        buttonText: "Advance Booking",
        buttonClass: "secondary",
        rowClass: "grand",
        reverse: false
    },
    {
        name: "Pushpabhishekam",
        highlight: "Abhisekham 🔥",
        purpose: "Ceremonial showering of flowers upon Lord Ayyappa, believed to bring beauty, purity, and divine grace.",
        description: "Pushpabhishekam involves the ceremonial showering of flowers upon Lord Ayyappa. A variety of flowers and leaves, including jasmine, Tulsi (basil), chrysanthemum, lotus, and bilva leaves, are showered on the idol. This beautiful ritual is a vibrant expression of devotion and is highly sought after by devotees.",
        imageSrc: "/images/ppp.jpg",
        imageAlt: "Ceremonial showering of flowers on the deity",
        buttonText: "Advance Booking",
        buttonClass: "tertiary",
        rowClass: "homa",
        reverse: true
    },
    {
        name: "Kalabhabhishekam",
        highlight: "Aesthetic Focus",
        purpose: "Consecration of the idol with Sandalwood paste and saffron. Believed to bring **prosperity, health, and cooling energy** to the temple.",
        description: "Kalabhabhishekam is a very important special pooja performed for the strengthening of the **chaithanya** (radiance) of the deity. As part of this ritual, the Tantri performs the Kalabhakalasa pooja at the Nalambalam in the presence of the Melshanti (chief priest). This offering highlights the beauty and purity of the sandalwood paste.",
        imageSrc: "/images/abhisekam.jpg",
        imageAlt: "Ritual with a thousand pots of sacred water",
        buttonText: "Advance Booking",
        buttonClass: "tertiary",
        rowClass: "aesthetic",
        reverse: false
    },
    {
        name: "Vedi Vazhipadu",
        highlight: "Traditional Feature",
        purpose: "The Firecracker Offering (sound offering). Believed to ward off evil influences and signify the offering of one's ego to the Lord.",
        description: "This unique, powerful, and traditional offering involves the ceremonial explosion of firecrackers. The loud spiritual sound is believed to ensure protection and the warding off of negative energies. It symbolizes the devotee's offering of their ego and attachment to the Divine fire.",
        imageSrc: "ulsavabali.webp",
        imageAlt: "Priests performing a grand ritual with firecrackers",
        buttonText: "Advance Booking",
        buttonClass: "tertiary",
        rowClass: "grand",
        reverse: true
    },
    {
        name: "Laksharchana",
        highlight: "Archana",
        purpose: "A major collective prayer performed for family welfare, removal of obstacles, and overall collective well-being.",
        description: "'Archana’ refers to the act of chanting and honouring the Divine name. <b>Laksharchana</b> denotes the practice of collectively repeating the Lord's name 100,000 times (one lakh). The Tantri, accompanied by the chief priest and other priests, conducts this powerful ceremony. The special <b>Brahmakalasam</b> used in the ritual is ceremonially carried for the final \"abhishekam\" prior to the Uchapooja.",
        imageSrc: "laksharchana.webp",
        imageAlt: "Priests performing a grand chanting and floral ritual",
        buttonText: "Advance Booking",
        buttonClass: "tertiary",
        rowClass: "grand",
        reverse: false
    },
    {
        name: "Annadanam 🙏",
        highlight: "Charity Link (Highest Daanam)",
        purpose: "The sacred act of feeding devotees and the needy. Considered the highest form of Daanam (charity), securing boundless Punya (merit).",
        description: "Your contribution directly sustains life and earns immense spiritual merit. Annadanam is the selfless offering of food, which fulfills the most basic need and brings immediate relief, hence earning the greatest spiritual reward in all Hindu scriptures.",
        imageSrc: "OIP (12).webp",
        imageAlt: "Annadanam Food Offering",
        buttonText: "Contribute to Annadanam Today!",
        buttonClass: "annadanam-button",
        rowClass: "aesthetic annadanam-seva",
        reverse: true
    },
];

// Helper function for button clicks (Remains the same)
const handleBooking = (sevaName) => {
    alert(`Initiating booking/contribution for ${sevaName}...`);
};





function SpecialServices() {
    return (
        
        <div className="container">
            {SPECIAL_SEVAS_DATA.map((seva, index) => {
                const rowClassName = `seva-detail-row ${seva.rowClass} ${seva.reverse ? 'reverse-layout' : ''}`;
                
                return (
                    <div className={rowClassName} key={index}>
                        
                        <div className="seva-media">
                            <img 
                                src={seva.imageSrc} 
                                alt={seva.imageAlt} 
                                className="detail-image" 
                            />
                        </div>

                        
                        <div className="seva-content">
                            <div className="content-header">
                                <h2>{seva.name}</h2>
                                <span className="highlight">{seva.highlight}</span>
                            </div>
                            <p className="purpose">{seva.purpose}</p>
                            
                            <div className="content-feature">
                                <p dangerouslySetInnerHTML={{ __html: seva.description }}></p>
                                
                                <button 
                                    className={`action-button ${seva.buttonClass}`}
                                    onClick={() => handleBooking(seva.name)}
                                >
                                    {seva.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default SpecialServices;