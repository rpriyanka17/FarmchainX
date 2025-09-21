import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import axios from "axios";

function ConsumerScanPage() {
  const [scannedData, setScannedData] = useState("");
  const [productTrace, setProductTrace] = useState(null);

  const api = import.meta.env.VITE_API_URL;

  // Handle QR scan result
  const handleScan = async (data) => {
    if (data && data.text) {
      setScannedData(data.text);

      try {
        const res = await axios.get(`${api}/api/supplychain/${data.text}/trace`);
        setProductTrace(res.data);
      } catch (err) {
        console.error("Error fetching trace:", err);
        alert("Failed to fetch product trace!");
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Consumer – Scan QR Code</h1>

      <QrScanner
        delay={300}
        style={{ width: "100%" }}
        onError={handleError}
        onScan={handleScan}
        constraints={{ facingMode: "environment" }}
      />

      {scannedData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Scanned Product ID:</h2>
          <p>{scannedData}</p>
        </div>
      )}

      {productTrace && (
        <div style={{ marginTop: "20px" }}>
          <h2>Product Supply Chain Trace</h2>
          <pre>{JSON.stringify(productTrace, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ConsumerScanPage;
