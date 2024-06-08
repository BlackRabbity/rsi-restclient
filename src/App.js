import React, { useState } from 'react';
import SidePanel from './components/SidePanel';
import TopPanel from './components/TopPanel';
import Repertoire from './components/Repertoire';
import MyReservation from './components/MyReservation';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('repertoire');

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="App">
      <TopPanel /> {/* Render the TopPanel component */}
      <button onClick={togglePanel}>
        {isPanelOpen ? (
          <i className="bi bi-dash-lg"></i>
        ) : (
          <i className="bi bi-plus-lg"></i>
        )}
      </button>
      {isPanelOpen && <SidePanel onTabChange={handleTabChange} />}
      <div className={`content ${isPanelOpen ? "expanded" : ""}`}>
        {selectedTab === "repertoire" && <Repertoire />}
        {selectedTab === "myReservation" && <MyReservation />}
      </div>
    </div>
  );
}

export default App;