import React, { useState } from 'react';

// Static donation schemes
const donationSchemes = [
    { id: 'general-fund', name: 'General Temple Fund (Default)' },
    { id: 'annadanam', name: 'Annadanam Seva (Food Donation)' },
    { id: 'temple-maintenance', name: 'Temple Maintenance Fund' },
    { id: 'goshala-seva', name: 'Goshala Seva (Cow Care)' },
    { id: 'pooja_samagri', name: 'Pooja Samagri (Ritual Items)' },
    { id: 'mala_alankaram', name: 'Garland & Ornamentation Fund' },
];

const OfflineDonations = () => {
    const [selectedTransferMethod, setSelectedTransferMethod] = useState('upi'); 
    const [transferMethodDetails, setTransferMethodDetails] = useState({
        upiIdUsed: '',
        bankAcctNameUsed: '',
        bankAcctNumberUsed: '',
        templeAcctNumberUsed: '',
        templeIfscUsed: '',
    });

    const [formData, setFormData] = useState({
        donorName: '',
        amount: '',
        transferDate: '',
        transferTime: '',
        transactionRef: '',
        fullAddress: '',
        donationScheme: 'general-fund',
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

    const handleTransferDetailChange = (e) => {
        const { name, value } = e.target;
        setTransferMethodDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleMethodSelect = (method) => {
        setSelectedTransferMethod(method);
        setFormData(prev => ({ ...prev, transactionRef: '' })); 
    };

    // --- UPDATED handleSubmit to POST to .NET backend ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);

        if (!formData.proofAvailable) {
            setIsSubmitting(false);
            setSubmissionStatus('error:proof');
            return;
        }

        const payload = {
            ...formData,
            selectedTransferMethod,
            methodDetails: transferMethodDetails,
        };

        try {
            const response = await fetch("https://localhost:7029/api/offlinedonations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmissionStatus('success');
                // Clear form after successful submission
                setFormData({
                    donorName: '', amount: '', transferDate: '', transferTime: '',
                    transactionRef: '', fullAddress: '', donationScheme: 'general-fund',
                    proofAvailable: false,
                });
                setTransferMethodDetails({ 
                    upiIdUsed: '', bankAcctNameUsed: '', bankAcctNumberUsed: '',
                    templeAcctNumberUsed: '', templeIfscUsed: '',
                });
            } else {
                console.error(data);
                setSubmissionStatus('error:general');
            }
        } catch (error) {
            console.error(error);
            setSubmissionStatus('error:general');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reusable form field component
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

    const renderTransferDetails = () => {
        switch (selectedTransferMethod) {
            case 'upi':
                return (
                    <>
                        <h4>UPI Details (GPay, PhonePe, Paytm, etc.)</h4>
                        <p className="temple-detail-label">Temple UPI ID to Pay: <code className="highlight-code">ayyappaswamy@upi</code></p>
                        <TransferDetailField
                            label="Your UPI ID/Phone No. Used for Payment"
                            name="upiIdUsed"
                            value={transferMethodDetails.upiIdUsed}
                            placeholder="e.g., myid@okbank or 9876543210"
                        />
                        <p className="note-text mt-3"><b>Reference for Section 2</b> Use the UPI Transaction ID for the Transaction Reference field below.</p>
                    </>
                );
            case 'bank':
                return (
                    <>
                        <h4>Bank Account Transfer (NEFT/RTGS/IMPS)</h4>
                        <p className="temple-detail-label">Temple A/c Name: <b>SRI AYYAPPA SWAMY TEMPLE TRUST</b></p>
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
                        <p className="note-text mt-3">Reference for Section 2: Use the <b>UTR/IMPS Reference Number</b> for the Transaction Reference field below.</p>
                    </>
                );
            case 'cash':
                return (
                    <>
                        <h4>In-Person (Cash/Hundi) Donation</h4>
                        <p><strong>Location:</strong> Temple Administration Office or Designated Hundi.</p>
                        <p className="note-text">Instruction: Enter the official <b>Receipt Number</b> as the Transaction Reference.</p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <section id="offline-donations" className="section container">
            <h2 className="title-seva">Offline Donation Receipt Request</h2>
            <p className="description-text">
                Swamiye Saranam Ayyappa! Register your donation to receive a receipt.
            </p>

            <div className="donation-grid-offline">
                <div className="instruction-box">
                    <h3>1. Select Your Payment Method & Confirm Details</h3>
                    <div className="method-selection-group">
                        <button 
                            type="button" 
                            className={`btn-method ${selectedTransferMethod === 'upi' ? 'active' : ''}`}
                            onClick={() => handleMethodSelect('upi')}
                        >
                            📱 UPI
                        </button>
                        <button 
                            type="button" 
                            className={`btn-method ${selectedTransferMethod === 'bank' ? 'active' : ''}`}
                            onClick={() => handleMethodSelect('bank')}
                        >
                            🏦 Bank
                        </button>
                        <button 
                            type="button" 
                            className={`btn-method ${selectedTransferMethod === 'cash' ? 'active' : ''}`}
                            onClick={() => handleMethodSelect('cash')}
                        >
                            💰 Cash
                        </button>
                    </div>
                    <div className="transfer-details-display mt-4">
                        {renderTransferDetails()}
                    </div>
                </div>

                <div className="donation-form-card card">
                    <h3>2. Submit Transaction Details for Receipt</h3>

                    {submissionStatus === 'success' && (
                        <div className="alert-success">
                            Success! Your details for the **{selectedTransferMethod.toUpperCase()}** payment have been received.
                        </div>
                    )}
                    {submissionStatus === 'error:general' && (
                        <div className="alert-error">Error submitting details. Ensure all required fields are filled.</div>
                    )}
                    {submissionStatus === 'error:proof' && (
                        <div className="alert-error">**Mandatory!** Confirm you have the screenshot/receipt proof.</div>
                    )}

                    <form onSubmit={handleSubmit} className="offline-form">
                        <FormField label="Donor Full Name" name="donorName" />
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

                        <h4>Transaction Proof Details:</h4>
                        <FormField 
                            label={`Transaction Ref No. (${selectedTransferMethod === 'cash' ? 'Receipt No.' : 'UTR/UPI Ref'})`} 
                            name="transactionRef" 
                        />

                        {selectedTransferMethod !== 'cash' && (
                            <div className="form-row">
                                <FormField label="Transfer Date" name="transferDate" type="date" />
                                <FormField label="Transfer Time (Approx)" name="transferTime" type="time" required={false} />
                            </div>
                        )}

                        <FormField label="Full Address" name="fullAddress" required={false}>
                            <textarea 
                                id="fullAddress" 
                                name="fullAddress" 
                                value={formData.fullAddress} 
                                onChange={handleInputChange}
                                rows="3"
                                className="form-textarea"
                            />
                        </FormField>

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
                                <span className="required-star">*</span> I confirm I have the required **Screenshot/Receipt**.
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
