import React from "react";
import "./Cards.css";

const Cards = ({ title, value, color }) => {
  return (
    <div className={`card card-${color}`}>
      <h3 className="card-title">{title}</h3>
      <p className="card-value">{value}</p>
    </div>
  );
};

export default Cards;
