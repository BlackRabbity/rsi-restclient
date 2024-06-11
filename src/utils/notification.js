import React from 'react';
import '../styles/Notification.css';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      {message}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Notification;