// src/components/Modal.jsx
import "./Modal.css";

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{title}</h2>
        <div className="modal-content">{children}</div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
