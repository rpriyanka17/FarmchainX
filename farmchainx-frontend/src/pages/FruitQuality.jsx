import React, { useState } from "react";
import axios from "axios";
import "./FruitQuality.css";

export default function FruitQuality() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(""); // clear previous result
  };

  const handleUpload = async () => {
    if (!file) {
      setResult("⚠️ Please select an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:8000/predict/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { label, confidence } = res.data;
      setResult(`${label} (${confidence}% confidence)`);
    } catch (err) {
      console.error(err);
      setResult("❌ Error: Could not connect to backend.");
    }
    setLoading(false);
  };

  return (
    <div className="fruit-quality-container">
      <h1 className="title">🍎 AI Quality Classifier</h1>

      <div className="upload-section">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="file-input"
        />

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
        )}

        <button className="predict-btn" onClick={handleUpload} disabled={loading}>
          {loading ? "Predicting..." : "Upload & Predict"}
        </button>
      </div>

      {result && <div className="result-box">{result}</div>}
    </div>
  );
}
