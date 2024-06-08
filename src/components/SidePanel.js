import React from 'react';
import './../styles/SidePanel.css';
import { useNavigate } from 'react-router-dom';

function SidePanel({ onTabChange }) {
const navigate = useNavigate();
  return (
    <div className="side-panel">
      <div className="logo">
        <img src="/images/logo_transparent.png" alt="LOGO" />
      </div>
      <ul>
        <li>
          <div className="side-options" onClick={() => navigate('/repertoire')}>
            <i className="bi bi-camera-reels"></i>
            <span>Repertoire</span>
          </div>
        </li>
        <li>
          <div className="side-options" onClick={() => navigate('/myReservation')}>
            <i className="bi bi-journal-bookmark"></i>
            <span>My reservation</span>
          </div>
        </li>
        <li>
          <div className="side-options" onClick={() => navigate('/login')}>
            <i className="bi bi-key-fill"></i>
            <span>Login</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SidePanel;