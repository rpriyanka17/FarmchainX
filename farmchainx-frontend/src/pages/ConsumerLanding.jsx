import React from "react";
import { useNavigate } from "react-router-dom";
import "./ConsumerLanding.css";
import tomatoImg from "../assets/tomato.png"; // Ensure this exists in assets

export default function ConsumerLanding() {
  const navigate = useNavigate();

  const goToClassifier = () => {
    navigate("/consumer/fruit-quality"); // Redirect to fruit classifier
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Fresh Produce, Direct From Farmers 🌱</h1>
          <p>
            Experience the farm-to-table journey. Discover seasonal fruits and
            vegetables, track your orders, and enjoy the freshest quality.
          </p>
          <button className="cta-btn" onClick={goToClassifier}>
            Explore Now
          </button>
        </div>
        <div className="hero-image">
          <img src={tomatoImg} alt="Fresh produce" />
        </div>
      </section>

      {/* Seasonal Produce Section */}
      <section className="seasonal-produce">
        <h2>🍎 Seasonal Highlights</h2>
        <div className="produce-grid">
          <div className="produce-card">
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTU8W89aGsK2QYB_hVblPGlFpLVbRtb79TtrWQ9DqVUPaKJIEB2hf5o7OiSz1GpvpzEEsJgyn6wf63ISgsLCq26Y88kt-HwKXo49UtU7UiXYA"
              alt="Tomato"
            />
            <h3>Tomatoes</h3>
            <p>Freshly harvested from local farms.</p>
          </div>
          <div className="produce-card">
            <img
              src="https://www.collinsdictionary.com/images/full/apple_158989157.jpg"
              alt="Apple"
            />
            <h3>Apples</h3>
            <p>Sweet, crisp, and juicy — straight from orchards.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose FarmChainX?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Freshness Guaranteed</h3>
            <p>Track produce from farm to your doorstep.</p>
          </div>
          <div className="feature-card">
            <h3>Transparent Supply Chain</h3>
            <p>See exactly where your produce comes from.</p>
          </div>
          <div className="feature-card">
            <h3>Easy Ordering</h3>
            <p>Quick and secure online purchases for your favorite items.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to experience fresh produce?</h2>
        <button className="cta-btn" onClick={goToClassifier}>
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 FarmChainX. All rights reserved.</p>
      </footer>
    </div>
  );
}
