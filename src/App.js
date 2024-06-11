import React, { useEffect, useState } from "react";
import SidePanel from "./components/SidePanel";
import TopPanel from "./components/TopPanel";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { configureAxiosWithCert } from './utils/readCert';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  // useEffect(() => {
  //   configureAxiosWithCert('../public/certs/cert.cer');
  // }, []);


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
