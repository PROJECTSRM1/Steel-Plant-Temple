import React, { useRef } from "react";
import "./SpecialDonationSuccess.css";

const DonationSuccess = ({ details, onClose }) => {
  const receiptRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [document.getElementById("receipt").innerText],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "Donation_Receipt.txt";
    element.click();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" id="receipt" ref={receiptRef}>
        <h2>🙏 Donation Successful!</h2>
        <p><strong>Seva:</strong> {details.sevaName}</p>
        <p><strong>Donor:</strong> {details.donorName}</p>
        <p><strong>Amount:</strong> ₹{details.amount}</p>
        <p><strong>Receipt No:</strong> AYSP-{Math.floor(Math.random() * 100000)}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>

        <div className="popup-actions">
          <button onClick={handlePrint}>🖨 Print</button>
          <button onClick={handleDownload}>⬇ Download</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;
