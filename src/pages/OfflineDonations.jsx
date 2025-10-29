// src/pages/OfflineDonations.jsx
import React, { useState } from 'react';
import './OfflineDonations.css';

// Define the static list of donation schemes (useful for a dropdown in the form)
const donationSchemes = [
    { id: 'general-fund', name: 'General Temple Fund (Default)' },
    { id: 'annadanam', name: 'Annadanam Seva (Food Donation)' },
    { id: 'temple-maintenance', name: 'Temple Maintenance Fund' },
    { id: 'goshala-seva', name: 'Goshala Seva (Cow Care)' },
    { id: 'pooja_samagri', name: 'Pooja Samagri (Ritual Items)' },
    { id: 'mala_alankaram', name: 'Garland & Ornamentation Fund' },
];

const OfflineDonations = () => {
    // State to track which payment method the user used externally
    const [selectedTransferMethod, setSelectedTransferMethod] = useState('upi'); 
    
    // UPDATED STATE: To hold all details, including the specific Temple A/c/IFSC used (if multiple are available)
    const [transferMethodDetails, setTransferMethodDetails] = useState({
        upiIdUsed: '',
        bankAcctNameUsed: '',
        bankAcctNumberUsed: '',
        // NEW FIELDS ADDED
        templeAcctNumberUsed: '', // Donor confirms which temple account they paid into
        templeIfscUsed: '',       // Donor confirms which temple IFSC they paid into
    });

    const [formData, setFormData] = useState({
        donorName: '',
        amount: '',
        transferDate: '',
        transferTime: '',
        transactionRef: '', // UTR/UPI Ref or Receipt No.
        fullAddress: '',
        donationScheme: 'general-fund',
        // Field to confirm proof is available
        proofAvailable: false, 
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    // HANDLER: For fields within the transfer method details section (Section 1)
    const handleTransferDetailChange = (e) => {
        const { name, value } = e.target;
        setTransferMethodDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleMethodSelect = (method) => {
        setSelectedTransferMethod(method);
        // Clear transaction ref when method changes to prevent mismatched data
        setFormData(prev => ({ ...prev, transactionRef: '' })); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);

        // Basic validation check
        if (!formData.proofAvailable) {
            setIsSubmitting(false);
            setSubmissionStatus('error:proof');
            return;
        }

        const payload = {
            ...formData,
            selectedTransferMethod,
            methodDetails: transferMethodDetails, // Include the method details
        };

        console.log("Submitting Offline Transaction Details:", payload);

        // --- PLACEHOLDER SUBMISSION LOGIC ---
        setTimeout(() => {
            setIsSubmitting(false);
            
            if (formData.donorName && formData.transactionRef) {
                setSubmissionStatus('success');
                // Clear form for a new entry
                setFormData({
                    donorName: '', amount: '', transferDate: '', transferTime: '',
                    transactionRef: '', fullAddress: '', donationScheme: 'general-fund',
                    proofAvailable: false,
                });
                setTransferMethodDetails({ 
                    upiIdUsed: '', 
                    bankAcctNameUsed: '', 
                    bankAcctNumberUsed: '',
                    templeAcctNumberUsed: '', 
                    templeIfscUsed: '',       
                });
            } else {
                setSubmissionStatus('error:general');
            }
        }, 2000);
    };

    // Helper component to render form fields
    const FormField = ({ label, name, type = 'text', required = true, children, ...props }) => (
        <div className="form-group">
            <label htmlFor={name}>{label}{required && <span className="required-star">*</span>}:</label>
            {children ? children : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    required={required}
                    className="form-input"
                    {...props}
                />
            )}
        </div>
    );
    
    // Custom Form Field for Transfer Details (Section 1)
    const TransferDetailField = ({ label, name, value, required = true, type = 'text', ...props }) => (
        <div className="form-group-small">
            <label htmlFor={name}>{label}{required && <span className="required-star">*</span>}:</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={handleTransferDetailChange}
                required={required}
                className="form-input"
                {...props}
            />
        </div>
    );


    // Dynamic content for the instruction box based on method selection
    const renderTransferDetails = () => {
        switch (selectedTransferMethod) {
            case 'upi':
                return (
                    <>
                        <h4>UPI Details (GPay, PhonePe, Paytm, etc.)</h4>
                        
                        {/* Temple Details (Static) */}
                        <p className="temple-detail-label">Temple UPI ID to Pay: <code className="highlight-code">ayyappaswamy@upi</code></p>
                        
                        {/* User Input Field */}
                        <TransferDetailField
                            label="Your UPI ID/Phone No. Used for Payment"
                            name="upiIdUsed"
                            value={transferMethodDetails.upiIdUsed}
                            placeholder="e.g., myid@okbank or 9876543210"
                        />
                        
                        {/* Reference for Section 2 Instruction */}
                        <p className="note-text mt-3"><b>Reference for Section 2</b> Use the UPI Transaction ID(usually a 12-digit number) for the Transaction Reference field below.</p>
                    </>
                );
            case 'bank':
                return (
                    <>
                        <h4>Bank Account Transfer (NEFT/RTGS/IMPS)</h4>
                        
                        {/* Temple Details (Static) - UPDATED LINE BELOW */}
                        <p className="temple-detail-label">Temple A/c Name: <b>SRI AYYAPPA SWAMY TEMPLE TRUST</b></p>
                        {/* UPDATED: Now includes input fields for the specific Temple A/c No. and IFSC the donor used,
                            as implied by the images showing these fields were needed for user input.
                        */}
                        <TransferDetailField
                            label="Temple A/c No. Used"
                            name="templeAcctNumberUsed"
                            value={transferMethodDetails.templeAcctNumberUsed}
                            placeholder="[Official Account Number]"
                        />
                        <TransferDetailField
                            label="Temple IFSC Code Used"
                            name="templeIfscUsed"
                            value={transferMethodDetails.templeIfscUsed}
                            placeholder="[Official IFSC Code]"
                        />

                        {/* Donor's Account Details */}
                        <TransferDetailField
                            label="Your Bank A/c Name (Used to Transfer)"
                            name="bankAcctNameUsed"
                            value={transferMethodDetails.bankAcctNameUsed}
                        />
                        <TransferDetailField
                            label="Your Bank A/c Number (Used to Transfer)"
                            name="bankAcctNumberUsed"
                            value={transferMethodDetails.bankAcctNumberUsed}
                        />

                        {/* Reference for Section 2 Instruction */}
                        <p className="note-text mt-3">Reference for Section 2: Use the <b>UTR/IMPS Reference Number</b> for the Transaction Reference field below.</p>
                    </>
                );
            case 'cash':
                return (
                    <>
                        <h4>In-Person (Cash/Hundi) Donation</h4>
                        <p><strong>Location:</strong> Temple Administration Office or Designated Hundi.</p>
                        {/* Instruction for Receipt Number */}
                        <p className="note-text">Instruction: For cash donations, if you received an official <b>serialized, printed receipt</b> from the office counter, you are required to enter its **Receipt Number** as the Transaction Reference in Section 2.</p>
                        
                    </>
                );
            default:
                return null;
        }
    };


    return (
        <section id="offline-donations" className="section container">
            
            {/* --- SECTION HEADER --- */}
            <h2 className="title-seva">Offline Donation Receipt Request</h2>
            <p className="description-text">
                Swamiye Saranam Ayyappa! This form is the mandatory step to register your donation and receive a receipt after you have made an external payment.
            </p>

            <div className="donation-grid-offline">
                
                {/* --- 1. PAYMENT METHOD SELECTION & DETAILS CARD --- */}
                <div className="instruction-box">
                    <h3>1. Select Your Payment Method & Confirm Details</h3>
                    
                    <div className="method-selection-group">
                        <button 
                            type="button" 
                            className={`btn-method ${selectedTransferMethod === 'upi' ? 'active' : ''}`}
                            onClick={() => handleMethodSelect('upi')}
                        >
                            <span className="icon">📱</span> UPI (PhonePe, GPay, etc.)
                        </button>
                        <button 
                            type="button" 
                            className={`btn-method ${selectedTransferMethod === 'bank' ? 'active' : ''}`}
                            onClick={() => handleMethodSelect('bank')}
                        >
                            <span className="icon">🏦</span> Bank Transfer (NEFT/RTGS)
                        </button>
                        <button 
                            type="button" 
                            className={`btn-method ${selectedTransferMethod === 'cash' ? 'active' : ''}`}
                            onClick={() => handleMethodSelect('cash')}
                        >
                            <span className="icon">💰</span> Cash / Temple Hundi
                        </button>
                    </div>

                    <div className="transfer-details-display mt-4">
                        {renderTransferDetails()}
                    </div>
                </div>

                {/* --- 2. OFFLINE TRANSACTION DETAIL FORM --- */}
                <div className="donation-form-card card">
                    <h3>2. Submit Transaction Details for Receipt</h3>
                    
                    {/* Submission Status Message */}
                    {submissionStatus === 'success' && (
                        <div className="alert-success">
                            Success! Your details for the **{selectedTransferMethod.toUpperCase()}** payment have been received. We will process your receipt within 24 hours. Swamiye Saranam Ayyappa!
                        </div>
                    )}
                    {submissionStatus === 'error:general' && (
                        <div className="alert-error">
                            Error submitting details. Please ensure all required fields are filled.
                        </div>
                    )}
                    {submissionStatus === 'error:proof' && (
                        <div className="alert-error">
                            **Mandatory!** Please confirm you have the screenshot/receipt proof before submitting.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="offline-form">
                        
                        {/* Donor Information */}
                        <FormField label="Donor Full Name (For Receipt/Sankalpa)" name="donorName" />
                        
                        <div className="form-row">
                            <FormField label="Amount Donated (₹)" name="amount" type="number" min="1" />
                            <FormField label="Donation Scheme" name="donationScheme" required={false}>
                                <select 
                                    id="donationScheme" 
                                    name="donationScheme" 
                                    value={formData.donationScheme} 
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    {donationSchemes.map(scheme => (
                                        <option key={scheme.id} value={scheme.id}>{scheme.name}</option>
                                    ))}
                                </select>
                            </FormField>
                        </div>

                        {/* Transaction Details */}
                        <h4>Transaction Proof Details:</h4>
                        <FormField 
                            // Dynamically update the label based on the selected method
                            label={`Transaction Ref No. (${selectedTransferMethod === 'cash' ? 'Receipt No.' : 'UTR/UPI Ref'})`} 
                            name="transactionRef" 
                        />

                        {/* Date and Time are only relevant for electronic transfers */}
                        {selectedTransferMethod !== 'cash' && (
                            <div className="form-row">
                                <FormField label="Transfer Date" name="transferDate" type="date" />
                                <FormField label="Transfer Time (Approx)" name="transferTime" type="time" required={false} />
                            </div>
                        )}

                        {/* Address */}
                        <FormField label="Full Address (For Physical Receipt/Prasad mailing)" name="fullAddress" required={false}>
                            <textarea 
                                id="fullAddress" 
                                name="fullAddress" 
                                value={formData.fullAddress} 
                                onChange={handleInputChange}
                                rows="3"
                                className="form-textarea"
                            />
                        </FormField>
                        
                        {/* Proof Confirmation Checkbox */}
                        <div className="form-group proof-checkbox-group">
                            <input 
                                type="checkbox" 
                                id="proofAvailable" 
                                name="proofAvailable" 
                                checked={formData.proofAvailable}
                                onChange={handleInputChange}
                                required
                                className="form-checkbox"
                            />
                            <label htmlFor="proofAvailable" className="checkbox-label">
                                <span className="required-star">*</span> I confirm I have the required **Screenshot/Receipt** ready for verification.
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            className="btn-submit" 
                            disabled={isSubmitting || !formData.proofAvailable}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Transaction Details'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default OfflineDonations;