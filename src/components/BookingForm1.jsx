import React, { useEffect, useState } from 'react';
// Import 'useLocation' to access the 'state' passed during navigation
import { useLocation } from 'react-router-dom';
// Import your CSS file for styling the form
import './BookingForm1.css'; 

function BookingForm1() {
    // 1. Use 'useLocation' hook to access the data passed via 'navigate'
    const location = useLocation();
    // Safely get the sevaName from the state, defaulting to 'A Special Service'
    const sevaName = location.state?.sevaName || 'A Special Service';

    // 2. State to manage form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        sevaDate: '',
        sevaName: sevaName, // Pre-fill the selected service name
    });

    // Optional: Update the document title for better user experience
    useEffect(() => {
        document.title = `Book ${sevaName} | Registration`;
    }, [sevaName]);

    // 3. Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 4. Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // **TODO: Add logic here to send data to an API or handle the booking**
        console.log('Booking submitted for:', formData.sevaName);
        console.log('Form Data:', formData);
        
        // For demonstration: show an alert and reset the form
        alert(`Thank you, ${formData.name}! Your booking request for ${formData.sevaName} has been received.`);
        setFormData({
            name: '',
            email: '',
            phone: '',
            sevaDate: '',
            sevaName: sevaName,
        });
    };

    return (
        <div className="booking-form-container">
            <h1>Registration for **{sevaName}**</h1>
            <p className="sub-header">Please fill in your details to complete your booking.</p>
            
            <form onSubmit={handleSubmit} className="booking-form">
                
                {/* Display the selected service (read-only) */}
                <div className="form-group">
                    <label htmlFor="sevaName">Service Selected</label>
                    <input 
                        type="text" 
                        id="sevaName" 
                        name="sevaName" 
                        value={formData.sevaName} 
                        readOnly // Read-only field
                        className="read-only-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Your Full Name **(Required)**</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address **(Required)**</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="e.g., yourname@example.com"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g., +91 98765 43210"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="sevaDate">Preferred Date for Seva **(Optional)**</label>
                    <input 
                        type="date" 
                        id="sevaDate" 
                        name="sevaDate" 
                        value={formData.sevaDate}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-button">
                    Complete Registration
                </button>
            </form>
        </div>
    );
}

export default BookingForm1;