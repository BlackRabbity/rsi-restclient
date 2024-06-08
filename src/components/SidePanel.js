import React from 'react';
import './../styles/SidePanel.css';

function SidePanel({ onTabChange }) {
  return (
    <div className="side-panel">
      <div className="logo">
        <img src="/images/logo_transparent.png" alt="LOGO" />
      </div>
      <ul>
        <li>
          <div className="side-options" onClick={() => onTabChange('repertoire')}>
            <i className="bi bi-camera-reels"></i>
            <span>Repertoire</span>
          </div>
        </li>
        <li>
          <div className="side-options" onClick={() => onTabChange('myReservation')}>
            <i className="bi bi-journal-bookmark"></i>
            <span>My reservation</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SidePanel;