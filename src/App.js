import React, { useState } from "react";
import SidePanel from "./components/SidePanel";
import TopPanel from "./components/TopPanel";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <Router>
      <div className="App">
        <TopPanel /> {/* Render the TopPanel component */}
        <button className="side-panel-button" onClick={togglePanel}>
          {isPanelOpen ? (
            <i className="bi bi-dash-lg"></i>
          ) : (
            <i className="bi bi-plus-lg"></i>
          )}
        </button>
        {isPanelOpen && <SidePanel />}
        <div className={`content ${isPanelOpen ? "expanded" : ""}`}>
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
