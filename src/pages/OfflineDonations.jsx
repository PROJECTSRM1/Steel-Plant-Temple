// src/pages/OfflineDonations.jsx
import React, { useState } from 'react';


// Static list of donation schemes
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
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // ✅ FIXED: Allow multi-digit numeric input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Restrict non-numeric input for numeric fields
    if (['amount', 'transactionRef'].includes(name)) {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTransferDetailChange = (e) => {
    const { name, value } = e.target;
    setTransferMethodDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleMethodSelect = (method) => {
    setSelectedTransferMethod(method);
    setFormData((prev) => ({ ...prev, transactionRef: '' }));
  };

  const handleSubmit = (e) => {
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

    console.log('Submitting Offline Transaction Details:', payload);

    setTimeout(() => {
      setIsSubmitting(false);
      if (formData.donorName && formData.transactionRef) {
        setSubmissionStatus('success');
        setFormData({
          donorName: '',
          amount: '',
          transferDate: '',
          transferTime: '',
          transactionRef: '',
          fullAddress: '',
          donationScheme: 'general-fund',
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

  // ✅ FIXED: Improved numeric input handling
  const FormField = ({ label, name, type = 'text', required = true, children, ...props }) => {
    const inputType = type === 'number' ? 'text' : type;
    const extraProps = type === 'number' ? { inputMode: 'numeric', pattern: '[0-9]*' } : {};

    return (
      <div className="form-group">
        <label htmlFor={name}>
          {label}
          {required && <span className="required-star">*</span>}:
        </label>
        {children ? (
          children
        ) : (
          <input
            type={inputType}
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            required={required}
            className="form-input"
            {...extraProps}
            {...props}
          />
        )}
      </div>
    );
  };

  const TransferDetailField = ({ label, name, value, required = true, type = 'text', ...props }) => (
    <div className="form-group-small">
      <label htmlFor={name}>
        {label}
        {required && <span className="required-star">*</span>}:
      </label>
      <input
        type={type === 'number' ? 'text' : type}
        id={name}
        name={name}
        value={value}
        onChange={handleTransferDetailChange}
        required={required}
        className="form-input"
        inputMode={type === 'number' ? 'numeric' : undefined}
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
            <p className="temple-detail-label">
              Temple UPI ID to Pay: <code className="highlight-code">ayyappaswamy@upi</code>
            </p>
            <TransferDetailField
              label="Your UPI ID/Phone No. Used for Payment"
              name="upiIdUsed"
              value={transferMethodDetails.upiIdUsed}
              placeholder="e.g., myid@okbank or 9876543210"
            />
            <p className="note-text mt-3">
              <b>Reference for Section 2:</b> Use the UPI Transaction ID (usually a 12-digit number) for the
              Transaction Reference field below.
            </p>
          </>
        );

      case 'bank':
        return (
          <>
            <h4>Bank Account Transfer (NEFT/RTGS/IMPS)</h4>
            <p className="temple-detail-label">
              Temple A/c Name: <b>SRI AYYAPPA SWAMY TEMPLE TRUST</b>
            </p>
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
            <p className="note-text mt-3">
              Reference for Section 2: Use the <b>UTR/IMPS Reference Number</b> for the Transaction Reference field
              below.
            </p>
          </>
        );

      case 'cash':
        return (
          <>
            <h4>In-Person (Cash/Hundi) Donation</h4>
            <p>
              <strong>Location:</strong> Temple Administration Office or Designated Hundi.
            </p>
            <p className="note-text">
              Instruction: For cash donations, if you received an official <b>printed receipt</b>, please enter its
              Receipt Number as the Transaction Reference below.
            </p>
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
        Swamiye Saranam Ayyappa! This form is mandatory to register your offline donation and receive a receipt.
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
              <span className="icon">📱</span> UPI (PhonePe, GPay)
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

          <div className="transfer-details-display mt-4">{renderTransferDetails()}</div>
        </div>

        <div className="donation-form-card card">
          <h3>2. Submit Transaction Details for Receipt</h3>

          {submissionStatus === 'success' && (
            <div className="alert-success">
              ✅ Success! Your {selectedTransferMethod.toUpperCase()} details were received. Receipt will be processed
              within 24 hours. Swamiye Saranam Ayyappa!
            </div>
          )}
          {submissionStatus === 'error:general' && (
            <div className="alert-error">❌ Error: Please ensure all required fields are filled correctly.</div>
          )}
          {submissionStatus === 'error:proof' && (
            <div className="alert-error">
              ⚠️ <b>Mandatory:</b> Please confirm you have the screenshot/receipt proof before submitting.
            </div>
          )}

          <form onSubmit={handleSubmit} className="offline-form">
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
                  {donationSchemes.map((scheme) => (
                    <option key={scheme.id} value={scheme.id}>
                      {scheme.name}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <h4>Transaction Proof Details:</h4>
            <FormField
              label={`Transaction Ref No. (${
                selectedTransferMethod === 'cash' ? 'Receipt No.' : 'UTR/UPI Ref'
              })`}
              name="transactionRef"
            />

            {selectedTransferMethod !== 'cash' && (
              <div className="form-row">
                <FormField label="Transfer Date" name="transferDate" type="date" />
                <FormField label="Transfer Time (Approx)" name="transferTime" type="time" required={false} />
              </div>
            )}

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
                <span className="required-star">*</span> I confirm I have the required Screenshot/Receipt ready for
                verification.
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
