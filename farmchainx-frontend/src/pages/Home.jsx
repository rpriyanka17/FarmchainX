import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="hero-title">Welcome to FarmChainX 🌱</h1>
      <p className="hero-subtitle">
        A blockchain-powered marketplace connecting <b>farmers</b>,{" "}
        <b>distributors</b>, and <b>consumers</b>. Secure, transparent, and
        sustainable.
      </p>

      <div className="hero-buttons">
        <Link to="/register" className="btn-primary">Get Started</Link>
        <Link to="/login" className="btn-outline">Login</Link>
      </div>
    </div>
  );
}
