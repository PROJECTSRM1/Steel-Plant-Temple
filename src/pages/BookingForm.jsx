// src/pages/BookingForm.jsx
import React, { useState } from 'react';

// Accept poojaName and onBack as props
function BookingForm({ poojaName, onBack }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Booking Confirmed for ${poojaName}! Details: ${name}, ${phone}. (Simulated)`);
        
        // In a real app, you would navigate to a success page here
        onBack(); // For simulation, navigate back to PoojaServices
    };

    return (
        <div className="pooja-page-content">
            <div className="container" style={{maxWidth: '600px', margin: 'auto', padding: '20px'}}>
                <button onClick={onBack} style={{marginBottom: '20px', padding: '10px 20px', background: '#3b0101', color: 'white', border: 'none', cursor: 'pointer'}}>
                    ← Back to Pooja Services
                </button>
                
                <h2>Book: {poojaName}</h2>
                <p>Please provide your details below to proceed with the booking and payment for the {poojaName} service.</p>
                
                <form onSubmit={handleSubmit} style={{display: 'grid', gap: '15px'}}>
                    <div>
                        <label htmlFor="name" style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            style={{width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc'}}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Phone Number</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            required 
                            style={{width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc'}}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Email (for confirmation)</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            style={{width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc'}}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        style={{padding: '15px', background: '#ffcc33', color: '#3b0101', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1em', marginTop: '10px'}}>
                        Proceed to Payment for {poojaName}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BookingForm;