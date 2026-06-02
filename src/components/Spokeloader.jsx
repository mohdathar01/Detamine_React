import React from "react";
 

 
const loaderStyle = `
  @keyframes spoke-spin {
    to { transform: rotate(360deg); }
  }
  .spoke-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgb(0 0 0 / 63%);
    backdrop-filter: blur(3px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .spoke-wheel {
    animation: spoke-spin 1.2s linear infinite;
    transform-origin: center;
  }
  .spoke-label {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 13px;
    letter-spacing: 0.2em;
    color: #C9A84C;
    text-transform: uppercase;
  }
`;
 
export function SpokeLoader({ message = "Processing claim…" }) {
  return (
    <>
      <style>{loaderStyle}</style>
      <div className="spoke-overlay">
        <div className="d-flex justify-content-center align-items-center gap-2">
            <svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Loading"
        >
          <g className="spoke-wheel" style={{ transformOrigin: "55px 55px" }}>
            {/* Outer black ring */}
            <circle cx="55" cy="55" r="50" fill="none" stroke="#111111" strokeWidth="10" />
 
            {/* Cardinal spokes — Gold */}
            <line x1="55" y1="10"  x2="55" y2="30"  stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" />
            <line x1="55" y1="80"  x2="55" y2="100" stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" />
            <line x1="10" y1="55"  x2="30" y2="55"  stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" />
            <line x1="80" y1="55"  x2="100" y2="55" stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" />
 
            {/* Diagonal spokes — Teal */}
            <line x1="19.6" y1="19.6" x2="33.5" y2="33.5" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
            <line x1="76.5" y1="76.5" x2="90.4" y2="90.4" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
            <line x1="90.4" y1="19.6" x2="76.5" y2="33.5" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
            <line x1="19.6" y1="90.4" x2="33.5" y2="76.5" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
 
            {/* Inner ring border (over spokes) */}
            <circle cx="55" cy="55" r="50" fill="none" stroke="#1a1a1a" strokeWidth="3" />
 
            {/* Hub */}
            <circle cx="55" cy="55" r="22" fill="#1a1a1a" stroke="#C9A84C" strokeWidth="2" />
 
            {/* Core — Gold outer, Teal center */}
            <circle cx="55" cy="55" r="16" fill="#C9A84C" />
            <circle cx="55" cy="55" r="8"  fill="#0D9488" />
          </g>
        </svg>
   <svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Loading"
        >
          <g className="spoke-wheel" style={{ transformOrigin: "55px 55px" }}>
            {/* Outer black ring */}
            <circle cx="55" cy="55" r="50" fill="none" stroke="#111111" strokeWidth="10" />
 
            {/* Cardinal spokes — Gold */}
            <line x1="55" y1="10"  x2="55" y2="30"  stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" />
            <line x1="55" y1="80"  x2="55" y2="100" stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" />
            <line x1="10" y1="55"  x2="30" y2="55"  stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" />
            <line x1="80" y1="55"  x2="100" y2="55" stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" />
 
            {/* Diagonal spokes — Teal */}
            <line x1="19.6" y1="19.6" x2="33.5" y2="33.5" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
            <line x1="76.5" y1="76.5" x2="90.4" y2="90.4" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
            <line x1="90.4" y1="19.6" x2="76.5" y2="33.5" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
            <line x1="19.6" y1="90.4" x2="33.5" y2="76.5" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
 
            {/* Inner ring border (over spokes) */}
            <circle cx="55" cy="55" r="50" fill="none" stroke="#1a1a1a" strokeWidth="3" />
 
            {/* Hub */}
            <circle cx="55" cy="55" r="22" fill="#1a1a1a" stroke="#C9A84C" strokeWidth="2" />
 
            {/* Core — Gold outer, Teal center */}
            <circle cx="55" cy="55" r="16" fill="#C9A84C" />
            <circle cx="55" cy="55" r="8"  fill="#0D9488" />
          </g>
        </svg>
          <svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Loading"
        >
          <g className="spoke-wheel" style={{ transformOrigin: "55px 55px" }}>
            {/* Outer black ring */}
            <circle cx="55" cy="55" r="50" fill="none" stroke="#111111" strokeWidth="10" />
 
            {/* Cardinal spokes — Gold */}
            <line x1="55" y1="10"  x2="55" y2="30"  stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" />
            <line x1="55" y1="80"  x2="55" y2="100" stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" />
            <line x1="10" y1="55"  x2="30" y2="55"  stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" />
            <line x1="80" y1="55"  x2="100" y2="55" stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" />
 
            {/* Diagonal spokes — Teal */}
            <line x1="19.6" y1="19.6" x2="33.5" y2="33.5" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
            <line x1="76.5" y1="76.5" x2="90.4" y2="90.4" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
            <line x1="90.4" y1="19.6" x2="76.5" y2="33.5" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
            <line x1="19.6" y1="90.4" x2="33.5" y2="76.5" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
 
            {/* Inner ring border (over spokes) */}
            <circle cx="55" cy="55" r="50" fill="none" stroke="#1a1a1a" strokeWidth="3" />
 
            {/* Hub */}
            <circle cx="55" cy="55" r="22" fill="#1a1a1a" stroke="#C9A84C" strokeWidth="2" />
 
            {/* Core — Gold outer, Teal center */}
            <circle cx="55" cy="55" r="16" fill="#C9A84C" />
            <circle cx="55" cy="55" r="8"  fill="#0D9488" />
          </g>
        </svg>
      
      </div>
        <span className="spoke-label">{message}</span>
      </div>
    </>
  );
}