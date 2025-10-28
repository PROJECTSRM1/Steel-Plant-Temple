const DonationSchemes = [
    {
        id: 'annadanam',
        name: 'Annadanam (Sacred Feeding)',
        description: 'Support the daily free meals provided to all devotees and pilgrims.',
        minAmount: 51,
        defaultAmount: 501,
        type: 'annadanam-seva',
        presets: [101, 501, 1001, 5001]
    },
    {
        id: 'temple_maintenance',
        name: 'Temple Maintenance Fund',
        description: 'Contribute to the upkeep, repairs, and infrastructure development of the temple.',
        minAmount: 100,
        defaultAmount: 1000,
        type: 'grand',
        presets: [1000, 2500, 5000, 10000]
    },
    {
        id: 'education_support',
        name: 'Vedic Education & Pathshala',
        description: 'Sponsor the education and boarding of young students learning ancient scriptures.',
        minAmount: 250,
        defaultAmount: 2500,
        type: 'premium-seva',
        presets: [2500, 5000, 11000, 21000]
    },
// ---------------------------------------------------------------------
// --- NEW SCHEMES START HERE ---
// ---------------------------------------------------------------------
    {
        id: 'mala_alankaram',
        name: 'Garland & Ornamentation Fund (Mala Alankaram)',
        description: 'Sponsor fresh flower garlands, silks, and ornaments for the daily decoration of Lord Ayyappa.',
        minAmount: 150,
        defaultAmount: 1500,
        type: 'aesthetic', // New type for decoration/aesthetics
        presets: [500, 1500, 3000, 6000]
    },
    {
        id: 'deepam',
        name: 'Deepam (Oil Lamps & Lighting)',
        description: 'Contribute towards the lighting of eternal lamps and temple electrification for security and ambiance.',
        minAmount: 25,
        defaultAmount: 100,
        type: 'grand', 
        presets: [100, 250, 500, 1000]
    },
    {
        id: 'pooja_samagri',
        name: 'Pooja Samagri (Ritual Items)',
        description: 'Donate for essential daily ritual supplies like ghee (neyy), camphor, incense, sandalwood, and fresh produce.',
        minAmount: 50,
        defaultAmount: 750,
        type: 'premium-seva',
        presets: [250, 750, 1500, 3500]
    },
    {
        id: 'gomata_seva',
        name: 'Gomata Seva (Cow Protection & Care)',
        description: 'Support the shelter, feeding, and medical care of the temple cows (Goshala).',
        minAmount: 100,
        defaultAmount: 1250,
        type: 'annadanam-seva', // Can use the Annadanam styling as it's a charitable cause
        presets: [500, 1250, 2500, 5000]
    },
];

export default DonationSchemes;