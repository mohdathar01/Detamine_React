import { useNavigate } from "react-router-dom";
// import logoimg from "../assets/images/logo.png";


const AuthLayout = ({
  titleButton,
  onClick,
  switchText,
  switchSignIn,
  switchRoute,
  showRef,
  upline
}) => {

  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      <div className="cardofsignin">

        <img width="80" src="/images/favicon.png" alt="logo" />

        <h1>PROHASH</h1>

        {showRef && (
          <p className="ref">REFERRED BY {upline}</p>
        )}

        <p className="tagline">
          FULLY AUTOMATED ON-CHAIN STRATEGIES BUILT FOR <br />
          <span>CONSISTENCY, TRANSPARENCY, AND CONTROL.</span>
        </p>

        <div className="stats">
          <div className="stat">
            {/* <div className="stat-value">24/7</div>
            <div className="stat-label">AUTOMATION</div> */}
          </div>
        
        </div>

        <div className="security ">
          NON-CUSTODIAL · SMART CONTRACT SECURED
        </div>

        <button className="main-btn" onClick={onClick}>
          {titleButton}
        </button>
        <div>

          <p className="belowsignin">
            <span className="switch-link">{switchText}</span>  <span className="switchsignin" onClick={() => navigate(switchRoute)}> {switchSignIn}</span>
          </p>

        </div>


      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .cardofsignin {
      background: rgb(0 0 0 / 16%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 12px 6px rgba(255, 255, 255, 0.4);
    position: relative;
    overflow: hidden;
    max-width: 350px;
    padding: 14px 20px;
}

.cardofsignin::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
}

.cardofsignin::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.8),
    transparent,
    rgba(255, 255, 255, 0.3)
  );
}
       
          .belowsignin{
          margin-bottom: 3px;
          margin-top: 12px;
          }

        .logo { width: 120px; margin-bottom: 20px; }

        h1 { color: #fff; font-size: 20px; margin-bottom: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        .ref {
          color: #fbbf24;
          font-size: 14px;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .tagline {
          color: #bbb;
          font-size: 11px;
          margin-bottom: 35px;
          line-height: 2;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .tagline span { color: #ff9900; font-weight: 600; }

        .stats { display: flex; gap: 20px; margin-bottom: 30px; }

        .stat {
          flex: 1;
          padding: 25px 10px;
          border-radius: 18px;
          background: rgba(40, 35, 30, 0.5);
        }

        .stat-value {
          font-size: 22px;
          font-weight: bold;
          color: #26b3a5;
          margin-bottom: 8px;
        }

        .stat-label { font-size: 12px; color: #aaa; }

        .security { font-size: 12px; color: #9ca3af; margin-bottom: 15px; }

        .main-btn {
          width: 77%;
          padding: 14px;
          border-radius: 40px;
          border: none;
          font-weight: bold;
          font-size: 15px;
          cursor: pointer;
          background: linear-gradient(90deg, #a66102, #fdd141);
          color: #111;
          transition: 0.3s;
        }

        .main-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgb(231 181 49 / 38%);
        }

        .switchsignin {
          margin-top: 20px;
          
          color: #f7ae09;
          cursor:pointer;
          margin-top: 20px;
    font-size: 17px;
    font-weight:bold;
    
     
          
        }
          .switch-link{
          margin-top: 20px;
          font-size: 15px;
          color: #aaa;
           
          }

        .switchsignin:hover { color: #056cff;; }

        @media (max-width: 480px) {
          .stats {   }
        }
          .security::before {
    content: '🛡️';
    font-size: 16px;
    color: #ff8c00;
}


      `}</style>
    </div>
  );
};

export default AuthLayout;
