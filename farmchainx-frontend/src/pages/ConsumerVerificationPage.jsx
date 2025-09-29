import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./ConsumerVerificationPage.css";

export default function ConsumerVerificationPage() {
  const qrRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [productTrace, setProductTrace] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const html5QrCodeRef = useRef(null);

  const startScanner = () => {
    setShowScanner(true);
  };

  // Start QR scanner when showScanner is true
  useEffect(() => {
    if (!showScanner) return;

    const qrCodeDivId = "qr-reader";
    html5QrCodeRef.current = new Html5Qrcode(qrCodeDivId);

    html5QrCodeRef.current.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        setScannedData(decodedText);
        setShowScanner(false);

        // Mock trace for frontend demo
        setProductTrace([
          { stage: "Farmer", location: "Farm A", date: "2025-09-29" },
          { stage: "Distributor", location: "Warehouse B", date: "2025-09-30" },
          { stage: "Retailer", location: "Shop C", date: "2025-10-01" },
        ]);

        html5QrCodeRef.current.stop().catch(() => {});
      },
      (errorMessage) => console.warn("QR scan error:", errorMessage)
    );

    return () => {
      if (html5QrCodeRef.current) html5QrCodeRef.current.stop().catch(() => {});
    };
  }, [showScanner]);

  const submitFeedback = () => {
    // Show popup immediately
    setSubmitted(true);
    setShowModal(true);

    console.log({
      productId: scannedData || "N/A",
      rating,
      feedback,
    });

    // Reset inputs if you want
    setRating(0);
    setFeedback("");
    setScannedData(null);
    setProductTrace(null);
  };

  const rescanProduct = () => {
    setScannedData(null);
    setProductTrace(null);
    setRating(0);
    setFeedback("");
    setSubmitted(false);
    setShowScanner(true);
  };

  return (
    <div className="verification-container">
      <h1>Consumer – Verify Product</h1>

      {/* Feedback & Rating */}
      <div className="feedback-section">
        <h2>Rate & Give Feedback</h2>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "filled" : ""}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button className="submit-btn" onClick={submitFeedback}>
          Submit Feedback
        </button>
      </div>

      {/* Scan / Rescan Buttons */}
      {!scannedData && !showScanner && (
        <button className="scan-btn" onClick={startScanner}>
          Scan Product
        </button>
      )}
      {scannedData && (
        <button className="rescan-btn" onClick={rescanProduct}>
          Rescan Product
        </button>
      )}

      {/* QR Scanner */}
      {showScanner && <div id="qr-reader" className="qr-scanner" ref={qrRef}></div>}

      {/* Scanned Data */}
      {scannedData && (
        <div className="product-info">
          <h2>Product ID:</h2>
          <p>{scannedData}</p>
        </div>
      )}

      {/* Product Trace */}
      {productTrace && (
        <div className="product-trace">
          <h2>Supply Chain Trace</h2>
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Location</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {productTrace.map((stage, idx) => (
                <tr key={idx}>
                  <td>{stage.stage}</td>
                  <td>{stage.location}</td>
                  <td>{stage.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal">
            <h3>Feedback Submitted!</h3>
            <p>Thank you for rating and providing feedback.</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
