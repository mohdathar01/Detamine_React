import React from "react";
import { Link } from "react-router-dom";

const BottomNav = ({ active }) => {
  return (
    <nav className="bottom-nav">
      <div className="nav-container">

        <Link to="/dashboard" className={`nav-item ${active === "dashboard" ? "active" : ""}`}>
          <div className={`nav-icon ${active === "dashboard" ? "gradient" : ""}`}>
                        {/* <!-- Dashboard Icon --> */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="9" rx="1"></rect>
                            <rect x="14" y="3" width="7" height="5" rx="1"></rect>
                            <rect x="14" y="12" width="7" height="9" rx="1"></rect>
                            <rect x="3" y="16" width="7" height="5" rx="1"></rect>
                        </svg>
                    </div> 
          <span>Dashboard</span>
         
        </Link>

        <Link to="/generation" className={`nav-item ${active === "generation" ? "active" : ""}`}>
        <div className={`nav-icon ${active === "generation" ? "gradient" : ""}`}>
                       
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        </svg>
                    </div>
       
          <span>Generation</span>
        </Link>
        <Link to="/rank" className={`nav-item ${active === "rank" ? "active" : ""}`}>
        <div className={`nav-icon ${active === "rank" ? "gradient" : ""}`}>
                       
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        </svg>
                    </div>
       
          <span>Rank</span>
        </Link>

        <Link to="/team" className={`nav-item ${active === "team" ? "active" : ""}`}>
         <div className={`nav-icon ${active === "team" ? "gradient" : ""}`}>
                        {/* <!-- History Icon --> */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12a9 9 0 1 0 9-9"></path>
                            <path d="M3 3v5h5"></path>
                            <path d="M12 7v5l4 2"></path>
                        </svg>
                    </div>
          <span>Teams</span>
        </Link>

        <Link to="/wallet" className={`nav-item ${active === "wallet" ? "active" : ""}`}>
        <div className={`nav-icon ${active === "wallet" ? "gradient" : ""}`} >
                        {/* <!-- Wallet Icon --> */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 7V4H5a2 2 0 0 0 0 4h14"></path>
                            <path d="M3 5v14a2 2 0 0 0 2 2h14"></path>
                            <path d="M21 12h-3a2 2 0 0 0 0 4h3"></path>
                        </svg>
                    </div>
          <span>Wallet</span>
        </Link>

      </div>
    </nav>
  );
};

export default BottomNav;
