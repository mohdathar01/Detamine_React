import { useEffect, useMemo, useState } from "react";

const TIMER_KEY = "compoundBaseTimerEndsAt";
const TIMER_DURATION = 72 * 60 * 60 * 1000;

const formatTime = (milliseconds) => {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const getTimerEnd = () => {
  const savedEnd = Number(localStorage.getItem(TIMER_KEY));

  if (savedEnd && savedEnd > Date.now()) {
    return savedEnd;
  }

  const newEnd = Date.now() + TIMER_DURATION;
  localStorage.setItem(TIMER_KEY, String(newEnd));
  return newEnd;
};

const CompoundBaseCard = () => {
  const timerEnd = useMemo(() => getTimerEnd(), []);
  const [remaining, setRemaining] = useState(timerEnd - Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemaining(timerEnd - Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timerEnd]);

  return (
    <section className="compound-section">
      <div className="stat-card">
        <div className="compound-top">
          <div className="compound-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 16.5L9.5 11L13.5 15L20 8.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 8.5H20V13.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <p className="card-title">Hash Spark Bonus</p>
            {/* <h2 className="compound-amount">$24.59</h2> */}
          </div>
        </div>

        <div className="compound-stats">
          <div className="compound-stat">
            <p>Direct</p>
            <strong>6</strong>
          </div>

          <div className="compound-stat">
            <p>Timer</p>
            <strong className="compound-purple">72 Hours</strong>
          </div>
          <div className="compound-stat">
            <p>Reward</p>
            <strong className="compound-purple">$25</strong>
          </div>
        </div>

        <p className="compound-note">
          All 6 Ids must be active. $25 Bonus Credited within 72 hours of verification.
        </p>

        <div className="compound-timer">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 7V12L15.5 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Remaining</span>
          <strong>{formatTime(remaining)}</strong>
        </div>
      </div>
    </section>
  );
};

export default CompoundBaseCard;
